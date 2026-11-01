import React, { useState } from 'react';
import { Volume2, VolumeX, User } from 'lucide-react';
import { speechService } from '../../services/speech';
import { TRANSLATIONS } from '../../i18n/translations';

export default function ChatMessage({ message, character, language }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;
  const isUser = message.role === 'user';

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      speechService.speakText(message.content, language, {
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    }
  };

  return (
    <div className={`message-row ${message.role}`}>
      {/* Avatar */}
      {isUser ? (
        <div className="user-avatar-placeholder" title="You">
          <User size={18} />
        </div>
      ) : (
        <img 
          src={character.avatar_image} 
          alt={character.name[language] || character.name.hy} 
          className="message-avatar"
        />
      )}

      {/* Bubble */}
      <div className="message-bubble">
        <div className="message-text" style={{ whiteSpace: 'pre-wrap' }}>
          {message.content}
        </div>

        {/* TTS controls for AI messages */}
        {!isUser && (
          <div className="message-meta">
            <button
              type="button"
              className={`tts-btn ${isSpeaking ? 'speaking' : ''}`}
              onClick={handleToggleSpeak}
              title={isSpeaking ? t.chat.stopSpeaking : t.chat.speakMessage}
            >
              {isSpeaking ? (
                <>
                  <VolumeX size={14} />
                  <span>{t.chat.stopSpeaking}</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>{t.chat.speakMessage}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
