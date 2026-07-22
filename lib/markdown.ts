// Minimal, dependency-free markdown -> HTML converter for Cosmic rich-text bodies.
// Handles: headings, bold, italic, links, images, unordered/ordered lists,
// blockquotes, horizontal rules, code, and paragraphs.

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(text: string): string {
  let out = escapeHtml(text);

  // Images ![alt](src)
  out = out.replace(
    /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_m, alt, src, title) =>
      `<img src="${src}" alt="${alt}"${title ? ` title="${title}"` : ''} class="rounded-xl my-6 w-full object-cover" />`
  );

  // Links [text](href)
  out = out.replace(
    /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g,
    (_m, text, href, title) =>
      `<a href="${href}"${title ? ` title="${title}"` : ''} class="text-[#8b2e2e] underline underline-offset-4 hover:text-[#6d2323]">${text}</a>`
  );

  // Bold **text** or __text__
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-[#1a1614]">$1</strong>');
  out = out.replace(/__([^_]+)__/g, '<strong class="font-semibold text-[#1a1614]">$1</strong>');

  // Italic *text* or _text_
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/\b_([^_]+)_\b/g, '<em>$1</em>');

  // Inline code `code`
  out = out.replace(/`([^`]+)`/g, '<code class="rounded bg-[#efe9e1] px-1.5 py-0.5 text-[0.9em]">$1</code>');

  return out;
}

export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];

  let inUl = false;
  let inOl = false;
  let inBlockquote = false;

  const closeLists = () => {
    if (inUl) {
      html.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      html.push('</ol>');
      inOl = false;
    }
  };
  const closeBlockquote = () => {
    if (inBlockquote) {
      html.push('</blockquote>');
      inBlockquote = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    // Blank line closes open structures
    if (!trimmed) {
      closeLists();
      closeBlockquote();
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      closeLists();
      closeBlockquote();
      html.push('<hr class="my-8 border-[#e3d9cb]" />');
      continue;
    }

    // Headings
    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeLists();
      closeBlockquote();
      const level = heading[1].length;
      const text = renderInline(heading[2]);
      const sizes: Record<number, string> = {
        1: 'text-3xl md:text-4xl font-bold mt-8 mb-4 text-[#1a1614]',
        2: 'text-2xl md:text-3xl font-bold mt-8 mb-4 text-[#1a1614]',
        3: 'text-xl md:text-2xl font-semibold mt-6 mb-3 text-[#1a1614]',
        4: 'text-lg font-semibold mt-6 mb-3 text-[#1a1614]',
        5: 'text-base font-semibold mt-4 mb-2 text-[#1a1614]',
        6: 'text-sm font-semibold mt-4 mb-2 text-[#1a1614]',
      };
      html.push(`<h${level} class="${sizes[level]}">${text}</h${level}>`);
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(trimmed)) {
      closeLists();
      const quote = trimmed.replace(/^>\s?/, '');
      if (!inBlockquote) {
        html.push('<blockquote class="border-l-4 border-[#8b2e2e]/40 pl-4 italic text-[#4a423b] my-4">');
        inBlockquote = true;
      }
      html.push(`<p class="mb-2 last:mb-0">${renderInline(quote)}</p>`);
      continue;
    } else {
      closeBlockquote();
    }

    // Unordered list
    if (/^[-*+]\s+/.test(trimmed)) {
      if (!inUl) {
        closeLists();
        html.push('<ul class="list-disc pl-6 space-y-2 my-4">');
        inUl = true;
      }
      const item = trimmed.replace(/^[-*+]\s+/, '');
      html.push(`<li>${renderInline(item)}</li>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inOl) {
        closeLists();
        html.push('<ol class="list-decimal pl-6 space-y-2 my-4">');
        inOl = true;
      }
      const item = trimmed.replace(/^\d+\.\s+/, '');
      html.push(`<li>${renderInline(item)}</li>`);
      continue;
    }

    // Paragraph
    closeLists();
    html.push(`<p class="mb-4 last:mb-0">${renderInline(trimmed)}</p>`);
  }

  closeLists();
  closeBlockquote();

  return html.join('\n');
}
