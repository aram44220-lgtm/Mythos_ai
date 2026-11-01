import React from 'react';
import { ArrowDown, Compass, Sparkles, Gamepad2 } from 'lucide-react';
import { TRANSLATIONS } from '../i18n/translations';

export default function Hero({ language, onExplorePantheon, onStartJourney, onOpenGame }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;

  return (
    <section className="hero-section">
      <div 
        className="hero-backdrop" 
        style={{ backgroundImage: `url('/assets/images/hero_bg.jpg')` }}
      />
      <div className="hero-gradient-overlay" />

      <div className="hero-content">
        <div className="hero-tagline">
          <Sparkles size={14} color="#ffd700" />
          <span>{t.hero.tagline}</span>
        </div>

        <h1 className="hero-title">
          {t.hero.title}
        </h1>

        <p className="hero-subtitle">
          {t.hero.subtitle}
        </p>

        <div className="hero-actions">
          <button 
            type="button"
            className="btn-primary"
            onClick={onStartJourney}
          >
            <span>{t.hero.primaryCta}</span>
            <ArrowDown size={18} />
          </button>

          <button 
            type="button"
            className="btn-secondary"
            onClick={onExplorePantheon}
          >
            <Compass size={18} color="#d4af37" />
            <span>{t.hero.secondaryCta}</span>
          </button>

          {onOpenGame && (
            <button
              type="button"
              className="btn-primary hero-btn-game"
              onClick={onOpenGame}
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
                color: '#0a080c',
                fontWeight: 800,
                border: '1px solid #ffd700',
                boxShadow: '0 0 18px rgba(255, 215, 0, 0.4)',
              }}
            >
              <Gamepad2 size={18} color="#0a080c" />
              <span>{t.games?.playNow || (language === 'hy' ? 'Խաղալ' : language === 'ru' ? 'Играть' : 'Play')}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
