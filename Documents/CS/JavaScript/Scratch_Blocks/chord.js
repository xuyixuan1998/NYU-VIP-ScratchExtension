(function (ext) {


        if (typeof Tone !== 'undefined') {} else {
            $.getScript('http://ericrosenbaum.github.io/tone-synth-extension/Tone.min.js', start);

        }




        function start() {
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


            // Cleanup function when the extension is unloaded
            ext._shutdown = function () {};

            // Status reporting code
            // Use this to report missing hardware, plugin or unsupported browser
            ext._getStatus = function () {
                return {
                    status: 2,
                    msg: 'Ready'
                };
            };





            var targetFreq = synth.frequency.value;


            ext.synthOnFor = function (secs) {
                synth.triggerAttackRelease(targetFreq, secs);
            };



            // Block and block menu descriptions
            var descriptor = {
                blocks: [
            // Block type, block name, function name
            [' ', 'synth on for %n secs', 'synthOnFor', 0.5],
        ]
            };

            // Register the extension
            ScratchExtensions.register('MuseEd Lab', descriptor, ext);
        })({});
