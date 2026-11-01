import React from 'react';
import CharacterCard from './CharacterCard';
import { TRANSLATIONS } from '../../i18n/translations';

const DIVIDER_LABELS = {
  hy: '⛧ ԱՐԳԵԼՎԱԾ ԳՈՏԻ ⛧',
  ru: '⛧ ЗАПРЕТНАЯ ЗОНА ⛧',
  en: '⛧ FORBIDDEN REALM ⛧'
};

const LIGHT_CHARACTERS = ['vahagn', 'aramazd', 'anahit'];

export default function CharacterSelector({
  characters,
  selectedCharacterId,
  language,
  onSelectCharacter
}) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;
  const characterList = Object.values(characters);
  const lightChars = characterList.filter(c => LIGHT_CHARACTERS.includes(c.id));
  const darkChars = characterList.filter(c => !LIGHT_CHARACTERS.includes(c.id));

  return (
    <section id="characters-section" className="characters-section">
      <div className="section-header">
        <h2 className="section-title">{t.characters.sectionTitle}</h2>
        <p className="section-subtitle">{t.characters.sectionSubtitle}</p>
      </div>

      <div className="characters-grid">
        {lightChars.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            isActive={selectedCharacterId === char.id}
            language={language}
            onSelect={onSelectCharacter}
          />
        ))}

        {darkChars.length > 0 && (
          <div className="devil-divider">
            <div className="devil-divider-line" />
            <span className="devil-divider-label">
              {DIVIDER_LABELS[language] || DIVIDER_LABELS.ru}
            </span>
            <div className="devil-divider-line" />
          </div>
        )}

        {darkChars.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            isActive={selectedCharacterId === char.id}
            language={language}
            onSelect={onSelectCharacter}
          />
        ))}
      </div>
    </section>
  );
}
