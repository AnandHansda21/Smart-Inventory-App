import { useState } from 'react';
import { 
  AlertTriangle
} from 'lucide-react';
import { AdMobBanner } from './ads/AdMobBanner';
import { AdMobNative } from './ads/AdMobNative';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ItemCard } from './ItemCard';
import { ItemActionSheet } from './ItemActionSheet';
import { CurrencySelector } from './CurrencySelector';
import { ColorThemeSelector } from './ColorThemeSelector';
import { Icons } from './ui/enhanced-icons';
import { createReceiptData, downloadTextReceipt, downloadPDFReceipt } from './utils/exportUtils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { InventoryItem, useApp } from './context/AppContext';

export function TrashSettings() {
  const { state, dispatch } = useApp();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const trashedItems = state.items.filter(item => 
    item.status === 'trashed' && 
    item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const handleBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'completed' });
  };

  const handleThemeToggle = () => {
    dispatch({ 
      type: 'SET_THEME', 
      payload: state.theme === 'light' ? 'dark' : 'light' 
    });
  };

  const handleExportPDF = () => {
    const receiptData = createReceiptData(state.items, state.currency, state.colorTheme, state.theme);
    downloadPDFReceipt(receiptData);
  };

  const handleExportText = () => {
    const receiptData = createReceiptData(state.items, state.currency, state.colorTheme, state.theme);
    downloadTextReceipt(receiptData);
  };

  const handleResetData = () => {
    dispatch({ type: 'RESET_DATA' });
    setShowResetDialog(false);
  };

  const handleItemTap = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsActionSheetOpen(true);
  };

  const handleCloseActionSheet = () => {
    setIsActionSheetOpen(false);
    setSelectedItem(null);
  };

  const getDaysUntilDeletion = (trashedAt: Date) => {
    const now = new Date();
    const sixtyDaysFromTrashed = new Date(trashedAt.getTime() + 60 * 24 * 60 * 60 * 1000);
    const daysLeft = Math.ceil((sixtyDaysFromTrashed.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
    return Math.max(0, daysLeft);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleBack}
          className="h-8 w-8 p-0"
        >
          <Icons.back size="sm" strokeWidth={2} />
        </Button>
        <h1 className="text-title font-bold">Trash & Settings</h1>
      </div>

      <div className="flex-1">
        <Tabs defaultValue="trash" className="flex-1 flex flex-col">
          <div className="px-4 py-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="trash" className="flex items-center gap-2 font-medium">
                <Icons.trash size="sm" strokeWidth={2} />
                Trash
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 font-medium">
                <Icons.settings size="sm" strokeWidth={2} />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="trash" className="flex-1 m-0">
              <div className="px-4 pb-4">
                {trashedItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                      <Icons.trash size="2xl" className="text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-title font-bold mb-2 text-shadow-sm">Trash is Empty</h2>
                    <p className="text-body text-muted-foreground max-w-sm leading-relaxed">
                      Deleted items will appear here and be automatically removed after 60 days.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                            Auto-deletion Notice
                          </p>
                          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                            Items in trash are automatically deleted after 60 days. You can restore or permanently delete them manually.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {trashedItems.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <ItemCard item={item} onTap={handleItemTap} />
                        {item.trashedAt && (
                          <p className="text-xs text-muted-foreground text-center">
                            {getDaysUntilDeletion(item.trashedAt)} days until permanent deletion
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="flex-1 m-0">
              <div className="px-4 pb-4 space-y-6">
                {/* Top Settings Ad */}
                <AdMobNative 
                  adId="settings-top-native"
                  style="content"
                  className="mb-6"
                  showMediaView={true}
                />
                {/* Appearance Settings */}
                <div className="space-y-4">
                  <h3 className="text-headline font-semibold flex items-center gap-2">
                    <Icons.theme size="md" strokeWidth={2} />
                    Appearance
                  </h3>
                  
                  <div className="space-y-6 pl-6">
                    {/* Color Theme Selector */}
                    <ColorThemeSelector />
                    
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2 font-medium">
                          <Icons.darkMode size="sm" strokeWidth={2} />
                          Dark Mode
                        </Label>
                        <p className="text-small text-muted-foreground leading-relaxed">
                          Toggle between light and dark themes
                        </p>
                      </div>
                      <Switch 
                        checked={state.theme === 'dark'}
                        onCheckedChange={handleThemeToggle}
                      />
                    </div>
                  </div>
                </div>

                {/* Currency Settings */}
                <div className="space-y-4">
                  <h3 className="text-headline font-semibold flex items-center gap-2">
                    <Icons.globe size="md" strokeWidth={2} />
                    Currency
                  </h3>
                  
                  <div className="space-y-3 pl-6">
                    <div className="space-y-3">
                      <Label className="font-medium">Currency Symbol</Label>
                      <p className="text-small text-muted-foreground leading-relaxed">
                        Choose your preferred currency symbol for price displays
                      </p>
                      <CurrencySelector />
                    </div>
                  </div>
                </div>

                {/* Data Management */}
                <div className="space-y-4">
                  <h3 className="text-headline font-semibold flex items-center gap-2">
                    <Icons.download size="md" strokeWidth={2} />
                    Data Management
                  </h3>
                  
                  <div className="space-y-4 pl-6">
                    <div className="space-y-3">
                      <Label className="text-headline font-semibold">Export Receipts</Label>
                      <p className="text-small text-muted-foreground leading-relaxed">
                        Download beautiful inventory receipts with your selected theme design
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleExportPDF}
                          className="flex-1 font-medium"
                        >
                          <Icons.download size="sm" className="mr-2" strokeWidth={2} />
                          Export to PDF
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleExportText}
                          className="flex-1 font-medium"
                        >
                          <Icons.copy size="sm" className="mr-2" strokeWidth={2} />
                          Export to Text
                        </Button>
                      </div>
                      
                      <div className="bg-muted/50 border border-accent rounded-lg p-3 mt-3">
                        <p className="text-caption text-muted-foreground">
                          💡 <strong>Tip:</strong> PDF receipts use your current color theme and include beautiful formatting. 
                          Text receipts are perfect for simple record-keeping.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-headline font-semibold">Reset App Data</Label>
                      <p className="text-small text-muted-foreground leading-relaxed">
                        Permanently delete all items and reset the app to factory settings
                      </p>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => setShowResetDialog(true)}
                        className="font-medium"
                      >
                        <Icons.reset size="sm" className="mr-2" strokeWidth={2} />
                        Reset All Data
                      </Button>
                    </div>
                  </div>
                </div>

                {/* App Info */}
                <div className="space-y-4 pb-8">
                  <h3 className="text-headline font-semibold flex items-center gap-2">
                    <Icons.inventory size="md" strokeWidth={2} />
                    About StockCall
                  </h3>
                  <div className="pl-6 space-y-3 bg-muted/30 rounded-lg p-4 border border-accent">
                    <p className="text-body text-foreground font-medium">
                      📋 StockCall - Inventory & Budget Manager
                    </p>
                    <p className="text-small text-muted-foreground">
                      🚀 Version 1.0.0 - Enhanced Typography Edition
                    </p>
                    <p className="text-small text-muted-foreground leading-relaxed">
                      Your personal inventory tracking assistant with beautiful themes and professional typography
                    </p>
                    <div className="flex items-center gap-2 text-caption text-muted-foreground pt-2 border-t border-accent">
                      <Icons.award size="xs" strokeWidth={2} />
                      <span>Built with modern design principles</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset All Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all your inventory items, 
              completed tasks, and trash items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Reset Everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <ItemActionSheet
        item={selectedItem}
        isOpen={isActionSheetOpen}
        onClose={handleCloseActionSheet}
        onEdit={() => {}} // No edit for trashed items in this context
      />
    </div>
  );
}