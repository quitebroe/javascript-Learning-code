/*
* @Author: 应煜鑫
* @Date:   2017-11-15 14:55:45
* @Last Modified by:   应煜鑫
* @Last Modified time: 2017-11-16 19:48:14
*/

/*
*
    参数1 属性名称
    参数2 属性值
    参数3 过期时间
    setCookie('name','应煜鑫',15);
    setCookie('pass','123456',15);
*/
function setCookie(name,value,iDay){
   var oDate=new Date();
   oDate.setDate(oDate.getDate()+iDay);
        document.cookie=name+'='+value+';expires='+oDate;
};

/*
*   读取Cookie的值
    参数1 属性名称
    getCookie('name');
*/
function getCookie(name){
  //把Cookie拆分成数组
  var arr=document.cookie.split('; ');
  //然后循环这个数组
  for (var i = 0; i < arr.length; i++) {
    //再次进行拆分
    var arr2=arr[i].split('=');
    if (arr2[0]==name) {
      return arr2[1];
    }
  }
  return '';
};

//删除Cookie
function removeCookie(name){
  setCookie(name,1,-1);
}

/*
*事件绑定，兼容IE7以下版本
*同时兼容FF chrome IE9等现代浏览器
*例   myAttachEvent(btn1,'click',function(){
         alert('a');
      })
参数1，自身的ID
参数2，执行的点击事件
参数3，发生的函数
*/
function myAttachEvent(obj,ev,fn){
	    if (obj.attachEvent) {
     	 //attachEvent 适用于IE低版本浏览器
     	 obj.attachEvent('on'+ev,fn);
     }else{
     	 //addEventListener 适用于FF chrome IE9等现代浏览器
     	 obj.addEventListener(ev,fn,false);
     };
};



/*
*获取节点元素名的集合
*例1：getByClass(box,'red').length;
*参数1 对像的父级ID
*参数1 自身的Class名称
*/
function getByClass(oParent,sClass){
         var aEle = oParent.getElementsByTagName('*');
         var aResult=[];

         for (var i = 0 ; i < aEle.length; i++) {
             if (aEle[i].className==sClass) {
                aResult.push(aEle[i]);
             };
         };
         return aResult;
  };


/*
*getComputedStyle与currentStyle获取样式(style/class)
*例1：getStyle(obj,'color')
*例2：getStyle(btn1,'background-color')
*参数1 自身的元素ID
*参数2 CSS style中的属性名称：例color，font-size
*/
function getStyle(obj,name){
   if (obj.currentStyle) {
     return obj.currentStyle[name];
   }else{
     return getComputedStyle(obj,true)[name];
   }
}


/*
*获取鼠标当前定位
*/
function getPos(ev){
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft||document.body.scrollLeft; 
    
    return {x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop};
}


//我们的这个运动框架无法实现同时运动，所以我们现在要修改了一下了
// 希望的函数调用方式如下
// startMove(oDiv,{width:400,height:400},fnEnd)
/*
*参数1 自身的ID
*参数2 json值
*参数3 结束函数或递归一个函数
*/
function startMove(obj,json,fnEnd){
    //关闭自身物体的定时器
    clearInterval(obj.timer);
    //开启当前点中物体的定时器
    obj.timer=setInterval(function(){
          
         var bStop=true; //假设所有的json值都已经倒位

         for (var attr in json) {
           //定义变量，计算一下速度
           //让目标减去这个alpha的值
           //除6让运动缓冲
           var cur=0;
           if (attr=='opacity') {
              //Math.round
              //这里需要用一个四舍五入的方法、去除小数点
              //计算机有些计算是有BUG问题的
              //比如alert(0.07*100);
              var cur=Math.round(parseFloat(getStyle(obj,attr))*100); 
           }else{
              var cur=parseInt(getStyle(obj,attr));
              //alert(cur) ;
              //console.log(cur);
           }

           var speed = (json[attr]-cur)/6;
           speed=speed>0?Math.ceil(speed):Math.floor(speed);
           //speed=parseInt(speed);
           //console.log(parseInt(speed));
              //如果其中有一个JSON值还没有到达目标点的时候,
              //就把bStop=false赋值为假
              if (cur!=json[attr]) bStop=false; 
                
             if (attr=='opacity') {
               obj.style.filter='alpha(opacity:'+(cur+speed)+')';
               obj.style.opacity=(cur+speed)/100;
             }else{
               obj.style[attr]=cur+speed+'px';
               //console.log(cur+speed);
             };

        };

      //在结束了整个循环之后，这个时候bStop,依旧为真，保持true的情况
      //哪也就是说。、所有的值都已经到位了，哪么这个时候再关闭定时器
      //然后再次执行fuEnd函数
      if (bStop) {
        clearInterval(obj.timer);
        //alert('abc');
        if (fnEnd) fnEnd();
      }

    },30);
 };