#!/usr/bin/env python3
import sys
from collections import defaultdict

def main():
    data = sys.stdin.read().strip().splitlines()
    if not data:
        return
    try:
        n = int(data[0].strip())
    except Exception:
        # If first line is not an integer, nothing to do
        return

    total_passengers = 0
    delays = defaultdict(int)
    passes = defaultdict(int)

    for i in range(1, min(n, max(0, len(data)-1)) + 1):
        line = data[i].strip()
        if not line:
            continue
        parts = line.split()
        cmd = parts[0].upper()
        if cmd == 'ARRIVE':
            # ARRIVE route stop passengers
            if len(parts) >= 4:
                # route = parts[1]
                # stop = parts[2]
                try:
                    passengers = int(parts[3])
                except Exception:
                    passengers = 0
                total_passengers += passengers
        elif cmd == 'DELAY':
            # DELAY route minutes
            if len(parts) >= 2:
                route = parts[1]
                delays[route] += 1
        elif cmd == 'PASS':
            # PASS route stop
            if len(parts) >= 3:
                stop = parts[2]
                passes[stop] += 1

    # Output total passengers
    print(f"Total passengers: {total_passengers}")

    # Most delays
    if not delays:
        print("Most delays: None")
    else:
        max_delay = max(delays.values())
        best = sorted([r for r, cnt in delays.items() if cnt == max_delay])
        print("Most delays: " + ", ".join(best))

    # Most passed stop
    if not passes:
        print("Most passed stop: None")
    else:
        max_pass = max(passes.values())
        best_stops = sorted([s for s, cnt in passes.items() if cnt == max_pass])
        print("Most passed stop: " + ", ".join(best_stops))

if __name__ == '__main__':
    main()
