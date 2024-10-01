import React, { useState } from 'react';
import Alert, { AlertTitle, AlertDescription } from './Alert';
import ProcessForm from './ProcessForm';
import SimulationControls from './SimulationControls';
import SimulationResults from './SimulationResults';
import Popup from './Popup';

const ProcessSchedulerSimulator = () => {
  const [processes, setProcesses] = useState([]);
  const [newProcess, setNewProcess] = useState({ name: '', arrival: 0, burst: 0 });
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [quantum, setQuantum] = useState(1);
  const [runFor, setRunFor] = useState(20);
  const [simulationResult, setSimulationResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const addProcess = () => {
    if (newProcess.name && newProcess.arrival >= 0 && newProcess.burst > 0) {
      setProcesses([...processes, newProcess]);
      setNewProcess({ name: '', arrival: 0, burst: 0 });
      setError(null);
    } else {
      setError('Please enter valid process details.');
    }
  };

  const removeProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const runSimulation = async () => {
    try {
      const response = await fetch('http://localhost:5000/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          processes,
          algorithm,
          runFor,
          quantum: algorithm === 'rr' ? quantum : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'Insufficient run time') {
          setPopupMessage(`The current run time is not sufficient to complete all processes. Please increase the time to at least ${result.required_time} seconds.`);
          setIsPopupOpen(true);
        } else {
          throw new Error(result.error || 'Simulation failed');
        }
        return;
      }

      setSimulationResult(result);
      setError(null);
    } catch (err) {
      setError('Failed to run simulation. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-purple-400">Process Scheduler Simulator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <ProcessForm
            newProcess={newProcess}
            setNewProcess={setNewProcess}
            addProcess={addProcess}
            processes={processes}
            removeProcess={removeProcess}
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <SimulationControls
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            quantum={quantum}
            setQuantum={setQuantum}
            runFor={runFor}
            setRunFor={setRunFor}
            runSimulation={runSimulation}
          />
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">Simulation Result</h2>
          <SimulationResults simulationResult={simulationResult} />
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
      />
    </div>
  );
};

export default ProcessSchedulerSimulator;