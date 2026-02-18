// API Configuration for Apex Voice Solutions
// Set NEXT_PUBLIC_API_URL to your Railway backend URL

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// VAPI Configuration
export const VAPI_CONFIG = {
  agentId: process.env.NEXT_PUBLIC_VAPI_AGENT_ID || '4deec673-b116-45dd-9ceb-54057a18ebb2',
  phoneNumber: process.env.NEXT_PUBLIC_VAPI_PHONE || '+1 (386) 559-5733',
};

// Helper to make API calls
export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

// Auth helper
export function getAuthHeaders(token: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${token}`,
  };
}
