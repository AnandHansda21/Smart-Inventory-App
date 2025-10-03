export function formatPrice(amount: number, currencySymbol: string): string {
  // Format the number with 2 decimal places
  const formattedAmount = amount.toFixed(2);
  
  // Handle different currency symbol placements
  const prefixSymbols = ['$', '€', '£', '₹', '¥', '₩', '₪', '₽', '₺', '₫', '₮', '₼', '₾', '₸', '₴', '₱', '₦', '₵', 'R', 'S$', 'HK$', 'C$', 'A$', 'NZ$', 'FJ$', 'J$', 'TT$', 'BZ$', 'BD$', 'BS$', 'R$', 'S/', '$U', '₡', 'Q', 'L', 'C$', 'B/.', 'Bs.', 'Bs', '₲', 'T$', 'WS$', '₿', 'Ξ'];
  const suffixSymbols = ['zł', 'Kč', 'Ft', 'kr', 'lei', 'лв', 'kn', 'VT'];
  const spaceBeforeSymbols = ['CHF', 'RSD', 'USh', 'KSh', 'TSh', 'Br', 'D', 'MAD', 'TND', 'CFA', 'XCD'];
  
  // Arabic/RTL currency symbols
  const arabicSymbols = ['﷼', 'د.إ', 'د.ك', 'د.ب', 'ر.ق', 'ر.ع', 'ر.أ', 'ل.ل', 'ل.س', 'د.ع', 'ر.إ', '؋'];
  
  if (prefixSymbols.includes(currencySymbol)) {
    return `${currencySymbol}${formattedAmount}`;
  } else if (suffixSymbols.includes(currencySymbol)) {
    return `${formattedAmount} ${currencySymbol}`;
  } else if (spaceBeforeSymbols.includes(currencySymbol)) {
    return `${currencySymbol} ${formattedAmount}`;
  } else if (arabicSymbols.includes(currencySymbol)) {
    return `${formattedAmount} ${currencySymbol}`;
  } else {
    // Default: prefix for unknown symbols
    return `${currencySymbol}${formattedAmount}`;
  }
}