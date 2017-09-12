/**
 * Created by Administrator on 2017/9/12 0012.
 */
var _ =require('underscore');
var Player = require('./Player');

var zhuoguiMgr = function () {
    this.guiNum = 0;
    this.di = 0;
    this.gui = [];
    this.players = [];
    this.seatIndex = 0;
    this.countBySeat = {};
}

var pro = zhuoguiMgr.prototype;

pro.init = function (app,guinum,di) {
    this.app = app;
    this.guiNum = guinum;
    this.di = di;
}
// 定鬼
pro.dingGui2 =function () {
    for(var i=0;i<this.guiNum;i++){
        var gui = _.random(1,6);
        this.gui.push(gui);
    }
}

pro.addPlayer = function (uid) {
    var self = this;
    if(this.players.valueOf(uid)==-1){
        var player = new Player({uid:uid,seat:self.seatIndex});
        this.players.push(player);
        this.seatIndex++;
    }
}

pro.pushAll = function (route,msg) {
    var channelService = this.app.get('channelService');
    var channel = channelService.getChannel(1, false);
    channel.pushMessage(route, msg);
}

pro.begin = function () {
    this.dingGui2();
    this.pushAll('dinggui',{gui:this.gui});
};

var _gInstance = null;
module.exports.getInstance = function () {
     if(!_gInstance){
         _gInstance = new zhuoguiMgr();
     }
     return _gInstance;
}