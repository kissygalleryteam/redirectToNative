## 综述

redirectToNative是根据设备类型和native app是否安装打开相应的地址；跳转逻辑为如果native app已经安装则直接打开相应app的相应功能;未安装则根据ios or andriod引导app下载。

* 版本：1.1
* 作者：miaojing
* demo：[http://gallery.kissyui.com/redirectToNative/1.1/demo/index.html](http://gallery.kissyui.com/redirectToNative/1.1/demo/index.html)

### 使用场景一: H5页面中的推荐下载、h5不支持但native支持的功能引导

#### 第一步： 加入容器，配置容器节点上的四个自定义属性，即：
* data-ios-native-url： ios app上注册的协议地址
* data-android-native-url：android app上注册的协议地址
* data-ios-install-url：ios app store里的安装地址
* data-android-install-url： android app的apk地址


<a id="J_DownloadApp" class="recommend-icon" href="http://www.etao.com/go/act/etao/android.php?spm=1002.1.0.0.dSUImz" data-ios-native-url="etao://home?src=home" data-android-native-url="etao://home?src=home" data-ios-install-url="https://itunes.apple.com/cn/app/yi-tao-xiang-gou-wu-xian-yi-tao/id451400917?mt=8" data-android-install-url="http://download.taobaocdn.com/freedom/20457/andriod/701234etaoandroid2.4.9.apk">下载app</a>


#### 第二步： 初始化组件

    S.use('gallery/redirectToNative/1.1/index', function (S, RedirectToNative) {
         var redirectToNative = new RedirectToNative('#J_DownloadApp');
    });

### 使用场景二：推广native app功能的手机短信链接、二维码链接的中间跳转页面
作为独立中间跳转页面，在求少求快的mobile端，也许你会嫌弃还要引入kissy seed和组件代码；所以提供一个原生js版本（@小二 直接copy到tms区块里面可以直接线上使用，如[tms页面]( http://www.taobao.com/go/rgn/redirectonative/test.php)），使用时[在线压缩工具](http://ganquan.info/yui/?hl=zh-CN)压缩下更佳哈。


<textarea value="<script>
/**
 * @fileoverview 
 * @author miaojing<miaojing@taobao.com>
 * @module redirectToNative 移动页面或中间跳转页面使用 原生实现，不依赖任何kissy模块
 **/

    var RedirectToNative = {
    	init: function(cfg) {
            var self = this;
                self.platform = self._UA();
            // pc下 什么都不处理  
            if(!self.platform) return;
            var config = cfg || {
                    iosInstallUrl: '',
                    androidInstallUrl: '',
                    iosNativeUrl: '',
                    andriodNativeUrl: ''
                };
            self.installUrl = self.platform == 'ios' ? config.iosInstallUrl : config.androidInstallUrl;
            self.nativeUrl = self.platform == 'ios' ? config.iosNativeUrl : config.andriodNativeUrl;
            self._gotoNative();
        },
        /**
         * [_gotoNative 跳转至native，native超时打不开就去下载]
         * @return 
         */
        _gotoNative: function() {
            var self = this;
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
                self._gotoInstall(startTime);
                /**
                 * 测试时间设置小于800ms时，在android下的UC浏览器会打开native app时并下载apk，
                 * 测试android+UC下打开native的时间最好大于800ms;
                 */
            }, 1000);
        },
        /**
         * [_gotoInstall 去下载]
         * @param  {[type]} startTime [开始时间]
         * @return 
         */
        _gotoInstall: function(startTime) {
            var self = this;
            var endTime = Date.now();
            if (endTime - startTime < 1300) {
                window.location = self.installUrl;
            }
        },
        /**
         * [_UA 检测平台]
         * @return string [ios|android| ]
         */
        _UA: function() {
            var ua = navigator.userAgent;
            // ios
            if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                return 'ios';
            } else if (!!ua.match(/Android/i)) {
                return 'android';
            } else {
                return '';
            }
        }
    };

//透传参数
var searchStr = location.search,
	iosNativeUrl = 'etao://item' + searchStr,
    andriodNativeUrl = 'etao://item' + searchStr;
// 根据实际需求，配置下这四个参数即可
RedirectToNative.init({
	iosInstallUrl: 'https://itunes.apple.com/cn/app/yi-tao-xiang-gou-wu-xian-yi-tao/id451400917?mt=8',
	androidInstallUrl: 'http://download.taobaocdn.com/freedom/20457/andriod/701234etaoandroid2.4.9.apk',
	iosNativeUrl: iosNativeUrl,
	andriodNativeUrl: andriodNativeUrl
});
</script>">
</textarea>



