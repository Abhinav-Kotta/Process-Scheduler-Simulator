import React from 'react';
import { X } from 'lucide-react';

const ProcessForm = ({ newProcess, setNewProcess, addProcess, processes, removeProcess }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-teal-400">Input</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Process Name</label>
          <input
            type="text"
            value={newProcess.name}
            onChange={(e) => setNewProcess({...newProcess, name: e.target.value})}
            className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Arrival Time</label>
          <input
            type="number"
            value={newProcess.arrival}
            onChange={(e) => setNewProcess({...newProcess, arrival: parseInt(e.target.value)})}
            className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Burst Time</label>
          <input
            type="number"
            value={newProcess.burst}
            onChange={(e) => setNewProcess({...newProcess, burst: parseInt(e.target.value)})}
            className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={addProcess}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Process
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-teal-400">Processes</h3>
      <ul className="space-y-2 mb-6">
        {processes.map((process, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
            <span>{process.name} (Arrival: {process.arrival}, Burst: {process.burst})</span>
            <button onClick={() => removeProcess(index)} className="text-red-400 hover:text-red-600 transition duration-300">
              <X size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessForm;