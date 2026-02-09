const PROMPT = '>> ';
const BOOTLOG = [
  'INITIALIZING INTERFACE...',
  'VOLTAGE: 210V (UNSTABLE)',
  'LOCATION: SECTOR_G-901∆',
  'LOADING SECTOR_MAP... [SUCCESS]',
  'SIGNAL_DECAY: 42%',
  '// LOG_017 [RECOVERY_MODE]',
  'CALIBRATING RADIATION METER...',
  'AUDIO_BUFFER_LOADED: ZONE_VOICE',
  'MONITORING ZONE ARTIFACTS',
  '[!] SENSORS DETECT MOVEMENT IN TURBINE HALL',
  'WELCOME, OPERATOR. STAY NEAR THE LIGHT.',
];
const LOGS = [
  [
    'CAMERA 01: THE EXTERIOR',
    'STATUS: OBSERVATION DECK.',
    'THE SKY HAS BEEN THIS SHADE OF GREY FOR DECADES.',
    'THE DIALS STOPPED MOVING IN ’86, BUT THE SHADOWS BEHIND THE GLASS STILL SEEM TO SHIFT.',
    'NATURE IS RECLAIMING THE CONCRETE, BUT NOTHING HERE FEELS GREEN.',
  ],
  [
    'CAMERA 02: THE TURBINE HALL',
    'STATUS: SECTOR 4-B.',
    'THESE IRON GIANTS WERE BUILT TO POWER A CITY; NOW THEY BARELY HOLD UP THE CEILING.',
    'THERE IS A VIBRATION IN THE AIR THAT THE SENSORS CAN’T CATEGORIZE.',
    'IT FEELS LIKE THE HALL IS HOLDING ITS BREATH.',
    'THE FOG DOESN’T SHOW UP ON THE SCREEN.',
  ],
  [
    'CAMERA 03: THE PROCESS HALL',
    'STATUS: SECONDARY FLOW.',
    'A LABYRINTH OF RUSTED IRON AND DEAD PRESSURE GAUGES.',
    'IF YOU LISTEN CLOSELY TO THE DRONE, YOU CAN HEAR THE GHOSTS OF THE STEAM STILL TRYING TO FIND A WAY OUT.',
    '[DATA CORRUPTED] - RADIO FRAGMENTS DETECTED. SOUNDS LIKE A PRAYER, OR A WARNING.',
    'EXTERNAL SENSORS REPORTING HEAVY INTERFERENCE.',
  ],
];

export class Terminal {
  constructor(state, id) {
    this.el = document.getElementById(id);
    this.textEl = this.el.querySelector('.content');
    this.state = state;
    this.stream = 0;
    this.state.subscribe((newState) => this.onStateChange(newState));
    this.cursor = document.createElement('span');
    this.cursor.className = 'cursor';
    this.queue = [];
    this.isWriting = false;
    this.charDelay = 20;
  }

  runBootSequence() {
    this.displayLog(BOOTLOG, false);
  }

  async displayLog(lines, continuation = true) {
    this.isWriting = true;
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    if (continuation) {
      this.textEl.lastChild?.remove();
    }

    let first = continuation;
    for (const line of lines) {
      const lineEl = document.createElement('div');
      lineEl.classList.add('glitch', 'text');
      if (first) {
        lineEl.classList.add('title');
        first = false;
      }
      this.textEl.appendChild(lineEl);
      lineEl.appendChild(this.cursor);
      lineEl.scrollIntoView(false);
      this.cursor.before(PROMPT);
      for (let i = 0; i < line.length; i++) {
        this.cursor.before(line[i]);
        await delay(this.charDelay);
      }
      await delay(Math.random() * 300 + 100);
    }
    this.addCursorLine();
    this.isWriting = false;
  }

  addCursorLine() {
    const line = document.createElement('div');
    line.classList.add('glitch', 'text');
    this.textEl.appendChild(line);
    line.appendChild(this.cursor);
    line.scrollIntoView(false);
    this.cursor.before(PROMPT);
  }

  clrscr() {
    this.textEl.innerHTML = '';
    this.addCursorLine();
  }

  onStateChange(state) {
    if (state.terminalStream === this.stream) return;

    this.el.style.setProperty(
      '--terminal-bg-opacity',
      0
    );
    setTimeout(() => {
      this.el.style.setProperty(
        '--terminal-bg-img',
        `url('../img/${state.terminalStream}.jpeg')`
      );
      this.el.style.setProperty(
        '--terminal-bg-opacity',
        1
      );
    }, 200);
    if (state.terminalStream === '3') {
      this.el.querySelector('.bg').style.setProperty(
        'animation', 'background-zoom 120s linear 1'
      );
    }
    this.stream = state.terminalStream;
    this.addQueue(LOGS[state.terminalStream - 1]);
  }

  addQueue(log) {
    this.queue.push(log);
  }

  update() {
    if (this.queue.length > 0 && !this.isWriting) {
      this.displayLog(this.queue.shift());
    }
  }
}