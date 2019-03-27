/*
* @Author: 应煜鑫
* @Date:   2017-11-16 15:43:09
* @Last Modified by:   应煜鑫
* @Last Modified time: 2017-11-16 15:58:33
*/
function LimitDarg(id){
	Drag.call(this,id);
}

for (var i  in Drag.prototype) {
	LimitDarg.prototype[i]=Drag.prototype[i];
}

LimitDarg.prototype.fnMove=function(ev){
	console.log('LimitDarg移动');
    var oEvent = ev || event;

     var l = oEvent.clientX - this.disX ;
     var t = oEvent.clientY - this.disY ;
    
     var r=document.documentElement.clientWidth - this.oDiv.offsetWidth;
     var b=document.documentElement.clientHeight - this.oDiv.offsetHeight;

     if(l<0){
     	l=0;
     }else if(l>r){
     	l=r;
     };

     if(t<0){
     	t=0;
     }else if(t>b){
     	t=b;
     };

    this.oDiv.style.left = l + 'px';
    this.oDiv.style.top = t + 'px';
}