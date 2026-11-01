let currentBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function requestWithFallback(endpoint, options = {}) {
  try {
    return await fetch(`${currentBaseUrl}${endpoint}`, options);
  } catch (err) {
    if (currentBaseUrl.includes('localhost')) {
      const altUrl = currentBaseUrl.replace('localhost', '127.0.0.1');
      try {
        const res = await fetch(`${altUrl}${endpoint}`, options);
        currentBaseUrl = altUrl;
        return res;
      } catch {
        throw err;
      }
    } else if (currentBaseUrl.includes('127.0.0.1')) {
      const altUrl = currentBaseUrl.replace('127.0.0.1', 'localhost');
      try {
        const res = await fetch(`${altUrl}${endpoint}`, options);
        currentBaseUrl = altUrl;
        return res;
      } catch {
        throw err;
      }
    }
    throw err;
  }
}

export async function fetchHealth() {
  try {
    const res = await requestWithFallback('/api/health');
    if (!res.ok) throw new Error(`Health check returned ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend health check failed:', err);
    return { status: 'offline', api_key_configured: false, model: 'unavailable' };
  }
}

export async function sendChatMessage(character, language, messages) {
  try {
    const res = await requestWithFallback('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        character,
        language,
        messages
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const detail = errorData.detail || `Server responded with status ${res.status}`;
      throw new Error(detail);
    }

    return await res.json();
  } catch (err) {
    console.error('Chat API request error:', err);
    throw err;
  }
}

export async function fetchCharacters() {
  try {
    const res = await requestWithFallback('/api/characters');
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Could not fetch characters from API, using fallback data:', e);
  }
  return null;
}

export async function fetchMythologyInfo() {
  try {
    const res = await requestWithFallback('/api/mythology-info');
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Could not fetch info from API, using fallback data:', e);
  }
  return null;
}

export async function sendOracleRequest(name, language) {
  try {
    const res = await requestWithFallback('/api/oracle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, language })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server responded with ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('Oracle API request error:', err);
    throw err;
  }
}
