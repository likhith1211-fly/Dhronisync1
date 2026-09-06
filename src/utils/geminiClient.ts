export interface GeminiRequestOptions {
  prompt: string;
  context?: {
    subject?: string;
    module?: string;
    topic?: string;
    subtopic?: string;
    mode?: 'explain' | 'beginner' | 'formulas' | 'quiz' | 'practice' | 'viva' | 'doubt' | 'study_plan' | 'mistake' | 'chat';
  };
}

export interface GeminiResponse {
  text: string;
  success: boolean;
  isFallback?: boolean;
  error?: string;
}

export async function askGemini(options: GeminiRequestOptions): Promise<GeminiResponse> {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        text:
          data?.text ||
          `The AI Assistant is currently experiencing high demand. Please try again in a moment.`,
        error: data?.error || `Server status ${res.status}`,
      };
    }

    if (data && typeof data.text === 'string') {
      return data;
    }

    return {
      success: false,
      text: 'Unable to retrieve answer from AI service. Please try again.',
      error: 'Empty response',
    };
  } catch (err: any) {
    console.warn('Gemini request failed gracefully:', err?.message || err);
    return {
      success: false,
      text: `The AI Assistant is momentarily unavailable. Please try again shortly.`,
      error: err?.message || 'Network error',
    };
  }
}
