(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.openGP= function() {
        window.open("https://apps.musedlab.org/groovepizza/?source=pub&museid=ry5rCDfof&show-grid=true&multi-lock=&brainpop=false&midimap=&");
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'open groove pizza', 'openGP'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('open groove pizza', descriptor, ext);
})({});