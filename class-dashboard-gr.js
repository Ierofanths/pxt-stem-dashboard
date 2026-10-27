// Name: Πίνακας τάξης / Class dashboard (Ελληνικά)
// ID: stemclassdashboard
// Description: Συγκεντρώνει τις μετρήσεις έως 6 σταθμών micro:bit (radio → δέκτης USB) σε έναν πίνακα πάνω στη σκηνή.
// License: MIT

(function (Scratch) {
  'use strict';

  const LANG = 'el';
  const STRINGS = {
    el: {
      name: 'Πίνακας τάξης',
      sandbox: '⚠ Ξαναφόρτωσε τη σελίδα και τσέκαρε «Run without sandbox»',
      bConnect: '🔌 Σύνδεση δέκτη (USB)', bDisconnect: '✖ Αποσύνδεση δέκτη',
      bStatus: 'κατάσταση δέκτη', bConnected: 'δέκτης συνδεδεμένος;', bDemo: 'δοκιμαστικά δεδομένα [STATE]',
      lView: 'Πίνακας', lData: 'Μετρήσεις', lAlert: 'Ειδοποιήσεις',
      bShow: 'δείξε τον πίνακα', bHide: 'κρύψε τον πίνακα', bTitle: 'όρισε τίτλο πίνακα σε [TEXT]',
      bName: 'όνομα σταθμού [N] = [NAME]',
      bValue: '[SENSOR] από τον σταθμό [N]', bStat: '[STAT] [SENSOR] όλων των σταθμών',
      bWhich: 'σταθμός με [MINMAX] [SENSOR]', bOnline: 'ο σταθμός [N] στέλνει;',
      bWhen: 'όταν ο σταθμός [N] στείλει [SENSOR]',
      bAlert: 'ειδοποίηση όταν [SENSOR] [OP] [VALUE]', bClearAlerts: 'καθάρισε τις ειδοποιήσεις',
      bAlarm: 'ο σταθμός [N] έχει ειδοποίηση;',
      bCSV: 'κατέβασε όλες τις μετρήσεις ως CSV με όνομα [NAME]', bClear: 'σβήσε όλες τις μετρήσεις',
      avg: 'μέσος όρος', min: 'ελάχιστη', max: 'μέγιστη', count: 'πλήθος σταθμών με',
      wMax: 'τη μεγαλύτερη', wMin: 'τη μικρότερη', on: 'ναι', off: 'όχι',
      stDisc: 'Αποσυνδεδεμένος', stConn: 'Συνδεδεμένος', stDemo: 'Δοκιμαστικά δεδομένα', stErr: 'Σφάλμα σύνδεσης',
      noSerial: 'Αυτός ο browser δεν υποστηρίζει σύνδεση USB. Χρησιμοποίησε Chrome ή Edge σε υπολογιστή.',
      title: 'Πίνακας τάξης', station: 'Σταθμός', waiting: 'αναμονή…', ago: 'πριν', s: 's', min_: 'λεπτά',
      sensors: { temp: 'Θερμοκρασία', hum: 'Υγρασία', light: 'Φως', uv: 'UV', soil: 'Υγρ. εδάφους', water: 'Στάθμη νερού' },
      short: { temp: 'Θερμ.', hum: 'Υγρασία', light: 'Φως', uv: 'UV', soil: 'Έδαφος', water: 'Νερό' },
      csvStation: 'σταθμός', csvSensor: 'αισθητήρας', csvTime: 'ώρα', csvValue: 'τιμή',
      locale: 'el-GR', decimal: ','
    },
    en: {
      name: 'Class dashboard',
      sandbox: '⚠ Reload the page and tick “Run without sandbox”',
      bConnect: '🔌 Connect receiver (USB)', bDisconnect: '✖ Disconnect receiver',
      bStatus: 'receiver status', bConnected: 'receiver connected?', bDemo: 'demo data [STATE]',
      lView: 'Dashboard', lData: 'Readings', lAlert: 'Alerts',
      bShow: 'show dashboard', bHide: 'hide dashboard', bTitle: 'set dashboard title to [TEXT]',
      bName: 'name of station [N] = [NAME]',
      bValue: '[SENSOR] from station [N]', bStat: '[STAT] [SENSOR] of all stations',
      bWhich: 'station with [MINMAX] [SENSOR]', bOnline: 'station [N] sending?',
      bWhen: 'when station [N] sends [SENSOR]',
      bAlert: 'alert when [SENSOR] [OP] [VALUE]', bClearAlerts: 'clear alerts',
      bAlarm: 'station [N] has an alert?',
      bCSV: 'download all readings as CSV named [NAME]', bClear: 'clear all readings',
      avg: 'average', min: 'minimum', max: 'maximum', count: 'number of stations with',
      wMax: 'the highest', wMin: 'the lowest', on: 'on', off: 'off',
      stDisc: 'Disconnected', stConn: 'Connected', stDemo: 'Demo data', stErr: 'Connection error',
      noSerial: 'This browser does not support USB connections. Use Chrome or Edge on a computer.',
      title: 'Class dashboard', station: 'Station', waiting: 'waiting…', ago: '', s: 's ago', min_: 'min ago',
      sensors: { temp: 'Temperature', hum: 'Humidity', light: 'Light', uv: 'UV', soil: 'Soil moisture', water: 'Water level' },
      short: { temp: 'Temp.', hum: 'Humidity', light: 'Light', uv: 'UV', soil: 'Soil', water: 'Water' },
      csvStation: 'station', csvSensor: 'sensor', csvTime: 'time', csvValue: 'value',
      locale: 'en-GB', decimal: '.'
    }
  };
  const T = STRINGS[LANG];
  const COLORS = { color1: '#0E9F6E', color2: '#0C8A5F', color3: '#0A7550' };

  if (!Scratch.extensions.unsandboxed) {
    Scratch.extensions.register({
      getInfo: () => ({
        id: 'stemclassdashboard', name: T.name, ...COLORS,
        blocks: [{ blockType: Scratch.BlockType.LABEL, text: T.sandbox }]
      })
    });
    return;
  }

  const vm = Scratch.vm;
  const toNum = (v) => Scratch.Cast.toNumber(v);
  const toStr = (v) => Scratch.Cast.toString(v);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const STATIONS = 6;
  const SENSOR_KEYS = ['temp', 'hum', 'light', 'uv', 'soil', 'water'];
  const UNITS = { temp: '°C', hum: '%', light: '', uv: '', soil: '', water: '' };
  const RANGES = { temp: [0, 40], hum: [0, 100], light: [0, 100], uv: [0, 11], soil: [0, 100], water: [0, 100] };
  const ONLINE_MS = 30000;
  const HISTORY = 3000;
  const RES = 2;

  const sensorLabel = (k) => T.sensors[k] || k;
  const fmt = (v) => {
    const d = Math.abs(v) < 100 && v % 1 !== 0 ? 1 : 0;
    return v.toLocaleString(T.locale, { minimumFractionDigits: d, maximumFractionDigits: d });
  };

  class ClassDashboard {
    constructor () {
      this.stations = {};   // n → { name, last, rssi, sensors: { key → { value, t, hist: [[t, v]] } } }
      this.port = null;
      this.reader = null;
      this.status = T.stDisc;
      this.title = T.title;
      this.alerts = [];     // { key, op, value }
      this.hatSeen = {};
      this.demoTimer = null;
      this.visible = false;
      this.canvas = null;
      this.ctx = null;
      this.skinId = null;
      this.drawableId = null;
      this.dirty = true;
      this.raf = null;
      this.lastDraw = 0;
      this.tick = setInterval(() => this._invalidate(), 1000); // «πριν από … s» και κατάσταση σύνδεσης
    }

    getInfo () {
      const stationArg = { type: Scratch.ArgumentType.STRING, menu: 'station', defaultValue: '1' };
      const sensorArg = { type: Scratch.ArgumentType.STRING, menu: 'sensor', defaultValue: 'temp' };
      return {
        id: 'stemclassdashboard',
        name: T.name,
        ...COLORS,
        blocks: [
          { func: 'connect', blockType: Scratch.BlockType.BUTTON, text: T.bConnect },
          { func: 'disconnect', blockType: Scratch.BlockType.BUTTON, text: T.bDisconnect },
          { opcode: 'getStatus', blockType: Scratch.BlockType.REPORTER, text: T.bStatus },
          { opcode: 'isConnected', blockType: Scratch.BlockType.BOOLEAN, text: T.bConnected },
          {
            opcode: 'demo', blockType: Scratch.BlockType.COMMAND, text: T.bDemo,
            arguments: { STATE: { type: Scratch.ArgumentType.STRING, menu: 'onoff', defaultValue: 'on' } }
          },

          { blockType: Scratch.BlockType.LABEL, text: T.lView },
          { opcode: 'showDash', blockType: Scratch.BlockType.COMMAND, text: T.bShow },
          { opcode: 'hideDash', blockType: Scratch.BlockType.COMMAND, text: T.bHide },
          {
            opcode: 'setTitle', blockType: Scratch.BlockType.COMMAND, text: T.bTitle,
            arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: T.title } }
          },
          {
            opcode: 'setName', blockType: Scratch.BlockType.COMMAND, text: T.bName,
            arguments: { N: stationArg, NAME: { type: Scratch.ArgumentType.STRING, defaultValue: T.station + ' 1' } }
          },

          { blockType: Scratch.BlockType.LABEL, text: T.lData },
          {
            opcode: 'value', blockType: Scratch.BlockType.REPORTER, text: T.bValue,
            arguments: { SENSOR: sensorArg, N: stationArg }
          },
          {
            opcode: 'stat', blockType: Scratch.BlockType.REPORTER, text: T.bStat,
            arguments: { STAT: { type: Scratch.ArgumentType.STRING, menu: 'stat', defaultValue: 'avg' }, SENSOR: sensorArg }
          },
          {
            opcode: 'which', blockType: Scratch.BlockType.REPORTER, text: T.bWhich,
            arguments: { MINMAX: { type: Scratch.ArgumentType.STRING, menu: 'minmax', defaultValue: 'max' }, SENSOR: sensorArg }
          },
          {
            opcode: 'online', blockType: Scratch.BlockType.BOOLEAN, text: T.bOnline,
            arguments: { N: stationArg }
          },
          {
            opcode: 'whenReceived', blockType: Scratch.BlockType.HAT, text: T.bWhen,
            arguments: { N: stationArg, SENSOR: sensorArg }
          },

          { blockType: Scratch.BlockType.LABEL, text: T.lAlert },
          {
            opcode: 'setAlert', blockType: Scratch.BlockType.COMMAND, text: T.bAlert,
            arguments: {
              SENSOR: sensorArg,
              OP: { type: Scratch.ArgumentType.STRING, menu: 'op', defaultValue: '<' },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 30 }
            }
          },
          { opcode: 'clearAlerts', blockType: Scratch.BlockType.COMMAND, text: T.bClearAlerts },
          {
            opcode: 'hasAlarm', blockType: Scratch.BlockType.BOOLEAN, text: T.bAlarm,
            arguments: { N: stationArg }
          },
          '---',
          {
            opcode: 'downloadCSV', blockType: Scratch.BlockType.COMMAND, text: T.bCSV,
            arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: LANG === 'el' ? 'πίνακας-τάξης' : 'class-dashboard' } }
          },
          { opcode: 'clearData', blockType: Scratch.BlockType.COMMAND, text: T.bClear }
        ],
        menus: {
          station: { acceptReporters: true, items: ['1', '2', '3', '4', '5', '6'] },
          sensor: { acceptReporters: true, items: SENSOR_KEYS.map((k) => ({ text: sensorLabel(k), value: k })) },
          stat: {
            acceptReporters: false,
            items: [{ text: T.avg, value: 'avg' }, { text: T.min, value: 'min' }, { text: T.max, value: 'max' },
              { text: T.count, value: 'count' }]
          },
          minmax: { acceptReporters: false, items: [{ text: T.wMax, value: 'max' }, { text: T.wMin, value: 'min' }] },
          op: { acceptReporters: false, items: ['<', '>'] },
          onoff: { acceptReporters: false, items: [{ text: T.on, value: 'on' }, { text: T.off, value: 'off' }] }
        }
      };
    }

    // ---------- Σύνδεση δέκτη (Web Serial) ----------

    async connect () {
      if (!navigator.serial) {
        alert(T.noSerial);
        return;
      }
      try {
        const port = await navigator.serial.requestPort({ filters: [{ usbVendorId: 0x0d28 }] }); // micro:bit
        await port.open({ baudRate: 115200 });
        this.port = port;
        this.status = T.stConn;
        this._readLoop(port);
        navigator.serial.addEventListener('disconnect', (e) => {
          if (e.target === this.port) this._closed();
        });
      } catch (e) {
        if (e && e.name !== 'NotFoundError') {
          console.error('dashboard', e);
          this.status = T.stErr;
        }
      }
    }

    async _readLoop (port) {
      const decoder = new TextDecoder();
      let buffer = '';
      try {
        while (port.readable && this.port === port) {
          this.reader = port.readable.getReader();
          try {
            for (;;) {
              const { value, done } = await this.reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              let i;
              while ((i = buffer.indexOf('\n')) >= 0) {
                this._line(buffer.slice(0, i).replace(/\r/g, '').trim());
                buffer = buffer.slice(i + 1);
              }
              if (buffer.length > 1000) buffer = '';
            }
          } finally {
            this.reader.releaseLock();
            this.reader = null;
          }
        }
      } catch (e) {
        console.warn('dashboard read', e);
      }
      if (this.port === port) this._closed();
    }

    async disconnect () {
      const port = this.port;
      this.port = null;
      try {
        if (this.reader) await this.reader.cancel();
        if (port) await port.close();
      } catch (e) { /* ήδη κλειστό */ }
      this._closed();
    }

    _closed () {
      this.port = null;
      this.status = this.demoTimer ? T.stDemo : T.stDisc;
    }

    // Γραμμή από τον δέκτη: «3:temp,23.5,-60»
    _line (line) {
      const m = /^(\d+):([A-Za-z0-9_]+),(-?[\d.]+)(?:,(-?\d+))?$/.exec(line);
      if (!m) return;
      this._add(Number(m[1]), m[2].toLowerCase(), Number(m[3]), m[4] !== undefined ? Number(m[4]) : null);
    }

    _add (n, key, value, rssi) {
      if (!Number.isFinite(value) || n < 1 || n > 9) return;
      const now = Date.now();
      const st = this.stations[n] || (this.stations[n] = { name: '', last: 0, rssi: null, sensors: {} });
      st.last = now;
      if (rssi !== null) st.rssi = rssi;
      const s = st.sensors[key] || (st.sensors[key] = { value: 0, t: 0, hist: [], seq: 0 });
      s.value = value;
      s.t = now;
      s.seq++;
      s.hist.push([now, value]);
      if (s.hist.length > HISTORY) s.hist.shift();
      this._invalidate();
    }

    getStatus () { return this.status; }
    isConnected () { return !!this.port; }

    // Δοκιμαστικά δεδομένα για να στηθεί το project χωρίς σταθμούς
    demo (args) {
      if (args.STATE === 'off') {
        clearInterval(this.demoTimer);
        this.demoTimer = null;
        this.status = this.port ? T.stConn : T.stDisc;
        return;
      }
      if (this.demoTimer) return;
      this.status = this.port ? T.stConn : T.stDemo;
      const base = Date.now();
      const gen = () => {
        const t = (Date.now() - base) / 60000;
        for (let n = 1; n <= STATIONS; n++) {
          if (n === 6 && Math.floor(t * 2) % 3 === 2) continue; // ένας σταθμός «χάνεται» πότε-πότε
          this._add(n, 'temp', Math.round((20 + n + 2 * Math.sin(t + n)) * 10) / 10, -50 - n * 5);
          this._add(n, 'hum', Math.round(45 + n * 3 + 5 * Math.cos(t * 1.3 + n)), null);
          this._add(n, 'light', Math.round(clamp(30 + n * 10 + 15 * Math.sin(t * 2 + n), 0, 100)), null);
          if (n % 2) this._add(n, 'soil', Math.round(clamp(70 - n * 12 - t * 3, 0, 100)), null);
          if (n === 2 || n === 5) this._add(n, 'water', Math.round(clamp(50 + 20 * Math.sin(t / 2 + n), 0, 100)), null);
          if (n === 3) this._add(n, 'uv', Math.round(clamp(4 + 3 * Math.sin(t), 0, 11)), null);
        }
      };
      gen();
      this.demoTimer = setInterval(gen, 2000);
    }

    // ---------- Μετρήσεις ----------

    _station (n) { return this.stations[clamp(Math.round(toNum(n)), 1, 9)]; }
    _key (s) { return toStr(s).trim().toLowerCase(); }
    _isOnline (st) { return !!st && Date.now() - st.last < ONLINE_MS; }

    value (args) {
      const st = this._station(args.N);
      const s = st && st.sensors[this._key(args.SENSOR)];
      return s ? s.value : '';
    }

    _values (key) {
      const out = [];
      for (const [n, st] of Object.entries(this.stations)) {
        const s = st.sensors[key];
        if (s && this._isOnline(st)) out.push([Number(n), s.value]);
      }
      return out;
    }

    stat (args) {
      const vals = this._values(this._key(args.SENSOR)).map((x) => x[1]);
      if (args.STAT === 'count') return vals.length;
      if (!vals.length) return '';
      if (args.STAT === 'min') return Math.min(...vals);
      if (args.STAT === 'max') return Math.max(...vals);
      return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
    }

    which (args) {
      const vals = this._values(this._key(args.SENSOR));
      if (!vals.length) return '';
      vals.sort((a, b) => (args.MINMAX === 'min' ? a[1] - b[1] : b[1] - a[1]));
      return vals[0][0];
    }

    online (args) { return this._isOnline(this._station(args.N)); }

    whenReceived (args, util) {
      const st = this._station(args.N);
      const s = st && st.sensors[this._key(args.SENSOR)];
      if (!s) return false;
      const id = ((util && util.thread && util.thread.topBlock) || '') + '|' + args.N + '|' + args.SENSOR;
      if (this.hatSeen[id] === undefined) {
        this.hatSeen[id] = s.seq;
        return false;
      }
      if (s.seq !== this.hatSeen[id]) {
        this.hatSeen[id] = s.seq;
        return true;
      }
      return false;
    }

    // ---------- Ειδοποιήσεις ----------

    setAlert (args) {
      const key = this._key(args.SENSOR);
      this.alerts = this.alerts.filter((a) => !(a.key === key && a.op === args.OP));
      this.alerts.push({ key, op: args.OP, value: toNum(args.VALUE) });
      this._invalidate();
    }

    clearAlerts () { this.alerts = []; this._invalidate(); }

    _alarmFor (key, v) {
      return this.alerts.some((a) => a.key === key && (a.op === '<' ? v < a.value : v > a.value));
    }

    _stationAlarm (st) {
      if (!this._isOnline(st)) return false;
      return Object.entries(st.sensors).some(([k, s]) => this._alarmFor(k, s.value));
    }

    hasAlarm (args) {
      const st = this._station(args.N);
      return !!st && this._stationAlarm(st);
    }

    // ---------- Δεδομένα ----------

    downloadCSV (args) {
      const num = (v) => String(v).replace('.', T.decimal);
      const pad = (x) => String(x).padStart(2, '0');
      const time = (t) => {
        const d = new Date(t);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      };
      const rows = [[T.csvStation, T.csvSensor, T.csvTime, T.csvValue].join(';')];
      for (const [n, st] of Object.entries(this.stations)) {
        const label = st.name ? `${n} ${st.name}` : n;
        for (const [k, s] of Object.entries(st.sensors)) {
          for (const [t, v] of s.hist) rows.push([label, sensorLabel(k), time(t), num(v)].join(';'));
        }
      }
      const name = (toStr(args.NAME) || 'dashboard').replace(/[\\/:*?"<>|]/g, '_');
      const blob = new Blob(['\uFEFF' + rows.join('\r\n') + '\r\n'], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name.toLowerCase().endsWith('.csv') ? name : name + '.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    clearData () { this.stations = {}; this.hatSeen = {}; this._invalidate(); }

    // ---------- Πίνακας στη σκηνή ----------

    setTitle (args) { this.title = toStr(args.TEXT); this._invalidate(); }

    setName (args) {
      const n = clamp(Math.round(toNum(args.N)), 1, 9);
      const st = this.stations[n] || (this.stations[n] = { name: '', last: 0, rssi: null, sensors: {} });
      st.name = toStr(args.NAME);
      this._invalidate();
    }

    showDash () {
      if (!this._ensureDrawable()) return;
      this.visible = true;
      Scratch.renderer.updateDrawableVisible(this.drawableId, true);
      this._invalidate();
    }

    hideDash () {
      this.visible = false;
      if (this.drawableId !== null) Scratch.renderer.updateDrawableVisible(this.drawableId, false);
      if (vm.runtime.requestRedraw) vm.runtime.requestRedraw();
    }

    _ensureDrawable () {
      if (this.drawableId !== null) return true;
      const r = Scratch.renderer;
      if (!r) return false;
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this._resize();
      this._render();
      this.skinId = r.createBitmapSkin(this.canvas, RES);
      this.drawableId = r.createDrawable('pen');
      r.updateDrawableSkinId(this.drawableId, this.skinId);
      r.updateDrawableVisible(this.drawableId, false);
      return true;
    }

    _resize () {
      const w = (vm.runtime.stageWidth || 480) * RES;
      const h = (vm.runtime.stageHeight || 360) * RES;
      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
      }
    }

    _invalidate () {
      this.dirty = true;
      if (this.visible && !this.raf) this.raf = requestAnimationFrame(() => this._frame());
    }

    _frame () {
      this.raf = null;
      if (!this.visible || !this.dirty) return;
      const now = performance.now();
      if (now - this.lastDraw < 100) {
        this.raf = requestAnimationFrame(() => this._frame());
        return;
      }
      this.lastDraw = now;
      this.dirty = false;
      this._resize();
      this._render();
      Scratch.renderer.updateBitmapSkin(this.skinId, this.canvas, RES);
      if (vm.runtime.requestRedraw) vm.runtime.requestRedraw();
    }

    _render () {
      const ctx = this.ctx;
      const k = RES;
      const W = this.canvas.width;
      const H = this.canvas.height;
      const font = (size, weight) => `${weight || 400} ${size * k}px "Helvetica Neue", Arial, sans-serif`;
      const now = Date.now();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#EEF3F7';
      ctx.fillRect(0, 0, W, H);

      // Επικεφαλίδα
      ctx.fillStyle = '#0B1F3A';
      ctx.fillRect(0, 0, W, 30 * k);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = font(15, 700);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillText(this.title, 10 * k, 15 * k);
      ctx.textAlign = 'right';
      ctx.font = font(11, 600);
      const live = !!this.port || !!this.demoTimer;
      ctx.fillStyle = live ? '#7CF2B4' : '#FFB3A8';
      ctx.fillText('● ' + this.status, W - 10 * k, 15 * k);

      // 6 πλακίδια σε 3 × 2
      const cols = 3;
      const rows = 2;
      const gap = 6 * k;
      const top = 30 * k + gap;
      const tw = (W - gap * (cols + 1)) / cols;
      const th = (H - top - gap * rows) / rows;
      for (let i = 0; i < STATIONS; i++) {
        const n = i + 1;
        const x = gap + (i % cols) * (tw + gap);
        const y = top + Math.floor(i / cols) * (th + gap);
        this._tile(ctx, n, x, y, tw, th, k, font, now);
      }
    }

    _tile (ctx, n, x, y, w, h, k, font, now) {
      const st = this.stations[n];
      const online = this._isOnline(st);
      const alarm = st && this._stationAlarm(st);
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = alarm ? '#E5413B' : '#C9D3DD';
      ctx.lineWidth = (alarm ? 3 : 1.2) * k;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, 8 * k);
      else ctx.rect(x, y, w, h);
      ctx.fill();
      ctx.stroke();

      // Όνομα και κατάσταση
      const title = st && st.name ? st.name : `${T.station} ${n}`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#1D2B3A';
      ctx.font = font(12, 700);
      ctx.fillText(title, x + 18 * k, y + 13 * k, w - 70 * k);
      let dot = '#B8C2CC';
      if (st && st.last) dot = online ? (now - st.last < 10000 ? '#1E9E5A' : '#F2A21B') : '#E5413B';
      ctx.fillStyle = dot;
      ctx.beginPath();
      ctx.arc(x + 9 * k, y + 13 * k, 4 * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.textAlign = 'right';
      ctx.font = font(9.5);
      ctx.fillStyle = '#6B7A8F';
      let ago = T.waiting;
      if (st && st.last) {
        const sec = Math.round((now - st.last) / 1000);
        ago = sec < 120 ? `${T.ago} ${sec} ${T.s}`.trim() : `${T.ago} ${Math.round(sec / 60)} ${T.min_}`.trim();
      }
      ctx.fillText(ago, x + w - 7 * k, y + 13 * k);

      ctx.strokeStyle = '#E3E8EE';
      ctx.lineWidth = 1 * k;
      ctx.beginPath();
      ctx.moveTo(x + 6 * k, y + 25 * k);
      ctx.lineTo(x + w - 6 * k, y + 25 * k);
      ctx.stroke();

      if (!st || !Object.keys(st.sensors).length) return;

      // Γραμμές αισθητήρων
      const keys = Object.keys(st.sensors).sort((a, b) => {
        const ia = SENSOR_KEYS.indexOf(a);
        const ib = SENSOR_KEYS.indexOf(b);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
      }).slice(0, 6);
      const rowH = Math.min(22 * k, (h - 30 * k) / Math.max(keys.length, 1));
      keys.forEach((key, j) => {
        const s = st.sensors[key];
        const ry = y + 28 * k + j * rowH;
        const cy = ry + rowH / 2;
        const bad = online && this._alarmFor(key, s.value);
        ctx.globalAlpha = online ? 1 : 0.45;
        ctx.textAlign = 'left';
        ctx.font = font(10);
        ctx.fillStyle = '#3B4B5C';
        ctx.fillText(T.short[key] || key, x + 8 * k, cy, w * 0.3);
        ctx.textAlign = 'right';
        ctx.font = font(12, 700);
        ctx.fillStyle = bad ? '#E5413B' : '#0B1F3A';
        const unit = UNITS[key] || '';
        ctx.fillText(fmt(s.value) + (unit ? ' ' + unit : ''), x + w * 0.66, cy);
        // μικρό γράφημα των τελευταίων 10 λεπτών
        const sx = x + w * 0.69;
        const sw = w * 0.27;
        const sh = rowH * 0.6;
        const pts = s.hist.filter((p) => now - p[0] < 600000);
        if (pts.length > 1) {
          let lo = Math.min(...pts.map((p) => p[1]));
          let hi = Math.max(...pts.map((p) => p[1]));
          const r = RANGES[key];
          if (r && hi - lo < (r[1] - r[0]) * 0.05) {
            const mid = (hi + lo) / 2;
            lo = mid - (r[1] - r[0]) * 0.025;
            hi = mid + (r[1] - r[0]) * 0.025;
          } else if (hi === lo) {
            lo -= 1;
            hi += 1;
          }
          const t0 = now - 600000;
          ctx.strokeStyle = bad ? '#E5413B' : '#2E7DE1';
          ctx.lineWidth = 1.5 * k;
          ctx.beginPath();
          pts.forEach((p, idx) => {
            const px = sx + ((p[0] - t0) / 600000) * sw;
            const py = cy + sh / 2 - ((p[1] - lo) / (hi - lo)) * sh;
            if (idx === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
    }
  }

  Scratch.extensions.register(new ClassDashboard());
})(Scratch);
