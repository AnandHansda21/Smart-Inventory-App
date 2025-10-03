import { useState, useEffect } from 'react';
import { CircleCheck as CheckCircle, Clock, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ItemCard } from './ItemCard';
import { AdMobBanner } from './AdMobBanner';
import { AdMobNative } from './AdMobNative';
import { AdMobRewarded } from './AdMobRewarded';
import { InputModal } from './InputModal';
import { ItemActionSheet } from './ItemActionSheet';
import { Skeleton } from '../ui/skeleton';
import { InventoryItem, useApp } from '../context/AppContext';
import { useAdMob } from '../context/AdMobContext';

export function CompletedTasks() {
  const { state, dispatch } = useApp();
  const { rewardedAdWatched } = useAdMob();
  const [isLoading, setIsLoading] = useState(true);
  const [showRewardedAd, setShowRewardedAd] = useState(!rewardedAdWatched);
  const [hasAccess, setHasAccess] = useState(rewardedAdWatched);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const completedItems = state.items.filter(item => 
    item.status === 'completed' && 
    item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const pendingItems = state.items.filter(item => 
    item.status === 'active' && 
    item.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const handleSkipAd = () => {
    setShowRewardedAd(false);
    setHasAccess(true);
  };

  const handleRewardEarned = (reward: { type: string; amount: number }) => {
    console.log('Reward earned:', reward);
    setShowRewardedAd(false);
    setHasAccess(true);
  };

  const navigateToTrash = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'trash' });
  };

  const handleItemTap = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsActionSheetOpen(true);
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

  // Show rewarded ad gate
  if (!hasAccess) {
    return (
      <>
        <div className="flex-1 flex items-center justify-center bg-black/50">

        </div>

        <AdMobRewarded
          adId="completed-access-reward"
          isOpen={showRewardedAd}
          onClose={() => setShowRewardedAd(false)}
          onRewardEarned={handleRewardEarned}
          rewardType="Premium Access"
          rewardAmount={1}
          title="Unlock Premium Features"
          description="Watch this video to unlock access to completed tasks and export features"
        />
      </>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header with Trash Button */}
      <div className="px-4 sm:px-6 py-3 border-b border-border flex items-center justify-between w-full">
        <h1 className="text-lg sm:text-xl font-medium">Tasks Overview</h1>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={navigateToTrash}
          className="flex items-center gap-2 touch-target font-medium"
        >
          <Trash2 className="icon-sm" />
          Trash
        </Button>
      </div>

      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="completed" className="flex-1 flex flex-col">
          <div className="px-4 sm:px-6 py-2">
            <TabsList className="grid w-full grid-cols-2 touch-target">
              <TabsTrigger value="completed" className="flex items-center gap-2 font-medium">
                <CheckCircle className="icon-sm" />
                Completed
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2 font-medium">
                <Clock className="icon-sm" />
                Pending
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="completed" className="flex-1 m-0">
              <div className="px-4 sm:px-6 pb-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <Skeleton className="h-5 w-3/4 mb-3" />
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : completedItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">No Completed Items</h2>
                    <p className="text-muted-foreground max-w-sm">
                      Items you mark as complete will appear here for easy reference.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    {completedItems.map((item, index) => (
                      <div key={item.id}>
                        <ItemCard item={item} onTap={handleItemTap} />
                        {/* Insert native ad after every 3 completed items */}
                        {(index + 1) % 3 === 0 && index < completedItems.length - 1 && (
                          <AdMobNative 
                            adId={`completed-native-${index}`}
                            style="banner"
                            compact={true}
                            className="my-3"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="flex-1 m-0">
              <div className="px-4 sm:px-6 pb-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <Skeleton className="h-5 w-3/4 mb-3" />
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : pendingItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                      <Clock className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">No Pending Items</h2>
                    <p className="text-muted-foreground max-w-sm">
                      Active items from your main dashboard will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    {pendingItems.map((item, index) => (
                      <div key={item.id}>
                        <ItemCard item={item} onTap={handleItemTap} />
                        {/* Insert banner ad after every 5 pending items */}
                        {(index + 1) % 5 === 0 && index < pendingItems.length - 1 && (
                          <AdMobBanner 
                            adId={`pending-banner-${index}`}
                            size="standard"
                            className="my-3 mx-auto"
                            showCloseButton={true}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Bottom Banner Ad */}
        <div className="px-4 py-3 border-t border-border">
          <AdMobBanner 
            adId="completed-bottom-banner"
            size="adaptive"
            position="bottom"
            className="w-full"
          />
        </div>
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
    </div>
  );
}