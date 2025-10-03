export interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    light: {
      primary: string;
      'primary-foreground': string;
      secondary: string;
      'secondary-foreground': string;
      accent: string;
      'accent-foreground': string;
      muted: string;
      'muted-foreground': string;
      'input-background': string;
      'switch-background': string;
    };
    dark: {
      primary: string;
      'primary-foreground': string;
      secondary: string;
      'secondary-foreground': string;
      accent: string;
      'accent-foreground': string;
      muted: string;
      'muted-foreground': string;
      'input-background': string;
      'switch-background': string;
    };
  };
}

export const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Classic',
    description: 'Clean and professional',
    colors: {
      light: {
        primary: '#030213',
        'primary-foreground': '#ffffff',
        secondary: '#f1f1f5',
        'secondary-foreground': '#030213',
        accent: '#e9ebef',
        'accent-foreground': '#030213',
        muted: '#ececf0',
        'muted-foreground': '#717182',
        'input-background': '#f3f3f5',
        'switch-background': '#cbced4',
      },
      dark: {
        primary: '#ffffff',
        'primary-foreground': '#0a0a0b',
        secondary: '#1f1f23',
        'secondary-foreground': '#ffffff',
        accent: '#1f1f23',
        'accent-foreground': '#ffffff',
        muted: '#1f1f23',
        'muted-foreground': '#a1a1aa',
        'input-background': '#1f1f23',
        'switch-background': '#3f3f46',
      },
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    description: 'Calm and refreshing',
    colors: {
      light: {
        primary: '#0ea5e9',
        'primary-foreground': '#ffffff',
        secondary: '#e0f7fa',
        'secondary-foreground': '#0891b2',
        accent: '#b3e5fc',
        'accent-foreground': '#0891b2',
        muted: '#e6f3ff',
        'muted-foreground': '#0369a1',
        'input-background': '#f0f9ff',
        'switch-background': '#7dd3fc',
      },
      dark: {
        primary: '#38bdf8',
        'primary-foreground': '#0c4a6e',
        secondary: '#164e63',
        'secondary-foreground': '#e0f7fa',
        accent: '#155e75',
        'accent-foreground': '#e0f7fa',
        muted: '#164e63',
        'muted-foreground': '#7dd3fc',
        'input-background': '#155e75',
        'switch-background': '#0891b2',
      },
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    description: 'Warm and energetic',
    colors: {
      light: {
        primary: '#ea580c',
        'primary-foreground': '#ffffff',
        secondary: '#fed7aa',
        'secondary-foreground': '#c2410c',
        accent: '#ffedd5',
        'accent-foreground': '#c2410c',
        muted: '#fef3e2',
        'muted-foreground': '#9a3412',
        'input-background': '#fff7ed',
        'switch-background': '#fb923c',
      },
      dark: {
        primary: '#fb923c',
        'primary-foreground': '#7c2d12',
        secondary: '#7c2d12',
        'secondary-foreground': '#fed7aa',
        accent: '#9a3412',
        'accent-foreground': '#fed7aa',
        muted: '#7c2d12',
        'muted-foreground': '#fdba74',
        'input-background': '#9a3412',
        'switch-background': '#c2410c',
      },
    },
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Natural and peaceful',
    colors: {
      light: {
        primary: '#16a34a',
        'primary-foreground': '#ffffff',
        secondary: '#dcfce7',
        'secondary-foreground': '#15803d',
        accent: '#bbf7d0',
        'accent-foreground': '#15803d',
        muted: '#f0fdf4',
        'muted-foreground': '#166534',
        'input-background': '#f7fee7',
        'switch-background': '#4ade80',
      },
      dark: {
        primary: '#4ade80',
        'primary-foreground': '#14532d',
        secondary: '#166534',
        'secondary-foreground': '#dcfce7',
        accent: '#15803d',
        'accent-foreground': '#dcfce7',
        muted: '#166534',
        'muted-foreground': '#86efac',
        'input-background': '#15803d',
        'switch-background': '#16a34a',
      },
    },
  },
  {
    id: 'purple',
    name: 'Purple Dream',
    description: 'Creative and modern',
    colors: {
      light: {
        primary: '#9333ea',
        'primary-foreground': '#ffffff',
        secondary: '#f3e8ff',
        'secondary-foreground': '#7c3aed',
        accent: '#e9d5ff',
        'accent-foreground': '#7c3aed',
        muted: '#faf5ff',
        'muted-foreground': '#6b21a8',
        'input-background': '#f9f5ff',
        'switch-background': '#a855f7',
      },
      dark: {
        primary: '#a855f7',
        'primary-foreground': '#4c1d95',
        secondary: '#581c87',
        'secondary-foreground': '#f3e8ff',
        accent: '#6b21a8',
        'accent-foreground': '#f3e8ff',
        muted: '#581c87',
        'muted-foreground': '#c4b5fd',
        'input-background': '#6b21a8',
        'switch-background': '#7c3aed',
      },
    },
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    description: 'Elegant and premium',
    colors: {
      light: {
        primary: '#e11d48',
        'primary-foreground': '#ffffff',
        secondary: '#fce7f3',
        'secondary-foreground': '#be185d',
        accent: '#f9a8d4',
        'accent-foreground': '#be185d',
        muted: '#fdf2f8',
        'muted-foreground': '#9d174d',
        'input-background': '#fef7f0',
        'switch-background': '#f472b6',
      },
      dark: {
        primary: '#f472b6',
        'primary-foreground': '#831843',
        secondary: '#831843',
        'secondary-foreground': '#fce7f3',
        accent: '#9d174d',
        'accent-foreground': '#fce7f3',
        muted: '#831843',
        'muted-foreground': '#f9a8d4',
        'input-background': '#9d174d',
        'switch-background': '#be185d',
      },
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    description: 'Sophisticated and sleek',
    colors: {
      light: {
        primary: '#1e40af',
        'primary-foreground': '#ffffff',
        secondary: '#dbeafe',
        'secondary-foreground': '#1d4ed8',
        accent: '#bfdbfe',
        'accent-foreground': '#1d4ed8',
        muted: '#eff6ff',
        'muted-foreground': '#1e3a8a',
        'input-background': '#f0f9ff',
        'switch-background': '#3b82f6',
      },
      dark: {
        primary: '#60a5fa',
        'primary-foreground': '#1e3a8a',
        secondary: '#1e3a8a',
        'secondary-foreground': '#dbeafe',
        accent: '#1d4ed8',
        'accent-foreground': '#dbeafe',
        muted: '#1e3a8a',
        'muted-foreground': '#93c5fd',
        'input-background': '#1d4ed8',
        'switch-background': '#2563eb',
      },
    },
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    description: 'Fresh and vibrant',
    colors: {
      light: {
        primary: '#059669',
        'primary-foreground': '#ffffff',
        secondary: '#d1fae5',
        'secondary-foreground': '#047857',
        accent: '#a7f3d0',
        'accent-foreground': '#047857',
        muted: '#ecfdf5',
        'muted-foreground': '#065f46',
        'input-background': '#f0fdfa',
        'switch-background': '#10b981',
      },
      dark: {
        primary: '#34d399',
        'primary-foreground': '#064e3b',
        secondary: '#064e3b',
        'secondary-foreground': '#d1fae5',
        accent: '#047857',
        'accent-foreground': '#d1fae5',
        muted: '#064e3b',
        'muted-foreground': '#6ee7b7',
        'input-background': '#047857',
        'switch-background': '#059669',
      },
    },
  },
];

export const getThemeById = (id: string): ColorTheme => {
  return colorThemes.find(theme => theme.id === id) || colorThemes[0];
};