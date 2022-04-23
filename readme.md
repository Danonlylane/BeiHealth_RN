[toc]

# 倍健康开发记录及各种问题

### 系统功能模块设计

根据应用程序的功能需求分析，设计了四大功能模块，分别为动态展示页、热量计算页、发布动态页、用户管理页

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h0wnuogjnkj20n40icjt9.jpg)



页面展示：

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h0wnxk9jtjj213c0u042b.jpg)



![](https://tva1.sinaimg.cn/large/e6c9d24egy1h0wnyoa77gj20u00wbad0.jpg)

![](https://tva1.sinaimg.cn/large/e6c9d24egy1h1k5mjmrfvj20u00ws77a.jpg)





### 出现的问题

watchman：如果安装失败，先将 homebrew 升级。

如若出现：

```shell
$ brew install watchman
Error: Cannot install under Rosetta 2 in ARM default prefix (/opt/homebrew)!
To rerun under ARM use:
    arch -arm64 brew install ...
To install under x86_64, install Homebrew into /usr/local.
```

采用：

```
arch -arm64 brew install watchman
```

因为

```
因为在M1设备上，homebrew默认装在了/opt/homebrew目录下，而在x86中是需要安装在/usr/local/下
```



如果出现：

```
[!] Error installing Flipper-Folly
[!] /usr/bin/git clone https://github.com/facebook/folly.git /var/folders/r4/k9k1clz12ks30840t3zqnvvh0000gn/T/d20220312-95733-6814ws --template= --single-branch --depth 1 --branch v2021.04.26.00

Cloning into '/var/folders/r4/k9k1clz12ks30840t3zqnvvh0000gn/T/d20220312-95733-6814ws'...
fatal: unable to access 'https://github.com/facebook/folly.git/': LibreSSL SSL_connect: Operation timed out in connection to github.com:443 
```



建议科学上网

下面根据不同梯子软件填入不同 IP 和 端口号。

```
在开启shadowsocks的前提下，手动配置git的代理。git客户端输入如下两个命令就可以了。

git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080

http://也可以改成sockets5://,但是区别在于：socks5不支持通过pubkey免密登录github，每次提交代码只能输入用户名和密码。http可以支持免密登录。

在开启 ClashX 的前提下
git config --global https.proxy http://192:168.0.105:7890

```

使用完之后：

```
取消代理：
git config --global --unset http.proxy
git config --global --unset https.proxy
```



还是不行的话，使用 stack overflow 上的终极答案

```
git config --global --add remote.origin.proxy ""
```



字体库的使用

如果出现：ios上react-native-vector-icons 的error：unRecognized font family 'FontAwesome'

则采用手动配置（第一项）

[官网教程](https://github.com/oblador/react-native-vector-icons#option-manually)



### 

选取本机图片的功能

先在根目录下按照

```
npm install @react-native-community/cameraroll --save
```

接着将这个库链接

```
npx react-native link @react-native-community/cameraroll
```

进入根目录下的 iOS 文件夹

```
pod-install
```

进入

```
Go to node_modules ➜ @react-native-community/cameraroll 
```

将

RNCCameraroll.xcodeproj 添加到 Xcode 打开项目的 Libraries 里面



![](https://tva1.sinaimg.cn/large/e6c9d24egy1h0op3bxgrzj20gk0m2q3t.jpg)

如果出现一下错误：

```
error: Error: Unable to resolve module fbjs/lib/invariant from /Users/onlybei/Desktop/FE_code/myfirstrnapp/node_modules/@react-native-community/cameraroll/js/CameraRoll.js: fbjs/lib/invariant could not be found within the project or in these directories:
  node_modules
  ../../../node_modules
```

执行

```
npm install --save fbjs
```





### 真机调试

如果出现下面这种错误

```
Xcode 13: Build hangs with "iPhone is busy: making Apple Watch ready for development"
```

把手机的蓝牙和 WiFi 都关掉，用数据线连接就可以了



如果出现其他错误可以升级一下最新版的 Xcode，注意一下调试的iOS版本和真机版本要对应



