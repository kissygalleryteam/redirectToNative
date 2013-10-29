## 综述

redirectToNative是根据设备类型和native app是否安装打开相应的地址；跳转逻辑为如果native app已经安装则直接打开相应app的相应功能;未安装则根据ios or andriod引导app下载。

* 版本：1.2
* 作者：妙净
* demo：[http://gallery.kissyui.com/redirectToNative/1.2/demo/index.html](http://gallery.kissyui.com/redirectToNative/1.2/demo/index.html)

## 使用场景一
### H5页面中的推荐下载、h5不支持但native支持的功能引导

#### 第一步： 加入容器，配置容器节点上的四个自定义属性，即：
<ul>
<li>data-ios-native-url： 必选 ios app上自定义的url scheme 如 taobao://home(淘宝首页) etao://item?nid=xxx（一淘商品详情页） </li>
<li>data-android-native-url：必选 android app上自定义的url scheme</li>
<li>data-ios-install-url：必选 ios app store里的安装地址</li>
<li>data-android-install-url：必选 android app的apk地址</li>   
<li>data-package：可选 默认com.taobao.taobao android的包名，如淘宝为com.taobao.taobao，etao为com.taobao.etao</li>      
<li>data-ios-open-time： 可选默认800ms， 启动ios客户端所需时间，一般ios平台整体性能不错，打开速度较快</li>      
<li>data-android-open-time：可选默认2000ms，启动android客户端所需时间，android系统性能参差不齐所需启动时间也不齐，和android客户端本身启动时间也有关，比如3.0版本启动一淘客户端就平均比淘宝客户端要慢200ms</li>      
</ul>

	<a id="J_DownloadApp" class="recommend-icon" href="http://www.etao.com/go/act/etao/android.php" data-ios-native-url="etao://home?src=home" data-android-native-url="etao://home?src=home" data-ios-install-url="https://itunes.apple.com/cn/app/yi-tao-xiang-gou-wu-xian-yi-tao/id451400917?mt=8" data-android-install-url="http://download.taobaocdn.com/freedom/20457/andriod/701234etaoandroid2.4.9.apk">下载app</a>


#### 第二步： 初始化组件

    S.use('gallery/redirectToNative/1.2/index', function (S, RedirectToNative) {
         var redirectToNative = new RedirectToNative('#J_DownloadApp');
    });

也支持多个一起初始化，和KISSY Event的选择器一样,如[demo2](http://gallery.kissyui.com/redirectToNative/1.2/demo/index.html)

    var redirectToNative = new RedirectToNative('#J_DownloadApp, #J_Sign, #J_Scan');

## 使用场景二
### 推广native app功能的手机短信链接、二维码链接的中间跳转页面

作为独立中间跳转页面，在求少求快的mobile端，也许你会嫌弃还要引入kissy seed和组件代码；所以提供一个[原生js版本](../demo/demo3.html)，配置后找个[在线工具](http://ganquan.info/yui/?hl=zh-CN)压缩下（压缩后1.2K）更佳哈。注：@小二 直接copy script节点到tms区块里面可以直接线上使用，如[tms示例页面]( http://www.taobao.com/go/rgn/redirectonative/test.php)）

## 备注
### 实现方式
通过iframe src发送请求打开app自定义url scheme，如taobao://home（淘宝首页） 、etao://scan（一淘扫描）)；如果安装了客户端则会直接唤起，直接唤起后，之前浏览器窗口（或者扫码工具的webview）推入后台；如果在指定的时间内客户端没有被唤起，则js重定向到app下载地址。需要注意的是
如果是android chrome 25版本以后，在iframe src不会发送请求，原因如下[android chrome google](https://developers.google.com/chrome/mobile/docs/intents) ，通过location href使用intent机制拉起客户端可行并且停当前页面不跳转。


### 参考资源
* https://developers.google.com/chrome/mobile/docs/intents
* [无线事业部smartBanner](http://a.tbcdn.cn/g/mtb/lib-smartbanner/0.1.3/smartbanner.debug.js)
* 韩国电商 http://m.daum.net/ 搜索框后面的一批h5不支持但native支持的功能（语音输入、扫描功能等）
* [jquery smartBanner](https://github.com/jasny/jquery.smartbanner/blob/master/jquery.smartbanner.js)

