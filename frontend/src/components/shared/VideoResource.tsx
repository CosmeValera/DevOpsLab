import React from "react";
import { Play, ExternalLink } from "lucide-react";

interface VideoResourceProps {
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  className?: string;
}

const DEFAULT_THUMBNAIL = '/logo-1.png';

const VideoResource: React.FC<VideoResourceProps> = ({ 
  title, 
  url, 
  description, 
  thumbnail,
  className = "" 
}) => {
  const handleVideoClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`video-resource ${className}`}>
      <div className="video-resource__header">
        <h3 className="video-resource__title">
          <Play size={20} />
          Learn More with Video
        </h3>
        <p className="video-resource__subtitle">
          Watch an in-depth tutorial to deepen your understanding
        </p>
      </div>
      
      <div 
        className="video-resource__card"
        onClick={handleVideoClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleVideoClick();
          }
        }}
      >
        <div className="video-resource__thumbnail">
          <img src={thumbnail || DEFAULT_THUMBNAIL} alt={title} />
          <div className="video-resource__play-overlay">
            <Play size={24} />
          </div>
        </div>
        
        <div className="video-resource__content">
          <h4 className="video-resource__video-title">{title}</h4>
          <p className="video-resource__description">{description}</p>
          <div className="video-resource__link">
            <ExternalLink size={16} />
            <span>Watch on YouTube</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResource;
