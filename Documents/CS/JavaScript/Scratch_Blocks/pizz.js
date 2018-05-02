(function (ext) {

    $.getScript('https://rawgit.com/alemangui/pizzicato/master/distr/Pizzicato.min.js', start)

    function start() {
        var sineWave = new Pizzicato.Sound({
            source: 'wave',
            options: {
                frequency: 440
            }
        });
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

        // Functions for block with type 'w' will get a callback function as the 
        // final argument. This should be called to indicate that the block can
        // stop waiting.
        ext.playAudio = function () {

            sineWave.play();
        };
        
        
        ext.stopAudio = function () {

            sineWave.stop();
        };

        // Block and block menu descriptions
        var descriptor = {
            blocks: [
            [' ', 'play', 'playAudio'],
            [' ', 'stop', 'stopAudio']
                
        ]
        };

        // Register the extension
        ScratchExtensions.register('Random wait extension', descriptor, ext);
    };
})({});
