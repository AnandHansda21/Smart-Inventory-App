import { Input } from './ui/input';
import { Button } from './ui/button';
import { Icons } from './ui/enhanced-icons';
import { useApp } from './context/AppContext';

export function Header() {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    dispatch({ 
      type: 'SET_THEME', 
      payload: state.theme === 'light' ? 'dark' : 'light' 
    });
  };

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-3 w-full">
      <div className="flex items-center gap-3 max-w-none">
        {/* App Logo */}
        <div className="touch-target rounded-full bg-primary flex items-center justify-center flex-shrink-0 max-w-10 max-h-10">
          <span className="text-primary-foreground font-semibold text-subhead tracking-wide">SC</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <Icons.search 
            size="sm" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            strokeWidth={1.5}
          />
          <Input
            placeholder="Search items..."
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            className="pl-10 bg-input-background border-0 h-12 text-body font-normal"
          />
        </div>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={toggleTheme}
          className="flex-shrink-0 touch-target p-0"
        >
          {state.theme === 'light' ? (
            <Icons.darkMode size="md" strokeWidth={1.5} />
          ) : (
            <Icons.lightMode size="md" strokeWidth={1.5} />
          )}
        </Button>
      </div>
    </header>
  );
}