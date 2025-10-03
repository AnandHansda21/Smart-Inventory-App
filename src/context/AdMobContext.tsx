import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// AdMob Test Unit IDs (these are official Google test IDs)
export const ADMOB_TEST_IDS = {
  // Banner Ads
  banner: 'ca-app-pub-3940256099942544/6300978111',
  adaptiveBanner: 'ca-app-pub-3940256099942544/6300978111',
  
  // Interstitial Ads
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  
  // Rewarded Video Ads
  rewardedVideo: 'ca-app-pub-3940256099942544/5224354917',
  
  // Native Ads
  nativeAdvanced: 'ca-app-pub-3940256099942544/2247696110',
  
  // App Open Ads
  appOpen: 'ca-app-pub-3940256099942544/3419835294'
};

export type AdType = 'banner' | 'interstitial' | 'rewarded' | 'native' | 'appOpen';
export type AdStatus = 'loading' | 'loaded' | 'failed' | 'showing' | 'closed';

interface AdState {
  status: AdStatus;
  loadTime?: number;
  error?: string;
}

interface AdMobContextType {
  adStates: Record<string, AdState>;
  loadAd: (adId: string, type: AdType) => Promise<boolean>;
  showAd: (adId: string) => Promise<boolean>;
  getAdStatus: (adId: string) => AdStatus;
  isAdReady: (adId: string) => boolean;
  rewardedAdWatched: boolean;
  setRewardedAdWatched: (watched: boolean) => void;
}

const AdMobContext = createContext<AdMobContextType | undefined>(undefined);

interface AdMobProviderProps {
  children: ReactNode;
}

export function AdMobProvider({ children }: AdMobProviderProps) {
  const [adStates, setAdStates] = useState<Record<string, AdState>>({});
  const [rewardedAdWatched, setRewardedAdWatched] = useState(false);

  const updateAdState = useCallback((adId: string, updates: Partial<AdState>) => {
    setAdStates(prev => ({
      ...prev,
      [adId]: { ...prev[adId], ...updates }
    }));
  }, []);

  const loadAd = useCallback(async (adId: string, type: AdType): Promise<boolean> => {
    console.log(`Loading ${type} ad: ${adId}`);
    
    updateAdState(adId, { status: 'loading' });

    // Simulate realistic ad loading time (1-3 seconds)
    const loadTime = Math.random() * 2000 + 1000;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // 90% success rate for realistic simulation
        const success = Math.random() > 0.1;
        
        if (success) {
          updateAdState(adId, { 
            status: 'loaded', 
            loadTime: Date.now(),
            error: undefined 
          });
          console.log(`Ad loaded successfully: ${adId}`);
          resolve(true);
        } else {
          updateAdState(adId, { 
            status: 'failed', 
            error: 'Failed to load ad content' 
          });
          console.log(`Ad failed to load: ${adId}`);
          resolve(false);
        }
      }, loadTime);
    });
  }, [updateAdState]);

  const showAd = useCallback(async (adId: string): Promise<boolean> => {
    const adState = adStates[adId];
    
    if (!adState || adState.status !== 'loaded') {
      console.log(`Ad not ready to show: ${adId}`);
      return false;
    }

    updateAdState(adId, { status: 'showing' });
    
    // Simulate ad display time
    setTimeout(() => {
      updateAdState(adId, { status: 'closed' });
    }, 5000);

    return true;
  }, [adStates, updateAdState]);

  const getAdStatus = useCallback((adId: string): AdStatus => {
    return adStates[adId]?.status || 'loading';
  }, [adStates]);

  const isAdReady = useCallback((adId: string): boolean => {
    return adStates[adId]?.status === 'loaded';
  }, [adStates]);

  // Auto-load common ads on app start
  useEffect(() => {
    const autoLoadAds = [
      { id: 'main-banner', type: 'banner' as AdType },
      { id: 'main-interstitial', type: 'interstitial' as AdType },
      { id: 'completed-rewarded', type: 'rewarded' as AdType },
      { id: 'native-feed', type: 'native' as AdType }
    ];

    autoLoadAds.forEach(({ id, type }) => {
      loadAd(id, type);
    });
  }, [loadAd]);

  const value: AdMobContextType = {
    adStates,
    loadAd,
    showAd,
    getAdStatus,
    isAdReady,
    rewardedAdWatched,
    setRewardedAdWatched
  };

  return (
    <AdMobContext.Provider value={value}>
      {children}
    </AdMobContext.Provider>
  );
}

export function useAdMob() {
  const context = useContext(AdMobContext);
  if (context === undefined) {
    throw new Error('useAdMob must be used within an AdMobProvider');
  }
  return context;
}