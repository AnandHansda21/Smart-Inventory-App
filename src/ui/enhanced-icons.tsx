import { Search, Plus, Mic, CircleCheck as CheckCircle2, Trash2, Settings, ArrowLeft, MoveVertical as MoreVertical, CreditCard as Edit3, Archive, RotateCcw, Download, Palette, Moon, Sun, Globe, TriangleAlert as AlertTriangle, Package, ShoppingCart, Chrome as Home, Clock, ListFilter as Filter, Dessert as SortDesc, TrendingUp, DollarSign, Calculator, Tag, Star, Heart, Eye, EyeOff, Zap, Target, Award, Bookmark, Share2, Copy, ExternalLink, Smartphone, Tablet, Monitor, Volume2, VolumeX, WifiOff, Wifi, Battery, BatteryLow, Signal, SignalLow, X, CircleAlert as AlertCircle, Play, Pause, SkipBack as Skip, Check, ArrowRight, Maximize, Gift, Gamepad, List, RefreshCw, SkipForward } from 'lucide-react';
import { cn } from '../utils/utils';

// Enhanced icon sizes for mobile-first design
export const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
} as const;

type IconSize = keyof typeof iconSizes;

interface EnhancedIconProps {
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
}

// Modern, professional icon components optimized for mobile apps
export const Icons = {
  // Navigation & Actions
  search: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Search className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  add: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Plus className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  microphone: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Mic className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  back: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <ArrowLeft className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  menu: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <MoreVertical className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  edit: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Edit3 className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // Status & States
  completed: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <CheckCircle2 className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  pending: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Clock className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  trash: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Trash2 className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  archive: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Archive className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  warning: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <AlertTriangle className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // App Features
  inventory: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Package className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  shopping: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <ShoppingCart className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  home: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Home className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  calculator: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Calculator className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  price: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <DollarSign className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  tag: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Tag className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  trending: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <TrendingUp className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // Settings & Preferences
  settings: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Settings className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  theme: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Palette className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  darkMode: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Moon className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  lightMode: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Sun className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  globe: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Globe className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // Actions
  download: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Download className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  reset: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <RotateCcw className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  filter: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Filter className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  sort: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <SortDesc className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // Engagement
  star: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Star className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  heart: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Heart className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  bookmark: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Bookmark className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  share: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Share2 className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  copy: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Copy className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  external: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <ExternalLink className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // Visibility
  visible: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Eye className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  hidden: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <EyeOff className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // Special
  premium: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Zap className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  target: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Target className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  award: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Award className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  // Device Status
  phone: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Smartphone className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  tablet: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Tablet className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  desktop: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Monitor className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  volume: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Volume2 className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  volumeOff: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <VolumeX className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  wifi: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Wifi className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  wifiOff: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <WifiOff className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  battery: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Battery className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  batteryLow: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <BatteryLow className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  signal: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Signal className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
  
  signalLow: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <SignalLow className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  // AdMob specific icons
  close: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <X className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  alertCircle: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <AlertCircle className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  ad: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Target className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  play: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Play className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  pause: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Pause className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  skip: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <SkipForward className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  check: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Check className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  arrowRight: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <ArrowRight className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  maximize: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Maximize className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  gift: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Gift className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  gamepad: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Gamepad className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  list: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <List className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  refresh: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <RefreshCw className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),

  smartphone: ({ size = 'md', className, strokeWidth = 2 }: EnhancedIconProps) => (
    <Smartphone className={cn(iconSizes[size], className)} strokeWidth={strokeWidth} />
  ),
} as const;

// Utility component for responsive icons
export function ResponsiveIcon({ 
  icon, 
  size = 'md', 
  className, 
  strokeWidth = 1.5 
}: {
  icon: keyof typeof Icons;
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
}) {
  const IconComponent = Icons[icon];
  return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
}