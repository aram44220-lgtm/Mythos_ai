import React, { useState, useEffect } from 'react';
import { X, Flame, RotateCcw, User } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';
import { sendOracleRequest } from '../../services/api';
import '../../styles/oracle.css';

export default function OracleModal({ isOpen, onClose, language }) {
  const [name, setName] = useState('');
  const [prophecy, setProphecy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('form');

  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;
  const o = t.oracle || {};

  useEffect(() => {
    if (isOpen) {
      setView('form');
      setProphecy('');
      setError('');
      setName('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    setView('loading');
    setError('');

    try {
      const result = await sendOracleRequest(trimmed, language);
      setProphecy(result.prophecy);
      setView('result');
    } catch (err) {
      setError(err.message || o.errorGeneric || 'Something went wrong');
      setView('error');
    }
  };

  const handleTryAgain = () => {
    setView('form');
    setProphecy('');
    setError('');
  };

  const handleNewProphecy = async () => {
    if (!name.trim()) {
      setView('form');
      return;
    }
    setView('loading');
    try {
      const result = await sendOracleRequest(name.trim(), language);
      setProphecy(result.prophecy);
      setView('result');
    } catch (err) {
      setError(err.message || o.errorGeneric || 'Something went wrong');
      setView('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="oracle-overlay" onClick={onClose}>
      <div
        className="oracle-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={o.title || 'Sacred Oracle'}
      >
        <div className="oracle-flame-bar" />

        <div className="oracle-header">
          <div className="oracle-eye-icon">
            <span>🔮</span>
          </div>
          <h2 className="oracle-title">{o.title || 'SACRED ORACLE'}</h2>
          <p className="oracle-subtitle">{o.subtitle || 'Divine your fate from the sacred flames'}</p>

          <button
            type="button"
            className="oracle-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="oracle-body">
          {view === 'form' && (
            <form className="oracle-form" onSubmit={handleSubmit}>
              <div className="oracle-input-group">
                <label className="oracle-input-label" htmlFor="oracle-name">
                  {o.nameLabel || 'Enter your name, mortal...'}
                </label>
                <User size={18} className="oracle-input-icon" />
                <input
                  id="oracle-name"
                  type="text"
                  className="oracle-name-input"
                  placeholder={o.namePlaceholder || 'Your name...'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={60}
                  autoFocus
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                className="oracle-submit-btn"
                disabled={!name.trim()}
              >
                <Flame size={20} />
                <span>{o.divineButton || 'DIVINE MY FATE'}</span>
              </button>

              <p style={{
                textAlign: 'center',
                fontSize: '0.78rem',
                color: '#6b7280',
                margin: '4px 0 0 0',
                lineHeight: 1.4
              }}>
                {o.disclaimer || 'The Oracle sees past, present, and future — not all visions are bright...'}
              </p>
            </form>
          )}

          {view === 'loading' && (
            <div className="oracle-loading">
              <div className="oracle-fire-animation">
                <span>🔥</span>
              </div>
              <p className="oracle-loading-text">
                {o.loadingText || 'The sacred flames are reading your fate...'}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '8px' }}>
                {o.loadingHint || 'The Oracle gazes into the eternal fire...'}
              </p>
            </div>
          )}

          {view === 'result' && prophecy && (
            <div className="oracle-prophecy-result">
              <div className="oracle-scroll">
                <div className="oracle-scroll-header">
                  <span className="oracle-scroll-icon">📜</span>
                  <div>
                    <h3 className="oracle-scroll-title">
                      {o.prophecyTitle || 'THE PROPHECY'}
                    </h3>
                    <p className="oracle-scroll-name">
                      {o.prophecyFor || 'For'}: {name}
                    </p>
                  </div>
                </div>

                <div className="oracle-prophecy-text">
                  {prophecy}
                </div>
              </div>

              <div className="oracle-actions">
                <button
                  type="button"
                  className="oracle-again-btn"
                  onClick={handleNewProphecy}
                >
                  <RotateCcw size={16} />
                  <span>{o.anotherProphecy || 'Ask Again'}</span>
                </button>

                <button
                  type="button"
                  className="oracle-again-btn"
                  onClick={handleTryAgain}
                >
                  <User size={16} />
                  <span>{o.changeName || 'New Name'}</span>
                </button>

                <button
                  type="button"
                  className="oracle-close-bottom-btn"
                  onClick={onClose}
                >
                  {o.closeButton || 'Close'}
                </button>
              </div>
            </div>
          )}

          {view === 'error' && (
            <div>
              <div className="oracle-error">
                <p>⚠️ {error}</p>
              </div>
              <button
                type="button"
                className="oracle-again-btn"
                style={{ width: '100%' }}
                onClick={handleTryAgain}
              >
                <RotateCcw size={16} />
                <span>{o.tryAgain || 'Try Again'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
