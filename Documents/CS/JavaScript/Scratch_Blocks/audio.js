(function (ext) {
    $.getScript("https://rawgit.com/mrdoob/three.js/master/build/three.js", start)



    function start() {
        const listener = new THREE.AudioListener();
        const audio = new THREE.Audio(listener);

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
            var listener = new THREE.AudioListener();
            camera.add(listener);

            // create a global audio source
            var sound = new THREE.Audio(listener);

            // load a sound and set it as the Audio object's buffer
            var audioLoader = new THREE.AudioLoader();
            audioLoader.load('https://www.computerhope.com/jargon/m/example.mp3', function (buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(true);
                sound.setVolume(0.5);
                sound.play();
            });
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
    }
})({});
