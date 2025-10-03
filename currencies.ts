export interface Currency {
  symbol: string;
  name: string;
  code: string;
  country: string;
}

export const currencies: Currency[] = [
  // Major currencies
  { symbol: '$', name: 'US Dollar', code: 'USD', country: 'United States' },
  { symbol: '€', name: 'Euro', code: 'EUR', country: 'European Union' },
  { symbol: '£', name: 'British Pound', code: 'GBP', country: 'United Kingdom' },
  { symbol: '¥', name: 'Japanese Yen', code: 'JPY', country: 'Japan' },
  { symbol: '¥', name: 'Chinese Yuan', code: 'CNY', country: 'China' },
  { symbol: '₹', name: 'Indian Rupee', code: 'INR', country: 'India' },
  { symbol: 'CHF', name: 'Swiss Franc', code: 'CHF', country: 'Switzerland' },
  { symbol: 'C$', name: 'Canadian Dollar', code: 'CAD', country: 'Canada' },
  { symbol: 'A$', name: 'Australian Dollar', code: 'AUD', country: 'Australia' },
  
  // Asian currencies
  { symbol: '₩', name: 'South Korean Won', code: 'KRW', country: 'South Korea' },
  { symbol: 'S$', name: 'Singapore Dollar', code: 'SGD', country: 'Singapore' },
  { symbol: 'HK$', name: 'Hong Kong Dollar', code: 'HKD', country: 'Hong Kong' },
  { symbol: '₪', name: 'Israeli Shekel', code: 'ILS', country: 'Israel' },
  { symbol: '₽', name: 'Russian Ruble', code: 'RUB', country: 'Russia' },
  { symbol: '₺', name: 'Turkish Lira', code: 'TRY', country: 'Turkey' },
  { symbol: 'Rs', name: 'Pakistani Rupee', code: 'PKR', country: 'Pakistan' },
  { symbol: 'Rs', name: 'Sri Lankan Rupee', code: 'LKR', country: 'Sri Lanka' },
  { symbol: 'Rs', name: 'Nepalese Rupee', code: 'NPR', country: 'Nepal' },
  { symbol: 'Rs', name: 'Mauritian Rupee', code: 'MUR', country: 'Mauritius' },
  { symbol: 'Rs', name: 'Seychellois Rupee', code: 'SCR', country: 'Seychelles' },
  { symbol: 'Rp', name: 'Indonesian Rupiah', code: 'IDR', country: 'Indonesia' },
  { symbol: '₫', name: 'Vietnamese Dong', code: 'VND', country: 'Vietnam' },
  { symbol: '₮', name: 'Mongolian Tugrik', code: 'MNT', country: 'Mongolia' },
  { symbol: '₼', name: 'Azerbaijani Manat', code: 'AZN', country: 'Azerbaijan' },
  { symbol: '₾', name: 'Georgian Lari', code: 'GEL', country: 'Georgia' },
  { symbol: '₸', name: 'Kazakhstani Tenge', code: 'KZT', country: 'Kazakhstan' },
  { symbol: '₴', name: 'Ukrainian Hryvnia', code: 'UAH', country: 'Ukraine' },
  { symbol: '₱', name: 'Philippine Peso', code: 'PHP', country: 'Philippines' },
  { symbol: '₦', name: 'Nigerian Naira', code: 'NGN', country: 'Nigeria' },
  { symbol: '₵', name: 'Ghanaian Cedi', code: 'GHS', country: 'Ghana' },
  { symbol: 'zł', name: 'Polish Zloty', code: 'PLN', country: 'Poland' },
  { symbol: 'Kč', name: 'Czech Koruna', code: 'CZK', country: 'Czech Republic' },
  { symbol: 'Ft', name: 'Hungarian Forint', code: 'HUF', country: 'Hungary' },
  { symbol: 'kr', name: 'Danish Krone', code: 'DKK', country: 'Denmark' },
  { symbol: 'kr', name: 'Swedish Krona', code: 'SEK', country: 'Sweden' },
  { symbol: 'kr', name: 'Norwegian Krone', code: 'NOK', country: 'Norway' },
  { symbol: 'kr', name: 'Icelandic Krona', code: 'ISK', country: 'Iceland' },
  
  // Middle Eastern currencies
  { symbol: '﷼', name: 'Saudi Riyal', code: 'SAR', country: 'Saudi Arabia' },
  { symbol: 'د.إ', name: 'UAE Dirham', code: 'AED', country: 'United Arab Emirates' },
  { symbol: 'د.ك', name: 'Kuwaiti Dinar', code: 'KWD', country: 'Kuwait' },
  { symbol: 'د.ب', name: 'Bahraini Dinar', code: 'BHD', country: 'Bahrain' },
  { symbol: 'ر.ق', name: 'Qatari Riyal', code: 'QAR', country: 'Qatar' },
  { symbol: 'ر.ع', name: 'Omani Rial', code: 'OMR', country: 'Oman' },
  { symbol: 'ر.أ', name: 'UAE Dirham', code: 'AED', country: 'UAE' },
  { symbol: 'ل.ل', name: 'Lebanese Pound', code: 'LBP', country: 'Lebanon' },
  { symbol: 'ل.س', name: 'Syrian Pound', code: 'SYP', country: 'Syria' },
  { symbol: 'د.ع', name: 'Iraqi Dinar', code: 'IQD', country: 'Iraq' },
  { symbol: 'ر.إ', name: 'Iranian Rial', code: 'IRR', country: 'Iran' },
  { symbol: '؋', name: 'Afghan Afghani', code: 'AFN', country: 'Afghanistan' },
  
  // African currencies
  { symbol: 'R', name: 'South African Rand', code: 'ZAR', country: 'South Africa' },
  { symbol: 'E£', name: 'Egyptian Pound', code: 'EGP', country: 'Egypt' },
  { symbol: 'USh', name: 'Ugandan Shilling', code: 'UGX', country: 'Uganda' },
  { symbol: 'KSh', name: 'Kenyan Shilling', code: 'KES', country: 'Kenya' },
  { symbol: 'TSh', name: 'Tanzanian Shilling', code: 'TZS', country: 'Tanzania' },
  { symbol: 'Br', name: 'Ethiopian Birr', code: 'ETB', country: 'Ethiopia' },
  { symbol: 'D', name: 'Algerian Dinar', code: 'DZD', country: 'Algeria' },
  { symbol: 'MAD', name: 'Moroccan Dirham', code: 'MAD', country: 'Morocco' },
  { symbol: 'TND', name: 'Tunisian Dinar', code: 'TND', country: 'Tunisia' },
  { symbol: 'CFA', name: 'West African CFA Franc', code: 'XOF', country: 'West Africa' },
  { symbol: 'CFA', name: 'Central African CFA Franc', code: 'XAF', country: 'Central Africa' },
  
  // Latin American currencies
  { symbol: 'R$', name: 'Brazilian Real', code: 'BRL', country: 'Brazil' },
  { symbol: '$', name: 'Mexican Peso', code: 'MXN', country: 'Mexico' },
  { symbol: '$', name: 'Argentine Peso', code: 'ARS', country: 'Argentina' },
  { symbol: '$', name: 'Chilean Peso', code: 'CLP', country: 'Chile' },
  { symbol: '$', name: 'Colombian Peso', code: 'COP', country: 'Colombia' },
  { symbol: 'S/', name: 'Peruvian Sol', code: 'PEN', country: 'Peru' },
  { symbol: '$U', name: 'Uruguayan Peso', code: 'UYU', country: 'Uruguay' },
  { symbol: '₡', name: 'Costa Rican Colón', code: 'CRC', country: 'Costa Rica' },
  { symbol: 'Q', name: 'Guatemalan Quetzal', code: 'GTQ', country: 'Guatemala' },
  { symbol: 'L', name: 'Honduran Lempira', code: 'HNL', country: 'Honduras' },
  { symbol: 'C$', name: 'Nicaraguan Córdoba', code: 'NIO', country: 'Nicaragua' },
  { symbol: 'B/.', name: 'Panamanian Balboa', code: 'PAB', country: 'Panama' },
  { symbol: 'Bs.', name: 'Venezuelan Bolívar', code: 'VES', country: 'Venezuela' },
  { symbol: 'Bs', name: 'Bolivian Boliviano', code: 'BOB', country: 'Bolivia' },
  { symbol: '₲', name: 'Paraguayan Guaraní', code: 'PYG', country: 'Paraguay' },
  
  // Oceania currencies
  { symbol: 'NZ$', name: 'New Zealand Dollar', code: 'NZD', country: 'New Zealand' },
  { symbol: 'FJ$', name: 'Fijian Dollar', code: 'FJD', country: 'Fiji' },
  { symbol: 'T$', name: 'Tongan Paʻanga', code: 'TOP', country: 'Tonga' },
  { symbol: 'WS$', name: 'Samoan Tala', code: 'WST', country: 'Samoa' },
  { symbol: 'VT', name: 'Vanuatu Vatu', code: 'VUV', country: 'Vanuatu' },
  
  // Caribbean currencies
  { symbol: 'J$', name: 'Jamaican Dollar', code: 'JMD', country: 'Jamaica' },
  { symbol: 'TT$', name: 'Trinidad and Tobago Dollar', code: 'TTD', country: 'Trinidad and Tobago' },
  { symbol: 'BZ$', name: 'Belize Dollar', code: 'BZD', country: 'Belize' },
  { symbol: 'BD$', name: 'Bermudian Dollar', code: 'BMD', country: 'Bermuda' },
  { symbol: 'BS$', name: 'Bahamian Dollar', code: 'BSD', country: 'Bahamas' },
  { symbol: 'XCD', name: 'Eastern Caribbean Dollar', code: 'XCD', country: 'Eastern Caribbean' },
  
  // Other European currencies
  { symbol: 'lei', name: 'Romanian Leu', code: 'RON', country: 'Romania' },
  { symbol: 'лв', name: 'Bulgarian Lev', code: 'BGN', country: 'Bulgaria' },
  { symbol: 'kn', name: 'Croatian Kuna', code: 'HRK', country: 'Croatia' },
  { symbol: 'RSD', name: 'Serbian Dinar', code: 'RSD', country: 'Serbia' },
  { symbol: 'лв', name: 'Macedonian Denar', code: 'MKD', country: 'North Macedonia' },
  { symbol: '€', name: 'Euro', code: 'EUR', country: 'Eurozone' },
  
  // Cryptocurrencies (for modern users)
  { symbol: '₿', name: 'Bitcoin', code: 'BTC', country: 'Digital' },
  { symbol: 'Ξ', name: 'Ethereum', code: 'ETH', country: 'Digital' },
];