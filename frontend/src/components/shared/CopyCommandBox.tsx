import React, { useState } from "react";

interface CopyCommandBoxProps {
  command: string;
}

const CopyCommandBox: React.FC<CopyCommandBoxProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleCopy();
  };

  return (
    <div
      className="copy-command-box"
      tabIndex={0}
      onClick={handleClick}
      title="Click to copy"
      style={{
        position: 'relative',
        backgroundColor: 'var(--menu-item-bg)',
        border: '1px solid var(--accent-blue)',
        borderRadius: '6px',
        padding: '12px 40px 12px 12px',
        marginBottom: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
    >
      <span style={{
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", Consolas, "Courier New", monospace',
        fontSize: '12px',
        color: 'var(--color-text)',
        wordBreak: 'break-all',
      }}>
        {command}
      </span>
      <button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleCopy();
        }}
        style={{
          position: "absolute",
          top: "50%",
          right: "8px",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          color: 'var(--color-text)',
          cursor: "pointer",
          padding: "4px",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "color 0.2s ease",
        }}
        aria-label="Copy to clipboard"
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--accent-blue)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--color-text)';
        }}
      >
        {copied ? (
          // Check icon when copied
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12"/>
          </svg>
        ) : (
          // Copy icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default CopyCommandBox;