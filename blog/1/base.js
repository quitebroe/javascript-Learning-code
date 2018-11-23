/*
* @Author: 应煜鑫
* @Date:   2017-11-17 00:03:33
* @Last Modified by:   应煜鑫
* @Last Modified time: 2017-11-18 19:39:03
*/


var Base = {
	getId:function(id){
      return document.getElementById(id);
	},
	getName:function(id){
      return document.getElementsByName(id);
	},
	getTagName:function(id){
      return document.getElementsByTagName(id);
	},
};