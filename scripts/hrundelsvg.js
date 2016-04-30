'use strict';

var HrundelSvg = function () {

};

HrundelSvg.prototype.create = function (selector) {
    this.__snap = Snap(selector);
    this.__bigCircle = this.__snap.circle(100, 100, 70).attr({
        fill: '#ff9999'
    });
    this.__leftEye = this.__snap.circle(70, 95, 10);
    this.__rightEye = this.__snap.circle(130, 95, 10);
    this.__leftPupil = this.__snap.circle(70, 95, 2).attr({
        fill: 'white'
    });
    this.__rightPupil = this.__snap.circle(130, 95, 2).attr({
        fill: 'white'
    });
    this.__leftEave = this.__snap.circle(70, 74, 11).attr({
        fill: '#ff9999'
    });
    this.__rightEave = this.__snap.circle(130, 74, 11).attr({
        fill: '#ff9999'
    });
    this.__nose = this.__snap.polygon(100, 95, 97, 110, 103, 110);
};

HrundelSvg.prototype.setSatiety = function (percentage) {
    var radius = 50 + (percentage / 5);
    this.__bigCircle.animate({r: radius}, 150);
};


HrundelSvg.prototype.setSleeping = function () {
    if (this.__isSleeping) {
        return;
    }
    this.__isSleeping = true;
    this.__leftEave.animate({cy: 95}, 1000);
    this.__rightEave.animate({cy: 95}, 1000);
};

HrundelSvg.prototype.setWokeUp = function () {
    if (!this.__isSleeping) {
        return;
    }
    this.__isSleeping = false;
    this.__leftEave.animate({cy: 74}, 1000);
    this.__rightEave.animate({cy: 74}, 1000);
};

HrundelSvg.prototype.setDead = function () {
    if (this.__isDead) {
        return;
    }
    this.__isDead = true;
    this.__leftPupil.animate({r: 0}, 1000);
    this.__rightPupil.animate({r: 0}, 1000);
};

HrundelSvg.prototype.setAlive = function () {
    if (!this.__isDead) {
        return;
    }
    this.__isDead = false;
    this.__leftPupil.animate({r: 2}, 1000);
    this.__rightPupil.animate({r: 2}, 1000);
};
