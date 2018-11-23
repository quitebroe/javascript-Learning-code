/*
* @Author: 应煜鑫
* @Date:   2017-11-16 15:28:56
* @Last Modified by:   应煜鑫
* @Last Modified time: 2017-11-16 16:10:31
*/
 function Drag(id) {
          var _this=this;
          this.disX = 0;
          this.disY = 0;

        this.oDiv = document.getElementById(id);
        this.oDiv.onmousedown = function(ev){
            _this.fnDown(ev);
            return false;
        };
 };


 Drag.prototype.fnDown=function (ev) {
 	console.log('按下');
    var _this=this;
    var oEvent = ev || event;
    //pos=getpos(oEvent);
    //鼠标的位置减去DIV的位置
    if (this.oDiv.setCapture) {
        this.disX = oEvent.clientX - this.oDiv.offsetLeft;
        this.disY = oEvent.clientY - this.oDiv.offsetTop;
        this.oDiv.onmousemove = function(ev){
            _this.fnMove(ev);
	        //在IE7下使用事件捕获，确保所有的事件都指向DIV
	        this.oDiv.setCapture();
        };
        this.oDiv.onmouseup = function(ev){
            _this.fnUp;
        };

    } else {
        this.disX = oEvent.clientX - this.oDiv.offsetLeft;
        this.disY = oEvent.clientY - this.oDiv.offsetTop;

        document.onmousemove =function(ev){
            _this.fnMove(ev);
        };
        document.onmouseup = function(ev){
            _this.fnUp;
        };
        
    };
}


Drag.prototype.fnMove= function (ev) {
	console.log('移动');
    var oEvent = ev || event;
    this.oDiv.style.left = oEvent.clientX - this.disX + 'px';
    this.oDiv.style.top =  oEvent.clientY - this.disY + 'px';
};

Drag.prototype.fnUp=function () {
	console.log('抬起');
    document.onmousemove = null;
    document.onmouseup = null;
    //在使用了事件捕获之后，在鼠标抬起的时候。需要释放这个事件捕获，不然的话，无法进行任何操作
    if (document.releaseCapture) {
       document.releaseCapture();
    };
};