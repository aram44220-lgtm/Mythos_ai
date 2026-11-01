import React, { useRef, useEffect, useState } from 'react';
import { Trash2, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import { TRANSLATIONS } from '../../i18n/translations';

export default function ChatWindow({
  character,
  messages,
  isLoading,
  language,
  onSendMessage,
  onClearChat
}) {
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isInitialMount = useRef(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;

  const scrollToBottom = (behavior = 'smooth') => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior
      });
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom('smooth');
  }, [messages, isLoading]);

  const charName = character.name[language] || character.name.hy;
  const charTitle = character.title[language] || character.title.hy;

  const windowStyle = {
    '--active-accent': character.accent_color,
    '--active-glow': `${character.accent_color}55`
  };

  return (
    <section
      id="chat-section"
      className={`chat-section ${character.id === 'devil' ? 'devil-mode' : ''}`}
      style={windowStyle}
    >
      <div className="chat-header">
        <div className="chat-deity-info">
          <img 
            src={character.avatar_image} 
            alt={charName} 
            className="chat-deity-avatar"
          />
          <div className="chat-deity-text">
            <h3>{charName}</h3>
            <div className="chat-status">
              <span className="status-dot" />
              <span>{t.characters.activeStatus}</span>
              <span style={{ color: 'var(--text-subtle)', marginLeft: '0.4rem' }}>
                • {charTitle}
              </span>
            </div>
          </div>
        </div>

        <div className="chat-header-actions">
          {showClearConfirm ? (
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <button
                type="button"
                className="chat-action-btn"
                onClick={() => {
                  onClearChat();
                  setShowClearConfirm(false);
                }}
                style={{ borderColor: '#ef5350', color: '#ff6b6b' }}
              >
                {t.chat.confirm}
              </button>
              <button
                type="button"
                className="chat-action-btn"
                onClick={() => setShowClearConfirm(false)}
              >
                {t.chat.cancel}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="chat-action-btn"
              onClick={() => setShowClearConfirm(true)}
              title={t.chat.clearChat}
            >
              <Trash2 size={14} />
              <span>{t.chat.clearChat}</span>
            </button>
          )}
        </div>
      </div>

      <div className="chat-messages" ref={messagesContainerRef}>
        <div className="chat-disclaimer">
          {character.id === 'devil'
            ? (language === 'hy'
                ? '⚠️ Դուք մտնում եք արգելված գիտելիքի ոլորտ։ Ոչ մի հարց արգելված չէ, ոչ մի ճշմարտություն՝ ծածկված։'
                : language === 'ru'
                ? '⚠️ Вы входите в зону запретного знания. Здесь нет цензуры и запретных тем.'
                : '⚠️ You enter the realm of forbidden knowledge. No question is off-limits, no truth is hidden.')
            : t.chat.disclaimer
          }
        </div>

        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg}
            character={character}
            language={language}
          />
        ))}

        {isLoading && (
          <div className="thinking-indicator">
            <Sparkles size={16} className="sparkle-icon" />
            <span>
              {character.id === 'devil'
                ? (language === 'hy' ? '🔥 Տիրակալը ձեր հոգու խորքերն է զննում...'
                  : language === 'ru' ? '🔥 Владыка бездны вникает в суть вашего вопроса...'
                  : '🔥 The Lord of the Abyss peers into your soul...')
                : t.chat.thinking
              }
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <SuggestedQuestions
        character={character}
        language={language}
        onSelectQuestion={onSendMessage}
        disabled={isLoading}
      />

      <ChatInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
        language={language}
      />
    </section>
  );
}
