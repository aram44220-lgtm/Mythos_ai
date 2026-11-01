import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../../i18n/translations';

export default function SuggestedQuestions({ character, language, onSelectQuestion, disabled }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;
  const questions = (character.suggested_questions && character.suggested_questions[language]) 
    || character.suggested_questions?.hy 
    || [];

  if (!questions || questions.length === 0) return null;

  return (
    <div className="suggested-questions-box">
      <div className="suggested-label">
        <Sparkles size={13} color="#ffd700" />
        <span>{t.chat.suggestedQuestionsTitle}</span>
      </div>
      <div className="suggested-chips">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            className="suggested-chip"
            onClick={() => onSelectQuestion(q)}
            disabled={disabled}
            title={q}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
