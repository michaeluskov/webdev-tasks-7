'use strict';

var INITIAL_STATE = {
    satiety: 100,
    energy: 100,
    happiness: 100
};

var Hrundel = function (state) {
    this.__state = state || $.extend({}, INITIAL_STATE);
    
    this.__action = 'nothing';
    
    this.dieCB = function () {};
    this.changeStateCB = function (state) {};
    this.changeActionCB = function (action) {};
    
    this.__startTicking();
};

Hrundel.prototype.__startTicking = function () {
    if (this.__consumeTickId) {
        return;
    }
    this.__consumeTickId = setInterval(this.__consumeTick.bind(this), 1000);
    this.__obtainTickId = setInterval(this.__obtainTick.bind(this), 3000);
};

Hrundel.prototype.__stopTicking = function () {
    if (!this.__stopTicking) {
        return;
    }
    clearInterval(this.__consumeTickId);
    clearInterval(this.__obtainTickId);
    delete this.__consumeTickId;
    delete this.__obtainTickId;
};

Hrundel.prototype.reset = function () {
    this.__state = $.extend({}, INITIAL_STATE);
    this.changeStateCB(this.__state);
    this.setAction('nothing');
    this.__startTicking();
};

Hrundel.prototype.setAction = function (action) {
    this.__action = action;
    this.changeActionCB(action);
};

Hrundel.prototype.__consumeTick = function () {
    var zeroCount = 0;
    Object.keys(this.__state).forEach((function (key) {
        this.__state[key] = Math.max(0, this.__state[key] - 1);
        if (this.__state[key] <= 0) {
            zeroCount++;
        }
    }).bind(this));
    this.changeStateCB(this.__state);
    if (zeroCount >= 2) {
        this.setAction('nothing');
        this.__stopTicking();
        this.dieCB();
    }
};

Hrundel.prototype.__obtainTick = function () {
    switch (this.__action) {
        case 'eating':
            this.__state.satiety = Math.min(100, this.__state.satiety + 5);
            break;
        case 'sleeping':
            this.__state.energy = Math.min(100, this.__state.energy + 5);
            break;
        case 'listening':
            this.__state.happiness = Math.min(100, this.__state.happiness + 5);
            break;
    }
};



