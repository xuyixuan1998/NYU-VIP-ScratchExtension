(function (ext) {

    if (typeof Tone !== 'undefined') {
        console.log('Tone library is already loaded');
        startSynth();
    } else {
        $.getScript('http://ericrosenbaum.github.io/tone-synth-extension/Tone.min.js', startSynth);
    }

    function startSynth() {


        var notes = {};

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
            }
            console.log('third root is '+((root + 4 + mod) % 12));
            return (root + 4 + mod) % 12;
        }

        function findFifth(root, q) {
            var mod = 0;
            if (q == ("maj")) {
                mod = 0;
            } else if (q == ("min")) {
                mod = 0;
            } else if (q == ("dim")) {
                mod = -1;
            }

            return (root + mod + 7) % 12;
        }

        var pSynth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();
        var mSynth = new Tone.MonoSynth({
            "oscillator": {
                "type": "sine"
            },
            "envelope": {
                "attack": 0.1
            }
        }).toMaster();

        // Status reporting code
        // Use this to report missing hardware, plugin or unsupported browser
        ext._getStatus = function () {
            if (typeof AudioContext !== "undefined") {
                return {
                    status: 2,
                    msg: 'Ready'
                };
            } else {
                return {
                    status: 1,
                    msg: 'Browser not supported'
                };
            }
        };



        ext.playChord = function (q, r) {
//            console.log('root is' + r);
            var root = r;





            var third = findThird(noteToNum(r), q);
            var fifth = findFifth(noteToNum(r), q);
            
            console.log('root is ' + root);
            console.log('third is ' + third);
            console.log('fifth is ' + fifth);

            third = numToNote(third);
            fifth = numToNote(fifth);

            pSynth.triggerAttackRelease([root + '4', third + '4', fifth + '4'], "4n");
        };

        ext.stopSound = function () {
            pSynth.triggerRelease();
            mSynth.triggerRelease();



        };

        ext.playMel = function (num, r, q) {
            var intervals = [2, 4, 5, 7, 9, 11];
            var mod = 0;
            var note;
            if (q == 'min') mod = -1;

            switch (num) {
                case 'root':
                    note = r + '5';
                    break;

                case '2nd':
                    note = (noteToNum(r) + 2 + mod) % 12;
                    note = numToNote(note) + '5';
                    break;
                case '3rd':
                    note = (noteToNum(r) + 4 + mod) % 12;
                    note = numToNote(note) + '5';
                    break;
                case '4th':
                    note = (noteToNum(r) + 5 + mod) % 12;
                    note = numToNote(note) + '5';
                    break;
                case '5th':
                    note = (noteToNum(r) + 7 + mod) % 12;
                    note = numToNote(note) + '5';
                    break;
                case '6th':
                    note = (noteToNum(r) + 9 + mod) % 12;
                    note = numToNote(note) + '5';
                    break;
                case '7th':
                    note = (noteToNum(r) + 11 + mod) % 12;
                    note = numToNote(note) + '5';
                    break;

            }
            console.log(note);
            mSynth.triggerAttackRelease(note + "", "4n");

        };

        //asdf
        // Block and block menu descriptions

        var descriptor = {
            blocks: [


				[' ', 'play %m.q chord with root %m.root', 'playChord', 'maj', 'C'],
                [' ', 'play the %m.scaleDeg note in a %m.root %m.scaleQ scale', 'playMel', 'root', 'C', 'maj'],
                [' ', 'play the %m.scaleDeg note in a %m.root %m.scaleQ scale int the octave %m.oct', 'playMel', 'root', 'C', 'maj'],
                [' ', 'stop', 'stopSound']


			],
            menus: {
                scaleQ: ['maj', 'min'],
                scaleDeg: ['root', '2nd', '3rd', '4th', '5th', '6th', '7th'],
                root: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
                q: ['maj', 'min', 'dim', 'aug'],
                oct: ['1','2','3','4','5','6']
            }
        };

        // Register the extension
        ScratchExtensions.register('Play Chord', descriptor, ext);

    };

})({});
