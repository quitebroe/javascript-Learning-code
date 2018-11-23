function getStyle(obj,name){
         if (obj.currentStyle) {
          return obj.currentStyle[name];
         }else{
          return getComputedStyle(obj,true)[name];
         }
       }

function startMove(obj,attr,iTarget){
            //关闭自身物体的定时器
            clearInterval(obj.timer);
            //开启当前点中物体的定时器
            obj.timer=setInterval(function(){
                   //定义变量，计算一下速度
                   //让目标减去这个alpha的值
                   //除6让运动缓冲
                   var cur;
                   if (attr=='opacity') {
                      //Math.round
                      //这里需要用一个四舍五入的方法、去除小数点
                      //计算机有些计算是有BUG问题的
                      //比如alert(0.07*100);
                      var cur=Math.round(parseFloat(getStyle(obj,attr))*100); 

                   }else{
                       var cur=parseInt(getStyle(obj,attr)); 
                       //alert(cur);
                   }


                   var speed = (iTarget-cur)/6;
                   speed=speed>0?Math.ceil(speed):Math.floor(speed);
                   //console.log(spped);
                   if (cur == iTarget) {
                   	 clearInterval(obj.timer);
                   }else{

                     if (attr=='opacity') {
                       cur+=speed;
                       obj.style.filter='alpha(opacity:'+cur+')';
                       obj.style.opacity=cur/100;
                     }else{
                       obj.style[attr]=cur+speed+'px';
                       //console.log(cur+speed);
                     }

                   }
            },30)
         }
