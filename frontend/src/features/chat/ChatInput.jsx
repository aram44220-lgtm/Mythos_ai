import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, AlertCircle } from 'lucide-react';
import { speechService } from '../../services/speech';
import { TRANSLATIONS } from '../../i18n/translations';

export default function ChatInput({
  onSendMessage,
  disabled,
  language
}) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechNotice, setSpeechNotice] = useState('');
  const textareaRef = useRef(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [text]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleSpeechRecognition = () => {
    setSpeechNotice('');
    if (!SpeechService.isRecognitionSupported()) {
      setSpeechNotice(t.chat.speechUnsupported);
      setTimeout(() => setSpeechNotice(''), 4500);
      return;
    }

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.startListening({
        language,
        onResult: (transcript) => {
          setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        },
        onError: (err) => {
          console.warn('Speech recognition error:', err);
          setIsListening(false);
          if (err === 'not-allowed') {
            setSpeechNotice('Microphone access denied. Please allow microphone permissions.');
          } else {
            setSpeechNotice(t.chat.speechUnsupported);
          }
          setTimeout(() => setSpeechNotice(''), 4500);
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
    }
  };

  return (
    <div className="chat-input-area">
      {speechNotice && (
        <div 
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '1.5rem',
            right: '1.5rem',
            marginBottom: '0.5rem',
            background: 'rgba(239, 83, 80, 0.9)',
            color: '#fff',
            padding: '0.5rem 0.85rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            zIndex: 10
          }}
        >
          <AlertCircle size={15} />
          <span>{speechNotice}</span>
        </div>
      )}

      <div className="chat-input-wrapper">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? t.chat.listening : t.chat.inputPlaceholder}
          disabled={disabled}
          className="chat-textarea"
        />

        <button
          type="button"
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleSpeechRecognition}
          title={isListening ? t.chat.stopVoice : t.chat.startVoice}
          aria-label={isListening ? t.chat.stopVoice : t.chat.startVoice}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      </div>

      <button
        type="button"
        className="send-btn"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        title={t.chat.send}
      >
        <Send size={18} />
        <span style={{ fontSize: '0.9rem' }}>{t.chat.send}</span>
      </button>
    </div>
  );
}

class SpeechService {
  static isRecognitionSupported() {
    return typeof window !== 'undefined' && Boolean(
      window.SpeechRecognition || window.webkitSpeechRecognition
    );
  }
}
