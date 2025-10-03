import { useState, useEffect } from 'react';

export function DeviceDebugInfo() {
  const [showDebug, setShowDebug] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    screenWidth: 0,
    screenHeight: 0,
    windowWidth: 0,
    windowHeight: 0,
    devicePixelRatio: 1,
    userAgent: '',
    fontSize: '',
    touchTargetMin: '',
    iconSizeMd: '',
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      setDeviceInfo({
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        userAgent: navigator.userAgent,
        fontSize: rootStyles.fontSize || '',
        touchTargetMin: rootStyles.getPropertyValue('--touch-target-min') || '',
        iconSizeMd: rootStyles.getPropertyValue('--icon-size-md') || '',
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  // Show debug info only in development and when toggled
  if (process.env.NODE_ENV !== 'development' || !showDebug) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 text-white p-2 text-xs font-mono max-h-40 overflow-y-auto">
      <button
        onClick={() => setShowDebug(false)}
        className="float-right text-red-400 hover:text-red-300"
      >
        ✕
      </button>
      <div className="space-y-1">
        <div>Screen: {deviceInfo.screenWidth}×{deviceInfo.screenHeight}</div>
        <div>Window: {deviceInfo.windowWidth}×{deviceInfo.windowHeight}</div>
        <div>DPR: {deviceInfo.devicePixelRatio}</div>
        <div>Font Size: {deviceInfo.fontSize}</div>
        <div>Touch Target: {deviceInfo.touchTargetMin}</div>
        <div>Icon Size: {deviceInfo.iconSizeMd}</div>
        <div>UA: {deviceInfo.userAgent.slice(0, 50)}...</div>
      </div>
    </div>
  );
}