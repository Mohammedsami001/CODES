import React, { useState } from 'react';

const SnippetCard = ({ title, code, icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed: ', err);
    }
  };

  // Basic syntax highlighter logic for display
  const renderCode = (text) => {
    if (!text) return null;
    
    // This is a very simple highlighter for the demonstration
    // In a real app, you'd use PrismJS or similar
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Escape HTML characters first to prevent XSS and broken tags
      let escapedLine = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      let styledLine = escapedLine
        // Highlight keywords (Java, SQL, & C)
        .replace(/\b(public|private|protected|class|static|void|int|String|return|new|import|package|extends|implements|CREATE|TABLE|PRIMARY|KEY|VARCHAR|INT|DATE|TIME|INSERT|INTO|VALUES|SELECT|FROM|WHERE|COUNT|AVG|SUM|MIN|MAX|AS|GROUP|ORDER|BY|DESC|ASC|HAVING|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|UNION|INTERSECT|MINUS|EXCEPT|VIEW|TRIGGER|AFTER|BEFORE|BEGIN|END|EXISTS|NOT|GRANT|REVOKE|PROCEDURE|IN|OUT|DATABASE|USE|DROP|ALTER|ADD|CONSTRAINT|FOREIGN|REFERENCES|CHECK|UNIQUE|DEFAULT|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|printf|main|char|#include|#define|pid_t|fork|open|write|read|close|lseek|SEEK_SET|O_CREAT|O_RDWR)\b/gi, '<span class="keyword">$1</span>')
        // Highlight Class Names / Data Types (Starts with Uppercase or specific types)
        .replace(/\b(?!(?:public|private|protected|class|static|void|int|String|return|new|import|package|extends|implements|CREATE|TABLE|PRIMARY|KEY|VARCHAR|INT|DATE|TIME|INSERT|INTO|VALUES|SELECT|FROM|WHERE|COUNT|AVG|SUM|MIN|MAX|AS|GROUP|ORDER|BY|DESC|ASC|HAVING|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|UNION|INTERSECT|MINUS|EXCEPT|VIEW|TRIGGER|AFTER|BEFORE|BEGIN|END|EXISTS|NOT|GRANT|REVOKE|PROCEDURE|IN|OUT|DATABASE|USE|DROP|ALTER|ADD|CONSTRAINT|FOREIGN|REFERENCES|CHECK|UNIQUE|DEFAULT|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|printf|main|char|#include|#define|pid_t|fork|open|write|read|close|lseek|SEEK_SET|O_CREAT|O_RDWR)\b)([A-Z][a-zA-Z0-9]+)\b/g, '<span class="class-name">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/\/\/.*$/g, '<span class="comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');

      return (
        <div key={i} dangerouslySetInnerHTML={{ __html: styledLine || '&nbsp;' }} />
      );
    });
  };

  return (
    <div className="code-card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="code-container">
        <div className="code-block">
          {renderCode(code)}
        </div>
      </div>
      <div className="card-footer">
        <button 
          className={`copy-btn ${copied ? 'copied' : ''}`} 
          onClick={handleCopy}
        >
          {copied ? '✓ Copied' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
};

export default SnippetCard;
