import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification, ThemeSettings } from '../../types';

interface UiState {
  theme: ThemeSettings;
  sidebarOpen: boolean;
  notifications: Notification[];
  loading: boolean;
}

const initialState: UiState = {
  theme: {
    mode: 'light',
    direction: 'rtl', // Default to RTL for Persian
  },
  sidebarOpen: true,
  notifications: [],
  loading: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.theme.mode = state.theme.mode === 'light' ? 'dark' : 'light';
    },
    setDirection: (state, action: PayloadAction<'rtl' | 'ltr'>) => {
      state.theme.direction = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  toggleThemeMode,
  setDirection,
  toggleSidebar,
  addNotification,
  removeNotification,
  setLoading,
} = uiSlice.actions;

export default uiSlice.reducer;
