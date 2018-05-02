(function (ext) {

    if (typeof Tone !== 'undefined') {
        console.log('Tone library is already loaded');
        startSynth();
    } else {
        $.getScript('http://ericrosenbaum.github.io/tone-synth-extension/Tone.min.js', startSynth);
    }

    function startSynth() {
        var tone = new Tone();

        // synth is a single oscillator

        var synthOptions = {
            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.03,
                decay: 0,
                sustain: 1,
                release: 0.03
            },
        };

        var synth = new Tone.SimpleSynth(synthOptions);

        synth.portamento = 0;



        function noteToNum(note) {


            var noteNum = 0;

            if (note === "C")
                noteNum = 0;
            else if (note === "C#" || note == "Db")
                noteNum = 1;
            else if (note === "D")
                noteNum = 2;
            else if (note === "D#" || note == "Eb")
                noteNum = 3;
            else if (note === "E")
                noteNum = 4;
            else if (note === "F")
                noteNum = 5;
            else if (note === "F#" || note == "Gb")
                noteNum = 6;
            else if (note === "G")
                noteNum = 7;
            else if (note === "G#" || note == "Ab")
                noteNum = 8;
            else if (note === "A")
                noteNum = 9;
            else if (note === "A#" || note == "Bb")
                noteNum = 10;
            else if (note === "B")
                noteNum = 11;
            return noteNum;
        }

        function findThird(root, q) {
            mod = 0;
            if (q.equals("Maj")) {
                mod = 0;
            } else if (q.equals("min")) {
                mod = -1;
            } else if (q.equals("dim")) {
                mod = -1;
            }
            return (rootNum + 4 + mod) % 12;
        }


        // effects chain

        var autoWah = new Tone.AutoWah();
        autoWah.wet.value = 0;
        autoWah.sensitivity.value = -40;

        var delay = new Tone.FeedbackDelay(0.25, 0.5);
        delay.wet.value = 0;

        var panner = new Tone.Panner(0.5);

        synth.connect(autoWah);
        autoWah.connect(delay);
        delay.connect(panner);
        panner.toMaster();

        // target frequency is used for the reporter, since
        // the actual frequency may ramp, portamento etc.

        var targetFreq = synth.frequency.value;

        var scaleRoot = 48; // root is note C2
        var minNote = 24;
        var maxNote = 100;
        //		
        // polysynth
        var pSynth = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();

        /*
        // timers for time interval hats 
        var intervalNames = ['bar', 'two bars', 'four bars', 'eight bars'];
        var intervalNotation = ['1m', '2m', '4m', '8m'];
        var intervalFlags = [];
        for (var i = 0; i < intervalNames.length; i++) {
        	intervalFlags[i] = false;
        	Tone.Transport.setInterval(function(i, time){
        		intervalFlags[i] = true;
        	}.bind(undefined, i), intervalNotation[i]);
        }
        Tone.Transport.start();
        Tone.Transport.loop = true;
        */

        // Cleanup function when the extension is unloaded
        ext._shutdown = function () {
            stopAllSounds();
        };

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

        function stopAllSounds() {
            synth.triggerRelease();
        }

        /// turn synth on and off

        ext.synthOnFor = function (secs) {
            synth.triggerAttackRelease(targetFreq, secs);
        };

        ext.synthOnForAndWait = function (secs, callback) {
            synth.triggerAttackRelease(targetFreq, secs);
            window.setTimeout(function () {
                callback();
            }, secs * 1000);
        };

        //		ext.synthOn = function() {
        //			synth.triggerAttack(targetFreq);
        //		};

        ext.playChord = function (q, r) {

            pSynth.triggerAttackRelease(['C4', 'E4', "A4"], "4n");
        };

        ext.synthOff = function () {
            synth.triggerRelease();
        };

        // synth note control

        // effects
//
////  
//
//        ext.setDelayTime = function (delayTime) {
//            delay.delayTime.value = delayTime;
//        };

        ext.setOscType = function (type) {
            synth.oscillator.type = type;
        };



        ext._stop = function () {
            synth.triggerRelease();
        };

        // Block and block menu descriptions

        var descriptor = {
            blocks: [


				[' ', 'play %m.q chord with root %m.root', 'playChord']


			],
            menus: {
                root: ['C', 'C#/Db,', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'],
                q: ['maj', 'min', 'dim', 'aug'],
                effects: ['echo', 'wah', 'pan left/right', 'glide', 'volume'],
                oscTypes: ['sine', 'triangle', 'square', 'sawtooth', 'pwm'],
                freqControls: ['note', 'frequency']
            }
        };

        // Register the extension
        ScratchExtensions.register('Synth Extension', descriptor, ext);

    };

})({});
