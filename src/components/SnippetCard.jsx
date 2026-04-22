import React, { useState } from 'react';

const SnippetCard = ({ title, code, icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        // Highlight keywords (Java & SQL)
        .replace(/\b(public|private|protected|class|static|void|int|String|return|new|import|package|extends|implements|CREATE|TABLE|PRIMARY|KEY|VARCHAR|INT|DATE|TIME)\b/g, '<span class="keyword">$1</span>')
        // Highlight Class Names (Starts with Uppercase, not a keyword)
        .replace(/\b(?!(?:public|private|protected|class|static|void|int|String|return|new|import|package|extends|implements|CREATE|TABLE|PRIMARY|KEY|VARCHAR|INT|DATE|TIME)\b)([A-Z][a-zA-Z0-9]+)\b/g, '<span class="class-name">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        .replace(/\/\/.*$/g, '<span class="comment">$&</span>');

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
