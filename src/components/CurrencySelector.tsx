import { useState } from 'react';
import { Check, ChevronDown, Search, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { currencies, Currency } from '../data/currencies';
import { useApp } from '../context/AppContext';

export function CurrencySelector() {
  const { state, dispatch } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.symbol.includes(searchQuery)
  );

  const currentCurrency = currencies.find(c => c.symbol === state.currency) || 
    { symbol: state.currency, name: 'Custom Currency', code: 'CUSTOM', country: 'Unknown' };

  const handleCurrencySelect = (currency: Currency) => {
    dispatch({ type: 'SET_CURRENCY', payload: currency.symbol });
    setIsOpen(false);
    setSearchQuery('');
  };

  // Group currencies by region for better organization
  const groupedCurrencies = filteredCurrencies.reduce((groups, currency) => {
    let region = 'Other';
    
    if (['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'CHF', 'CAD', 'AUD'].includes(currency.code)) {
      region = 'Major Currencies';
    } else if (['KRW', 'SGD', 'HKD', 'VND', 'THB', 'MYR', 'PHP', 'IDR'].includes(currency.code)) {
      region = 'Asian Currencies';
    } else if (['SAR', 'AED', 'KWD', 'BHD', 'QAR', 'OMR', 'ILS'].includes(currency.code)) {
      region = 'Middle Eastern';
    } else if (['ZAR', 'NGN', 'EGP', 'KES', 'UGX', 'GHS'].includes(currency.code)) {
      region = 'African Currencies';
    } else if (['BRL', 'MXN', 'ARS', 'CLP', 'COP', 'PEN'].includes(currency.code)) {
      region = 'Latin American';
    } else if (['PLN', 'CZK', 'HUF', 'DKK', 'SEK', 'NOK', 'RON'].includes(currency.code)) {
      region = 'European Currencies';
    } else if (['BTC', 'ETH'].includes(currency.code)) {
      region = 'Digital Currencies';
    }
    
    if (!groups[region]) groups[region] = [];
    groups[region].push(currency);
    return groups;
  }, {} as Record<string, Currency[]>);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">{currentCurrency.symbol}</span>
            <div className="text-left">
              <p className="font-medium">{currentCurrency.name}</p>
              <p className="text-sm text-muted-foreground">{currentCurrency.code}</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Select Currency
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search currencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Currency List */}
          <ScrollArea className="h-[400px]">
            <div className="space-y-6">
              {Object.entries(groupedCurrencies)
                .sort(([a], [b]) => {
                  const order = ['Major Currencies', 'Asian Currencies', 'European Currencies', 'Middle Eastern', 'African Currencies', 'Latin American', 'Digital Currencies', 'Other'];
                  return order.indexOf(a) - order.indexOf(b);
                })
                .map(([region, currencies]) => (
                  <div key={region}>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2 px-2">
                      {region}
                    </h4>
                    <div className="space-y-1">
                      {currencies.map((currency, index) => (
                        <Button
                          key={`${currency.code}-${index}`}
                          variant="ghost"
                          className="w-full justify-start h-auto p-3"
                          onClick={() => handleCurrencySelect(currency)}
                        >
                          <div className="flex items-center gap-3 w-full">
                            <span className="text-xl min-w-[2rem]">{currency.symbol}</span>
                            <div className="flex-1 text-left">
                              <p className="font-medium">{currency.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {currency.code} • {currency.country}
                              </p>
                            </div>
                            {currency.symbol === state.currency && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}