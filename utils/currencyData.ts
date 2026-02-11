export const CURRENCY_DEFAULT_HOURLY_MINIMUMS: Record<string, number> = {
    'US': 10,        // $10/hour = $0.1667/min
    'IN': 100.0,     // ₹100/hour ≈ $1.2/hour = $0.02/min
    'PH': 70,        // ₱70/hour ≈ $1.232/hour = $0.0205/min
    'VN': 30769.23,  // ₫30769.23/hour ≈ $1.2/hour = $0.02/min
    'BD': 130.43,    // ৳130.43/hour ≈ $1.2/hour = $0.02/min
    'PK': 333.33,    // ₨333.33/hour ≈ $1.2/hour = $0.02/min
    'NG': 1538.46,   // ₦1538.46/hour ≈ $1.2/hour = $0.02/min
    'EG': 58.54,     // E£58.54/hour ≈ $1.2/hour = $0.02/min
    'BR': 8,         // R$8/hour ≈ $1.56/hour = $0.026/min
    'MX': 45,        // $45/hour ≈ $2.6235/hour = $0.0437/min
    'RU': 111.11,    // ₽111.11/hour ≈ $1.2/hour = $0.02/min
    'ID': 19354.84,  // Rp19354.84/hour ≈ $1.2/hour = $0.02/min
    'TH': 60,        // ฿60/hour ≈ $1.626/hour = $0.0271/min
    'ZA': 30,        // R30/hour ≈ $1.569/hour = $0.0261/min
    'CN': 20,        // ¥20/hour ≈ $2.77/hour = $0.0462/min
    'JP': 1000,      // ¥1000/hour ≈ $6.6/hour = $0.11/min
    'GB': 10,        // £10/hour ≈ $12.7/hour = $0.2117/min
    'CA': 15,        // C$15/hour ≈ $11.115/hour = $0.1852/min
    'AU': 20,        // A$20/hour ≈ $13.12/hour = $0.2187/min
    'SG': 10,        // S$10/hour ≈ $7.38/hour = $0.123/min
    'MY': 7,         // RM7/hour ≈ $1.477/hour = $0.0246/min
    'HK': 30,        // HK$30/hour ≈ $3.828/hour = $0.0638/min
    'AE': 7,         // AED7/hour ≈ $1.904/hour = $0.0317/min
    'SA': 8,         // SAR8/hour ≈ $2.128/hour = $0.0355/min
    'AR': 1100.92,   // $1100.92/hour ≈ $1.2/hour = $0.02/min
    'IR': 508474.58, // ﷼508474.58/hour ≈ $1.2/hour = $0.02/min
    'CO': 7500,      // $7500/hour ≈ $1.905/hour = $0.0318/min
    'CL': 2800,      // $2800/hour ≈ $2.8644/hour = $0.0477/min
    'PE': 6,         // S/6/hour ≈ $1.602/hour = $0.0267/min
    'NZ': 20,        // NZ$20/hour ≈ $11.86/hour = $0.1977/min
    'IL': 30,        // ₪30/hour ≈ $7.86/hour = $0.131/min
    'RO': 20,        // lei20/hour ≈ $4.34/hour = $0.0723/min
    'PL': 25,        // zł25/hour ≈ $6.175/hour = $0.1029/min
    'UA': 48.0,      // ₴48/hour ≈ $1.2/hour = $0.02/min
    'CZ': 120,       // Kč120/hour ≈ $4.884/hour = $0.0814/min
    'HU': 1600,      // Ft1600/hour ≈ $4.304/hour = $0.0717/min
    'KZ': 540.54,    // ₸540.54/hour ≈ $1.2/hour = $0.02/min
    'UZ': 15384.62,  // so'm15384.62/hour ≈ $1.2/hour = $0.02/min
    'BY': 4,         // Br4/hour ≈ $1.232/hour = $0.0205/min
    'GE': 5,         // ₾5/hour ≈ $1.88/hour = $0.0313/min
    'AM': 480.0,     // ֏480/hour ≈ $1.2/hour = $0.02/min
    'MD': 25,        // L25/hour ≈ $1.3925/hour = $0.0232/min
    'KG': 106.19,    // сом106.19/hour ≈ $1.2/hour = $0.02/min
};

export const CURRENCY_LABELS: Record<string, string> = {
    "US": "USD", "GB": "GBP", "JP": "JPY", "CN": "CNY", "IN": "INR",
    "BR": "BRL", "RU": "RUB", "CA": "CAD", "AU": "AUD", "CH": "CHF",
    "KR": "KRW", "MX": "MXN", "ID": "IDR", "TR": "TRY", "SA": "SAR",
    "AR": "ARS", "TH": "THB", "ZA": "ZAR", "EG": "EGP", "NG": "NGN",
    "PK": "PKR", "BD": "BDT", "VN": "VND", "PH": "PHP", "IR": "IRR",
    "MY": "MYR", "CO": "COP", "CL": "CLP", "PE": "PEN", "NZ": "NZD",
    "SG": "SGD", "HK": "HKD", "AE": "AED", "IL": "ILS", "NO": "NOK",
    "SE": "SEK", "DK": "DKK", "PL": "PLN", "CZ": "CZK", "HU": "HUF",
    "RO": "RON", "UA": "UAH", "KZ": "KZT", "UZ": "UZS", "BY": "BYN",
    "AZ": "AZN", "GE": "GEL", "AM": "AMD", "MD": "MDL", "KG": "KGS"
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
    "US": "$", "GB": "£", "JP": "¥", "CN": "¥", "IN": "₹",
    "BR": "R$", "RU": "₽", "CA": "C$", "AU": "A$", "CH": "Fr",
    "KR": "₩", "MX": "Mex$", "ID": "Rp", "TR": "₺", "SA": "﷼",
    "AR": "$", "TH": "฿", "ZA": "R", "EG": "E£", "NG": "₦",
    "PK": "₨", "BD": "৳", "VN": "₫", "PH": "₱", "IR": "﷼",
    "MY": "RM", "CO": "$", "CL": "$", "PE": "S/", "NZ": "NZ$",
    "SG": "S$", "HK": "HK$", "AE": "د.إ", "IL": "₪", "NO": "kr",
    "SE": "kr", "DK": "kr", "PL": "zł", "CZ": "Kč", "HU": "Ft",
    "RO": "lei", "UA": "₴", "KZ": "₸", "UZ": "so'm", "BY": "Br",
    "AZ": "₼", "GE": "₾", "AM": "֏", "MD": "L", "KG": "с"
};

export const COUNTRIES_WITH_CURRENCIES = [
    "US", "GB", "JP", "CN", "IN", "BR", "RU", "CA", "AU", "CH",
    "KR", "MX", "ID", "TR", "SA", "AR", "TH", "ZA", "EG", "NG",
    "PK", "BD", "VN", "PH", "IR", "MY", "CO", "CL", "PE", "NZ",
    "SG", "HK", "AE", "IL", "NO", "SE", "DK", "PL", "CZ", "HU",
    "RO", "UA", "KZ", "UZ", "BY", "AZ", "GE", "AM", "MD", "KG"
];

export const MINIMUM_COST_PER_MINUTE = 0.02;

// Get the minimum hourly rate for a given country code
export const getMinimumHourlyRate = (countryCode: string): number => {
    return CURRENCY_DEFAULT_HOURLY_MINIMUMS[countryCode] || CURRENCY_DEFAULT_HOURLY_MINIMUMS['US'];
};

// Convert an amount from local currency to USD based on the country code
export const convertToUsd = (amount: number, countryCode: string): number => {
    // This is a simplified conversion. In a real application, you would use actual exchange rates.
    // For now, we'll use the minimum hourly rate as a proxy for the exchange rate.
    const minimumRate = getMinimumHourlyRate(countryCode);
    return (amount / minimumRate) * CURRENCY_DEFAULT_HOURLY_MINIMUMS['US'];
};

type SalaryType = 'hourly' | 'monthly' | 'yearly';

// Ensure the given amount meets the minimum rate requirements
export const ensureMinimumRate = (amount: number, countryCode: string, salaryType: SalaryType): number => {
    let hourlyRate = amount;
    if (salaryType === 'monthly') {
        hourlyRate = amount / 160;  // Assuming 160 hours per month
    } else if (salaryType === 'yearly') {
        hourlyRate = amount / 1920;  // Assuming 1920 hours per year
    }

    const minimumRate = getMinimumHourlyRate(countryCode);
    if (hourlyRate < minimumRate) {
        // Adjust the input amount to meet the minimum rate
        if (salaryType === 'hourly') {
            return minimumRate;
        } else if (salaryType === 'monthly') {
            return minimumRate * 160;
        } else {  // yearly
            return minimumRate * 1920;
        }
    }
    return amount;
};

// Get default salary value (2x minimum rate)
export const getDefaultSalary = (countryCode: string, salaryType: SalaryType): number => {
    const minimumHourly = getMinimumHourlyRate(countryCode);
    const defaultHourly = Math.ceil(minimumHourly * 2);

    if (salaryType === 'hourly') {
        return defaultHourly;
    } else if (salaryType === 'monthly') {
        return Math.ceil(defaultHourly * 160);
    } else { // yearly
        return Math.ceil(defaultHourly * 1920);
    }
};
