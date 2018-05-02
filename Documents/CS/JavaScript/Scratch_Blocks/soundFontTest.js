(function (ext) {
    $.getScript('https://rawgit.com/danigb/soundfont-player/master/dist/soundfont-player.min.js', start)


    function start() {
        var ac= new AudioContext();
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

        ext.my_first_block = function () {
            var notes=['D4','F#4','A4','C#4']
            var i;
            Soundfont.instrument(ac, 'acoustic_grand_piano').then(function(piano) {
                for (i=0; i<4; i++){
                    piano.play(notes[i])
                }
            })
            

        };

        // Block and block menu descriptions
        var descriptor = {
            blocks: [
            // Block type, block name, function name
            [' ', 'my first block', 'my_first_block'],
        ]
        };

        // Register the extension
        ScratchExtensions.register('My first extension', descriptor, ext);
    };
})({});
