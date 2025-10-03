import { useEffect, useState } from 'react';
import { useAdMob, ADMOB_TEST_IDS } from '../context/AdMobContext';
import { Icons } from '../ui/enhanced-icons';

export type BannerAdSize = 'standard' | 'large' | 'medium' | 'adaptive' | 'smart';
export type BannerAdPosition = 'top' | 'bottom' | 'inline';

interface AdMobBannerProps {
  adId: string;
  size?: BannerAdSize;
  position?: BannerAdPosition;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export function AdMobBanner({ 
  adId, 
  size = 'standard', 
  position = 'inline',
  className = '',
  showCloseButton = false,
  onClose
}: AdMobBannerProps) {
  const { loadAd, getAdStatus, isAdReady } = useAdMob();
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const adStatus = getAdStatus(adId);

  useEffect(() => {
    const initializeAd = async () => {
      setIsLoading(true);
      await loadAd(adId, 'banner');
      setIsLoading(false);
    };

    initializeAd();
  }, [adId]); // Remove loadAd from dependencies to prevent infinite loop

  const getBannerDimensions = () => {
    switch (size) {
      case 'standard':
        return { width: '320px', height: '50px', label: 'Banner 320x50' };
      case 'large':
        return { width: '320px', height: '100px', label: 'Large Banner 320x100' };
      case 'medium':
        return { width: '300px', height: '250px', label: 'Medium Rectangle 300x250' };
      case 'adaptive':
        return { width: '100%', height: '60px', label: 'Adaptive Banner' };
      case 'smart':
        return { width: '100%', height: '50px', label: 'Smart Banner' };
      default:
        return { width: '320px', height: '50px', label: 'Banner' };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'sticky top-0 z-40 border-b border-border';
      case 'bottom':
        return 'sticky bottom-0 z-40 border-t border-border';
      case 'inline':
      default:
        return 'relative border border-border';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible || adStatus === 'failed') {
    return null;
  }

  const dimensions = getBannerDimensions();
  const testUnitId = ADMOB_TEST_IDS.banner;

  return (
    <div className={`${getPositionStyles()} ${className}`}>
      <div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative overflow-hidden"
        style={{ 
          width: dimensions.width === '100%' ? '100%' : dimensions.width,
          height: dimensions.height,
          maxWidth: '100%'
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-muted/50 animate-pulse flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Loading Ad...</span>
            </div>
          </div>
        )}

        {/* Ad Content */}
        {!isLoading && isAdReady(adId) && (
          <>
            {/* Mock Ad Content */}
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Icons.star size="sm" className="text-yellow-500" />
                <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                  Premium App
                </span>
                <Icons.star size="sm" className="text-yellow-500" />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Download Now - 4.8★ Rating
              </p>
              
              {/* AdMob branding */}
              <div className="absolute bottom-1 left-2 text-xs text-gray-400 font-mono">
                AdMob
              </div>
              
              {/* Test ID indicator */}
              <div className="absolute bottom-1 right-2 text-xs text-gray-400 font-mono">
                TEST
              </div>
            </div>

            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="absolute top-1 right-1 w-5 h-5 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
              >
                <Icons.close size="xs" className="text-white" />
              </button>
            )}
          </>
        )}

        {/* Failed State */}
        {!isLoading && adStatus === 'failed' && (
          <div className="text-center text-muted-foreground">
            <Icons.alertCircle size="sm" className="mx-auto mb-1" />
            <span className="text-xs">Ad unavailable</span>
          </div>
        )}
      </div>

      {/* Debug Info - Hidden */}
      {false && (
        <div className="text-xs text-muted-foreground p-1 bg-muted/30 border-t border-border">
          <div className="flex justify-between items-center">
            <span>ID: {adId}</span>
            <span>Size: {dimensions.label}</span>
            <span>Status: {adStatus}</span>
          </div>
          <div className="text-xs font-mono mt-1 opacity-60">
            Unit ID: {testUnitId}
          </div>
        </div>
      )}
    </div>
  );
}