import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAdMob, ADMOB_TEST_IDS } from '../context/AdMobContext';
import { Icons } from '../ui/enhanced-icons';
import { Button } from '../ui/button';

export type NativeAdStyle = 'card' | 'banner' | 'list' | 'content';

interface AdMobNativeProps {
  adId: string;
  style?: NativeAdStyle;
  className?: string;
  showMediaView?: boolean;
  showAppIcon?: boolean;
  showStarRating?: boolean;
  showPrice?: boolean;
  showStore?: boolean;
  showAdvertiser?: boolean;
  compact?: boolean;
}

export function AdMobNative({ 
  adId, 
  style = 'card',
  className = '',
  showMediaView = true,
  showAppIcon = true,
  showStarRating = true,
  showPrice = true,
  showStore = true,
  showAdvertiser = true,
  compact = false
}: AdMobNativeProps) {
  const { loadAd, getAdStatus, isAdReady } = useAdMob();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const adStatus = getAdStatus(adId);

  useEffect(() => {
    const initializeAd = async () => {
      setIsLoading(true);
      await loadAd(adId, 'native');
      setIsLoading(false);
    };

    initializeAd();
  }, [adId]); // Remove loadAd dependency

  const mockAdData = {
    headline: 'Premium Task Manager',
    body: 'Organize your life with our award-winning productivity app. Download now for free!',
    callToAction: 'Install Now',
    advertiser: 'ProductivityCorp',
    store: 'Google Play',
    price: 'Free',
    starRating: 4.8,
    appIcon: '📱',
    mediaUrl: '/api/placeholder/300/200',
    mediaType: 'image'
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    // In a real implementation, this would trigger the ad click
    console.log('Native ad clicked:', adId);
  };

  if (!isVisible || adStatus === 'failed') {
    return null;
  }

  const getStyleClasses = () => {
    switch (style) {
      case 'banner':
        return compact 
          ? 'flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-border'
          : 'flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-border';
      case 'list':
        return 'flex items-start gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent/50 transition-colors';
      case 'content':
        return 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-border';
      case 'card':
      default:
        return compact
          ? 'bg-card border border-border rounded-lg p-4 space-y-3'
          : 'bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${getStyleClasses()} ${className}`}
    >
      {/* Ad Indicator */}
      <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md font-medium z-20 shadow-sm border border-white/20">
        Ad
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 w-6 h-6 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 border border-black/10 dark:border-white/20 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md z-10"
      >
        <Icons.close size="xs" />
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading ad...</span>
          </div>
        </div>
      )}

      {/* Native Ad Content */}
      {!isLoading && isAdReady(adId) && (
        <>
          {(style === 'banner' || style === 'list') ? (
            // Horizontal Layout
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {showAppIcon && (
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
                    {mockAdData.appIcon}
                  </div>
                </div>
              )}

              <div className="flex-1 min-w-0 space-y-1">
                <h4 className="font-semibold text-sm text-foreground truncate">
                  {mockAdData.headline}
                </h4>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {mockAdData.body}
                </p>

                <div className="flex items-center gap-3 text-xs">
                  {showStarRating && (
                    <div className="flex items-center gap-1">
                      <Icons.star size="xs" className="text-yellow-500 fill-current" />
                      <span className="text-muted-foreground">{mockAdData.starRating}</span>
                    </div>
                  )}

                  {showPrice && (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {mockAdData.price}
                    </span>
                  )}

                  {showAdvertiser && (
                    <span className="text-muted-foreground">{mockAdData.advertiser}</span>
                  )}
                </div>
              </div>

              <Button 
                size="sm" 
                onClick={handleClick}
                className="flex-shrink-0 text-xs px-3 py-1 h-auto"
              >
                {mockAdData.callToAction}
              </Button>
            </div>
          ) : (
            // Vertical Layout (Card/Content)
            <div className="space-y-3">
              {showMediaView && (
                <div className="aspect-video bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2">
                        <Icons.smartphone size="lg" className="text-white" />
                      </div>
                      <p className="font-semibold">App Preview</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                {showAppIcon && (
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl">
                      {mockAdData.appIcon}
                    </div>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">
                    {mockAdData.headline}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {mockAdData.body}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      {showStarRating && (
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Icons.star 
                                key={star} 
                                size="xs" 
                                className={`${star <= Math.floor(mockAdData.starRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-muted-foreground ml-1">{mockAdData.starRating}</span>
                        </div>
                      )}

                      {showPrice && (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {mockAdData.price}
                        </span>
                      )}
                    </div>

                    <Button 
                      size="sm" 
                      onClick={handleClick}
                      className="px-4"
                    >
                      {mockAdData.callToAction}
                    </Button>
                  </div>

                  {(showStore || showAdvertiser) && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      {showStore && <span>{mockAdData.store}</span>}
                      {showStore && showAdvertiser && <span>•</span>}
                      {showAdvertiser && <span>{mockAdData.advertiser}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground font-mono opacity-50">
          {ADMOB_TEST_IDS.nativeAdvanced.slice(-8)}
        </div>
      )}
    </motion.div>
  );
}