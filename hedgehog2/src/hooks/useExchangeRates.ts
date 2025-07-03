import { useEffect, useState } from "react";
import {
  fetchExchangeRateHistory,
  fetchExchangeRates,
} from "../services/exchangeRateService";

interface ChartData {
  time: string;
  bid: number;
  ask: number;
}

interface ExchangeRate {
  currency: string;
  // bid: number;
  // ask: number;
  // high: number;
  // low: number;
  // change: number;
  // changePercent: number;
  // time: string;
  chartData: ChartData[];
}

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exchangeRates = await fetchExchangeRates();
        const ratesWithChartData = await Promise.all(
          exchangeRates.map(async (rate) => {
            const historyData = await fetchExchangeRateHistory(rate.currency);
            const chartData = historyData.map((data) => ({
              time: data.time,
              bid: data.value,
              ask: data.value + (Math.random() * 0.1 + 0.1), // 실제로는 API에서 매도가도 함께 받아와야 합니다
            }));
            return { ...rate, chartData };
          })
        );
        setRates(ratesWithChartData);
        setError(null);
      } catch (err) {
        setError("환율 정보를 가져오는데 실패했습니다");
        console.error("Error fetching exchange rates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // 5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return { rates, loading, error };
};

export default useExchangeRates;
