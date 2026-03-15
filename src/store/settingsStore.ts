import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatSettings } from '@/types';

interface SettingsState extends ChatSettings {
  setBaseUrl: (v: string) => void;
  setModel: (v: string) => void;
  setTemperature: (v: number) => void;
  setTopP: (v: number) => void;
  setTopK: (v: number) => void;
  setNumCtx: (v: number) => void;
  setSystemPrompt: (v: string) => void;
  setStreamEnabled: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      baseUrl: 'http://localhost:11434',
      model: '',
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      numCtx: 2048,
      systemPrompt: '',
      streamEnabled: false,
      setBaseUrl: (v) => set({ baseUrl: v }),
      setModel: (v) => set({ model: v }),
      setTemperature: (v) => set({ temperature: v }),
      setTopP: (v) => set({ topP: v }),
      setTopK: (v) => set({ topK: v }),
      setNumCtx: (v) => set({ numCtx: v }),
      setSystemPrompt: (v) => set({ systemPrompt: v }),
      setStreamEnabled: (v) => set({ streamEnabled: v }),
    }),
    { name: 'ollama-settings' },
  ),
);
