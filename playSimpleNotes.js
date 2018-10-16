/*
Goal: an intuitive block to play (instrument) notes for beginners like myself!
PlayNotes Block:
User can input a list of absolute piano ket value such as C4, B4 seperated by comma
and select the noteDur/note duration (1,2,4,8,16)

Perhaps PlayNotesAtOnce Block?

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ISSUES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
- sampler does not play sound
- cannot play the block for second time
- unsure whether the set of the time signature is good?
*/

(function(ext) {
    $.getScript('https://tonejs.github.io/build/Tone.js', start);

    // whem script is loaded...
    function start(){
        alert('Script ready!');

        // Cleanup function when the extension is unloaded
        ext._shutdown = function() {};

        // Status reporting code
        // Use this to report missing hardware, plugin or unsupported browser
        ext._getStatus = function() {
            return {status: 2, msg: 'Ready'};
        };

        let baseUrl = "https://qscacheri.github.io/Sound-Samples/MusyngKite/acoustic_grand_piano-mp3/";
        let samples = {
            "C4" : "C4.mp3",
            "D4" : "D4.mp3",
            "E4" : "E4.mp3",
            "F4" : "F4.mp3",
            "G4" : "G4.mp3",
            "A4" : "A4.mp3",
            "B4" : "B4.mp3",

            "C5" : "C5.mp3",
            "D5" : "D5.mp3",
            "E5" : "E5.mp3",
            "F5" : "F5.mp3",
            "G5" : "G5.mp3",
            "A5" : "A5.mp3",
            "B5" : "B5.mp3",

            "C6" : "C6.mp3",
            "D6" : "D6.mp3",
            "E6" : "E6.mp3",
            "F6" : "F6.mp3",
            "G6" : "G6.mp3",
            "A6" : "A6.mp3",
            "B6" : "B6.mp3"
        }
        let canUseBlock = false;

        // create a tone sampler
        let sampler = new Tone.Sampler (samples , samplerLoaded() , baseUrl);
        let synth = new Tone.Synth();

        function samplerLoaded(){
            alert("Sampler ready!");
            // Sync the instrument to the Transport. All subsequent calls of triggerAttack and triggerRelease will be scheduled along the transport.
            canUseBlock = true;
        }

        // block: play simple notes
        ext.playNotes = function(notesToPlay, noteDur) {
            // if we loaded everything and can start using the block
            if (canUseBlock){
                
                synth.toMaster();
                synth.volume.value = -6;

                // split the given note string by comma
                let notesToPlayArr = notesToPlay.split(',');

                Tone.Transport.timeSignature = [1, noteDur];

                let startPlay = true;

                console.log(notesToPlayArr);
                
                /*
                // testing how transport work
                Tone.Transport.timeSignature = [1, 4];
                Tone.Transport.schedule(function(){synth.triggerAttackRelease("C4", '4n')}, '1:1');
                Tone.Transport.schedule(function(){synth.triggerAttackRelease("D4", '4n')}, '2:1');
                Tone.Transport.schedule(function(){synth.triggerAttackRelease("E4", '4n')}, '3:1');
                Tone.Transport.start();
                */

                // iterate through notes array
                for (let i=0; i<notesToPlayArr.length; i++){
                    let currentNote = notesToPlayArr[i];

                    // if the input note is found in our sampler list
                    if (currentNote in samples){
                        // schedule the play event
                        //Tone.Transport.schedule(function(){sampler.triggerAttackRelease(currentNote, noteDur.toString()+'n')}, playTime);
                        // sampler not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! use synth intead
                        let playTime = (i+1).toString()+':'+1;
                        Tone.Transport.schedule(function(){synth.triggerAttackRelease(currentNote, noteDur.toString()+'n')}, playTime);
                    }
                    // if pause sign
                    else if (currentNote === '-'){
                        console.log('resting')
                    }
                    // if not, alert
                    else{
                        alert('Unknown note!');
                        startPlay = false;
                    }
                }

                
                if (startPlay){
                    //Tone.Transport.start();
                    // sampler not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! use synth intead
                    Tone.Transport.start();
                }
                else{
                    alert('Cannot play!');
                }  
            }

            else{
                alert("Wait a minute!");
            }

        };

        // Block and block menu descriptions
        var descriptor = {
            blocks: [
                // Block type, block name, function name
                [' ', 'play %s each as 1/%m.noteDur notes', 'playNotes', 'C4,C4,G4,G4,A4,A4,G4,-,F4,F4,E4,E4,D4,D4,C4', 4]
            ],
            menus: {
                noteDur: [1, 2, 4, 8, 16]
            }
        };

        // Register the extension
        ScratchExtensions.register('Play Simple Notes', descriptor, ext);
    }
})({});