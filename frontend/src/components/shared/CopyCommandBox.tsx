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

  return (
    <div
      className="copy-command-box"
      tabIndex={0}
      onClick={handleCopy}
      title="Click to copy"
    >
      <span>{command}</span>
      <button
        onClick={e => {
          e.stopPropagation();
          handleCopy();
        }}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "#393552",
          border: "none",
          borderRadius: "4px",
          color: "#a6e3a1",
          cursor: "pointer",
          padding: "4px 8px",
        }}
        aria-label="Copy to clipboard"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyCommandBox;
