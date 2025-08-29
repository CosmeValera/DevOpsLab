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
      title="Click to copy">
      <p className="copy-command-box__content">
        <span className="copy-command-box__prefix copy-command-box__prefix--dollar"></span>
        {command}
      </p>
      <button
        className={`copy-btn ${copied ? "copy-btn--copied" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleCopy();
        }}
        aria-label="Copy to clipboard">
        {copied ? (
          // Check icon when copied
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        ) : (
          // Copy icon
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default CopyCommandBox;
