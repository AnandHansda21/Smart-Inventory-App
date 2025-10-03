import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdMob, ADMOB_TEST_IDS } from '../context/AdMobContext';
import { Icons } from '../ui/enhanced-icons';
import { Button } from '../ui/button';

interface AdMobAppOpenProps {
  adId: string;
  isOpen: boolean;
  onClose: () => void;
  showOnAppStart?: boolean;
  orientation?: 'portrait' | 'landscape';
}

export function AdMobAppOpen({ 
  adId, 
  isOpen, 
  onClose,
  showOnAppStart = false,
  orientation = 'portrait'
}: AdMobAppOpenProps) {
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
        
        await loadAd(adId, 'appOpen');
        if (isAdReady(adId)) {
          await showAd(adId);
        }
        setIsLoading(false);
      };

      initializeAd();
    }
  }, [isOpen, adId]); // Remove function dependencies

  useEffect(() => {
    if (!isOpen || isLoading || !isAdReady(adId)) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isLoading, adId]); // Remove function dependencies

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
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
          className="fixed inset-0 z-[100] bg-white dark:bg-gray-900"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">Loading...</p>
                <p className="text-sm text-muted-foreground">Preparing your app experience</p>
              </motion.div>
            </div>
          )}

          {/* App Open Ad Content */}
          {!isLoading && isAdReady(adId) && (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm border-b border-border">
                <div className="flex items-center gap-2">
                  <Icons.ad size="sm" className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Sponsored</span>
                </div>
                
                <div className="flex items-center gap-3">
                  {!canClose && (
                    <span className="text-muted-foreground text-sm">
                      {countdown}s
                    </span>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    disabled={!canClose}
                    className={`h-8 w-8 p-0 ${!canClose ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Icons.close size="sm" />
                  </Button>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                  {/* Animated Background Shapes */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full"
                  />
                  
                  <motion.div
                    animate={{
                      scale: [1.2, 1, 1.2],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center p-8">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-white max-w-md"
                  >
                    {/* App Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                      className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6"
                    >
                      <Icons.gamepad size="3xl" className="text-white" />
                    </motion.div>

                    {/* App Info */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h1 className="text-3xl font-bold mb-3">Epic Adventure Game</h1>
                      <p className="text-xl text-white/90 mb-6">
                        Embark on the journey of a lifetime
                      </p>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-center gap-6 mb-8"
                    >
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icons.star key={star} size="sm" className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-white/80 text-sm">4.9 Rating</span>
                      </div>
                      
                      <div className="w-px h-8 bg-white/30" />
                      
                      <div className="text-center">
                        <p className="text-white font-semibold">10M+</p>
                        <span className="text-white/80 text-sm">Downloads</span>
                      </div>
                      
                      <div className="w-px h-8 bg-white/30" />
                      
                      <div className="text-center">
                        <p className="text-white font-semibold">Free</p>
                        <span className="text-white/80 text-sm">to Play</span>
                      </div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 font-semibold px-12 py-3 text-lg rounded-2xl"
                      >
                        <Icons.download size="sm" className="mr-3" />
                        Install Now
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom Branding */}
                <div className="absolute bottom-4 left-4 text-white/40 text-xs font-mono">
                  AdMob • App Open Ad
                </div>
                
                <div className="absolute bottom-4 right-4 text-white/40 text-xs">
                  TEST MODE
                </div>
              </div>

              {/* Footer */}
              <div className="bg-background/80 backdrop-blur-sm border-t border-border p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground font-mono">
                    Unit ID: {ADMOB_TEST_IDS.appOpen}
                  </div>
                  
                  {canClose && (
                    <Button
                      onClick={handleClose}
                      variant="outline"
                      size="sm"
                      className="ml-auto"
                    >
                      <Icons.arrowRight size="sm" className="mr-2" />
                      Continue to App
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}