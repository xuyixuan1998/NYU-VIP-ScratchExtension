(function (ext) {
    $.getScript('https://rawgit.com/danigb/soundfont-player/master/dist/soundfont-player.min.js', start)


    function start() {

        window.alert("Visit https://bit.ly/2I2IA3N for more info");

        var sched = [];
        var totalTime = 0;
        var instrumentList = [
  "accordion",
  "acoustic_bass",
  "acoustic_grand_piano",
  "acoustic_guitar_nylon",
  "acoustic_guitar_steel",
  "agogo",
  "alto_sax",
  "applause",
  "bagpipe",
  "banjo",
  "baritone_sax",
  "bassoon",
  "bird_tweet",
  "blown_bottle",
  "brass_section",
  "breath_noise",
  "bright_acoustic_piano",
  "celesta",
  "cello",
  "choir_aahs",
  "church_organ",
  "clarinet",
  "clavinet",
  "contrabass",
  "distortion_guitar",
  "drawbar_organ",
  "dulcimer",
  "electric_bass_finger",
  "electric_bass_pick",
  "electric_grand_piano",
  "electric_guitar_clean",
  "electric_guitar_jazz",
  "electric_guitar_muted",
  "electric_piano_1",
  "electric_piano_2",
  "english_horn",
  "fiddle",
  "flute",
  "french_horn",
  "fretless_bass",
  "fx_1_rain",
  "fx_2_soundtrack",
  "fx_3_crystal",
  "fx_4_atmosphere",
  "fx_5_brightness",
  "fx_6_goblins",
  "fx_7_echoes",
  "fx_8_scifi",
  "glockenspiel",
  "guitar_fret_noise",
  "guitar_harmonics",
  "gunshot",
  "harmonica",
  "harpsichord",
  "helicopter",
  "honkytonk_piano",
  "kalimba",
  "koto",
  "lead_1_square",
  "lead_2_sawtooth",
  "lead_3_calliope",
  "lead_4_chiff",
  "lead_5_charang",
  "lead_6_voice",
  "lead_7_fifths",
  "lead_8_bass__lead",
  "marimba",
  "melodic_tom",
  "music_box",
  "muted_trumpet",
  "oboe",
  "ocarina",
  "orchestra_hit",
  "orchestral_harp",
  "overdriven_guitar",
  "pad_1_new_age",
  "pad_2_warm",
  "pad_3_polysynth",
  "pad_4_choir",
  "pad_5_bowed",
  "pad_6_metallic",
  "pad_7_halo",
  "pad_8_sweep",
  "pan_flute",
  "percussive_organ",
  "piccolo",
  "pizzicato_strings",
  "recorder",
  "reed_organ",
  "reverse_cymbal",
  "rock_organ",
  "seashore",
  "shakuhachi",
  "shamisen",
  "shanai",
  "sitar",
  "slap_bass_1",
  "slap_bass_2",
  "soprano_sax",
  "steel_drums",
  "string_ensemble_1",
  "string_ensemble_2",
  "synth_bass_1",
  "synth_bass_2",
  "synth_brass_1",
  "synth_brass_2",
  "synth_choir",
  "synth_drum",
  "synth_strings_1",
  "synth_strings_2",
  "taiko_drum",
  "tango_accordion",
  "telephone_ring",
  "tenor_sax",
  "timpani",
  "tinkle_bell",
  "tremolo_strings",
  "trombone",
  "trumpet",
  "tuba",
  "tubular_bells",
  "vibraphone",
  "viola",
  "violin",
  "voice_oohs",
  "whistle",
  "woodblock",
  "xylophone"
];
        var instrument = 'acoustic_grand_piano';
        var ac = new AudioContext();
        var scale = [0, 2, 4, 5, 7, 9, 11];
        var chordOct = 4;
        var noteOct = 5;
        var lastTime = 0;

        function noteToNum(note) {


            var noteNum = 0;

            if (note == "C")
                noteNum = 0;
            else if (note == "C#" || note == "Db")
                noteNum = 1;
            else if (note == "D")
                noteNum = 2;
            else if (note == "D#" || note == "Eb")
                noteNum = 3;
            else if (note == "E")
                noteNum = 4;
            else if (note == "F")
                noteNum = 5;
            else if (note == "F#" || note == "Gb")
                noteNum = 6;
            else if (note == "G")
                noteNum = 7;
            else if (note == "G#" || note == "Ab")
                noteNum = 8;
            else if (note == "A")
                noteNum = 9;
            else if (note == "A#" || note == "Bb")
                noteNum = 10;
            else if (note == "B")
                noteNum = 11;
            return noteNum;
        }


        function numToNote(num) {


            var note;

            if (num == 0)
                note = 'C';
            else if (num == 1)
                note = 'C#';
            else if (num == 2)
                note = 'D';
            else if (num == 3)
                note = 'Eb';
            else if (num == 4)
                note = 'E';
            else if (num == 5)
                note = 'F';
            else if (num == 6)
                note = 'F#';
            else if (num == 7)
                note = 'G';
            else if (num == 8)
                note = 'Ab';
            else if (num == 9)
                note = 'A';
            else if (num == 10)
                note = 'Bb';
            else if (num == 11)
                note = 'B';
            return note;

        }

        function findThird(root, q) {

            var mod;
            if (q == ("maj")) {
                mod = 0;
            } else if (q == ("min")) {
                mod = -1;
            } else if (q == ("dim")) {
                mod = -1;
            } else if (q == ("aug")) {
                mod = 0;
            }

            //            console.log('third root is ' + ((root + 4 + mod)));
            return (root + 4 + mod);
        }

        function findFifth(root, q) {
            var mod = 0;
            if (q == ("maj")) {
                mod = 0;
            } else if (q == ("min")) {
                mod = 0;
            } else if (q == ("dim")) {
                mod = -1;
            } else if (q == ("aug")) {
                mod = 1;
            }

            return (root + mod + 7);
        }

        function isIn(list, val) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == val) return true;
            }

            return false;
        }
        // Cleanup function when the extension is unloaded
        ext._shutdown = function () {};
        //
        // Status reporting code
        // Use this to report missing hardware, plugin or unsupported browser
        ext._getStatus = function () {
            return {
                status: 2,
                msg: 'Ready'
            };
        };

        ext.setScale = function (r, q) {
            var root = noteToNum(r);
            var intervals = [0, 2, 4, 5, 7, 9, 11];
            var mod = 0;
            var note;
            if (q == 'min') {
                intervals[1] -= 1;
                intervals[4] -= 1;
                intervals[5] -= 1;
            }

            for (var i = 0; i < 7; i++) {
                scale[i] = root + (intervals[i]);
            }



        };

        ext.openGP = function () {
            window.open("https://apps.musedlab.org/groovepizza/?source=pub&museid=ry5rCDfof&show-grid=true&multi-lock=&brainpop=false&midimap=&");
        };

        ext.setOct = function (n) {
            chordOct = n;
            noteOct = n;

        };

        ext.setInstrument = function (i) {
            instrument = i;


        }

        ext.playChord = function (q, r) {
            var root = noteToNum(r);
            var notes = [];
            notes[0] = root;
            notes[1] = findThird(root, q);
            notes[2] = findFifth(root, q);
            //            console.log(notes[0] + ', ' + notes[1] + ', ' + notes[2]);
            for (var i = 0; i < 3; i++) {

                var noteAndTime = {
                    time: lastTime,
                    note: notes[i] + (12 * chordOct)
                };

                sched.push(noteAndTime);
            }
        };
        ext.playChordWait = function (q, r, t) {
            var root = noteToNum(r);
            var notes = [];
            notes[0] = root;
            notes[1] = findThird(root, q);
            notes[2] = findFifth(root, q);
            //            console.log(notes[0] + ', ' + notes[1] + ', ' + notes[2]);
            for (var i = 0; i < 3; i++) {

                var noteAndTime = {
                    time: lastTime,
                    note: notes[i] + (12 * chordOct)
                };

                sched.push(noteAndTime);

            }
            lastTime += t;
        };



        ext.playScary = function () {
            var root = 0;
            var notes = [];
            notes[0] = root;
            notes[1] = findThird(root, 'dim');
            notes[2] = findFifth(root, 'dim');
            console.log("asdf");
            console.log(notes[0] + ', ' + notes[1] + ', ' + notes[2]);
            for (var i = 0; i < 3; i++) {

                var noteAndTime = {
                    time: 0,
                    note: notes[i] + (12 * chordOct)
                };

                sched.push(noteAndTime);
            }
        };

        ext.playHappy = function () {
            var root = 0;
            var notes = [];
            notes[0] = root;
            notes[1] = findThird(root, 'maj');
            notes[2] = findFifth(root, 'maj');
            console.log(notes[0] + ', ' + notes[1] + ', ' + notes[2]);
            for (var i = 0; i < 3; i++) {

                var noteAndTime = {
                    time: 0,
                    note: notes[i] + (12 * chordOct)
                };

                sched.push(noteAndTime);
            }
        };

        ext.playSad = function () {
            var root = 0;
            var notes = [];
            notes[0] = root;
            notes[1] = findThird(root, 'min');
            notes[2] = findFifth(root, 'min');
            console.log(notes[0] + ', ' + notes[1] + ', ' + notes[2]);
            for (var i = 0; i < 3; i++) {

                var noteAndTime = {
                    time: 0,
                    note: notes[i] + (12 * chordOct)
                };

                sched.push(noteAndTime);
            }
        };

        ext.playMyst = function () {
            var root = 0;
            var notes = [];
            notes[0] = root;
            notes[1] = findThird(root, 'aug');
            notes[2] = findFifth(root, 'aug');
            console.log(notes[0] + ', ' + notes[1] + ', ' + notes[2]);
            for (var i = 0; i < 3; i++) {

                var noteAndTime = {
                    time: 0,
                    note: notes[i] + (12 * chordOct)
                };

                sched.push(noteAndTime);
            }
        };


        ext.playMel = function (num) {

            switch (num) {
                case 'root':
                    note = scale[0];
                    console.log('note= ' + note);
                    break;

                case '2nd':
                    note = scale[1];
                    break;
                case '3rd':
                    note = scale[2];
                    break;
                case '4th':
                    note = scale[3];
                    break;
                case '5th':
                    note = scale[4];
                    break;
                case '6th':
                    note = scale[5];
                    break;
                case '7th':
                    note = scale[6];
                    break;

            }

            Soundfont.instrument(ac, instrument).then(function (mel) {
                mel.play(note + (12 * noteOct)) //.stop(ac.currentTime + 0.5)
            })
        };


        ext.playMidi = function (note) {

            var noteAndTime = {
                time: lastTime,
                note: note
            };

            sched.push(noteAndTime);
            //            lastTime+
        };


        ext.playMidiAndWait = function (n, t) {
            var time = 0;
            time = parseFloat(t);

            var noteAndTime = {
                time: lastTime,
                note: n
            };
            sched.push(noteAndTime);
            lastTime += time;

        };


        ext.playNote = function (note) {
            var n = noteToNum(note);
            var noteAndTime = {
                time: lastTime,
                note: n + (12 * noteOct)
            };
            sched.push(noteAndTime);
        };



        ext.playNoteWait = function (note, t) {
            var time = 0;
            time = parseFloat(t);
            var n = noteToNum(note);
            var noteAndTime = {
                time: lastTime,
                note: n + (12 * noteOct)
            };
            sched.push(noteAndTime);
            lastTime += time;
        };

        ext.wait_random = function (callback) {
            wait = Math.random();
            console.log('Waiting for ' + wait + ' seconds');


            window.setTimeout(function () {
                callback();
            }, 1000);
        };


        ext.master1 = function (callback) {

            totalTime = lastTime * 1000;
            //            else totalTime=lastTime*100;


            Soundfont.instrument(ac, instrument).then(function (piano) {
                piano.schedule(ac.currentTime, sched)

            });

            console.log(sched);

            window.setTimeout(function () {
                reset();
            }, totalTime);

            window.setTimeout(function () {
                callback();
            }, totalTime);

        };

        ext.master2 = function (callback) {

            totalTime = lastTime * 1000;
            //            else totalTime=lastTime*100;


            Soundfont.instrument(ac, instrument).then(function (piano) {
                piano.schedule(ac.currentTime, sched)

            });

            console.log(sched);

            window.setTimeout(function () {
                reset();
            }, totalTime);

            window.setTimeout(function () {
                callback();
            }, totalTime);

        };


        function reset() {
            //            lastTime=0;
            sched = [];
            console.log("...finished");
            totalTime = 0;
            lastTime = 0;
        }

        ext.reset = function () {
            sched = [];
            lastTime = 0;

        };

        ext.reset2 = function () {
            lastTime = 0;
        };


        ext.test = function () {
            var obj = {
                gain: 2
            };
            Soundfont.instrument(ac, instrument).then(function (piano) {
                piano.play(60)

            });
        };



        // Block and block menu descriptions
        var descriptor = {
            blocks: [


				[' ', 'play %m.q chord with root %m.root', 'playChord', 'maj', 'C'],
                [' ', 'play %m.q chord with the root %m.root and wait %n sec', 'playChordWait', 'maj', 'C', 1],
//                [' ', 'play the %m.scaleDeg note in a %m.root %m.scaleQ scale', 'playMel', 'root', 'C', 'maj'],
                [' ', 'play %m.root', 'playNote', 'C'],
                [' ', 'play %m.root and wait %n sec', 'playNoteWait', 'C', 1],
                [' ', ' play midi %n and wait %n sec', 'playMidiAndWait', 60, 1],
                [' ', 'play MIDI note %n', 'playMidi', 60],
                [' ', '👻play scary chord👻', 'playScary'],
                [' ', '🔮play mystical chord🔮', 'playMyst'],
                [' ', '😥play sad chord😥', 'playSad'],
                [' ', '😁play happy chord😁', 'playHappy'],
                [' ', 'play the %m.scaleDeg in a scale', 'playMel', 'root'],
                [' ', 'set octave %n', 'setOct', '4'],
                [' ', 'set scale %m.root %m.scaleQ', 'setScale', 'C', 'maj'],
                [' ', 'set instrument %m.instruments', 'setInstrument', 'acoustic_grand_piano'],
                [' ', 'open groove pizza', 'openGP'],
                ['w', 'instrument 1', 'master1'],
                ['w', 'instrument 2', 'master2'],
                ['w', 'instrument 3', 'master2'],
                ['w', 'instrument 4', 'master2']


			],
            menus: {
                scaleQ: ['maj', 'min'],
                scaleDeg: ['root', '2nd', '3rd', '4th', '5th', '6th', '7th'],
                root: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
                q: ['maj', 'min', 'dim', 'aug'],
                instruments: instrumentList,
            }
        };

        ScratchExtensions.register('MusEd Lab', descriptor, ext);
    };
})({});
