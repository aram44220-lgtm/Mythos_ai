import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  Scroll, 
  Share2, 
  Check 
} from 'lucide-react';
import { ENCYCLOPEDIA_CATEGORIES, ENCYCLOPEDIA_ARTICLES } from '../../features/data/encyclopediaData';
import { TRANSLATIONS } from '../../i18n/translations';
import '../../styles/encyclopedia.css';

const INFOBOX_LABELS = {
  attributes: { hy: 'Հատկանիշներ', ru: 'Атрибуты и функции', en: 'Attributes & Role' },
  cultCenter: { hy: 'Գլխավոր Մեհյան', ru: 'Главное святилище', en: 'Cult Center' },
  sacredAnimal: { hy: 'Սրբազան Կենդանի', ru: 'Священное животное', en: 'Sacred Animal' },
  symbol: { hy: 'Խորհրդանիշ', ru: 'Священный символ', en: 'Sacred Symbol' },
  family: { hy: 'Առնչություններ / Ծնունդ', ru: 'Родство и семья', en: 'Family & Kinship' },
  nature: { hy: 'Էություն / Բնույթ', ru: 'Сущность и природа', en: 'Nature & Essence' },
  locations: { hy: 'Հայտնաբերման Վայրեր', ru: 'Места обнаружения', en: 'Discovery Sites' },
  stoneType: { hy: 'Կոթողների Տեսակ', ru: 'Тип памятников', en: 'Monument Type' },
  adversary: { hy: 'Գլխավոր Հակառակորդ', ru: 'Главный противник', en: 'Chief Adversary' },
  appearance: { hy: 'Արտաքին Տեսք', ru: 'Внешний облик', en: 'Appearance' },
  associatedLegend: { hy: 'Հայտնի Ավանդազրույց', ru: 'Связанная легенда', en: 'Key Legend' },
  power: { hy: 'Կախարդական Ուժ', ru: 'Мистическая сила', en: 'Mystic Power' },
  origin: { hy: 'Ծագում', ru: 'Происхождение', en: 'Origin' },
  architecture: { hy: 'Ճարտարապետություն', ru: 'Архитектурный стиль', en: 'Architecture' },
  deity: { hy: 'Նվիրված Դիցին', ru: 'Посвящение божеству', en: 'Dedicated Deity' },
  location: { hy: 'Տեղակայում', ru: 'Местоположение', en: 'Location' },
  features: { hy: 'Առանձնահատկություններ', ru: 'Особенности', en: 'Key Features' },
  deities: { hy: 'Պաշտված Դիցեր', ru: 'Почитаемые божества', en: 'Worshipped Deities' },
  region: { hy: 'Պատմական Գավառ', ru: 'Историческая область', en: 'Historical Region' },
  river: { hy: 'Գետային Հովիտ', ru: 'Речная долина', en: 'River Valley' },
  significance: { hy: 'Նշանակություն', ru: 'Значение', en: 'Significance' },
  supremeGod: { hy: 'Գերագույն Աստված', ru: 'Верховный бог', en: 'Supreme God' },
  stormGod: { hy: 'Ամպրոպի Աստված', ru: 'Бог бури и войны', en: 'Storm God' },
  sunGod: { hy: 'Արևի Աստված', ru: 'Бог солнца', en: 'Sun God' },
  inscription: { hy: 'Սեպագիր Արձանագրություն', ru: 'Клинописный памятник', en: 'Cuneiform Inscription' },
  magnumOpus: { hy: 'Գլխավոր Երկ', ru: 'Главный труд', en: 'Magnum Opus' },
  titleName: { hy: 'Պատվավոր Տիտղոս', ru: 'Почетный титул', en: 'Honorary Title' },
  teachers: { hy: 'Ուսուցիչներ', ru: 'Учителя', en: 'Teachers' },
  preservedMyths: { hy: 'Փրկված Առասպելներ', ru: 'Спасенные мифы', en: 'Preserved Myths' }
};

export default function InfoModal({ isOpen, onClose, language = 'hy' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.hy;
  const encT = t.encyclopedia || {
    title: 'ՀԱՅՈՑ ԴԻՑԱՐԱՆԻ ՀԱՆՐԱԳԻՏԱՐԱՆ',
    subtitle: 'Ակադեմիական և առասպելաբանական ամբողջական տեղեկատու',
    searchPlaceholder: 'Որոնել աստվածություն, վայր, էակ, ավանդազրույց...',
    allArticles: 'Բոլոր հոդվածները',
    articlesFound: 'հոդված',
    noResults: 'Ոչինչ չի գտնվել որոնմանը համապատասխան',
    readArticle: 'Կարդալ ամբողջությամբ',
    backToList: '← Վերադառնալ ցանկին',
    quickFacts: 'Համառոտ Տեղեկանք',
    historicalEra: 'Պատմական Դարաշրջան',
    academicSources: 'Պատմական Սկզբնաղբյուրներ',
    close: 'Փակել'
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeArticleId) {
          setActiveArticleId(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeArticleId, onClose]);

  useEffect(() => {
    if (isOpen) {
      setCopiedLink(false);
    }
  }, [isOpen]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ENCYCLOPEDIA_ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      const title = (article.title[language] || article.title.hy || '').toLowerCase();
      const subtitle = (article.subtitle[language] || article.subtitle.hy || '').toLowerCase();
      const summary = (article.summary[language] || article.summary.hy || '').toLowerCase();
      const era = (article.era[language] || article.era.hy || '').toLowerCase();

      return title.includes(q) || subtitle.includes(q) || summary.includes(q) || era.includes(q);
    });
  }, [selectedCategory, searchQuery, language]);

  const activeArticle = useMemo(() => {
    if (!activeArticleId) return null;
    return ENCYCLOPEDIA_ARTICLES.find((a) => a.id === activeArticleId) || null;
  }, [activeArticleId]);

  const currentArticleIndex = useMemo(() => {
    if (!activeArticleId) return -1;
    return ENCYCLOPEDIA_ARTICLES.findIndex((a) => a.id === activeArticleId);
  }, [activeArticleId]);

  const prevArticle = currentArticleIndex > 0 ? ENCYCLOPEDIA_ARTICLES[currentArticleIndex - 1] : null;
  const nextArticle = currentArticleIndex >= 0 && currentArticleIndex < ENCYCLOPEDIA_ARTICLES.length - 1 
    ? ENCYCLOPEDIA_ARTICLES[currentArticleIndex + 1] 
    : null;

  const categoryCounts = useMemo(() => {
    const counts = { all: ENCYCLOPEDIA_ARTICLES.length };
    ENCYCLOPEDIA_CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = ENCYCLOPEDIA_ARTICLES.filter((a) => a.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  if (!isOpen) return null;

  const renderFormattedParagraph = (paragraphText, idx) => {
    const lines = paragraphText.split('\n');
    return (
      <div key={idx} className="enc-article-p">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('>')) {
            const quoteContent = trimmed.replace(/^>\s*/, '').replace(/^\*|\*$/g, '');
            return (
              <blockquote key={lIdx}>
                {quoteContent}
              </blockquote>
            );
          }

          const headingMatch = trimmed.match(/^\*\*(.*?)\*\*(?::)?\s*(.*)$/);
          if (headingMatch) {
            return (
              <div key={lIdx} style={{ marginBottom: '6px' }}>
                <strong>{headingMatch[1]}</strong>
                {headingMatch[2] && <span>{headingMatch[2]}</span>}
              </div>
            );
          }

          return (
            <p key={lIdx} style={{ margin: '4px 0' }}>
              {trimmed}
            </p>
          );
        })}
      </div>
    );
  };

  const handleCopyQuote = (quoteText) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(quoteText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="encyclopedia-overlay" onClick={onClose}>
      <div 
        className="encyclopedia-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={encT.title}
      >
        <header className="encyclopedia-header">
          <div className="enc-header-brand">
            <div className="enc-solar-icon">
              <BookOpen size={20} color="#ffd700" />
            </div>
            <div>
              <h2 className="enc-title">{encT.title}</h2>
              <p className="enc-subtitle">{encT.subtitle}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ 
              fontSize: '0.78rem', 
              color: '#d4af37', 
              background: 'rgba(212, 175, 55, 0.12)', 
              padding: '4px 10px', 
              borderRadius: '12px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              fontWeight: 600
            }}>
              {ENCYCLOPEDIA_ARTICLES.length} {encT.articlesFound}
            </span>

            <button 
              type="button" 
              className="enc-close-btn" 
              onClick={onClose}
              aria-label={encT.close}
              title={encT.close}
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {!activeArticle && (
          <div className="encyclopedia-controls">
            <div className="enc-search-box">
              <Search size={18} className="enc-search-icon" />
              <input 
                type="text"
                className="enc-search-input"
                placeholder={encT.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="enc-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="enc-categories-row" role="tablist">
              {ENCYCLOPEDIA_CATEGORIES.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const label = cat.label[language] || cat.label.hy;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`enc-cat-pill ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span>{label}</span>
                    <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <main className="encyclopedia-body" id="encyclopedia-scroll-body">
          {!activeArticle && (
            <>
              {filteredArticles.length === 0 ? (
                <div className="enc-empty-state">
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                  <p style={{ fontWeight: 600, color: '#f3f4f6', marginBottom: '8px' }}>
                    {encT.noResults}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '16px' }}>
                    {language === 'hy' 
                      ? 'Փորձեք փնտրել այլ բառերով կամ ընտրեք «Բոլորը» բաժինը։' 
                      : language === 'ru' 
                      ? 'Попробуйте изменить запрос или выберите вкладку «Все статьи».' 
                      : 'Try different keywords or switch to the "All Articles" category.'}
                  </p>
                  <button
                    type="button"
                    className="enc-cat-pill active"
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  >
                    {language === 'hy' ? 'Վերականգնել Որոնումը' : language === 'ru' ? 'Сбросить поиск' : 'Reset Search'}
                  </button>
                </div>
              ) : (
                <div className="enc-articles-grid">
                  {filteredArticles.map((article) => {
                    const title = article.title[language] || article.title.hy;
                    const subtitle = article.subtitle[language] || article.subtitle.hy;
                    const summary = article.summary[language] || article.summary.hy;
                    const era = article.era[language] || article.era.hy;

                    return (
                      <article 
                        key={article.id} 
                        className="enc-card"
                        onClick={() => {
                          setActiveArticleId(article.id);
                          const body = document.getElementById('encyclopedia-scroll-body');
                          if (body) body.scrollTop = 0;
                        }}
                      >
                        <div>
                          <div className="enc-card-top">
                            <span className="enc-card-icon">{article.icon}</span>
                            <span className="enc-card-era">{era}</span>
                          </div>

                          <h3 className="enc-card-title">{title}</h3>
                          <div className="enc-card-sub">{subtitle}</div>
                          <p className="enc-card-summary">{summary}</p>
                        </div>

                        <div className="enc-card-footer">
                          <span>{encT.readArticle}</span>
                          <ChevronRight size={16} />
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {activeArticle && (
            <div className="enc-detail-view">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <button 
                  type="button" 
                  className="enc-back-btn"
                  onClick={() => setActiveArticleId(null)}
                >
                  <ArrowLeft size={16} />
                  <span>{encT.backToList}</span>
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {prevArticle && (
                    <button
                      type="button"
                      className="enc-cat-pill"
                      style={{ padding: '6px 12px' }}
                      onClick={() => {
                        setActiveArticleId(prevArticle.id);
                        const body = document.getElementById('encyclopedia-scroll-body');
                        if (body) body.scrollTop = 0;
                      }}
                      title={prevArticle.title[language] || prevArticle.title.hy}
                    >
                      <span>← {prevArticle.icon} {prevArticle.title[language] || prevArticle.title.hy}</span>
                    </button>
                  )}
                  {nextArticle && (
                    <button
                      type="button"
                      className="enc-cat-pill"
                      style={{ padding: '6px 12px' }}
                      onClick={() => {
                        setActiveArticleId(nextArticle.id);
                        const body = document.getElementById('encyclopedia-scroll-body');
                        if (body) body.scrollTop = 0;
                      }}
                      title={nextArticle.title[language] || nextArticle.title.hy}
                    >
                      <span>{nextArticle.icon} {nextArticle.title[language] || nextArticle.title.hy} →</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="enc-detail-hero">
                <h1 className="enc-detail-title">
                  <span>{activeArticle.icon}</span>
                  <span>{activeArticle.title[language] || activeArticle.title.hy}</span>
                </h1>
                <p className="enc-detail-sub">
                  {activeArticle.subtitle[language] || activeArticle.subtitle.hy}
                </p>
                <div className="enc-detail-era-badge">
                  <span style={{ color: '#ffd700', marginRight: '6px' }}>⏳</span>
                  <span>{encT.historicalEra}: </span>
                  <strong>{activeArticle.era[language] || activeArticle.era.hy}</strong>
                </div>
              </div>

              <div className="enc-detail-columns">
                <div className="enc-detail-text-col">
                  <div style={{
                    background: 'rgba(212, 175, 55, 0.08)',
                    borderLeft: '4px solid #ffd700',
                    padding: '16px 20px',
                    borderRadius: '0 10px 10px 0',
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: '#f9fafb'
                  }}>
                    {activeArticle.summary[language] || activeArticle.summary.hy}
                  </div>

                  {((activeArticle.content && activeArticle.content[language]) || activeArticle.content?.hy || []).map((paragraphText, idx) => 
                    renderFormattedParagraph(paragraphText, idx)
                  )}

                  <div style={{
                    marginTop: '12px',
                    background: 'rgba(18, 14, 26, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '12px',
                    padding: '18px 22px'
                  }}>
                    <h4 style={{ 
                      fontSize: '0.95rem', 
                      color: '#ffd700', 
                      margin: '0 0 10px 0', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px' 
                    }}>
                      <Scroll size={16} color="#ffd700" />
                      <span>{encT.academicSources}</span>
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#9ca3af', fontSize: '0.86rem', lineHeight: 1.6 }}>
                      <li>Մովսես Խորենացի, «Հայոց Պատմություն» (Պատմահայր, V դար)</li>
                      <li>Ագաթանգեղոս, «Հայոց Պատմություն» (Գրիգոր Լուսավորչի և Տրդատ Գ-ի դարաշրջան)</li>
                      <li>Փավստոս Բուզանդ, «Հայոց Պատմություն» (IV դար)</li>
                      <li>Մհերի Դռան ուրարտական սեպագիր արձանագրություն (Իշպուինի և Մենուա արքաներ)</li>
                      <li>Գևորգ Էմին, Ղևոնդ Ալիշան («Հին հաւատք կամ հեթանոսական կրօնք հայոց»)</li>
                    </ul>
                  </div>
                </div>

                <aside className="enc-infobox" aria-label={encT.quickFacts}>
                  <div className="enc-infobox-header">
                    ✦ {encT.quickFacts.toUpperCase()} ✦
                  </div>

                  <div 
                    className="enc-infobox-image-wrap"
                    style={{
                      backgroundImage: `url('${activeArticle.image}')`,
                      backgroundColor: '#151022'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 11, 20, 0.95) 0%, rgba(14, 11, 20, 0.1) 60%)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '12px'
                    }}>
                      <span style={{ 
                        fontWeight: 700, 
                        color: '#fff', 
                        fontSize: '1rem',
                        textShadow: '0 2px 6px rgba(0,0,0,0.9)'
                      }}>
                        {activeArticle.title[language] || activeArticle.title.hy}
                      </span>
                    </div>
                  </div>

                  {activeArticle.infobox && (activeArticle.infobox[language] || activeArticle.infobox.hy) && (
                    <table className="enc-infobox-table">
                      <tbody>
                        {Object.entries(activeArticle.infobox[language] || activeArticle.infobox.hy).map(([key, value]) => {
                          const label = (INFOBOX_LABELS[key] && INFOBOX_LABELS[key][language]) 
                            || (INFOBOX_LABELS[key] && INFOBOX_LABELS[key].hy) 
                            || key;

                          return (
                            <tr key={key}>
                              <th>{label}</th>
                              <td>{value}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}

                  {activeArticle.quote && (activeArticle.quote[language] || activeArticle.quote.hy) && (
                    <div style={{ padding: '14px', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                      <div className="enc-quote-box">
                        <div style={{ fontSize: '1.2rem', lineHeight: 1, marginBottom: '4px' }}>❝</div>
                        <div>{activeArticle.quote[language] || activeArticle.quote.hy}</div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleCopyQuote(activeArticle.quote[language] || activeArticle.quote.hy)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#fbbf24',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.75rem',
                              opacity: 0.8
                            }}
                            title="Copy Quote"
                          >
                            {copiedLink ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
                            <span>{copiedLink ? (language === 'hy' ? 'Պատճենված է' : language === 'ru' ? 'Скопировано' : 'Copied') : (language === 'hy' ? 'Պատճենել' : language === 'ru' ? 'Копировать' : 'Copy')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </aside>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(212, 175, 55, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  type="button" 
                  className="enc-back-btn"
                  onClick={() => {
                    setActiveArticleId(null);
                    const body = document.getElementById('encyclopedia-scroll-body');
                    if (body) body.scrollTop = 0;
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>{encT.backToList}</span>
                </button>

                <button
                  type="button"
                  className="enc-close-btn"
                  onClick={onClose}
                  style={{ width: 'auto', padding: '0 16px', borderRadius: '8px', fontSize: '0.85rem' }}
                >
                  {encT.close}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
