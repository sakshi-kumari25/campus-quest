import React, { useState } from 'react';

export default function ThermoCalculator() {
  const [tempHigh, setTempHigh] = useState(600);
  const [tempLow, setTempLow] = useState(300);
  const [thermoResult, setThermoResult] = useState(null);

  const runThermoSimulation = () => {
    if (tempHigh <= tempLow) {
      alert("Source temperature must be greater than Sink temperature!");
      return;
    }
    const eff = (1 - (tempLow / tempHigh)) * 100;
    setThermoResult(eff.toFixed(1));
  };

  return (
    <div className="space-y-4 bg-zinc-50 dark:bg-zinc-950 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Source Temperature (Th in K)</label>
          <input type="number" value={tempHigh} onChange={(e) => setTempHigh(parseFloat(e.target.value))} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-3 py-2 rounded-lg text-sm font-mono text-zinc-900 dark:text-white"/>
        </div>
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Sink Temperature (Tl in K)</label>
          <input type="number" value={tempLow} onChange={(e) => setTempLow(parseFloat(e.target.value))} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-3 py-2 rounded-lg text-sm font-mono text-zinc-900 dark:text-white"/>
        </div>
      </div>
      <button onClick={runThermoSimulation} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-2.5 rounded-lg transition-all cursor-pointer">
        Calculate Efficiency
      </button>
      {thermoResult !== null && (
        <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-2">🔥 Maximum Carnot Efficiency: {thermoResult}%</div>
      )}
    </div>
  );
}