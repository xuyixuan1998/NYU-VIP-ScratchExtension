(function (ext) {
    $.getScript('https://tonejs.github.io/build/Tone.js', start)

    function start() {
        var lastTime = 0;
        var loop = false;
        var totalNotes = 0;
        var measure = 0;
        var sched = [];
        var octave = 4;
        var noteDuration = '4n'
        var baseUrl = "https://qscacheri.github.io/Sound-Samples/MusyngKite/acoustic_grand_piano-mp3/"

        var sampler = new Tone.Sampler({
            "C1": baseUrl + "C1.mp3",
            "Db1": baseUrl + "Db1.mp3",
            "D1": baseUrl + "D1.mp3",
            "Eb1": baseUrl + "Eb1.mp3",
            "E1": baseUrl + "E1.mp3",
            "F1": baseUrl + "F1.mp3",
            "Gb1": baseUrl + "Gb1.mp3",
            "G1": baseUrl + "G1.mp3",
            "Ab1": baseUrl + "Ab1.mp3",
            "A1": baseUrl + "A1.mp3",
            "Bb1": baseUrl + "Bb1.mp3",
            "B1": baseUrl + "B1.mp3",

            "C2": baseUrl + "C2.mp3",
            "Db2": baseUrl + "Db2.mp3",
            "D2": baseUrl + "D2.mp3",
            "Eb2": baseUrl + "Eb2.mp3",
            "E2": baseUrl + "E2.mp3",
            "F2": baseUrl + "F2.mp3",
            "Gb2": baseUrl + "Gb2.mp3",
            "G2": baseUrl + "G2.mp3",
            "Ab2": baseUrl + "Ab2.mp3",
            "A2": baseUrl + "A2.mp3",
            "Bb2": baseUrl + "Bb2.mp3",
            "B2": baseUrl + "B2.mp3",

            "C3": baseUrl + "C3.mp3",
            "Db3": baseUrl + "Db3.mp3",
            "D3": baseUrl + "D3.mp3",
            "Eb3": baseUrl + "Eb3.mp3",
            "E3": baseUrl + "E3.mp3",
            "F3": baseUrl + "F3.mp3",
            "Gb3": baseUrl + "Gb3.mp3",
            "G3": baseUrl + "G3.mp3",
            "Ab3": baseUrl + "Ab3.mp3",
            "A3": baseUrl + "A3.mp3",
            "Bb3": baseUrl + "Bb3.mp3",
            "B3": baseUrl + "B3.mp3",

            "C4": baseUrl + "C4.mp3",
            "Db4": baseUrl + "Db4.mp3",
            "D4": baseUrl + "D4.mp3",
            "Eb4": baseUrl + "Eb4.mp3",
            "E4": baseUrl + "E4.mp3",
            "F4": baseUrl + "F4.mp3",
            "Gb4": baseUrl + "Gb4.mp3",
            "G4": baseUrl + "G4.mp3",
            "Ab4": baseUrl + "Ab4.mp3",
            "A4": baseUrl + "A4.mp3",
            "Bb4": baseUrl + "Bb4.mp3",
            "B4": baseUrl + "B4.mp3",

            "C5": baseUrl + "C5.mp3",
            "Db5": baseUrl + "Db5.mp3",
            "D5": baseUrl + "D5.mp3",
            "Eb5": baseUrl + "Eb5.mp3",
            "E5": baseUrl + "E5.mp3",
            "F5": baseUrl + "F5.mp3",
            "Gb5": baseUrl + "Gb5.mp3",
            "G5": baseUrl + "G5.mp3",
            "Ab5": baseUrl + "Ab5.mp3",
            "A5": baseUrl + "A5.mp3",
            "Bb5": baseUrl + "Bb5.mp3",
            "B5": baseUrl + "B5.mp3"




        });

        Tone.Buffer.on('load', function () {
            console.log('...done');
            sampler.sync();
            sampler.toMaster();


        })

        Tone.Buffer.on('progress', function () {
            //            console.log('loading...');
        })

        Tone.Buffer.on('error', function () {
            console.log('error');
        })


        var notesAndNums = {
            60: 'C4',
            61: 'C#4',
            62: 'D4',
            63: 'D#4',
            64: 'E4',
            65: 'F4',
            66: 'F#4',
            67: 'G4',
            68: 'G#4',
            69: 'A4',
            70: 'A#4',
            71: 'B4',
            72: 'C5',
            73: 'C#5',
            74: 'D5',
            75: 'D#5',
            76: 'E5',
            77: 'F5',
            78: 'F#5',
            79: 'G5',
            80: 'G#5',
            81: 'A5',
            82: 'A#5',
            83: 'B5'
        };

        function noteToNum(note) {


            var noteNum = 0;

            if (note == "C")
                noteNum = 0;
            else if (note == "C#/Db")
                noteNum = 1;
            else if (note == "D")
                noteNum = 2;
            else if (note == "D#/Eb")
                noteNum = 3;
            else if (note == "E")
                noteNum = 4;
            else if (note == "F")
                noteNum = 5;
            else if (note == "F#/Gb")
                noteNum = 6;
            else if (note == "G")
                noteNum = 7;
            else if (note == "G#/Ab")
                noteNum = 8;
            else if (note == "A")
                noteNum = 9;
            else if (note == "A#/Bb")
                noteNum = 10;
            else if (note == "B")
                noteNum = 11;
            return noteNum;
        }

        function numToNote(note) {

            return notesAndNums[note];
        }

        function convertBeat(beats) {
            var m = 0;
            var b = 0;
            var s = 0;
            m = Math.floor(beats / 4);

            b = Math.floor(beats) - (m * 4);

            s = (beats % 1) * 4;
            return (m + ':' + b + ':' + s);
        }

        function findThird(root, q) {
            console.log(q + "quality");
            var mod;
            if (q == ("major")) {
                mod = 0;
            } else if (q == ("minor")) {
                mod = -1;
            } else if (q == ("diminished")) {
                mod = -1;
            } else if (q == ("augmented")) {
                mod = 0;
            }

            return (root + 4 + mod);
        }



        function findFifth(root, q) {
            var mod;
            if (q == ("major")) {
                mod = 0;
            } else if (q == ("minor")) {
                mod = 0;
            } else if (q == ("diminished")) {
                mod = -1;
            } else if (q == ("augmented")) {
                mod = 1;
            }

            return (root + mod + 7);
        }
        
        ext.playChord = function (r, q) {
            //
            var root = noteToNum(r);
            var notes = [];
            notes[0] = root + (12 * (octave + 1));
            notes[1] = findThird(root, q) + (12 * (octave + 1));
            notes[2] = findFifth(root, q) + (12 * (octave + 1));
            var noteAndTime;
            for (var i = 0; i < 3; i++) {
                noteAndTime = {
                    note: Tone.Frequency(notes[i], "midi").toNote(),
                    beats: lastTime
                };
                console.log(noteAndTime.note + " = note");

                sched.push(noteAndTime);
                console.log(noteAndTime.note);
            }
            console.log("last time at method = " + lastTime);
            totalNotes += 3;

        };

        ext.playChordForBeats = function (r, q, b) {
            //
            var root = noteToNum(r);
            var notes = [];
            notes[0] = root + (12 * (octave + 1));
            notes[1] = findThird(root, q) + (12 * (octave + 1));
            notes[2] = findFifth(root, q) + (12 * (octave + 1));
            var noteAndTime;
            console.log("root = " + notes[0]);
            console.log("third = " + notes[1]);
            console.log("fifth = " + notes[2]);
            //
            console.log('asdf');
            for (var i = 0; i < 3; i++) {
                noteAndTime = {
                    note: Tone.Frequency(notes[i], "midi").toNote(),
                    beats: lastTime
                };
                console.log(noteAndTime.note + " = note");

                sched.push(noteAndTime);
                console.log(noteAndTime.note);
            }
            lastTime += b;
            console.log("last time at method = " + lastTime);
            totalNotes += 3;



        };


        // Cleanup function when the extension is unloaded
        ext._shutdown = function () {};
        // Status reporting code
        // Use this to report missing hardware, plugin or unsupported browser
        ext._getStatus = function () {
            return {
                status: 2,
                msg: 'asdf'
            };
        };



        ext.playNote = function (n) {
            noteAndTime = {
                note: n + "" + octave,
                beats: lastTime
            };

            sched.push(noteAndTime);
            totalNotes++;
        };


        ext.playNoteForBeats = function (n, beats) {

            noteAndTime = {
                note: n + "" + octave,
                beats: lastTime
            };

            sched.push(noteAndTime);
            lastTime += (beats);
            totalNotes++;
            console.log('total notes = ' + totalNotes);
            console.log(lastTime + ' = last time');

        };

        ext.loopOn = function () {
            loop = true;
            console.log("loop is on");
        };

        ext.loopOff = function () {
            loop = false;
            console.log("loop is off");
            Tone.Transport.loop = false;
            Tone.Transport.stop();
            Tone.Transport.cancel();
        };

        ext.setOctave = function (n) {
            octave = n;
        };

        ext.setDuration = function (v) {
            switch (v) {
                case '1/2 note':
                    noteDuration = '2n';
                    break;
                case '1/4 note':
                    noteDuration = '4n';
                    break;
                case '1/8 note':
                    noteDuration = '8n'
                    break;
                case '1/16 note':
                    noteDuration = '16n';
                    break;
            }
        };

        ext.speakerOut = function () {
            Tone.Transport.start();

            Tone.Transport.setLoopPoints(0, "1:0:0");
            if (loop == true) {
                Tone.Transport.loop = true;
            } else Tone.Transport.loop = false;


            console.log(totalNotes);
            var time;
            for (var i = 0; i < totalNotes; i++) {

                time = convertBeat(sched[i].beats)
                console.log(sched[i].note + 'note');
                console.log(time + '=time');
                console.log(sched);
                sampler.triggerAttackRelease(sched[i].note, noteDuration, time);

            }

            console.log(convertBeat(lastTime));

            if (loop == false) {
                Tone.Transport.schedule(function (time) {
                    totalNotes = 0;
                    sched = [];
                    console.log('reset: ' + lastTime);
                    lastTime = 0;

                    Tone.Transport.stop();
                    Tone.Transport.cancel();
                }, convertBeat(lastTime));
            };
        }


        // Block and block menu descriptions
        var descriptor = {
            blocks: [
                [' ', 'play note %s', 'playNote','C'],
                [' ', 'play note %s for %n beat(s)', 'playNoteForBeats', 'C', 1],
                [' ', 'play %s %m.qualities','playChord','C','major'],
                [' ', 'play chord %s %m.qualities for %n beat(s)', 'playChordForBeats', 'C', 'major', 1],
                [' ', 'set loop on', 'loopOn'],
                [' ', 'set loop off', 'loopOff'],
                [' ', '🔊speaker🔊', 'speakerOut'],
                [' ', 'set octave to %n', 'setOctave', 4],
                [' ', 'set duration %m.beatval ', 'setDuration', '1/4 note']
            ],
            menus: {
                beatval: ['1/2 note', '1/4 note', '1/8 note', '1/16 note '],
                qualities: ['major', 'minor', 'diminished', 'augmented']
            }
        };
        // Register the extension
        ScratchExtensions.register('Music Blocks', descriptor, ext);
    };
})({});
