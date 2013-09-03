/**
 * @fileoverview 
 * @author miaojing<miaojing@taobao.com>
 * @module redirectToNative 移动页面或中间跳转页面使用 尽量不依赖任何kissy模块
 **/
KISSY.add(function (S) {
    /**
     * @class RedirectToNative
     * @constructor 
     */
    function RedirectToNative(comConfig) {
        var self = this;
        var config = {
            iosInstallUrl: 'https://itunes.apple.com/cn/app/yi-tao-xiang-gou-wu-xian-yi-tao/id451400917?mt=8',
            androidInstallUrl: 'http://download.taobaocdn.com/freedom/20457/andriod/701234etaoandroid2.4.9.apk',
            iosNativeUrl: 'taobao://home',
            andriodNativeUrl: 'intent://#Intent;scheme=taobao;package=com.taobao.taobao;end'
        }
        self.config = S.merge(config, comConfig);
        self.init();
    }
        
    S.extend(RedirectToNative, 
        init: function() {
            var self = this;
            self.dealUA();
            if (!self.nativeUrl) return;
            var startTime = Date.now(),
                doc = document,
                body = doc.body,
                iframe = doc.createElement('iframe');
                iframe.id = 'J_redirectNativeFrame';
                iframe.style.display = 'none';
                iframe.src = self.nativeUrl;
            //运行在head中
            if(!body) {
                setTimeout(function(){
                    doc.body.appendChild(iframe);
                }, 0);
            } else {
                body.appendChild(iframe);
            }
            
            setTimeout(function() {
                doc.body.removeChild(iframe);
                _gotoInstall(startTime);
            }, 400);
        },
        gotoInstall: function(startTime) {
            var self = this;
            var endTime = Date.now();
            if (endTime - startTime < 1000) {
                window.location = self.installUrl;
            }
        },
        dealUA: function() {
            var ua = navigator.userAgent;
            var self = this, config = self.config;
            // ios
            if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                self.installUrl = config.iosInstallUrl;
                self.nativeUrl = config.iosNativeUrl;
            } else if (!!ua.match(/Android/i)) {
                self.installUrl = config.androidInstallUrl;
                self.nativeUrl = config.andriodNativeUrl;
            } 
        }
    );
    return RedirectToNative;
});



