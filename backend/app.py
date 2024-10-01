from flask import Flask, request, jsonify
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)

# Import the scheduler functions
from scheduler import fifo_scheduler, sjf_preemptive, round_robin_scheduler, Process

def calculate_required_time(processes):
    return max(process.arrival + process.burst for process in processes)

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.json
    processes = [Process(p['name'], p['arrival'], p['burst']) for p in data['processes']]
    algorithm = data['algorithm']
    runfor = data['runFor']

    required_time = calculate_required_time(processes)
    if runfor < required_time:
        return jsonify({
            'error': 'Insufficient run time',
            'required_time': required_time
        }), 400

    if algorithm == 'fcfs':
        timeline, stats = fifo_scheduler(processes, runfor)
    elif algorithm == 'sjf':
        timeline, stats = sjf_preemptive(processes, runfor)
    elif algorithm == 'rr':
        quantum = data['quantum']
        timeline, stats = round_robin_scheduler(processes, quantum, runfor)
    else:
        return jsonify({'error': 'Invalid algorithm'}), 400

    return jsonify({
        'timeline': timeline,
        'stats': [f"{p.name} wait {p.wait_time} turnaround {p.turnaround_time} response {p.response_time}" for p in stats]
    })

if __name__ == '__main__':
    app.run(debug=True)