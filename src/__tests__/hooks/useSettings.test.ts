import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSettingsStore } from '@/store/settingsStore';

describe('useSettingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      baseUrl: 'http://localhost:11434',
      model: '',
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      numCtx: 2048,
      systemPrompt: '',
      streamEnabled: false,
    });
  });

  it('updates model', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => result.current.setModel('llama3'));
    expect(result.current.model).toBe('llama3');
  });

  it('updates temperature', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => result.current.setTemperature(1.5));
    expect(result.current.temperature).toBe(1.5);
  });

  it('updates system prompt', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => result.current.setSystemPrompt('You are a pirate.'));
    expect(result.current.systemPrompt).toBe('You are a pirate.');
  });

  it('updates baseUrl', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => result.current.setBaseUrl('http://192.168.1.10:11434'));
    expect(result.current.baseUrl).toBe('http://192.168.1.10:11434');
  });
});
