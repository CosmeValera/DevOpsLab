import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";

interface CrossReferenceLink {
  title: string;
  path: string;
  description: string;
  icon: LucideIcon;
  type: 'tutorial' | 'deployment' | 'page';
}

interface CrossReferenceLinksProps {
  title?: string;
  links: CrossReferenceLink[];
  className?: string;
}

const CrossReferenceLinks: React.FC<CrossReferenceLinksProps> = ({ 
  title = "Related Resources", 
  links, 
  className = "" 
}) => {
  if (links.length === 0) return null;


  return (
    <div className={`cross-reference-links ${className}`}>
      <h3 className="cross-reference-links__title">{title}</h3>
      <div className="cross-reference-links__grid">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="cross-reference-link"
            >
              <div className="cross-reference-link__icon">
                <IconComponent size={20} />
              </div>
              <div className="cross-reference-link__content">
                <h4 className="cross-reference-link__title">{link.title}</h4>
                <p className="cross-reference-link__description">{link.description}</p>
              </div>
              <div className="cross-reference-link__arrow">
                <ArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CrossReferenceLinks;
