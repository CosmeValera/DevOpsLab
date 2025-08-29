import React from "react";
import CommandTooltip from "./CommandTooltip";

interface CommandStep {
  title: string;
  description: string;
  commands: Array<{
    command: string;
    explanation: string;
  }>;
}

interface CommandStepsProps {
  steps: CommandStep[];
  layout?: "single" | "grid";
}

const CommandSteps: React.FC<CommandStepsProps> = ({ steps, layout = "single" }) => {
  return (
    <div className={`command-steps ${layout === "grid" ? "command-steps--grid" : ""}`}>
      {steps.map((step, index) => (
        <div key={index} className="command-step">
          <div className="command-step__header">
            <div className="command-step__number">{index + 1}</div>
            <div className="command-step__info">
              <h3 className="command-step__title">{step.title}</h3>
              <p className="command-step__description">{step.description}</p>
            </div>
          </div>
          
          <div className="command-step__commands">
            {step.commands.map((item, cmdIndex) => (
              <CommandTooltip 
                key={cmdIndex}
                command={item.command}
                explanation={item.explanation}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandSteps;
