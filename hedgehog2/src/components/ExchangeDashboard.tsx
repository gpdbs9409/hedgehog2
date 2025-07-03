import { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ExchangeRate {
  currency: string;
  base_rate: string;
  cash_buy: string;
  cash_sell: string;
  remittance_send: string;
  remittance_receive: string;
  buy_spread: string;
  change: string;
}

const fetchExchangeRates = async () => {
  const res = await fetch('http://localhost:5050/api/exchange');
  return await res.json();
};

const MAIN_CURRENCIES = ['미국 USD', '유럽연합 EUR', '일본 JPY(100엔)', '중국 CNY'];

function seededRandom(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return function() {
    h += h << 13; h ^= h >>> 7;
    h += h << 3; h ^= h >>> 17;
    h += h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

const ExchangeDashboard = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ExchangeRate | null>(null);
  const [rateColors, setRateColors] = useState<{ [currency: string]: string }>({});
  const prevRates = useRef<ExchangeRate[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetchExchangeRates().then(res => {
        setRates(prev => {
          // 임시: base_rate에 랜덤 변화 추가 (테스트용)
          res.data.forEach((rate: any) => {
            const base = parseFloat(rate.base_rate.replace(/,/g, ''));
            // 0.1% 이내 랜덤 변화
            const newVal = base * (1 + (Math.random() - 0.5) * 0.002);
            rate.base_rate = newVal.toFixed(2);
          });
          // 변화 감지 및 색상 효과 적용
          const newColors: { [currency: string]: string } = {};
          res.data.forEach((rate: ExchangeRate) => {
            const prev = prevRates.current.find(r => r.currency === rate.currency);
            if (prev) {
              const prevVal = parseFloat(prev.base_rate.replace(/,/g, ''));
              const currVal = parseFloat(rate.base_rate.replace(/,/g, ''));
              if (currVal !== prevVal) newColors[rate.currency] = 'bg-yellow-100 text-yellow-800';
            }
          });
          setRateColors(newColors);
          setTimeout(() => setRateColors({}), 700);
          prevRates.current = res.data;
          return res.data;
        });
        setLoading(false);
      });
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="py-12 text-center text-gray-500">Loading...</div>;

  const mainRates = rates.filter(r => MAIN_CURRENCIES.includes(r.currency));
  const otherRates = rates.filter(r => !MAIN_CURRENCIES.includes(r.currency));

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 text-gray-900">실시간 환율</h2>
      <div className="bg-red-500 text-white p-4 mb-2">Tailwind 적용 테스트 (빨간색이면 정상)</div>
      <div className="animate-glow p-4 mb-8">Glow 애니메이션 테스트 (노란빛 반짝임이면 정상)</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {mainRates.map((rate, idx) => (
          <div
            key={rate.currency}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition cursor-pointer border border-gray-100"
            onClick={() => setSelected(rate)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-primary-600">{rate.currency}</span>
              <button className="ml-2 px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100">알림</button>
            </div>
            <div className={`text-3xl font-bold mb-1 transition-all duration-300 ${rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : 'text-gray-900'}`}>{rate.base_rate}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className={rate.change.includes('▲') ? 'text-green-600' : rate.change.includes('▼') ? 'text-red-600' : 'text-gray-500'}>
                {rate.change}
              </span>
              {/* Sparkline placeholder */}
              <span className="inline-block w-16 h-6 bg-gradient-to-r from-primary-100 to-primary-300 rounded-full opacity-40" />
            </div>
            <div className="mt-2 text-xs text-gray-500">현찰(살때): {rate.cash_buy} / 현찰(팔때): {rate.cash_sell}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-primary-50">
            <tr>
              <th className="px-4 py-2 text-left">통화</th>
              <th className="px-4 py-2">기준환율</th>
              <th className="px-4 py-2">현찰(살때)</th>
              <th className="px-4 py-2">현찰(팔때)</th>
              <th className="px-4 py-2">송금(보낼때)</th>
              <th className="px-4 py-2">송금(받을때)</th>
              <th className="px-4 py-2">매매기준율</th>
              <th className="px-4 py-2">전일대비</th>
            </tr>
          </thead>
          <tbody>
            {otherRates.map((rate, idx) => (
              <tr key={idx} className="even:bg-gray-50">
                <td className="px-4 py-2 text-gray-900 font-medium">{rate.currency}</td>
                <td className={`px-4 py-2 transition-all duration-300 ${rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : ''}`}>{rate.base_rate}</td>
                <td className={`px-4 py-2 transition-all duration-300 ${rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : ''}`}>{rate.cash_buy}</td>
                <td className={`px-4 py-2 transition-all duration-300 ${rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : ''}`}>{rate.cash_sell}</td>
                <td className={`px-4 py-2 transition-all duration-300 ${rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : ''}`}>{rate.remittance_send}</td>
                <td className={`px-4 py-2 transition-all duration-300 ${rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : ''}`}>{rate.remittance_receive}</td>
                <td className={`px-4 py-2 transition-all duration-300 ${rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : ''}`}>{rate.buy_spread}</td>
                <td className={rate.change.includes('▲') ? 'text-green-600' : rate.change.includes('▼') ? 'text-red-600' : 'text-gray-500'}>{rate.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for chart placeholder */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-primary-600" onClick={() => setSelected(null)}>&times;</button>
            <h3 className="text-lg font-bold mb-4">{selected.currency} 차트</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateFakeChartData(selected)}>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

function generateFakeChartData(rate: ExchangeRate) {
  const base = parseFloat(rate.base_rate.replace(/,/g, '')) || 1000;
  let value = base;
  const rand = seededRandom(rate.currency + rate.base_rate);
  return Array.from({ length: 24 }, (_, i) => {
    value += (rand() - 0.5) * base * 0.002;
    return { time: `${i}시`, value: Math.round(value * 100) / 100 };
  });
}

export default ExchangeDashboard; 