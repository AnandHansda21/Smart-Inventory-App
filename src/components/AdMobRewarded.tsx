import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAdMob, ADMOB_TEST_IDS } from '../context/AdMobContext';
import { Icons } from '../ui/enhanced-icons';
import { Button } from '../ui/button';

interface AdMobRewardedProps {
  adId: string;
  isOpen: boolean;
  onClose: () => void;
  onRewardEarned: (reward: { type: string; amount: number }) => void;
  rewardType?: string;
  rewardAmount?: number;
  title?: string;
  description?: string;
}

export function AdMobRewarded({ 
  adId, 
  isOpen, 
  onClose, 
  onRewardEarned,
  rewardType = 'access',
  rewardAmount = 1,
  title = 'Watch Video for Reward',
  description = 'Watch this short video to earn your reward'
}: AdMobRewardedProps) {
  const { loadAd, showAd, getAdStatus, isAdReady, rewardedAdWatched, setRewardedAdWatched } = useAdMob();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasEarnedReward, setHasEarnedReward] = useState(false);

  const adStatus = getAdStatus(adId);
  const videoDuration = 30; // 30 seconds
  const skipThreshold = 15; // Can skip after 15 seconds

  useEffect(() => {
    if (isOpen) {
      const initializeAd = async () => {
        setIsLoading(true);
        setIsPlaying(false);
        setProgress(0);
        setCanSkip(false);
        setHasEarnedReward(false);
        
        await loadAd(adId, 'rewarded');
        setIsLoading(false);
      };

      initializeAd();
    }
  }, [isOpen, adId]); // Remove loadAd dependency

  useEffect(() => {
    if (!isPlaying || hasEarnedReward) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / videoDuration);
        
        if (newProgress >= (skipThreshold / videoDuration) * 100) {
          setCanSkip(true);
        }
        
        if (newProgress >= 100) {
          setHasEarnedReward(true);
          setRewardedAdWatched(true);
          onRewardEarned({ type: rewardType, amount: rewardAmount });
          return 100;
        }
        
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, hasEarnedReward, rewardType, rewardAmount]); // Remove function dependencies

  const handleStartVideo = async () => {
    if (isAdReady(adId)) {
      await showAd(adId);
      setIsPlaying(true);
    }
  };

  const handleSkip = () => {
    if (canSkip || hasEarnedReward) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Handle ad failure in useEffect to avoid setState during render
  useEffect(() => {
    if (adStatus === 'failed' && isOpen) {
      onClose();
    }
  }, [adStatus, isOpen, onClose]);

  if (adStatus === 'failed') {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-2xl max-w-md w-full overflow-hidden"
          >
            {/* Loading State */}
            {isLoading && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Loading Rewarded Video</h3>
                <p className="text-muted-foreground text-sm">Preparing your video...</p>
              </div>
            )}

            {/* Pre-video Screen */}
            {!isLoading && !isPlaying && !hasEarnedReward && isAdReady(adId) && (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icons.play size="lg" className="text-white ml-1" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground mb-6">{description}</p>
                
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-primary font-medium">
                    <Icons.gift size="sm" />
                    <span>Reward: {rewardType} x{rewardAmount}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleClose} className="flex-1">
                    <Icons.close size="sm" className="mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleStartVideo} className="flex-1">
                    <Icons.play size="sm" className="mr-2" />
                    Watch Video
                  </Button>
                </div>
              </div>
            )}

            {/* Video Playing Screen */}
            {isPlaying && !hasEarnedReward && (
              <div className="relative">
                {/* Video Content */}
                <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 relative overflow-hidden">
                  {/* Mock Video Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Icons.gift size="lg" className="text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-2">Amazing Game</h3>
                      <p className="text-white/80">Play now and win big!</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
                    <motion.div
                      className="h-full bg-white"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Skip Button */}
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSkip}
                      disabled={!canSkip}
                      className={`text-white hover:bg-white/10 ${!canSkip ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {canSkip ? (
                        <>
                          <Icons.skip size="sm" className="mr-1" />
                          Skip
                        </>
                      ) : (
                        `Skip in ${Math.ceil((skipThreshold - (progress / 100 * videoDuration)))}`
                      )}
                    </Button>
                  </div>

                  {/* AdMob Branding */}
                  <div className="absolute bottom-4 left-4 text-white/60 text-xs font-mono">
                    AdMob • Rewarded Video
                  </div>
                </div>
              </div>
            )}

            {/* Reward Earned Screen */}
            {hasEarnedReward && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Icons.check size="xl" className="text-white" />
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-2">Reward Earned!</h3>
                <p className="text-muted-foreground mb-4">
                  You've successfully earned your reward
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300 font-medium">
                    <Icons.gift size="sm" />
                    <span>{rewardType} x{rewardAmount}</span>
                  </div>
                </div>

                <Button onClick={handleClose} className="w-full">
                  <Icons.check size="sm" className="mr-2" />
                  Continue
                </Button>
              </motion.div>
            )}

            {/* Debug Info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="p-2 bg-muted/30 border-t border-border text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Ad ID: {adId}</span>
                  <span>Status: {adStatus}</span>
                </div>
                <div className="font-mono mt-1">
                  Unit ID: {ADMOB_TEST_IDS.rewardedVideo}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}