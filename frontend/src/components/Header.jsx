import React from 'react';
import { Volume2, VolumeX, BookOpen, Sparkles, Gamepad2 } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

export default function Header({
  language,
  onLanguageChange,
  isAudioPlaying,
  onToggleAudio,
  onOpenInfo,
  onOpenOracle,
  onOpenGame
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;

  return (
    <header className="app-header">
      <div className="header-container">
        <div 
          className="brand-wrapper" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title={t.projectName}
        >
          <svg className="solar-symbol" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" stroke="#d4af37" strokeWidth="2.5" opacity="0.6" />
            <circle cx="50" cy="50" r="42" stroke="#f5e5a3" strokeWidth="1" strokeDasharray="3 3" />
            <g stroke="#d4af37" strokeWidth="3" strokeLinecap="round">
              <path d="M50 50 C50 30, 68 25, 75 35" />
              <path d="M50 50 C68 50, 75 68, 65 75" />
              <path d="M50 50 C50 70, 32 75, 25 65" />
              <path d="M50 50 C32 50, 25 32, 35 25" />
              <path d="M50 50 C65 35, 75 42, 85 50" />
              <path d="M50 50 C65 65, 58 75, 50 85" />
              <path d="M50 50 C35 65, 25 58, 15 50" />
              <path d="M50 50 C35 35, 42 25, 50 15" />
            </g>
            <circle cx="50" cy="50" r="7" fill="#ffd700" />
          </svg>

          <div>
            <div className="brand-title">{t.projectName}</div>
            <div className="brand-subtitle">{t.subTitle}</div>
          </div>
        </div>

        <div className="nav-actions">
          <button 
            type="button"
            className={`nav-btn ${isAudioPlaying ? 'active' : ''}`}
            onClick={onToggleAudio}
            title={isAudioPlaying ? t.nav.soundOn : t.nav.soundOff}
            aria-label={isAudioPlaying ? t.nav.soundOn : t.nav.soundOff}
          >
            {isAudioPlaying ? <Volume2 size={16} color="#d4af37" /> : <VolumeX size={16} />}
            <span style={{ fontSize: '0.8rem' }}>{isAudioPlaying ? 'ON' : 'OFF'}</span>
          </button>

          <button 
            type="button"
            className="nav-btn"
            onClick={onOpenInfo}
            title={t.nav.about}
          >
            <BookOpen size={16} />
            <span className="btn-text">{t.nav.about}</span>
          </button>

          <button 
            type="button"
            className="nav-btn nav-btn-oracle"
            onClick={onOpenOracle}
            title={t.nav.oracle}
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(212, 175, 55, 0.18) 100%)',
              border: '1px solid rgba(192, 132, 252, 0.45)',
              color: '#e9d5ff'
            }}
          >
            <Sparkles size={16} color="#c084fc" />
            <span className="btn-text">{t.nav.oracle}</span>
          </button>

          <button
            type="button"
            className="nav-btn nav-btn-game"
            onClick={onOpenGame}
            title={t.games?.playNow || 'Խաղալ'}
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(180,130,30,0.1) 100%)',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#ffd700',
              fontWeight: 700,
            }}
          >
            <Gamepad2 size={16} color="#ffd700" />
            <span className="btn-text">{t.games?.playNow || 'Խաղալ'}</span>
          </button>

          <div className="lang-selector" role="group" aria-label={t.nav.language}>
            <button
              type="button"
              className={`lang-btn ${language === 'hy' ? 'active' : ''}`}
              onClick={() => onLanguageChange('hy')}
              title="Հայերեն"
            >
              ՀԱՅ
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
              onClick={() => onLanguageChange('ru')}
              title="Русский"
            >
              РУС
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => onLanguageChange('en')}
              title="ENG"
            >
              ENG
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
