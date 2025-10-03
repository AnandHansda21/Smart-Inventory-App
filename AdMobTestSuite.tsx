import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Icons } from '../ui/enhanced-icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AdMobBanner } from './AdMobBanner';
import { AdMobNative } from './AdMobNative';
import { AdMobInterstitial } from './AdMobInterstitial';
import { AdMobRewarded } from './AdMobRewarded';
import { AdMobAppOpen } from './AdMobAppOpen';
import { useAdMob, ADMOB_TEST_IDS } from '../context/AdMobContext';

export function AdMobTestSuite() {
  const { adStates, rewardedAdWatched } = useAdMob();
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [showRewarded, setShowRewarded] = useState(false);
  const [showAppOpen, setShowAppOpen] = useState(false);

  const adTypes = [
    {
      name: 'Banner Ads',
      description: 'Small rectangular ads that appear at top/bottom of screen',
      testId: ADMOB_TEST_IDS.banner,
      status: 'Active'
    },
    {
      name: 'Interstitial Ads',
      description: 'Full-screen ads that appear between content transitions',
      testId: ADMOB_TEST_IDS.interstitial,
      status: 'Active'
    },
    {
      name: 'Rewarded Video Ads',
      description: 'Video ads that reward users for watching completely',
      testId: ADMOB_TEST_IDS.rewardedVideo,
      status: rewardedAdWatched ? 'Rewarded' : 'Available'
    },
    {
      name: 'Native Ads',
      description: 'Ads that match the look and feel of your content',
      testId: ADMOB_TEST_IDS.nativeAdvanced,
      status: 'Active'
    },
    {
      name: 'App Open Ads',
      description: 'Full-screen ads shown when app is opened or resumed',
      testId: ADMOB_TEST_IDS.appOpen,
      status: 'Active'
    }
  ];

  const handleRewardEarned = (reward: { type: string; amount: number }) => {
    console.log('Test reward earned:', reward);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full"
          >
            <Icons.ad size="sm" />
            <span className="font-semibold">AdMob Test Suite</span>
          </motion.div>
          
          <h1 className="text-3xl font-bold">StockCall Ad Integration</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AdMob test ad implementation with all major ad formats. 
            All ads use official Google test unit IDs for safe testing.
          </p>
        </div>

        {/* Ad Types Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.list size="sm" />
              Implemented Ad Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {adTypes.map((ad, index) => (
                <motion.div
                  key={ad.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{ad.name}</h3>
                    <Badge variant={ad.status === 'Rewarded' ? 'default' : 'secondary'}>
                      {ad.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{ad.description}</p>
                  <div className="text-xs font-mono bg-muted p-2 rounded">
                    {ad.testId}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Test Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icons.play size="sm" />
              Test Ad Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button 
                onClick={() => setShowInterstitial(true)}
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <Icons.maximize size="lg" />
                <span>Test Interstitial</span>
              </Button>
              
              <Button 
                onClick={() => setShowRewarded(true)}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <Icons.play size="lg" />
                <span>Test Rewarded</span>
              </Button>
              
              <Button 
                onClick={() => setShowAppOpen(true)}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2"
              >
                <Icons.smartphone size="lg" />
                <span>Test App Open</span>
              </Button>
              
              <Button 
                variant="outline"
                disabled
                className="h-auto py-4 flex flex-col items-center gap-2 opacity-50"
              >
                <Icons.refresh size="lg" />
                <span>More Tests</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Ad Examples */}
        <Tabs defaultValue="banners" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="banners">Banner Ads</TabsTrigger>
            <TabsTrigger value="native">Native Ads</TabsTrigger>
            <TabsTrigger value="stats">Ad Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="banners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Banner Ad Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Standard Banner (320x50)</h4>
                  <AdMobBanner 
                    adId="test-banner-standard"
                    size="standard"
                    showCloseButton={true}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Large Banner (320x100)</h4>
                  <AdMobBanner 
                    adId="test-banner-large"
                    size="large"
                    showCloseButton={true}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Medium Rectangle (300x250)</h4>
                  <AdMobBanner 
                    adId="test-banner-medium"
                    size="medium"
                    showCloseButton={true}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Adaptive Banner</h4>
                  <AdMobBanner 
                    adId="test-banner-adaptive"
                    size="adaptive"
                    showCloseButton={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="native" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Native Ad Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Card Style Native Ad</h4>
                  <AdMobNative 
                    adId="test-native-card"
                    style="card"
                    showMediaView={true}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Banner Style Native Ad</h4>
                  <AdMobNative 
                    adId="test-native-banner"
                    style="banner"
                    compact={true}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">List Style Native Ad</h4>
                  <AdMobNative 
                    adId="test-native-list"
                    style="list"
                    showMediaView={false}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Content Style Native Ad</h4>
                  <AdMobNative 
                    adId="test-native-content"
                    style="content"
                    showMediaView={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ad Performance Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Object.keys(adStates).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Ads</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(adStates).filter(ad => ad.status === 'loaded').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Loaded</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {Object.values(adStates).filter(ad => ad.status === 'loading').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Loading</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {Object.values(adStates).filter(ad => ad.status === 'failed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    📊 Implementation Status
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>✅ Banner ads integrated across all screens</li>
                    <li>✅ Native ads in content feeds</li>
                    <li>✅ Interstitial ads on user interactions</li>
                    <li>✅ Rewarded video for premium access</li>
                    <li>✅ App open ads on startup</li>
                    <li>✅ All using official Google test IDs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>All ads are using official Google AdMob test unit IDs</p>
          <p>Ready for production deployment with real ad unit IDs</p>
        </div>
      </div>

      {/* Test Ad Overlays */}
      <AdMobInterstitial
        adId="test-interstitial"
        isOpen={showInterstitial}
        onClose={() => setShowInterstitial(false)}
        autoClose={true}
      />

      <AdMobRewarded
        adId="test-rewarded"
        isOpen={showRewarded}
        onClose={() => setShowRewarded(false)}
        onRewardEarned={handleRewardEarned}
        rewardType="Test Coins"
        rewardAmount={100}
        title="Test Rewarded Video"
        description="This is a test of the rewarded video ad system"
      />

      <AdMobAppOpen
        adId="test-app-open"
        isOpen={showAppOpen}
        onClose={() => setShowAppOpen(false)}
      />
    </div>
  );
}