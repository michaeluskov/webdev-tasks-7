'use strict';

var onChangeAction = function (action) {
    $('.action').html(action);
    if (action == 'nothing') {
        stopRecognising();
    }
};

var onChangeState = function (state) {
    $('.satiety').html(state.satiety);
    $('.energy').html(state.energy);
    $('.happiness').html(state.happiness);
    localStorage.setItem('satiety', state.satiety);
    localStorage.setItem('energy', state.energy);
    localStorage.setItem('happiness', state.happiness);
};

var onDie = function () {
    $('.dead').show();
    needToPlaySounds = false;
};

var getStateFromLocalStorage = function () {
    var stor = localStorage;
    if (stor.getItem('satiety') > 0 &&
        stor.getItem('energy') > 0 &&
        stor.getItem('happiness') > 0) {
            return {
                satiety: stor.getItem('satiety'),
                energy: stor.getItem('energy'),
                happiness: stor.getItem('happiness')
            }
        }
};

var setBatteryHandler = function () {
    if (!navigator.getBattery) {
        $('.feedme').show();
        $('.feedme').click(function () {
            hrundel.setAction('eating');
        });
        return;
    }
    navigator.getBattery().then(function (battery) {
        battery.addEventListener('chargingchange', function () {
            hrundel.setAction(battery.charging ? 'eating' : 'nothing');
        });
    });
};

var setAmbientLightHandler = function () {
    if ('ondevicelight' in window) {
        window.ondevicelight = function (e) {
            if (e.value < 50) {
                hrundel.setAction('sleeping');
            }
        };
    }
};

var playSound = function () {
    if (!needToPlaySounds) {
        return;
    }
    $('.hello')[0].play();
};

var startRecognising = function () {
    var SpeechRecognition = window.SpeechRecognition ||
        window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        return;
    }
    window.recogniser = new SpeechRecognition();
    recogniser.lang = 'en-US';
    recogniser.continious = true;
    recogniser.onresult = function (e) {
        var index = e.resultIndex;
        var result = e.results[index][0].transcript.trim();
            $('.text').html(result);
    };
};

var stopRecognising = function () {
    if (window.recognizer) {
        recognizer.stop();
    }
    delete window.recogniser;
};

$(window).load(function () {
    window.needToPlaySounds = true;
    window.hrundelSvg = new HrundelSvg();
    hrundelSvg.create('#svg');
    window.hrundel = new Hrundel(getStateFromLocalStorage());
    hrundel.changeStateCB = onChangeState;
    hrundel.changeActionCB = onChangeAction;
    hrundel.dieCB = onDie;
    $('.reset').click(function () {
        $('.dead').hide();
        needToPlaySounds = true;
        hrundel.reset();
    });
    setBatteryHandler();
    setAmbientLightHandler();
    $('.volume').change(function () {
         $('.hello')[0].volume = $('.volume').val();
    });
    $('#svg').click(function () {
        hrundel.setAction('listening');
        startRecognising();
    });
    setInterval(playSound, 4000);
});

$(window).focus(function () {
    hrundel.setAction('nothing');
});

$(window).blur(function () {
    hrundel.setAction('sleeping');
});
