import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Check, Palette } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { colorThemes, type ColorTheme } from './data/colorThemes';
import { useApp } from './context/AppContext';

export function ColorThemeSelector() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    dispatch({ type: 'SET_COLOR_THEME', payload: themeId });
    setIsOpen(false);
  };

  const currentTheme = colorThemes.find(t => t.id === state.colorTheme) || colorThemes[0];

  // Create a preview of the theme colors
  const ThemePreview = ({ theme, isSelected }: { theme: ColorTheme; isSelected: boolean }) => {
    const colors = theme.colors[state.theme];
    
    return (
      <Card 
        className={`p-4 cursor-pointer transition-all duration-200 border-2 ${
          isSelected 
            ? 'border-primary shadow-lg ring-2 ring-primary/20' 
            : 'border-border hover:border-accent-foreground/30'
        }`}
        onClick={() => handleThemeSelect(theme.id)}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-medium">{theme.name}</h3>
            <p className="text-sm text-muted-foreground">{theme.description}</p>
          </div>
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>
        
        {/* Color Preview */}
        <div className="flex gap-2 mb-3">
          <div 
            className="w-8 h-8 rounded-full border border-border/50"
            style={{ backgroundColor: colors.primary }}
            title="Primary"
          />
          <div 
            className="w-8 h-8 rounded-full border border-border/50"
            style={{ backgroundColor: colors.secondary }}
            title="Secondary"
          />
          <div 
            className="w-8 h-8 rounded-full border border-border/50"
            style={{ backgroundColor: colors.accent }}
            title="Accent"
          />
          <div 
            className="w-8 h-8 rounded-full border border-border/50"
            style={{ backgroundColor: colors.muted }}
            title="Muted"
          />
        </div>
        
        {/* Sample UI Preview */}
        <div className="space-y-2">
          <div 
            className="h-6 rounded-sm flex items-center px-2 text-xs font-medium"
            style={{ 
              backgroundColor: colors.primary, 
              color: colors['primary-foreground'] 
            }}
          >
            Primary Button
          </div>
          <div 
            className="h-5 rounded-sm flex items-center px-2 text-xs"
            style={{ 
              backgroundColor: colors.secondary, 
              color: colors['secondary-foreground'] 
            }}
          >
            Secondary Element
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <Label className="font-medium flex items-center gap-2">
        <Palette className="icon-sm" />
        Color Theme
      </Label>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-between touch-target">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div 
                  className="w-4 h-4 rounded-full border border-border/50"
                  style={{ backgroundColor: currentTheme.colors[state.theme].primary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-border/50"
                  style={{ backgroundColor: currentTheme.colors[state.theme].secondary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-border/50"
                  style={{ backgroundColor: currentTheme.colors[state.theme].accent }}
                />
              </div>
              <span>{currentTheme.name}</span>
            </div>
            <Palette className="icon-sm opacity-50" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="icon-md" />
              Choose Color Theme
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Select a color theme to personalize your StockCall experience. The theme will be applied throughout the app.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {colorThemes.map((theme) => (
                <ThemePreview 
                  key={theme.id} 
                  theme={theme} 
                  isSelected={theme.id === state.colorTheme}
                />
              ))}
            </div>
            
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}