const samples = {
  sample1: `10
ARRIVE R1 Elm 12
ARRIVE R2 Pine 4
DELAY R1 5
PASS R2 Oak
ARRIVE R1 Maple 6
PASS R3 Birch
DELAY R2 3
DELAY R2 2
PASS R2 Oak
ARRIVE R3 Birch 10`,
  sample2: `6
ARRIVE X10 Center 8
PASS X10 North
PASS X10 South
ARRIVE X10 West 12
PASS X11 North
ARRIVE X11 South 5`,
  sample3: `7
ARRIVE A King 10
ARRIVE A Queen 5
DELAY A 2
ARRIVE B King 3
DELAY B 1
DELAY B 4
ARRIVE A Duke 7`,
  sample4: `9
PASS R1 Hill
PASS R2 Hill
PASS R3 Hill
DELAY R2 5
DELAY R3 2
DELAY R2 1
DELAY R3 4
ARRIVE R1 Main 8
ARRIVE R3 Main 6`,
  sample5: `250
ARRIVE R1 Alpha 12
PASS R2 Beta
DELAY R1 3
ARRIVE R3 Gamma 7
ARRIVE R2 Delta 4
PASS R1 Epsilon
DELAY R3 1
PASS R3 Beta
ARRIVE R4 Omega 15
DELAY R2 2
ARRIVE R1 Alpha 9
PASS R4 Prime
PASS R2 Beta
ARRIVE R3 Gamma 11
DELAY R1 4
ARRIVE R2 Delta 5
PASS R3 Theta
ARRIVE R4 Omega 3
DELAY R2 1
ARRIVE R5 Quartz 6
PASS R5 Quartz
DELAY R5 2
ARRIVE R1 Alpha 10
PASS R3 Theta
DELAY R4 3
ARRIVE R2 Delta 6
PASS R1 Lambda
PASS R4 Prime
ARRIVE R5 Quartz 12
DELAY R3 4
ARRIVE R1 Alpha 1
PASS R2 Beta
ARRIVE R3 Gamma 8
DELAY R5 3
PASS R3 Theta
ARRIVE R4 Omega 13
DELAY R4 2
ARRIVE R2 Delta 2
PASS R5 Quartz
ARRIVE R1 Alpha 14
PASS R3 Beta
DELAY R1 5
ARRIVE R5 Quartz 9
PASS R4 Prime
DELAY R2 3
ARRIVE R3 Gamma 7
PASS R1 Lambda
ARRIVE R4 Omega 8
DELAY R5 1
PASS R2 Beta
ARRIVE R1 Alpha 3
DELAY R3 2
ARRIVE R2 Delta 11
PASS R3 Theta
ARRIVE R5 Quartz 5
DELAY R4 4
PASS R4 Prime
ARRIVE R1 Alpha 13
PASS R5 Quartz
ARRIVE R3 Gamma 9
DELAY R1 1
PASS R2 Beta
ARRIVE R4 Omega 7
DELAY R3 2
ARRIVE R2 Delta 4
PASS R1 Lambda
ARRIVE R5 Quartz 8
DELAY R4 1
PASS R3 Theta
ARRIVE R1 Alpha 6
PASS R2 Beta
DELAY R2 3
ARRIVE R3 Gamma 10
PASS R4 Prime
DELAY R5 2
ARRIVE R1 Alpha 5
ARRIVE R2 Delta 6
PASS R5 Quartz
DELAY R4 3
ARRIVE R3 Gamma 12
PASS R1 Lambda
DELAY R1 2
PASS R2 Beta
ARRIVE R5 Quartz 4
ARRIVE R4 Omega 9
DELAY R3 1
PASS R3 Theta
ARRIVE R1 Alpha 2
DELAY R2 1
PASS R4 Prime
ARRIVE R2 Delta 5
DELAY R5 4
PASS R1 Lambda
ARRIVE R3 Gamma 3
PASS R5 Quartz
DELAY R3 3
ARRIVE R4 Omega 10
PASS R2 Beta
ARRIVE R1 Alpha 7
DELAY R4 2
PASS R3 Theta
ARRIVE R5 Quartz 6
DELAY R1 3
ARRIVE R2 Delta 4
PASS R4 Prime
ARRIVE R3 Gamma 14
PASS R1 Lambda
DELAY R5 2
ARRIVE R4 Omega 12
PASS R2 Beta
ARRIVE R1 Alpha 9
DELAY R3 1
ARRIVE R5 Quartz 7
PASS R3 Theta
DELAY R4 1
ARRIVE R2 Delta 3
PASS R1 Lambda
ARRIVE R3 Gamma 11
DELAY R5 3
PASS R4 Prime
ARRIVE R1 Alpha 4
PASS R3 Beta
DELAY R2 4
ARRIVE R5 Quartz 10
PASS R2 Beta
ARRIVE R4 Omega 5
DELAY R1 5
PASS R3 Theta
ARRIVE R2 Delta 12
PASS R4 Prime
DELAY R5 1
ARRIVE R3 Gamma 6
PASS R1 Lambda
ARRIVE R5 Quartz 2
DELAY R4 2
PASS R2 Beta
ARRIVE R1 Alpha 8
DELAY R3 2
PASS R3 Theta
ARRIVE R2 Delta 1
ARRIVE R4 Omega 6
PASS R5 Quartz
DELAY R1 2
PASS R4 Prime
ARRIVE R3 Gamma 9
DELAY R2 2
PASS R1 Lambda
ARRIVE R5 Quartz 11
DELAY R5 2
PASS R3 Theta
ARRIVE R4 Omega 4
PASS R2 Beta
DELAY R4 3
ARRIVE R1 Alpha 10
PASS R5 Quartz
ARRIVE R3 Gamma 8
DELAY R1 4
PASS R3 Beta
ARRIVE R2 Delta 7
DELAY R2 3
PASS R4 Prime
ARRIVE R5 Quartz 13
DELAY R5 4
PASS R1 Lambda
ARRIVE R4 Omega 11
DELAY R3 1
PASS R2 Beta
ARRIVE R1 Alpha 5
PASS R3 Theta
DELAY R4 2
ARRIVE R2 Delta 9
PASS R5 Quartz
DELAY R1 3
ARRIVE R3 Gamma 10
PASS R4 Prime
DELAY R5 1
ARRIVE R1 Alpha 12
PASS R2 Beta
ARRIVE R4 Omega 3
DELAY R3 3
PASS R3 Theta
ARRIVE R5 Quartz 5
PASS R1 Lambda
DELAY R4 1
ARRIVE R2 Delta 8
PASS R4 Prime
ARRIVE R3 Gamma 7
DELAY R5 2
PASS R2 Beta
ARRIVE R1 Alpha 1
DELAY R1 1
ARRIVE R4 Omega 9
PASS R3 Theta
DELAY R2 2
ARRIVE R5 Quartz 6
PASS R1 Lambda
DELAY R3 4
ARRIVE R2 Delta 3
PASS R4 Prime
ARRIVE R3 Gamma 2
DELAY R5 3
PASS R2 Beta
`}

function parseEvents(text) {
  const lines = text.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;
  const n = parseInt(lines[0], 10);
  const total = { passengers: 0 };
  const delays = {};
  const passes = {};

  for (let i = 1; i <= Math.min(n, lines.length - 1); i++) {
    const parts = lines[i].split(/\s+/);
    const cmd = parts[0].toUpperCase();
    if (cmd === 'ARRIVE' && parts.length >= 4) {
      const p = parseInt(parts[3], 10) || 0;
      total.passengers += p;
    } else if (cmd === 'DELAY' && parts.length >= 2) {
      const route = parts[1];
      delays[route] = (delays[route] || 0) + 1;
    } else if (cmd === 'PASS' && parts.length >= 3) {
      const stop = parts[2];
      passes[stop] = (passes[stop] || 0) + 1;
    }
  }

  return { total, delays, passes };
}

function animateNumber(el, from, to, duration = 800) {
  const start = performance.now();
  requestAnimationFrame(function step(ts) {
    const t = Math.min(1, (ts - start) / duration);
    const val = Math.floor(from + (to - from) * t);
    el.textContent = val;
    if (t < 1) requestAnimationFrame(step);
  });
}

function renderResults({ total, delays, passes }) {
  const totalEl = document.getElementById('totalPassengers');
  animateNumber(totalEl, parseInt(totalEl.textContent, 10) || 0, total.passengers);

  const delaysArea = document.getElementById('delaysArea');
  const passesArea = document.getElementById('passesArea');

  const delayEntries = Object.entries(delays);
  if (delayEntries.length === 0) {
    delaysArea.textContent = 'None';
  } else {
    const maxD = Math.max(...delayEntries.map(e => e[1]));
    const winners = delayEntries.filter(e => e[1] === maxD).map(e => e[0]).sort();
    delaysArea.textContent = winners.join(', ');
  }

  const passEntries = Object.entries(passes);
  if (passEntries.length === 0) {
    passesArea.textContent = 'None';
  } else {
    const maxP = Math.max(...passEntries.map(e => e[1]));
    const winners = passEntries.filter(e => e[1] === maxP).map(e => e[0]).sort();
    passesArea.textContent = winners.join(', ');
  }

  renderChart('delayChart', delayEntries);
  renderChart('passChart', passEntries);
}

function renderChart(containerId, entries) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (!entries || entries.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'list-area';
    empty.textContent = 'No data';
    container.appendChild(empty);
    return;
  }
  entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const max = Math.max(...entries.map(e => e[1]));
  entries.forEach(([label, count]) => {
    const row = document.createElement('div');
    row.className = 'bar';
    const lab = document.createElement('div');
    lab.className = 'label';
    lab.textContent = label;
    const track = document.createElement('div');
    track.className = 'track';
    const fill = document.createElement('div');
    fill.className = 'fill';
    const pct = Math.round((count / max) * 100);
    setTimeout(() => { fill.style.width = pct + '%'; }, 50);
    const cnt = document.createElement('div');
    cnt.className = 'count';
    cnt.textContent = count;
    track.appendChild(fill);
    row.appendChild(lab);
    row.appendChild(track);
    row.appendChild(cnt);
    container.appendChild(row);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const runBtn = document.getElementById('runBtn');
  const input = document.getElementById('inputArea');
  const loadBtn = document.getElementById('loadSample');
  const sampleSelect = document.getElementById('sampleSelect');

  runBtn.addEventListener('click', () => {
    const parsed = parseEvents(input.value || '');
    if (!parsed) return;
    renderResults(parsed);
  });

  loadBtn.addEventListener('click', () => {
    const key = sampleSelect.value;
    if (!key || !samples[key]) return;
    input.value = samples[key];
  });

  input.value = samples['sample1'];
  runBtn.click();
});