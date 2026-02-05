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
    'CHANNEL 01: THE EXTERIOR (OUTSIDE VIEW)',
    'STATUS: OBSERVATION DECK.',
    'THE SKY HAS BEEN THIS SHADE OF GREY FOR DECADES.',
    'THE DIALS STOPPED MOVING IN ’86, BUT THE SHADOWS BEHIND THE GLASS STILL SEEM TO SHIFT.',
    'NATURE IS RECLAIMING THE CONCRETE, BUT NOTHING HERE FEELS GREEN.',
  ],
  [
    'CHANNEL 02: THE TURBINE HALL',
    'STATUS: SECTOR 4-B.',
    'THESE IRON GIANTS WERE BUILT TO POWER A CITY; NOW THEY BARELY HOLD UP THE CEILING.',
    'THERE IS A VIBRATION IN THE AIR THAT THE SENSORS CAN’T CATEGORIZE.',
    'IT FEELS LIKE THE HALL IS HOLDING ITS BREATH.',
    'THE FOG DOESN’T SHOW UP ON THE SCREEN.',
  ],
  [
    'CHANNEL 03: THE PROCESS HALL',
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
  }

  runBootSequence() {
    this.displayLog(BOOTLOG, false);
  }

  async displayLog(lines, continuation = true) {
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    if (continuation) {
      this.textEl.lastChild?.remove();
    }

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    let first = continuation;
    for (const line of lines) {
      const lineEl = document.createElement('div');
      lineEl.classList.add('glitch', 'text');
      if (first) {
        lineEl.classList.add('title');
        first = false;
      }
      this.textEl.appendChild(lineEl);
      lineEl.appendChild(cursor);
      lineEl.scrollIntoView(false);
      cursor.before(PROMPT);
      for (let i = 0; i < line.length; i++) {
        cursor.before(line[i]);
        await delay(0); //40
      }
      // await delay(Math.random() * 500 + 300);
    }
    // FIXME: double cursor
    this.addCursorLine();
  }

  addCursorLine() {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    const line = document.createElement('div');
    line.classList.add('glitch', 'text');
    this.textEl.appendChild(line);
    line.appendChild(cursor);
    line.scrollIntoView(false);
    cursor.before(PROMPT);
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
    this.stream = state.terminalStream;
    this.displayLog(LOGS[state.terminalStream - 1]);
  }
}