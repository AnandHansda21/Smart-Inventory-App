import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdMob, ADMOB_TEST_IDS } from '../context/AdMobContext';
import { Icons } from '../ui/enhanced-icons';
import { Button } from '../ui/button';

interface AdMobInterstitialProps {
  adId: string;
  isOpen: boolean;
  onClose: () => void;
  onAdWatched?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export function AdMobInterstitial({ 
  adId, 
  isOpen, 
  onClose, 
  onAdWatched,
  autoClose = true,
  autoCloseDelay = 5000
}: AdMobInterstitialProps) {
  const { loadAd, showAd, getAdStatus, isAdReady } = useAdMob();
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const adStatus = getAdStatus(adId);

  useEffect(() => {
    if (isOpen) {
      const initializeAd = async () => {
        setIsLoading(true);
        setCanClose(false);
        setCountdown(5);
        
        await loadAd(adId, 'interstitial');
        if (isAdReady(adId)) {
          await showAd(adId);
        }
        setIsLoading(false);
      };

      initializeAd();
    }
  }, [isOpen, adId]); // Remove function dependencies to prevent infinite loop

  useEffect(() => {
    if (!isOpen || isLoading || !isAdReady(adId)) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanClose(true);
          if (autoClose) {
            setTimeout(() => {
              onAdWatched?.();
              onClose();
            }, 1000);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isLoading, adId, autoClose, onClose, onAdWatched]); // Remove function dependencies

  const handleClose = () => {
    if (canClose) {
      onAdWatched?.();
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (adStatus === 'failed') {
    onClose();
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center text-white"
            >
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Loading Ad...</p>
              <p className="text-sm text-white/60">Please wait</p>
            </motion.div>
          )}

          {/* Ad Content */}
          {!isLoading && isAdReady(adId) && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full flex flex-col"
            >
              {/* Header with close button */}
              <div className="flex justify-between items-center p-4 bg-black/80">
                <div className="flex items-center gap-2 text-white">
                  <Icons.ad size="sm" />
                  <span className="text-sm font-medium">Advertisement</span>
                </div>
                
                <div className="flex items-center gap-3">
                  {!canClose && (
                    <span className="text-white/60 text-sm">
                      Close in {countdown}s
                    </span>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={canClose ? handleClose : handleSkip}
                    className="text-white hover:bg-white/10 h-8 w-8 p-0"
                  >
                    <Icons.close size="sm" />
                  </Button>
                </div>
              </div>

              {/* Main Ad Content */}
              <div className="flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-white/5" />
                </div>

                {/* Ad Content */}
                <div className="text-center text-white z-10 max-w-md mx-auto px-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icons.smartphone size="2xl" className="text-white" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3">Premium Productivity App</h2>
                    <p className="text-lg text-white/90 mb-6">
                      Boost your productivity with our award-winning app
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icons.star key={star} size="sm" className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-white/80">4.8 Rating</span>
                    </div>

                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-semibold px-8"
                    >
                      Install Now - Free
                    </Button>
                  </motion.div>
                </div>

                {/* AdMob Branding */}
                <div className="absolute bottom-4 left-4 text-white/40 text-xs font-mono">
                  AdMob • TEST
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="bg-black/80 p-4 flex items-center justify-between">
                <div className="text-white/60 text-sm">
                  Unit ID: {ADMOB_TEST_IDS.interstitial}
                </div>
                
                {canClose && (
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Icons.check size="sm" className="mr-2" />
                    Continue
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}