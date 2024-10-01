import React from 'react';

const SimulationControls = ({ algorithm, setAlgorithm, quantum, setQuantum, runFor, setRunFor, runSimulation }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Scheduling Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
        >
          <option value="fcfs">First Come First Serve</option>
          <option value="sjf">Shortest Job First</option>
          <option value="rr">Round Robin</option>
        </select>
      </div>
      {algorithm === 'rr' && (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Time Quantum</label>
          <input
            type="number"
            value={quantum}
            onChange={(e) => setQuantum(parseInt(e.target.value))}
            className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
        </div>
      )}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Run For</label>
        <input
          type="number"
          value={runFor}
          onChange={(e) => setRunFor(parseInt(e.target.value))}
          className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
        />
      </div>
      <button
        onClick={runSimulation}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Run Simulation
      </button>
    </div>
  );
};

export default SimulationControls;