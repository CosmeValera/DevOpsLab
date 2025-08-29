import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import CopyCommandBox from "./CopyCommandBox";

interface CommandTooltipProps {
  command: string;
  explanation: string;
}

const CommandTooltip: React.FC<CommandTooltipProps> = ({ command, explanation }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="command-with-info">
      <div className="command-with-info__box">
        <CopyCommandBox command={command} />
      </div>
      
      <div className="command-with-info__help">
        <button
          className="command-info-btn"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          aria-label="Command explanation">
          <HelpCircle size={16} />
        </button>
        
        {isVisible && (
          <div className="command-info-tooltip">
            <div className="command-info-tooltip__content">
              {explanation}
            </div>
            <div className="command-info-tooltip__arrow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandTooltip;
