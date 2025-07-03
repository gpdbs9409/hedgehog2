import axios from 'axios';
import { load } from 'cheerio';

interface ExchangeRate {
  currency: string;
  bid: number;
  ask: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
  time: string;
}

const CURRENCY_PAIRS = {
  'USD': 'USD/KRW',
  'EUR': 'EUR/KRW',
  'JPY': 'JPY/KRW',
  'CNY': 'CNY/KRW',
  'GBP': 'GBP/KRW',
};

export interface SimpleExchangeRate {
  currency: string;
  value: string;
}

export const fetchExchangeRates = async (): Promise<SimpleExchangeRate[]> => {
  const res = await fetch('http://localhost:5050/api/exchange');
  return await res.json();
};

export const fetchExchangeRateHistory = async (currency: string): Promise<{ time: string; value: number }[]> => {
  try {
    // 실제로는 API에서 히스토리 데이터를 가져와야 하지만, 임시 데이터 생성
    const baseValue = currency.startsWith('USD') ? 1318 :
                     currency.startsWith('EUR') ? 1435 :
                     currency.startsWith('JPY') ? 8.79 :
                     currency.startsWith('CNY') ? 183 : 1668;
    
    return Array.from({ length: 24 }, (_, i) => {
      const time = new Date();
      time.setHours(time.getHours() - i);
      return {
        time: time.toLocaleTimeString(),
        value: baseValue + (Math.random() - 0.5) * 2
      };
    }).reverse();
  } catch (error) {
    console.error(`Failed to fetch exchange rate history for ${currency}:`, error);
    return [];
  }
}; 