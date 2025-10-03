import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getThemeById } from '../data/colorThemes';

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  createdAt: Date;
  completedAt?: Date;
  status: 'active' | 'completed' | 'pending' | 'trashed';
  trashedAt?: Date;
}

interface AppState {
  items: InventoryItem[];
  theme: 'light' | 'dark';
  colorTheme: string;
  currentScreen: 'main' | 'completed' | 'trash';
  searchQuery: string;
  currency: string;
}

type AppAction =
  | { type: 'ADD_ITEM'; payload: Omit<InventoryItem, 'id' | 'createdAt'> }
  | { type: 'EDIT_ITEM'; payload: { id: string; updates: Partial<InventoryItem> } }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'COMPLETE_ITEM'; payload: string }
  | { type: 'RESTORE_ITEM'; payload: string }
  | { type: 'PERMANENT_DELETE'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_COLOR_THEME'; payload: string }
  | { type: 'SET_SCREEN'; payload: 'main' | 'completed' | 'trash' }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'LOAD_DATA'; payload: InventoryItem[] }
  | { type: 'RESET_DATA' };

const initialState: AppState = {
  items: [],
  theme: 'light',
  colorTheme: 'default', // Default theme ID
  currentScreen: 'main',
  searchQuery: '',
  currency: '$', // Default to USD
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            status: 'active',
          },
        ],
      };
    
    case 'EDIT_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };
    
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, status: 'trashed', trashedAt: new Date() }
            : item
        ),
      };
    
    case 'COMPLETE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, status: 'completed', completedAt: new Date() }
            : item
        ),
      };
    
    case 'RESTORE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, status: 'active', trashedAt: undefined }
            : item
        ),
      };
    
    case 'PERMANENT_DELETE':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'SET_COLOR_THEME':
      return { ...state, colorTheme: action.payload };
    
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    
    case 'LOAD_DATA':
      return { ...state, items: action.payload };
    
    case 'RESET_DATA':
      return { ...state, items: [] };
    
    default:
      return state;
  }
}

// Function to apply color theme to CSS variables
function applyColorTheme(themeId: string, mode: 'light' | 'dark') {
  const theme = getThemeById(themeId);
  const colors = theme.colors[mode];
  
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('stockcall-data');
    const savedTheme = localStorage.getItem('stockcall-theme') as 'light' | 'dark';
    const savedColorTheme = localStorage.getItem('stockcall-color-theme');
    const savedCurrency = localStorage.getItem('stockcall-currency');
    
    if (savedData) {
      try {
        const items = JSON.parse(savedData).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          completedAt: item.completedAt ? new Date(item.completedAt) : undefined,
          trashedAt: item.trashedAt ? new Date(item.trashedAt) : undefined,
        }));
        dispatch({ type: 'LOAD_DATA', payload: items });
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    }

    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }

    if (savedColorTheme) {
      dispatch({ type: 'SET_COLOR_THEME', payload: savedColorTheme });
    }

    if (savedCurrency) {
      dispatch({ type: 'SET_CURRENCY', payload: savedCurrency });
    }
  }, []);

  // Save data to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('stockcall-data', JSON.stringify(state.items));
  }, [state.items]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('stockcall-theme', state.theme);
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Apply color theme when light/dark mode changes
    applyColorTheme(state.colorTheme, state.theme);
  }, [state.theme, state.colorTheme]);

  // Save color theme to localStorage and apply CSS variables
  useEffect(() => {
    localStorage.setItem('stockcall-color-theme', state.colorTheme);
    applyColorTheme(state.colorTheme, state.theme);
  }, [state.colorTheme, state.theme]);

  // Save currency to localStorage whenever currency changes
  useEffect(() => {
    localStorage.setItem('stockcall-currency', state.currency);
  }, [state.currency]);

  // Clean up old trashed items (60 days)
  useEffect(() => {
    const now = new Date();
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    
    state.items.forEach(item => {
      if (item.status === 'trashed' && item.trashedAt && item.trashedAt < sixtyDaysAgo) {
        dispatch({ type: 'PERMANENT_DELETE', payload: item.id });
      }
    });
  }, [state.items]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}