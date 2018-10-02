(function(ext) {
    $.getScript('https://tonejs.github.io/build/Tone.js', start);

    // whem script is loaded...
    function start(){
        alert('ok!')

        // Cleanup function when the extension is unloaded
        ext._shutdown = function() {};

        // Status reporting code
        // Use this to report missing hardware, plugin or unsupported browser
        ext._getStatus = function() {
            return {status: 2, msg: 'Ready'};
        };


        //create a synth and connect it to the master output (your speakers)
        var synth = new Tone.Synth().toMaster();

        // block: play rythm map
        ext.playRythmMap = function(note, myRythmMap, tempo) {
            // Code that gets executed when the block is run

            // iterate through rythm map
            for (var i=0; i<myRythmMap.length; i++){
                var currentNotation = myRythmMap[i];
                // if x, play sound
                if (currentNotation === 'x'){
                    synth.triggerAttackRelease(note, tempo);

                }
                /*
                // if _, skip sound
                else if (currentNotation === '_'){
                    synth.triggerRelease();
                }
                // if +, extend sound
                else if (currentNotation === '+'){

                }
                */
                else{
                    alert('Unknown notation!');
                }
            }
        };

        // Block and block menu descriptions
        var descriptor = {
            blocks: [
                // Block type, block name, function name
                [' ', 'play %m.note %s beats at %m.tempo', 'playRythmMap', 'C4', 'xxxxxxxx', '8n']
            ],
            menus: {
                note: ['C4', 'D4', 'E4', 'F4', 'G4'],
                tempo: ['4n', '8n', '16n']
            }
        };

        // Register the extension
        ScratchExtensions.register('Rythm Map', descriptor, ext);
    }

})({});