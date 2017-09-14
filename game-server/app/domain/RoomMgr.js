/**
 * Created by Administrator on 2017/9/12 0012.
 */
var _ =require('underscore');
var Player = require('./Player');

var roomMgr = function () {
    this.guiNum = 0;
    this.di = 0;
    this.gui = [];
    this.players = [];
    this.seatIndex = 0;
    this.countBySeat = {};
}

var pro = roomMgr.prototype;

pro.init = function (app,guinum,di) {
    this.app = app;
    this.guiNum = guinum;
    this.di = di;
}


var _gInstance = null;
module.exports.getInstance = function () {
    if(!_gInstance){
        _gInstance = new roomMgr();
    }
    return _gInstance;
}