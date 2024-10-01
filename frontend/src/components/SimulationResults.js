import React from 'react';

const SimulationResults = ({ simulationResult }) => {
  if (!simulationResult) {
    return <p className="text-gray-400">Run the simulation to see results.</p>;
  }

  const formatResults = () => {
    let formattedResults = "Timeline:\n";
    simulationResult.timeline.forEach(event => {
      formattedResults += event + "\n";
    });
    formattedResults += "\nStatistics:\n";
    simulationResult.stats.forEach(stat => {
      formattedResults += stat + "\n";
    });
    return formattedResults;
  };

  const copyToClipboard = () => {
    const formattedResults = formatResults();
    navigator.clipboard.writeText(formattedResults).then(() => {
      alert("Results copied to clipboard!");
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const downloadResults = () => {
    const formattedResults = formatResults();
    const blob = new Blob([formattedResults], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'simulation_results.txt';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-purple-400">Timeline</h3>
      <ul className="space-y-2 mb-6">
        {simulationResult.timeline.map((event, index) => (
          <li key={index} className="bg-gray-700 p-3 rounded-md">
            {event}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-4 text-purple-400">Statistics</h3>
      <ul className="space-y-2 mb-6">
        {simulationResult.stats.map((stat, index) => (
          <li key={index} className="bg-gray-700 p-3 rounded-md">
            {stat}
          </li>
        ))}
      </ul>
      <div className="flex space-x-4">
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Copy to Clipboard
        </button>
        <button
          onClick={downloadResults}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Download as TXT
        </button>
      </div>
    </div>
  );
};

export default SimulationResults;