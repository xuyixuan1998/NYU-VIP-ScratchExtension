(function (ext) {

    if (typeof Tone !== 'undefined') {
        console.log('Tone library is already loaded');
        startSynth();
    } else {
        $.getScript('http://ericrosenbaum.github.io/tone-synth-extension/Tone.min.js', startSynth);
    }

    function startSynth() {
        //        var tone = new Tone();

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
            if (q == ("Maj")) {
                mod = 0;
            } else if (q == ("min")) {
                mod = -1;
            } else if (q == ("dim")) {
                mod = -1;
            }
            return (root + 4 + mod) % 12;
        }

        function findFifth(root, q) {
            var mod = 0;
            if (q == ("Maj")) {
                mod = 0;
            } else if (q == ("min")) {
                mod = 0;
            } else if (q == ("dim")) {
                mod = -1;
            }

            return (root + mod + 7) % 12;
        }

        var pSynth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();


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
            var root = r + '4'
            console.log(noteToNum(r));

            var third = findThird(noteToNum(r), q);
            var fifth = findFifth(noteToNum(r), q);

            third = numToNote(third);
            third += '4';
            fifth = numToNote(fifth);
            fifth += '4';
            pSynth.triggerAttackRelease([root, third, fifth], "4n");
            console.log(third);
        };


        // Block and block menu descriptions

        var descriptor = {
            blocks: [


				[' ', 'play %m.q chord with root %m.root', 'playChord', 'Maj', 'C']


			],
            menus: {
                root: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
                q: ['maj', 'min', 'dim', 'aug']
            }
        };

        // Register the extension
        ScratchExtensions.register('Play Chord', descriptor, ext);

        };

})({});
