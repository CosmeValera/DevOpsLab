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
      style={{
        position: "relative",
        border: "1.5px solid #8884d8",
        borderRadius: "8px",
        padding: "16px 48px 16px 16px",
        marginBottom: "16px",
        background: "#232136",
        color: "#a6e3a1",
        fontFamily: "monospace",
        cursor: "pointer",
        userSelect: "text",
      }}
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
