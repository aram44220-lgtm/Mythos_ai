import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CharacterSelector from './features/characters/CharacterSelector';
import ChatWindow from './features/chat/ChatWindow';
import InfoModal from './components/Modals/InfoModal';
import OracleModal from './components/Modals/OracleModal';
import { TRANSLATIONS } from './i18n/translations';
import { templeAudioService } from './services/audio';
import {
  fetchHealth,
  sendChatMessage,
  fetchCharacters,
  fetchMythologyInfo
} from './services/api';
import {
  DEFAULT_CHARACTERS,
  DEFAULT_INFO
} from './features/data/defaultData';
import GameCenter from './features/games/GameCenter';

export default function App() {
  const [showGame, setShowGame] = useState(false);
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('mythology_ai_lang');
      return saved && ['hy', 'ru', 'en'].includes(saved) ? saved : 'hy';
    } catch {
      return 'hy';
    }
  });

  const [selectedCharacterId, setSelectedCharacterId] = useState('vahagn');
  const [charactersData, setCharactersData] = useState(DEFAULT_CHARACTERS);
  const [mythologyInfo, setMythologyInfo] = useState(DEFAULT_INFO);

  const [conversations, setConversations] = useState(() => {
    const initial = {};
    Object.keys(DEFAULT_CHARACTERS).forEach((charId) => {
      const char = DEFAULT_CHARACTERS[charId];
      initial[charId] = [
        {
          role: 'assistant',
          content: char.greeting[language] || char.greeting.hy,
          timestamp: new Date().toISOString()
        }
      ];
    });
    return initial;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isOracleOpen, setIsOracleOpen] = useState(false);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('mythology_ai_lang', newLang);
    } catch (e) {
    }
    templeAudioService.playChime();
  };

  useEffect(() => {
    setConversations((prev) => {
      const updated = { ...prev };
      Object.keys(charactersData).forEach((charId) => {
        const char = charactersData[charId];
        const history = updated[charId] || [];
        if (history.length === 1 && history[0].role === 'assistant') {
          updated[charId] = [
            {
              role: 'assistant',
              content: char.greeting[language] || char.greeting.hy,
              timestamp: history[0].timestamp
            }
          ];
        }
      });
      return updated;
    });
  }, [language, charactersData]);

  useEffect(() => {
    async function initData() {
      const [chars, info] = await Promise.all([
        fetchCharacters(),
        fetchMythologyInfo()
      ]);
      if (chars) setCharactersData(chars);
      if (info) setMythologyInfo(info);
    }
    initData();
  }, []);

  const handleToggleAudio = () => {
    const newState = templeAudioService.toggle();
    setIsAudioPlaying(newState);
  };

  const handleSelectCharacter = (charId) => {
    setSelectedCharacterId(charId);
    if (charId === 'devil') {
      templeAudioService.playDevilChime();
    } else {
      templeAudioService.playChime();
    }
    const chatEl = document.getElementById('chat-section');
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleStartJourney = () => {
    const el = document.getElementById('characters-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const currentHistory = conversations[selectedCharacterId] || [];
    const newUserMsg = {
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...currentHistory, newUserMsg];

    setConversations((prev) => ({
      ...prev,
      [selectedCharacterId]: updatedHistory
    }));

    setIsLoading(true);

    try {
      const apiMessages = updatedHistory.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await sendChatMessage(selectedCharacterId, language, apiMessages);

      const assistantMsg = {
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toISOString()
      };

      setConversations((prev) => ({
        ...prev,
        [selectedCharacterId]: [...prev[selectedCharacterId], assistantMsg]
      }));
    } catch (err) {
      console.error('Chat error:', err);
      const errorReply = {
        role: 'assistant',
        content: language === 'hy'
          ? `⚠️ Չհաջողվեց կապ հաստատել սերվերի հետ։ (${err.message})`
          : language === 'ru'
            ? `⚠️ Не удалось связаться с сервером. (${err.message})`
            : `⚠️ Failed to connect to server. (${err.message})`,
        timestamp: new Date().toISOString()
      };

      setConversations((prev) => ({
        ...prev,
        [selectedCharacterId]: [...prev[selectedCharacterId], errorReply]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const char = charactersData[selectedCharacterId] || DEFAULT_CHARACTERS[selectedCharacterId];
    setConversations((prev) => ({
      ...prev,
      [selectedCharacterId]: [
        {
          role: 'assistant',
          content: char.greeting[language] || char.greeting.hy,
          timestamp: new Date().toISOString()
        }
      ]
    }));
  };

  const activeCharacter = charactersData[selectedCharacterId] || DEFAULT_CHARACTERS.vahagn;
  const currentMessages = conversations[selectedCharacterId] || [];
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;

  if (showGame) {
    return (
      <GameCenter
        language={language}
        onLanguageChange={handleLanguageChange}
        onClose={() => setShowGame(false)}
      />
    );
  }

  return (
    <div className="app-root">
      <div className="celestial-background" />

      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenInfo={() => setIsInfoOpen(true)}
        onOpenOracle={() => setIsOracleOpen(true)}
        onOpenGame={() => setShowGame(true)}
      />

      <Hero
        language={language}
        onStartJourney={handleStartJourney}
        onExplorePantheon={() => setIsInfoOpen(true)}
        onOpenGame={() => setShowGame(true)}
      />

      <main className="main-wrapper">
        <CharacterSelector
          characters={charactersData}
          selectedCharacterId={selectedCharacterId}
          language={language}
          onSelectCharacter={handleSelectCharacter}
        />

        <ChatWindow
          character={activeCharacter}
          messages={currentMessages}
          isLoading={isLoading}
          language={language}
          onSendMessage={handleSendMessage}
          onClearChat={handleClearChat}
        />
      </main>

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        language={language}
        infoData={mythologyInfo}
      />

      <OracleModal
        isOpen={isOracleOpen}
        onClose={() => setIsOracleOpen(false)}
        language={language}
      />

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">{t.footer.text}</p>

          <div className="creators-section">
            <div className="creators-header">
              <span className="creators-decor">❖</span>
              <span className="creators-title">{t.footer.creatorsTitle}</span>
              <span className="creators-decor">❖</span>
            </div>

            <div className="creators-grid">
              {t.footer.creators?.map((creator, idx) => (
                <div key={idx} className="creator-card">
                  <div className="creator-avatar-ring">
                    <span className="creator-initial">
                      {creator.split(' ')[0][0]}
                    </span>
                  </div>
                  <span className="creator-name">{creator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
