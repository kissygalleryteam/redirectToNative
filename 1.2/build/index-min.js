/*! redirectToNative - v1.2 - 2013-10-29 2:47:52 PM
* Copyright (c) 2013 妙净; Licensed  */
KISSY.add("gallery/redirectToNative/1.2/index",function(a,b){function c(a){var b=this;b.el=a,b.init()}return a.augment(c,{init:function(){var a=this;a.platform=a._UA(),a.platform&&!navigator.standalone&&b.on(a.el,"click",function(b){b.preventDefault();var c=b.currentTarget;"ios"==a.platform?(a.installUrl=c.getAttribute("data-ios-install-url"),a.nativeUrl=c.getAttribute("data-ios-native-url"),a.openTime=c.getAttribute("data-ios-open-time")||800):(a.installUrl=c.getAttribute("data-android-install-url"),a.nativeUrl=c.getAttribute("data-android-native-url"),a.openTime=c.getAttribute("data-android-open-time")||3e3,a.package=c.getAttribute("data-package")||"com.taobao.taobao"),"ios"!=a.platform&&navigator.userAgent.match(/Chrome/i)?a._hackChrome():a._gotoNative()})},_hackChrome:function(){var a=this,b=Date.now(),c=a.nativeUrl.split("://"),d=c[0],e=c[1];window.location="intent://"+e+"#Intent;scheme="+d+";package="+a.package+";end",setTimeout(function(){a._gotoDownload(b)},a.openTime)},_gotoNative:function(){var a=this,b=Date.now(),c=document,d=c.body,e=c.createElement("iframe");e.id="J_redirectNativeFrame",e.style.display="none",e.src=a.nativeUrl,d?d.appendChild(e):setTimeout(function(){c.body.appendChild(e)},0),setTimeout(function(){c.body.removeChild(e),a._gotoDownload(b)},a.openTime)},_gotoDownload:function(a){var b=this,c=Date.now();c-a<b.openTime+500&&(window.location=b.installUrl)},_UA:function(){var a=navigator.userAgent;return a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)?"ios":a.match(/Android/i)?"android":""}}),c},{requires:["event"]});