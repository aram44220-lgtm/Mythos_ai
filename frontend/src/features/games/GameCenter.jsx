import React, { useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, Flame, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';
import { gameAudio } from './gameAudio';
import VahagnVishapGame from './VahagnVishapGame';
import HardagoghFlightGame from './HardagoghFlightGame';
import '../../styles/games.css';

export default function GameCenter({ language, onLanguageChange, onClose }) {
  const [activeGame, setActiveGame] = useState('boss');
  const [isMuted, setIsMuted] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;
  const g = t.games;

  const handleToggleSound = () => {
    const muted = gameAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="game-center-root">
      <div className="game-center-bg" />

      <header className="game-center-nav">
        <div className="nav-left">
          <button
            type="button"
            className="btn-back-temple"
            onClick={onClose}
            title={g.backToSite}
          >
            <ArrowLeft size={18} />
            <span>{g.backToSite}</span>
          </button>
        </div>

        <div className="game-nav-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeGame === 'boss'}
            className={`game-tab-btn ${activeGame === 'boss' ? 'active' : ''}`}
            onClick={() => {
              gameAudio.playClick();
              setActiveGame('boss');
            }}
          >
            <Flame size={16} />
            <span>{g.action.title}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeGame === 'flight'}
            className={`game-tab-btn ${activeGame === 'flight' ? 'active' : ''}`}
            onClick={() => {
              gameAudio.playClick();
              setActiveGame('flight');
            }}
          >
            <Sparkles size={16} />
            <span>{g.flight.tabTitle}</span>
          </button>
        </div>

        <div className="nav-right">
          <button
            type="button"
            className={`icon-btn ${isMuted ? 'muted' : ''}`}
            onClick={handleToggleSound}
            title={isMuted ? g.soundOff : g.soundOn}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} color="#ffd700" />}
          </button>

          <div className="game-lang-switcher" role="group" aria-label="Language">
            <button
              type="button"
              className={`glang-btn ${language === 'hy' ? 'active' : ''}`}
              onClick={() => onLanguageChange('hy')}
            >
              ՀԱՅ
            </button>
            <button
              type="button"
              className={`glang-btn ${language === 'ru' ? 'active' : ''}`}
              onClick={() => onLanguageChange('ru')}
            >
              РУС
            </button>
            <button
              type="button"
              className={`glang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => onLanguageChange('en')}
            >
              ENG
            </button>
          </div>
        </div>
      </header>

      <main className="game-stage-container">
        {activeGame === 'boss' ? (
          <VahagnVishapGame t={t} language={language} />
        ) : (
          <HardagoghFlightGame t={t} language={language} />
        )}
      </main>
    </div>
  );
}
