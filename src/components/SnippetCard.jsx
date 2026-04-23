import React, { useState } from 'react';

const SnippetCard = ({ title, code, icon, images }) => {
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
    
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Escape HTML characters first
      let escapedLine = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Apply highlighting in a way that doesn't mangle tags
      // We use a placeholder system or a specific order
      let styledLine = escapedLine
        // 1. Keywords
        .replace(/\b(public|private|protected|class|static|void|int|String|return|new|import|package|extends|implements|CREATE|TABLE|PRIMARY|KEY|VARCHAR|INT|DATE|TIME|INSERT|INTO|VALUES|SELECT|FROM|WHERE|COUNT|AVG|SUM|MIN|MAX|AS|GROUP|ORDER|BY|DESC|ASC|HAVING|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|ON|UNION|INTERSECT|MINUS|EXCEPT|VIEW|TRIGGER|AFTER|BEFORE|BEGIN|END|EXISTS|NOT|GRANT|REVOKE|PROCEDURE|IN|OUT|DATABASE|USE|DROP|ALTER|ADD|CONSTRAINT|FOREIGN|REFERENCES|CHECK|UNIQUE|DEFAULT|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|printf|main|char|#include|#define|pid_t|fork|open|write|read|close|lseek|SEEK_SET|O_CREAT|O_RDWR|db|insertOne|insertMany|find|updateOne|updateMany|deleteOne|deleteMany|aggregate|match|group|sort|project|limit|skip|createIndex|getIndexes|bsonType|enum|pattern|validator|jsonSchema|enable|configure|terminal|hostname|interface|shutdown|brief)\b/gi, '__KW__$1__END__')
        // 2. Class Names (Uppercase words not already marked)
        .replace(/\b([A-Z][a-zA-Z0-9]+)\b/g, (match) => {
          if (match.startsWith('__KW__')) return match;
          return `__CN__${match}__END__`;
        })
        // 3. Operators ($)
        .replace(/(\$[a-zA-Z0-9]+)/g, '__KW__$1__END__')
        // 4. Strings (be careful not to match inside placeholders)
        .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
        // 5. Comments
        .replace(/\/\/.*$/g, '<span class="comment">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>');

      // Finally convert placeholders to real tags
      styledLine = styledLine
        .replace(/__KW__(.*?)__END__/g, '<span class="keyword">$1</span>')
        .replace(/__CN__(.*?)__END__/g, '<span class="class-name">$1</span>');

      return (
        <div key={i} dangerouslySetInnerHTML={{ __html: styledLine || '&nbsp;' }} />
      );
    });
  };

  return (
    <div className={`code-card ${images ? 'has-images' : ''}`}>
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-content">
        <div className="code-container">
          <div className="code-block">
            {renderCode(code)}
          </div>
        </div>
        {images && images.length > 0 && (
          <div className="image-gallery">
            {images.map((img, idx) => (
              <div key={idx} className="gallery-item">
                <img src={img} alt={`${title} screenshot ${idx + 1}`} />
              </div>
            ))}
          </div>
        )}
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
