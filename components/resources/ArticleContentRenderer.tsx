import React from "react";
import { CodeBlock } from "./CodeBlock";

interface ArticleContentRendererProps {
  content: string;
}

export function ArticleContentRenderer({ content }: ArticleContentRendererProps) {
  // Parse markdown into blocks: code, table, heading, list, paragraph
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // 1. Fenced Code Block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace("```", "").trim() || "text";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      const codeString = codeLines.join("\n");
      elements.push(
        <CodeBlock key={`code-${i}`} code={codeString} language={lang} />
      );
      continue;
    }

    // 2. Markdown Table
    if (line.trim().startsWith("|") && lines[i + 1]?.includes("---")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      elements.push(<MarkdownTable key={`table-${i}`} lines={tableLines} />);
      continue;
    }

    // 3. Headings (## or ###)
    if (line.startsWith("## ")) {
      const headingText = line.replace("## ", "").trim();
      const slugId = slugifyHeading(headingText);
      elements.push(
        <h2
          key={`h2-${i}`}
          id={slugId}
          className="group flex items-center justify-between text-2xl sm:text-3xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mt-12 mb-4 pt-6 border-t border-[#D1D5DB] dark:border-[#334155] scroll-mt-28 leading-snug"
        >
          <span>{headingText}</span>
          <a
            href={`#${slugId}`}
            className="opacity-0 group-hover:opacity-100 text-google-blue dark:text-[#60A5FA] text-base ml-2 transition-opacity focus-visible:opacity-100"
            aria-label={`Link to ${headingText}`}
          >
            #
          </a>
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const headingText = line.replace("### ", "").trim();
      const slugId = slugifyHeading(headingText);
      elements.push(
        <h3
          key={`h3-${i}`}
          id={slugId}
          className="group flex items-center justify-between text-lg sm:text-xl font-display font-bold text-ink-primary dark:text-[#F8FAFC] mt-8 mb-3 scroll-mt-28 leading-snug"
        >
          <span>{headingText}</span>
          <a
            href={`#${slugId}`}
            className="opacity-0 group-hover:opacity-100 text-google-blue dark:text-[#60A5FA] text-base ml-2 transition-opacity focus-visible:opacity-100"
            aria-label={`Link to ${headingText}`}
          >
            #
          </a>
        </h3>
      );
      i++;
      continue;
    }

    // 4. Unordered List
    if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("* ") || lines[i].trim().startsWith("- "))
      ) {
        listItems.push(lines[i].trim().replace(/^[\*\-]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 mb-6 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-base text-ink-secondary dark:text-gray-300 font-sans leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-google-blue dark:bg-[#60A5FA] mt-2.5 shrink-0" />
              <span>{formatInlineContent(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 5. Ordered List
    if (/^\d+\.\s+/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-2 mb-6 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-base text-ink-secondary dark:text-gray-300 font-sans leading-relaxed">
              <span className="text-xs font-semibold text-google-blue dark:text-[#60A5FA] mt-1 shrink-0 w-5">
                {String(idx + 1).padStart(2, "0")}.
              </span>
              <span>{formatInlineContent(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 6. Regular Paragraph
    if (line.trim().length > 0) {
      elements.push(
        <p
          key={`p-${i}`}
          className="text-base text-ink-secondary dark:text-gray-300 font-sans leading-relaxed mb-5"
        >
          {formatInlineContent(line.trim())}
        </p>
      );
    }

    i++;
  }

  return (
    <div className="max-w-3xl text-ink-primary dark:text-[#F8FAFC]">
      {elements}
    </div>
  );
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function MarkdownTable({ lines }: { lines: string[] }) {
  if (lines.length < 2) return null;

  const headerCells = lines[0]
    .split("|")
    .map((c) => c.trim())
    .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);

  const rows = lines.slice(2).map((rowLine) => {
    return rowLine
      .split("|")
      .map((c) => c.trim())
      .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
  });

  return (
    <div className="my-8 overflow-x-auto border border-[#D1D5DB] rounded-card bg-white shadow-subtle">
      <table className="min-w-full text-left text-xs sm:text-sm text-ink-secondary divide-y divide-[#D1D5DB]">
        <thead className="bg-[#FAFAFA] text-ink-primary font-semibold text-xs">
          <tr>
            {headerCells.map((header, idx) => (
              <th key={idx} className="px-4 py-3 border-b border-[#D1D5DB]">
                {formatInlineContent(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#D1D5DB]">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-[#FAFAFA] transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-3 leading-relaxed">
                  {formatInlineContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatInlineContent(text: string): React.ReactNode {
  // Splits on inline code `...` and bold **...**
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^\*]+)\*\*/);

    let nextMatch: { type: "code" | "bold"; index: number; length: number; content: string } | null = null;

    if (codeMatch && codeMatch.index !== undefined) {
      nextMatch = {
        type: "code",
        index: codeMatch.index,
        length: codeMatch[0].length,
        content: codeMatch[1],
      };
    }

    if (boldMatch && boldMatch.index !== undefined) {
      if (!nextMatch || boldMatch.index < nextMatch.index) {
        nextMatch = {
          type: "bold",
          index: boldMatch.index,
          length: boldMatch[0].length,
          content: boldMatch[1],
        };
      }
    }

    if (!nextMatch) {
      parts.push(<span key={keyIdx++}>{remaining}</span>);
      break;
    }

    if (nextMatch.index > 0) {
      parts.push(
        <span key={keyIdx++}>{remaining.slice(0, nextMatch.index)}</span>
      );
    }

    if (nextMatch.type === "code") {
      parts.push(
        <code
          key={keyIdx++}
          className="px-1.5 py-0.5 rounded bg-[#F1F3F4] text-google-blue font-mono text-xs border border-[#D1D5DB]"
        >
          {nextMatch.content}
        </code>
      );
    } else {
      parts.push(
        <strong key={keyIdx++} className="font-semibold text-ink-primary">
          {nextMatch.content}
        </strong>
      );
    }

    remaining = remaining.slice(nextMatch.index + nextMatch.length);
  }

  return parts;
}
