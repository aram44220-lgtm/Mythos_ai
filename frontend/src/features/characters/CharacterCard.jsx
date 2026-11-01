import React from 'react';
import { MessageSquare, Check, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function CharacterCard({ character, isActive, language, onSelect }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;
  const charName = character.name[language] || character.name.hy;
  const charTitle = character.title[language] || character.title.hy;
  const charDesc = character.description[language] || character.description.hy;

  const cardStyle = {
    '--active-accent': character.accent_color,
    '--active-glow': `${character.accent_color}55`
  };

  return (
    <div 
      className={`character-card ${isActive ? 'active' : ''} ${character.id === 'devil' ? 'devil-card' : ''}`}
      style={cardStyle}
      onClick={() => onSelect(character.id)}
    >
      <div className="card-portrait-wrapper">
        <img 
          src={character.avatar_image} 
          alt={charName} 
          className="card-portrait" 
          loading="lazy"
        />
        <div className="portrait-gradient" />

        {isActive && (
          <div className="active-badge">
            <Check size={12} strokeWidth={3} />
            <span>{t.characters.selectedBadge}</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <div>
          <h3 className="character-name">{charName}</h3>
          <div className="character-title">{charTitle}</div>
          <p className="character-desc">{charDesc}</p>
        </div>

        <button 
          type="button" 
          className="card-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(character.id);
          }}
        >
          <MessageSquare size={16} />
          <span>{t.characters.talkButton}</span>
        </button>
      </div>
    </div>
  );
}
