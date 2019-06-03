var ask_box = cc.Class({
    properties: {
        
    },
    ctor: function () {
		this._node			= null;
        this._tips          = null;
        this._cancel_button  = null;
        this._enter_button	= null;
        this._parent		= null;
        this._enter_callBack = null;
        this._animSpeed		= 0.1;
    },
    show: function (detailString, parent, enterCallBack, cancelCallBack, animSpeed){
        var self = this;
    
        this.destory();
        
        if (self._node != undefined){
            return;
        }
    
        self._animSpeed = animSpeed ? animSpeed : self._animSpeed;
    
        var canvas = cc.find("Canvas");
        var win_size = cc.view.getVisibleSize();

        var node = new cc.Node('ask_box');
        node.parent = canvas;
        node.zIndex = 10000;
        node.setContentSize(win_size);
        node.addComponent(cc.BlockInputEvents);

        self._node = node;

        var cbIn = cc.callFunc(self.on_fade_in_finish, self);
        var cbOut = cc.callFunc(self.on_fade_out_finish, self);
        
        self.actionFadeIn = cc.sequence(cc.scaleTo(self._animSpeed, 1.0), cbIn);
        self.actionFadeOut = cc.sequence(cc.scaleTo(self._animSpeed, 0.0), cbOut);

        var node_lbl = new cc.Node("tips_text");
        node.addChild(node_lbl);
        node_lbl.color = new cc.Color(255, 0, 0);

        self._tips = node_lbl.addComponent(cc.Label);
        self._tips.fontSize = 32;

        var node_enter = new cc.Node('button_enter');
        node_enter.setPosition(-100, -100);
        node_enter.setContentSize(120, 80);
        
        node_enter.addComponent(cc.Button);

        node.addChild(node_enter);

        var node_enter_text = new cc.Node('node_enter_text');
        node_enter.addChild(node_enter_text);

        node_enter_text.color = new cc.Color(0, 255, 0);

        var node_enter_lbl = node_enter_text.addComponent(cc.Label);
        node_enter_lbl.fontSize = 32;
        node_enter_lbl.string = "确定";

        var node_cannel = new cc.Node('button_cancel');
        node_cannel.setPosition(100, -100);
        node_cannel.setContentSize(120, 80);
        
        node_cannel.addComponent(cc.Button);

        node.addChild(node_cannel);

        var node_cannel_text = new cc.Node('node_cannel_text');
        node_cannel.addChild(node_cannel_text);

        node_cannel_text.color = new cc.Color(0, 0, 255);

        var node_cannel_lbl = node_cannel_text.addComponent(cc.Label);
        node_cannel_lbl.fontSize = 32;
        node_cannel_lbl.string = "取消";
        
        node_enter.on('click', self.on_enter_button_clicked, self);
        node_cannel.on('click', self.on_cannel_button_clicked, self);

        this._enter_button = node_enter;
        this._cancel_button = node_cannel;
        
        self.start_fade_in();

        self.config(detailString, parent, enterCallBack, cancelCallBack);
    },
    config: function (detailString, parent, enterCallBack, cancelCallBack) {
        this._enter_callBack = enterCallBack;
        this._parent = parent;

        this._tips.string = detailString;

        var tips_width = detailString.length;
        if(tips_width > 10){
            this._tips.node.setScale(10 / tips_width);
        }

        if (cancelCallBack){
            this._cancel_button.active = true;
            this._cancelCallBack = cancelCallBack;
        }else{
            this._cancel_button.active = false;
            this._enter_button.x = 0;
        }
    },
    start_fade_in: function () {
        if(this._node != null){
            this._node.setPosition(cc.v2(0, 0));
            this._node.setScale(0);
            this._node.runAction(this.actionFadeIn);
        }
    },
    start_fade_out: function () {
        if(this._node != null){
            this._node.runAction(this.actionFadeOut);
        }
    },
    on_fade_in_finish: function () {
    },
    on_fade_out_finish: function () {
        this.destory();
    },
    on_enter_button_clicked: function(event){
        if(this._enter_callBack){
            this._enter_callBack.call(this._parent);
        }
        this.start_fade_out();
    },
    on_cannel_button_clicked: function(event){
        if(this._cancelCallBack){
            this._cancelCallBack.call(this._parent);
        }
        this.start_fade_out();
    },
    destory: function() {
        if(this._node != null){
            this._node.removeFromParent();
        }
        this._enter_callBack = null;
        this._cancelCallBack = null;
        this._node = null;
        this._tips = null;
        this._cancel_button = null;
        this._enter_button = null;
        this._animSpeed = 0.1;
    },
});

ask_box._instance = null;
ask_box.instance = function () {
    if(!ask_box._instance){
        ask_box._instance = new ask_box();
    }
    return ask_box._instance;
}