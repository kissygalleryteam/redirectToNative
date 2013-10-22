## 综述

redirectToNative是根据设备类型和native app是否安装打开相应的地址；跳转逻辑为如果native app已经安装则直接打开相应app的相应功能;未安装则根据ios or andriod引导app下载。

* 版本：1.2
* 作者：妙净
* demo：[http://gallery.kissyui.com/redirectToNative/1.1/demo/index.html](http://gallery.kissyui.com/redirectToNative/1.1/demo/index.html)

## 使用场景一
### H5页面中的推荐下载、h5不支持但native支持的功能引导

#### 第一步： 加入容器，配置容器节点上的四个自定义属性，即：
<ul>
<li>data-ios-native-url： ios app上注册的协议地址</li>
<li>data-android-native-url：android app上注册的协议地址</li>
<li>data-ios-install-url：ios app store里的安装地址</li>
<li>data-android-install-url： android app的apk地址</li>      
</ul>

	<a id="J_DownloadApp" class="recommend-icon" href="http://www.etao.com/go/act/etao/android.php" data-ios-native-url="etao://home?src=home" data-android-native-url="etao://home?src=home" data-ios-install-url="https://itunes.apple.com/cn/app/yi-tao-xiang-gou-wu-xian-yi-tao/id451400917?mt=8" data-android-install-url="http://download.taobaocdn.com/freedom/20457/andriod/701234etaoandroid2.4.9.apk">下载app</a>


#### 第二步： 初始化组件

    S.use('gallery/redirectToNative/1.1/index', function (S, RedirectToNative) {
         var redirectToNative = new RedirectToNative('#J_DownloadApp');
    });

也支持多个一起初始化，和KISSY Event的选择器一样,如[demo2](http://gallery.kissyui.com/redirectToNative/1.1/demo/index.html)

    var redirectToNative = new RedirectToNative('#J_DownloadApp, #J_Sign, #J_Scan');

## 使用场景二
### 推广native app功能的手机短信链接、二维码链接的中间跳转页面

作为独立中间跳转页面，在求少求快的mobile端，也许你会嫌弃还要引入kissy seed和组件代码；所以提供一个[原生js版本](../demo/demo3.html)，配置后找个[在线工具](http://ganquan.info/yui/?hl=zh-CN)压缩下（压缩后1.2K）更佳哈。注：@小二 直接copy script节点到tms区块里面可以直接线上使用，如[tms示例页面]( http://www.taobao.com/go/rgn/redirectonative/test.php)）

## 备注

### 使用场景
### native app协议
### 实现方式
### 参考资源


