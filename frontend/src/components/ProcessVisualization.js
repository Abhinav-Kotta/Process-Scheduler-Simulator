import React from 'react';
import { ScatterChart, Scatter, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, X } from 'lucide-react';

const ProcessVisualization = ({ simulationResult, processes, runFor }) => {
  const prepareChartData = (timeline) => {
    if (!timeline || !Array.isArray(timeline)) {
      return { data: [], processColors: {} };
    }

    const processColors = {};
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1'];
    const data = [];

    processes.forEach((process, index) => {
      processColors[process.name] = colors[index % colors.length];
    });

    timeline.forEach(event => {
      const match = event.match(/Time (\d+) : (\w+) (arrived|finished|selected)/);
      if (match) {
        const [, time, processName, action] = match;
        data.push({
          time: parseInt(time),
          process: processName,
          action: action,
          color: processColors[processName]
        });
      }
    });

    return { data, processColors };
  };

  const { data, processColors } = prepareChartData(simulationResult?.timeline);

  const CustomShape = (props) => {
    const { cx, cy, payload } = props;
    const size = 24; // Increased size
    switch(payload.action) {
      case 'arrived':
        return <ArrowUp x={cx - size/2} y={cy - size} size={size} color={payload.color} />;
      case 'finished':
        return <ArrowDown x={cx - size/2} y={cy} size={size} color={payload.color} />;
      case 'selected':
        return <X x={cx - size/2} y={cy - size/2} size={size} color={payload.color} />;
      default:
        return null;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded">
          <p className="text-white">{`Time: ${data.time}`}</p>
          <p className="text-white">{`${data.process} ${data.action}`}</p>
        </div>
      );
    }
    return null;
  };

  if (!simulationResult || !simulationResult.timeline) {
    return (
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-teal-400">Process Execution Visualization</h2>
        <p className="text-white">No simulation data available. Please run a simulation first.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-teal-400">Process Execution Visualization</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis type="number" dataKey="time" name="Time" domain={[0, runFor]} stroke="#ffffff" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Scatter
            data={data}
            shape={<CustomShape />}
            // Increase the hover area
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap justify-center">
        {Object.entries(processColors).map(([process, color]) => (
          <div key={process} className="flex items-center mr-4 mb-2">
            <div className="w-4 h-4 mr-2" style={{ backgroundColor: color }}></div>
            <span className="text-white">{process}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessVisualization;