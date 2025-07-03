"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var recharts_1 = require("recharts");
var fetchExchangeRates = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('http://localhost:5050/api/exchange')];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var MAIN_CURRENCIES = ['미국 USD', '유럽연합 EUR', '일본 JPY(100엔)', '중국 CNY'];
function seededRandom(seed) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < seed.length; i++) {
        h ^= seed.charCodeAt(i);
        h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
    }
    return function () {
        h += h << 13;
        h ^= h >>> 7;
        h += h << 3;
        h ^= h >>> 17;
        h += h << 5;
        return ((h >>> 0) % 10000) / 10000;
    };
}
var ExchangeDashboard = function () {
    var _a = (0, react_1.useState)([]), rates = _a[0], setRates = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), selected = _c[0], setSelected = _c[1];
    var _d = (0, react_1.useState)({}), rateColors = _d[0], setRateColors = _d[1];
    var prevRates = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(function () {
        var fetchData = function () {
            fetchExchangeRates().then(function (res) {
                setRates(function (prev) {
                    // 임시: base_rate에 랜덤 변화 추가 (테스트용)
                    res.data.forEach(function (rate) {
                        var base = parseFloat(rate.base_rate.replace(/,/g, ''));
                        // 0.1% 이내 랜덤 변화
                        var newVal = base * (1 + (Math.random() - 0.5) * 0.002);
                        rate.base_rate = newVal.toFixed(2);
                    });
                    // 변화 감지 및 색상 효과 적용
                    var newColors = {};
                    res.data.forEach(function (rate) {
                        var prev = prevRates.current.find(function (r) { return r.currency === rate.currency; });
                        if (prev) {
                            var prevVal = parseFloat(prev.base_rate.replace(/,/g, ''));
                            var currVal = parseFloat(rate.base_rate.replace(/,/g, ''));
                            if (currVal !== prevVal)
                                newColors[rate.currency] = 'bg-yellow-100 text-yellow-800';
                        }
                    });
                    setRateColors(newColors);
                    setTimeout(function () { return setRateColors({}); }, 700);
                    prevRates.current = res.data;
                    return res.data;
                });
                setLoading(false);
            });
        };
        fetchData();
        var interval = setInterval(fetchData, 1000);
        return function () { return clearInterval(interval); };
    }, []);
    if (loading)
        return <div className="py-12 text-center text-gray-500">Loading...</div>;
    var mainRates = rates.filter(function (r) { return MAIN_CURRENCIES.includes(r.currency); });
    var otherRates = rates.filter(function (r) { return !MAIN_CURRENCIES.includes(r.currency); });
    return (<section>
      <h2 className="text-xl font-bold mb-6 text-gray-900">실시간 환율</h2>
      <div className="bg-red-500 text-white p-4 mb-2">Tailwind 적용 테스트 (빨간색이면 정상)</div>
      <div className="animate-glow p-4 mb-8">Glow 애니메이션 테스트 (노란빛 반짝임이면 정상)</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {mainRates.map(function (rate, idx) { return (<div key={rate.currency} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition cursor-pointer border border-gray-100" onClick={function () { return setSelected(rate); }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-primary-600">{rate.currency}</span>
              <button className="ml-2 px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded hover:bg-primary-100">알림</button>
            </div>
            <div className={"text-3xl font-bold mb-1 transition-all duration-300 ".concat(rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : 'text-gray-900')}>{rate.base_rate}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className={rate.change.includes('▲') ? 'text-green-600' : rate.change.includes('▼') ? 'text-red-600' : 'text-gray-500'}>
                {rate.change}
              </span>
              {/* Sparkline placeholder */}
              <span className="inline-block w-16 h-6 bg-gradient-to-r from-primary-100 to-primary-300 rounded-full opacity-40"/>
            </div>
            <div className="mt-2 text-xs text-gray-500">현찰(살때): {rate.cash_buy} / 현찰(팔때): {rate.cash_sell}</div>
          </div>); })}
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
            {otherRates.map(function (rate, idx) { return (<tr key={idx} className="even:bg-gray-50">
                <td className="px-4 py-2 text-gray-900 font-medium">{rate.currency}</td>
                <td className={"px-4 py-2 transition-all duration-300 ".concat(rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : '')}>{rate.base_rate}</td>
                <td className={"px-4 py-2 transition-all duration-300 ".concat(rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : '')}>{rate.cash_buy}</td>
                <td className={"px-4 py-2 transition-all duration-300 ".concat(rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : '')}>{rate.cash_sell}</td>
                <td className={"px-4 py-2 transition-all duration-300 ".concat(rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : '')}>{rate.remittance_send}</td>
                <td className={"px-4 py-2 transition-all duration-300 ".concat(rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : '')}>{rate.remittance_receive}</td>
                <td className={"px-4 py-2 transition-all duration-300 ".concat(rateColors[rate.currency] ? 'animate-glow bg-yellow-100 text-yellow-800' : '')}>{rate.buy_spread}</td>
                <td className={rate.change.includes('▲') ? 'text-green-600' : rate.change.includes('▼') ? 'text-red-600' : 'text-gray-500'}>{rate.change}</td>
              </tr>); })}
          </tbody>
        </table>
      </div>
      {/* Modal for chart placeholder */}
      {selected && (<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-primary-600" onClick={function () { return setSelected(null); }}>&times;</button>
            <h3 className="text-lg font-bold mb-4">{selected.currency} 차트</h3>
            <div className="h-64 flex items-center justify-center">
              <recharts_1.ResponsiveContainer width="100%" height="100%">
                <recharts_1.LineChart data={generateFakeChartData(selected)}>
                  <recharts_1.XAxis dataKey="time" hide/>
                  <recharts_1.YAxis domain={['auto', 'auto']} hide/>
                  <recharts_1.Tooltip />
                  <recharts_1.Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false}/>
                </recharts_1.LineChart>
              </recharts_1.ResponsiveContainer>
            </div>
          </div>
        </div>)}
    </section>);
};
function generateFakeChartData(rate) {
    var base = parseFloat(rate.base_rate.replace(/,/g, '')) || 1000;
    var value = base;
    var rand = seededRandom(rate.currency + rate.base_rate);
    return Array.from({ length: 24 }, function (_, i) {
        value += (rand() - 0.5) * base * 0.002;
        return { time: "".concat(i, "\uC2DC"), value: Math.round(value * 100) / 100 };
    });
}
exports.default = ExchangeDashboard;
