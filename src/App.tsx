import { AppProvider, useApp } from './context/AppContext';
import { AdMobProvider } from './context/AdMobContext';
import { Header } from './components/Header';
import { MainDashboard } from './components/MainDashboard';
import { CompletedTasks } from './components/CompletedTasks';
import { TrashSettings } from './components/TrashSettings';
import { BottomNavigation } from './components/BottomNavigation';
import { ViewportMeta } from './components/ViewportMeta';
import { DeviceDebugInfo } from './components/DeviceDebugInfo';

function AppContent() {
  const { state } = useApp();

  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'completed':
        return <CompletedTasks key="completed" />;
      case 'trash':
        return <TrashSettings key="trash" />;
      default:
        return <MainDashboard key="main" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col w-full relative">
      <ViewportMeta />
      <DeviceDebugInfo />
      
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full pb-20 overflow-y-auto">
          {renderCurrentScreen()}
        </div>
      </main>
      
      {/* Bottom Navigation - Show on main and completed screens, hide on trash/settings */}
      {state.currentScreen !== 'trash' && (
        <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-background/95 backdrop-blur-sm border-t border-border">
          <BottomNavigation />
        </nav>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AdMobProvider>
        <AppContent />
      </AdMobProvider>
    </AppProvider>
  );
}