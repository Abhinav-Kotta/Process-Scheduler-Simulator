class Process:
    def __init__(self, name, arrival, burst):
        self.name = name
        self.arrival = arrival
        self.burst = burst
        self.remaining_burst = burst
        self.start_time = None
        self.finish_time = None
        self.response_time = None
        self.wait_time = 0
        self.turnaround_time = 0

    def __repr__(self):
        return f'{self.name}(arrival={self.arrival}, burst={self.burst}, remaining={self.remaining_burst})'

def fifo_scheduler(processes, runfor):
    timeline = []
    time = 0
    finished_processes = []

    processes = sorted(processes, key=lambda p: p.arrival)

    for process in processes:
        while time < process.arrival:
            timeline.append(f"Time {time} : Idle")
            time += 1

        temp = process

        for temp in processes:
            if temp.arrival == time:
                timeline.append(f"Time {time} : {temp.name} arrived")
        timeline.append(f"Time {time} : {process.name} selected (burst {process.burst})")

        time += process.burst
        process.finish_time = time
        process.turnaround_time = process.finish_time - process.arrival
        process.wait_time = process.turnaround_time - process.burst
        process.response_time = process.wait_time

        finished_processes.append(process)
        timeline.append(f"Time {time} : {process.name} finished")
    
    while time < runfor:
        timeline.append(f"Time {time} : Idle")
        time += 1
    
    timeline.append(f"Finished at time {runfor}")
    return timeline, finished_processes

def sjf_preemptive(processes, run_for):
    timeline = []
    time = 0
    ready_queue = []
    finished_processes = []

    processes = sorted(processes, key=lambda p: p.arrival)
    current_process = None

    while time < run_for:
        for process in processes:
            if process.arrival == time:
                timeline.append(f"Time {time} : {process.name} arrived")
                ready_queue.append(process)

        ready_queue.sort(key=lambda p: p.remaining_burst)

        if ready_queue:
            if current_process is None or (ready_queue[0].remaining_burst < current_process.remaining_burst):
                if current_process:
                    ready_queue.append(current_process)
                current_process = ready_queue.pop(0)
                if current_process.response_time is None:
                    current_process.response_time = time - current_process.arrival
                timeline.append(f"Time {time} : {current_process.name} selected (burst {current_process.remaining_burst})")

            current_process.remaining_burst -= 1

            if current_process.remaining_burst == 0:
                current_process.finish_time = time + 1
                current_process.turnaround_time = current_process.finish_time - current_process.arrival
                current_process.wait_time = current_process.turnaround_time - current_process.burst
                finished_processes.append(current_process)
                timeline.append(f"Time {time + 1} : {current_process.name} finished")
                current_process = None
        else:
            timeline.append(f"Time {time} : Idle")

        for process in ready_queue:
            process.wait_time += 1

        time += 1

    timeline.append(f"Finished at time {run_for}")
    return timeline, finished_processes

def round_robin_scheduler(processes, time_quantum, runfor):
    timeline = []
    time = 0
    queue = []
    finished_processes = []

    processes = sorted(processes, key=lambda p: p.arrival)
    process_index = 0
    current_process = None
    time_slice = 0

    while time < runfor:
        while process_index < len(processes) and processes[process_index].arrival <= time:
            timeline.append(f"Time {time} : {processes[process_index].name} arrived")
            queue.append(processes[process_index])
            process_index += 1

        if current_process is None and queue:
            current_process = queue.pop(0)
            timeline.append(f"Time {time} : {current_process.name} selected (burst {current_process.remaining_burst})")
            if current_process.response_time is None:
                current_process.response_time = time - current_process.arrival
            time_slice = 0

        if current_process:
            current_process.remaining_burst -= 1
            time_slice += 1

            if current_process.remaining_burst == 0:
                current_process.finish_time = time + 1
                current_process.turnaround_time = current_process.finish_time - current_process.arrival
                current_process.wait_time = current_process.turnaround_time - current_process.burst
                finished_processes.append(current_process)
                timeline.append(f"Time {time + 1} : {current_process.name} finished")
                current_process = None
                time_slice = 0
            elif time_slice == time_quantum:
                queue.append(current_process)
                current_process = None

        else:
            timeline.append(f"Time {time} : Idle")

        for process in queue:
            process.wait_time += 1

        time += 1

    timeline.append(f"Finished at time {runfor}")
    return timeline, finished_processes