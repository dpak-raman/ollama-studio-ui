import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  settingsDrawerOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (v: boolean) => void;
  toggleSettingsDrawer: () => void;
  setSettingsDrawerOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  settingsDrawerOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  toggleSettingsDrawer: () => set((s) => ({ settingsDrawerOpen: !s.settingsDrawerOpen })),
  setSettingsDrawerOpen: (v) => set({ settingsDrawerOpen: v }),
}));
