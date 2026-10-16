import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const RECIPIENT_EMAIL = process.env.NOTIFICATION_EMAIL || "contact@mlbhopal.tech";
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

// Simple in-memory IP rate limiter: max 5 requests per IP per 60 seconds
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 5;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count++;
  return false;
}

// Clean up stale rate limit entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

interface SubmissionPayload {
  type?: "ambassador" | "volunteer" | "partner" | "general" | "contact";
  name: string;
  email: string;
  phone?: string;
  college?: string;
  branch?: string;
  year?: string;
  company?: string;
  role?: string;
  tier?: string;
  portfolio?: string;
  experience?: string;
  message?: string;
  subject?: string;
  // Honeypot spam trap
  hp_field?: string;
  _submittedAt?: number;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    // Client IP detection for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    let body: SubmissionPayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const {
      type = "general",
      name,
      email,
      phone,
      college,
      branch,
      year,
      company,
      role,
      tier,
      portfolio,
      experience,
      message,
      subject,
      hp_field,
      _submittedAt,
    } = body;

    // 1. Spam Protection Consideration: Honeypot check
    // If the invisible honeypot field is filled out, reject immediately
    if (hp_field && hp_field.trim().length > 0) {
      console.warn(`[Spam Guard] Honeypot triggered from IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Spam detected. Submission rejected." },
        { status: 400 }
      );
    }

    // Fast-bot submission check (< 600ms between form render and submit)
    if (_submittedAt && Date.now() - _submittedAt < 600) {
      console.warn(`[Spam Guard] Suspicious sub-second submission from IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Submission completed suspiciously fast. Please try again." },
        { status: 400 }
      );
    }

    // 2. Server-Side Validation: Name
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Full name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    // 3. Server-Side Validation: Email
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address (e.g. name@example.com)." },
        { status: 400 }
      );
    }
    if (email.trim().length > 150) {
      return NextResponse.json(
        { error: "Email address must not exceed 150 characters." },
        { status: 400 }
      );
    }

    // 4. Server-Side Validation: Type constraints
    const validTypes = ["ambassador", "volunteer", "partner", "general", "contact"];
    const sanitizedType = validTypes.includes(type) ? type : "general";

    // 5. Server-Side Validation: Length & Sanity bounds
    const cleanName = sanitizeHeader(name).slice(0, 100);
    const cleanEmail = email.trim().toLowerCase().slice(0, 150);
    const cleanPhone = phone ? sanitizeHeader(phone).slice(0, 30) : "";
    const cleanCollege = college ? sanitizeHeader(college).slice(0, 150) : "";
    const cleanBranch = branch ? sanitizeHeader(branch).slice(0, 100) : "";
    const cleanYear = year ? sanitizeHeader(year).slice(0, 50) : "";
    const cleanCompany = company ? sanitizeHeader(company).slice(0, 150) : "";
    const cleanRole = role ? sanitizeHeader(role).slice(0, 100) : "";
    const cleanTier = tier ? sanitizeHeader(tier).slice(0, 50) : "";
    const cleanPortfolio = portfolio ? sanitizeUrl(portfolio).slice(0, 300) : "";
    const cleanExperience = experience ? experience.trim().slice(0, 3000) : "";
    const cleanMessage = message ? message.trim().slice(0, 5000) : "";
    const cleanSubject = subject ? sanitizeHeader(subject).slice(0, 150) : "";

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const formTypeTitle =
      sanitizedType === "ambassador"
        ? "Campus Ambassador / College Chapter Application"
        : sanitizedType === "volunteer"
        ? "Volunteer Collective Application"
        : sanitizedType === "partner"
        ? "Partnership / Sponsorship Proposal"
        : "General Community Inquiry";

    // 6. Data Storage: Local ledger append in development
    const submissionRecord = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp,
      isoDate: new Date().toISOString(),
      type: sanitizedType,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      college: cleanCollege,
      branch: cleanBranch,
      year: cleanYear,
      company: cleanCompany,
      role: cleanRole,
      tier: cleanTier,
      portfolio: cleanPortfolio,
      experience: cleanExperience,
      message: cleanMessage,
      subject: cleanSubject,
      ip: clientIp,
    };

    if (process.env.NODE_ENV === "development") {
      try {
        const submissionsDir = path.join(process.cwd(), "content");
        const submissionsFile = path.join(submissionsDir, "submissions.json");
        
        let existingSubmissions: any[] = [];
        if (fs.existsSync(submissionsFile)) {
          try {
            const raw = fs.readFileSync(submissionsFile, "utf-8");
            existingSubmissions = JSON.parse(raw);
          } catch {
            existingSubmissions = [];
          }
        }
        existingSubmissions.unshift(submissionRecord);
        fs.writeFileSync(submissionsFile, JSON.stringify(existingSubmissions, null, 2), "utf-8");
      } catch (fsErr) {
        console.warn("[Submissions Store] Safe fallback (read-only environment):", fsErr);
      }
    }

    // 7. Google Sheets Webhook Integration
    if (GOOGLE_SHEET_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionRecord),
        });
        console.log("[Google Sheets] Dispatched row to Google Sheets Webhook successfully.");
      } catch (sheetErr) {
        console.warn("[Google Sheets Webhook Error]:", sheetErr);
      }
    }

    // 8. Server-side Email Delivery via Nodemailer
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(formTypeTitle)}</title>
</head>
<body style="margin:0;padding:0;background-color:#090A0D;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E4E4E7;">
  <div style="max-width:600px;margin:30px auto;background:#0E1117;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);">
    
    <!-- Header -->
    <div style="background:#161922;border-bottom:1px solid rgba(255,255,255,0.08);padding:28px 32px;text-align:left;">
      <div style="display:inline-block;padding:4px 10px;background:rgba(255,107,44,0.15);border:1px solid rgba(255,107,44,0.3);border-radius:20px;font-size:11px;font-weight:bold;letter-spacing:1px;color:#FF6B2C;text-transform:uppercase;margin-bottom:8px;">
        ML BHOPAL COMMUNITY INBOX
      </div>
      <h1 style="margin:0;color:#FFFFFF;font-size:22px;font-weight:700;letter-spacing:-0.5px;">
        ${escapeHtml(formTypeTitle)}
      </h1>
    </div>

    <!-- Content Body -->
    <div style="padding:32px;">
      <p style="margin-top:0;margin-bottom:24px;font-size:14px;color:#A1A1AA;line-height:1.6;">
        A new submission was received on the <strong style="color:#FFFFFF;">ML Bhopal Website</strong> at <span style="color:#FF6B2C;">${timestamp} IST</span>.
      </p>

      <!-- Details Table -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;background:#12151D;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;width:34%;">
            Applicant Name
          </td>
          <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#FFFFFF;font-weight:600;">
            ${escapeHtml(cleanName)}
          </td>
        </tr>
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
            Email Address
          </td>
          <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#60A5FA;">
            <a href="mailto:${escapeHtml(cleanEmail)}" style="color:#60A5FA;text-decoration:none;">${escapeHtml(cleanEmail)}</a>
          </td>
        </tr>
        ${
          cleanPhone
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  Phone / WhatsApp
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#E4E4E7;">
                  <a href="tel:${escapeHtml(cleanPhone)}" style="color:#E4E4E7;text-decoration:none;">${escapeHtml(cleanPhone)}</a>
                </td>
              </tr>`
            : ""
        }
        ${
          cleanCollege
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  College / Institute
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#FFFFFF;font-weight:bold;">
                  ${escapeHtml(cleanCollege)}
                </td>
              </tr>`
            : ""
        }
        ${
          cleanBranch || cleanYear
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  Branch & Year
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#E4E4E7;">
                  ${escapeHtml([cleanBranch, cleanYear].filter(Boolean).join(" • "))}
                </td>
              </tr>`
            : ""
        }
        ${
          cleanCompany
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  Organization
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#E4E4E7;">
                  ${escapeHtml(cleanCompany)}
                </td>
              </tr>`
            : ""
        }
        ${
          cleanTier
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  Partnership Tier
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#FF6B2C;font-weight:bold;">
                  ${escapeHtml(cleanTier)}
                </td>
              </tr>`
            : ""
        }
        ${
          cleanRole
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  Track / Role
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#E4E4E7;">
                  ${escapeHtml(cleanRole)}
                </td>
              </tr>`
            : ""
        }
        ${
          cleanSubject
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  Topic / Subject
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#E4E4E7;">
                  ${escapeHtml(cleanSubject)}
                </td>
              </tr>`
            : ""
        }
        ${
          cleanPortfolio
            ? `<tr>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;">
                  Portfolio / Profile
                </td>
                <td style="padding:14px 18px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;color:#FF6B2C;">
                  <a href="${escapeHtml(cleanPortfolio)}" target="_blank" style="color:#FF6B2C;text-decoration:none;">${escapeHtml(cleanPortfolio)}</a>
                </td>
              </tr>`
            : ""
        }
      </table>

      ${
        cleanExperience
          ? `
      <div style="margin-bottom:24px;">
        <div style="font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
          Past Experience & Background
        </div>
        <div style="padding:16px;background:#12151D;border:1px solid rgba(255,255,255,0.08);border-radius:12px;font-size:14px;line-height:1.6;color:#D4D4D8;white-space:pre-wrap;">
${escapeHtml(cleanExperience)}
        </div>
      </div>`
          : ""
      }

      ${
        cleanMessage
          ? `
      <div style="margin-bottom:28px;">
        <div style="font-size:12px;font-weight:bold;color:#FF6B2C;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
          ${sanitizedType === "ambassador" ? "Vision & Motivation for Chapter" : "Message / Proposal"}
        </div>
        <div style="padding:18px;background:#12151D;border:1px solid rgba(255,255,255,0.08);border-radius:12px;font-size:14px;line-height:1.6;color:#D4D4D8;white-space:pre-wrap;">
${escapeHtml(cleanMessage)}
        </div>
      </div>`
          : ""
      }

      <!-- Action Button -->
      <div style="text-align:center;margin-top:32px;">
        <a href="mailto:${escapeHtml(cleanEmail)}?subject=Re:%20ML%20Bhopal%20-${encodeURIComponent(
      cleanCollege || cleanSubject || cleanRole || formTypeTitle
    )}" style="display:inline-block;padding:12px 28px;background:#FF6B2C;color:#FFFFFF;text-decoration:none;font-weight:bold;font-size:13px;border-radius:30px;letter-spacing:0.5px;text-transform:uppercase;">
          Reply to ${escapeHtml(cleanName)}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#090A0D;padding:18px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#71717A;">
      Sent automatically to <span style="color:#A1A1AA;">${RECIPIENT_EMAIL}</span> from ML Bhopal Platform
    </div>

  </div>
</body>
</html>
`;

    // Configure Mailer Transporter if credentials are present
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    // Never leak SMTP credentials or secrets in output
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"ML Bhopal Notifications" <${smtpUser}>`,
        to: RECIPIENT_EMAIL,
        replyTo: `"${cleanName}" <${cleanEmail}>`,
        subject: `[ML Bhopal] ${formTypeTitle}: ${cleanName} (${cleanCollege || cleanCompany || cleanRole || "Applicant"})`,
        text: `New submission from ${cleanName} (${cleanEmail})\nType: ${formTypeTitle}\nMessage: ${cleanMessage}`,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        message: "Your submission has been securely delivered to the ML Bhopal team.",
      });
    } else {
      // Development mode logging (zero credentials logged or exposed)
      console.log(`[Form Submission Received] Type: ${formTypeTitle} | From: ${cleanName} (${cleanEmail})`);

      return NextResponse.json({
        success: true,
        message: "Your submission has been received by the ML Bhopal team.",
      });
    }
  } catch (err: any) {
    console.error("[Form API Internal Error]:", err);
    // Generic error message - NEVER leak stack traces or internal secrets
    return NextResponse.json(
      { error: "Unable to process submission at this time. Please try again or email contact@mlbhopal.tech." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeHeader(str: string = ""): string {
  return String(str)
    .replace(/[\r\n\t]/g, " ")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim();
}

function sanitizeUrl(urlStr: string = ""): string {
  const trimmed = String(urlStr).trim();
  if (!trimmed) return "";
  // Disallow javascript:, data:, or other dangerous schemes
  if (/^javascript:/i.test(trimmed) || /^data:/i.test(trimmed) || /^vbscript:/i.test(trimmed)) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
