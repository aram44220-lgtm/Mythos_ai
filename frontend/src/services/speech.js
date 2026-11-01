

const LANG_MAP = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US'
};

export class SpeechService {
  constructor() {
    this.recognition = null;
    this.isRecognizing = false;
    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  static isRecognitionSupported() {
    return typeof window !== 'undefined' && Boolean(
      window.SpeechRecognition || window.webkitSpeechRecognition
    );
  }

  static isSynthesisSupported() {
    return typeof window !== 'undefined' && Boolean(window.speechSynthesis);
  }

  
  startListening({ language = 'hy', onResult, onError, onEnd }) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return null;
    }

    if (this.recognition && this.isRecognizing) {
      this.recognition.abort();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = LANG_MAP[language] || 'hy-AM';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      this.isRecognizing = true;
    };

    recognition.onresult = (event) => {
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      this.isRecognizing = false;
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      this.isRecognizing = false;
      if (onEnd) onEnd();
    };

    try {
      recognition.start();
      this.recognition = recognition;
      return recognition;
    } catch (e) {
      console.error('Failed to start speech recognition:', e);
      if (onError) onError(e.message);
      return null;
    }
  }

  
  stopListening() {
    if (this.recognition && this.isRecognizing) {
      try {
        this.recognition.stop();
      } catch (e) {
      }
      this.isRecognizing = false;
    }
  }

  
  speakText(text, language = 'hy', { onStart, onEnd, onError } = {}) {
    if (!this.synthesis) {
      if (onError) onError('Speech synthesis is not supported in this browser.');
      return;
    }

    this.stopSpeaking();

    const cleanText = text
      .replace(/[*_#`~>]/g, '')
      .replace(/ℹ️|⚠️|❌|⏳|⏱️/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = LANG_MAP[language] || 'hy-AM';
    utterance.rate = 0.95;
    utterance.pitch = 0.95;

    const voices = this.synthesis.getVoices();
    const targetLang = (LANG_MAP[language] || 'hy').toLowerCase();
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLang.substring(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  
  stopSpeaking() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
    }
    this.currentUtterance = null;
  }
}

export const speechService = new SpeechService();
