// NOTE: This is a simplified client-side implementation. In a real-world application,
// fetching YouTube transcripts should be done on a server to avoid CORS issues and to handle
// API keys securely. This utility is for demonstration purposes.

export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url.trim());
    if (u.hostname === 'youtu.be') {
        // For youtu.be/<id>
        return u.pathname.slice(1).split('?')[0];
    }
    if (u.hostname.endsWith('youtube.com')) {
      // For youtube.com/watch?v=<id>
      const vParam = u.searchParams.get('v');
      if (vParam) return vParam;
      
      // For youtube.com/shorts/<id>
      const parts = u.pathname.split('/');
      const shortsIndex = parts.findIndex(p => p === 'shorts');
      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return parts[shortsIndex + 1];
      }
    }
  } catch (e) {
    // Invalid URL format
    return null;
  }
  return null;
}


export const extractTextFromUrl = async (url: string): Promise<string> => {
    const videoId = getYouTubeId(url);
    if (!videoId) {
        throw new Error("Invalid or unsupported YouTube URL provided.");
    }
    
    // In a real application, you would use an API to fetch the transcript.
    // For this demo, we return placeholder text.
    console.warn(`[DEMO] Simulating transcript fetch for video ID: ${videoId}. A real implementation would require a backend service.`);
    
    return `This is a placeholder for the transcript of YouTube video ${videoId}. 
    The video discusses advanced concepts in quantum physics, including superposition and entanglement. 
    It explains how these principles are being applied to develop quantum computers, which have the 
    potential to solve problems that are currently intractable for classical computers. Key figures 
    like Schrödinger and Einstein are mentioned in the context of their contributions and thought experiments.`;
};
