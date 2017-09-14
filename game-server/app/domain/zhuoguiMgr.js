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
    this.trun = 0;
    this.countBySeat = {};
    this.playersBySeat = {};
    this.thisTrunDrank ={};
}

var pro = zhuoguiMgr.prototype;

pro.getGui = function () {
    return this.gui;
}

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
};
pro.zhangui = function (seatIndex,craps) {
    if(!this.gui){
        return;
    }
    this.countBySeat[seatIndex] = craps;
    this.pushAll('zhangui',{seat:seatIndex,craps:craps});
    if(this.countBySeat.length == this.players){
        this.pushAll('gameBegin',{trun:this.trun});
    }
};
//
function shangjiahei(seatIndex) {
    if(seatIndex-1<0){
        
    }else {

    }
}

pro.shoot = function (seatIndex,crap1,crap2) {
    var totalValue = crap1 + crap2;
    switch (totalValue){
        case 7:
            shangjiahei(seatIndex);
            break;
        case 8:

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