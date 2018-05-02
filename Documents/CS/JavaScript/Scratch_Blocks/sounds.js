var Tone = require('tone');
var Soundfont = require('soundfont-player');
var instrumentNames = require('soundfont-player/names/musyngkite.json');

var Sounds = function() {
    this._currInstrument = null;
    
    this._volume = 0.5;
    
    // Factor by which to multiply the gain
    this._gainBoost = 6;
    
    this.instruments = [];
    
    this.defaultInstrument = 'acoustic_grand_piano';
    
    this._loadedInstruments = {};
    this._activeNotes = {};
    
    for(var instrumentName of instrumentNames) {
        this.instruments.push({
            slug: instrumentName,
            name: instrumentName.replace(new RegExp('_', 'g'), ' ')
        });
        
        this._loadedInstruments[instrumentName] = null;
    }
};

Sounds.prototype = {
    // for box build (NODE_LOCAL) use custom host path, otherwise use soundfont-player's default. TODO: our own cloud-based copy instead?
   soundfontHost : ('/* @echo NODE_LOCAL */' == 'true') ? '/* @echo NODE_ASSETBASE */' + 'soundfonts/' : 'https://gleitz.github.io/midi-js-soundfonts/',

    // copy of soundfont-player's default nameToUrl using our build-specific host. TODO: support other sources as well?
    nameToUrl : function(name, sf, format) {
        format = format === 'ogg' ? format : 'mp3';
        sf = sf === 'FluidR3_GM' ? sf : 'MusyngKite';

        let url = Sounds.prototype.soundfontHost + sf + '/' + name + '-' + format + '.js';

        return url;
    },

    setInstrument: function (instrumentSlug) {
        // Check to see if the instrument slug is even valid
        if(this._loadedInstruments[instrumentSlug] === undefined) {
            // If not, choose a default instead
            return this.setInstrument(this.defaultInstrument);
        }
        
        if(this._loadedInstruments[instrumentSlug] === null) {
            Soundfont.instrument(Tone.context, instrumentSlug, { soundfont:'MusyngKite', nameToUrl: this.nameToUrl }).then(
                function (instrument) {
                    this._loadedInstruments[instrumentSlug] = instrument;
                    this._setCurrInstrument(instrumentSlug);
                }.bind(this),
                function(error) {
                    console.log('failed to load ' + instrumentSlug + ': ' + error.message);
                }
            );
        }
        else {
            this._setCurrInstrument(instrumentSlug);
        }
        
        return instrumentSlug;
    },
    
    _setCurrInstrument: function (instrumentSlug) {
        this._currInstrument = this._loadedInstruments[instrumentSlug];
        this._currInstrument.out.gain.value = this._volume * this._gainBoost;
    },

    setMasterVolume: function (vol) {
        this._volume = vol;
        
        if(this._currInstrument) {
            this._currInstrument.out.gain.value = this._volume * this._gainBoost;
        }
    },
    
    noteOn: function(midiNote) {
        // Don't play any notes if we haven't loaded any instruments yet
        if(this._currInstrument === null) {
            return;
        }
        
        if(midiNote in this._activeNotes) {
            this.noteOff(midiNote);
        }
        
        this._activeNotes[midiNote] = this._currInstrument.play(midiNote);
    },
    
    noteOff: function(midiNote) {
        if(midiNote in this._activeNotes) {
            this._activeNotes[midiNote].stop();
            delete this._activeNotes[midiNote];
        }
    }
};

module.exports = Sounds;