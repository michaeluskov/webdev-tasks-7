'use strict';

var HrundelSvg = function () {

};

HrundelSvg.prototype.create = function (selector) {
    this.__snap = Snap(selector);
    var bigCircle = this.__snap.circle(100, 100, 50);
    bigCircle.attr({
        fill: '#ff9999'
    });
    var leftEye = this.__snap.circle(70, 95, 10);
    var rightEye = this.__snap.circle(130, 95, 10);
    var nose = this.__snap.polygon(100, 95, 97, 110, 103, 110);
}