import { useState } from 'react';
import { Button } from './ui/button';
import { Icons } from './ui/enhanced-icons';
import { ItemCard } from './ItemCard';
import { InputModal } from './InputModal';
import { ItemActionSheet } from './ItemActionSheet';
import { AdMobBanner } from './ads/AdMobBanner';
import { AdMobNative } from './ads/AdMobNative';
import { AdMobInterstitial } from './ads/AdMobInterstitial';
import { InventoryItem, useApp } from './context/AppContext';
import { formatPrice } from './utils/currency';

export function MainDashboard() {
  const { state } = useApp();
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [interstitialCount, setInterstitialCount] = useState(0);

  const activeItems = state.items.filter(item => 
    item.status === 'active' && 
    item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const totalValue = activeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const formattedTotalValue = formatPrice(totalValue, state.currency);

  const handleItemTap = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsActionSheetOpen(true);
    
    // Show interstitial ad every 5 item taps
    setInterstitialCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowInterstitial(true);
        return 0;
      }
      return newCount;
    });
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setIsInputModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsInputModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseActionSheet = () => {
    setIsActionSheetOpen(false);
    setSelectedItem(null);
  };

  const renderItemsWithAds = () => {
    const items = [];
    activeItems.forEach((item, index) => {
      items.push(
        <ItemCard key={item.id} item={item} onTap={handleItemTap} />
      );
      
      // Insert native ad after every 4 items
      if ((index + 1) % 4 === 0 && index < activeItems.length - 1) {
        items.push(
          <AdMobNative 
            key={`native-ad-${index}`} 
            adId={`native-feed-${index}`}
            style="card"
            compact={true}
            className="mx-auto my-2"
          />
        );
      }
      
      // Insert banner ad after every 8 items
      if ((index + 1) % 8 === 0 && index < activeItems.length - 1) {
        items.push(
          <AdMobBanner 
            key={`banner-ad-${index}`} 
            adId={`inline-banner-${index}`}
            size="medium"
            className="mx-auto my-3"
            showCloseButton={true}
          />
        );
      }
    });
    return items;
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Ad Banner */}
      <div className="w-full px-1 xs:px-2 sm:px-3 md:px-4 py-1 xs:py-2 sm:py-3 flex items-center justify-center min-h-[60px] xs:min-h-[80px] sm:min-h-[100px] md:min-h-[120px]">
        <div className="w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[728px] md:max-w-[970px] h-full">
          <AdMobBanner 
            adId="main-top-banner"
            size="adaptive"
            position="top"
            showCloseButton={true}
          />
        </div>
      </div>

      {/* Total Value Display */}
      {activeItems.length > 0 && (
        <div className="px-4 sm:px-6 py-3 bg-primary/5 border-b border-border w-full">
          <div className="text-center">
            <p className="text-small text-muted-foreground font-medium">Total Inventory Value</p>
            <p className="text-responsive-2xl font-bold text-primary tracking-tight text-gradient">{formattedTotalValue}</p>
            <p className="text-caption text-muted-foreground">
              {activeItems.length} item{activeItems.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 py-4 w-full">
        {activeItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Icons.shopping size="2xl" className="text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h2 className="text-title font-bold mb-2 text-shadow-sm">No Items Yet</h2>
            <p className="text-body text-muted-foreground mb-6 max-w-sm leading-relaxed">
              Start tracking your inventory by adding items with the mic or keyboard button below.
            </p>
            <Button onClick={() => setIsInputModalOpen(true)} className="font-medium">
              <Icons.add size="sm" className="mr-2" strokeWidth={2} />
              Add Your First Item
            </Button>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {renderItemsWithAds()}
          </div>
        )}
      </div>

      <InputModal
        isOpen={isInputModalOpen}
        onClose={handleCloseModal}
        editItem={editingItem}
      />
      
      <ItemActionSheet
        item={selectedItem}
        isOpen={isActionSheetOpen}
        onClose={handleCloseActionSheet}
        onEdit={handleEdit}
      />

      {/* Interstitial Ad */}
      <AdMobInterstitial
        adId="main-interstitial"
        isOpen={showInterstitial}
        onClose={() => setShowInterstitial(false)}
        autoClose={true}
        autoCloseDelay={6000}
      />
    </div>
  );
}