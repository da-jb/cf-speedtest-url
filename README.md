# am-cf-speed-test-url Pages 版

## 一、项目简介

本项目是 `am-cf-speed-test-url` 的 Cloudflare Pages 部署版，用于快速搭建一个基于 Cloudflare Speed Test 的下载测速地址。

原项目主要面向 Cloudflare Workers 部署；本版本已经整理成 Cloudflare Pages 可直接上传部署的结构。你不需要使用命令行，不需要安装 Node.js，也不需要安装 Wrangler，只需要在 Cloudflare 网页后台上传本包提供的文件夹或压缩包即可。

## 二、功能介绍

假设你的 Pages 项目域名为：

```text
https://speedtest-example.pages.dev
```

### 1. 默认测速大小为 200MB

当访问根路径时，默认进行 200MB 下载测速。

```text
https://speedtest-example.pages.dev/
```

### 2. 支持自定义测速大小

你可以在网址路径中填写数字和单位，自定义下载测试流量大小。

支持的单位：

```text
k / kb / K / KB  都按 KB 处理
m / mb / M / MB  都按 MB 处理
g / gb / G / GB  都按 GB 处理
```

示例：

```text
https://speedtest-example.pages.dev/1024kb
https://speedtest-example.pages.dev/200mb
https://speedtest-example.pages.dev/1gb
```

以上分别表示：

```text
1024kb = 1024KB
200mb  = 200MB
1gb    = 1GB
```

也可以写成：

```text
https://speedtest-example.pages.dev/1024KB
https://speedtest-example.pages.dev/200MB
https://speedtest-example.pages.dev/1GB
```

大小写不影响结果。

### 3. 支持 Cloudflare locations 接口

访问下面的地址可以获取 Cloudflare Speed Test 的 locations 信息：

```text
https://speedtest-example.pages.dev/locations
```

## 三、部署包说明

本包里主要有以下内容：

```text
上传到Cloudflare-Pages/
  _worker.js
  README.txt

am-cf-speed-test-url-pages-direct-upload.zip

备用-仓库部署结构/
  public/_worker.js
  public/README.txt
  wrangler.toml
  package.json

README.md
README-网页部署详细说明.md
```

你只需要优先关心这两个：

```text
上传到Cloudflare-Pages
am-cf-speed-test-url-pages-direct-upload.zip
```

## 四、网页后台部署方式

本说明只介绍 Cloudflare 网页后台部署，不需要使用命令行。

### 方法一：上传文件夹

如果 Cloudflare Pages 页面允许你上传文件夹，推荐使用这种方式。

1. 打开 Cloudflare 官网并登录账号。
2. 进入 `Workers & Pages`。
3. 切换到 `Pages`。
4. 点击创建 Pages 项目。
5. 选择 `Direct Upload`、`Upload assets`、`直接上传` 或类似选项。
6. 上传本包里的文件夹：

```text
上传到Cloudflare-Pages
```

7. 设置项目名称，例如：

```text
am-cf-speed-test-url
```

8. 不需要填写构建命令。
9. 不需要填写构建输出目录。
10. 点击部署，等待 Cloudflare 完成发布。

部署成功后，Cloudflare 会给你一个类似这样的地址：

```text
https://am-cf-speed-test-url.pages.dev
```

### 方法二：上传压缩包

如果 Cloudflare Pages 页面要求上传压缩包，请上传：

```text
am-cf-speed-test-url-pages-direct-upload.zip
```

这个压缩包已经整理好，里面的 `_worker.js` 位于压缩包根目录，可以直接用于 Pages Direct Upload。

## 五、部署后测试

部署完成后，可以打开下面这些地址测试：

```text
https://你的项目名.pages.dev/
https://你的项目名.pages.dev/200mb
https://你的项目名.pages.dev/500mb
https://你的项目名.pages.dev/1gb
https://你的项目名.pages.dev/locations
```

如果你绑定了自己的域名，也可以把 `你的项目名.pages.dev` 换成自己的域名。

## 六、修改默认测速大小

默认根路径 `/` 的测速大小是 200MB。

如果你想修改默认大小，打开：

```text
上传到Cloudflare-Pages/_worker.js
```

找到这一行：

```js
const DEFAULT_BYTES = 200_000_000;
```

例如想改成默认 100MB，就改为：

```js
const DEFAULT_BYTES = 100_000_000;
```

保存后重新上传部署即可。

## 七、常见问题

### 1. 上传后不能正常测速怎么办

请检查 `_worker.js` 是否在上传目录的根部。

正确结构：

```text
_worker.js
README.txt
```

错误结构：

```text
上传到Cloudflare-Pages/_worker.js
```

如果 Cloudflare 解压或上传后多套了一层外层文件夹，Pages 可能无法识别 `_worker.js`。

### 2. `/200mb` 和 `/200MB` 有区别吗

没有区别。

本版本里 `kb`、`mb`、`gb` 都按大写单位处理：

```text
200mb = 200MB
1gb   = 1GB
```

### 3. 可以随便改后面的数字吗

可以。

例如：

```text
/50mb
/100mb
/300mb
/500mb
/2gb
```

数字越大，下载测试流量越大。

### 4. 访问错误路径会怎样

如果路径不符合规则，例如：

```text
/abc
/200xyz
```

程序会返回 `400` 错误，表示路径格式不正确。

## 八、备用仓库部署结构

本包里还保留了一个：

```text
备用-仓库部署结构
```

这是给以后连接 Git 仓库部署时使用的。你当前只使用网页上传部署，可以不用管这个文件夹。

如果以后要用 Git 仓库部署，Cloudflare Pages 后台可以这样填写：

```text
构建命令：留空
构建输出目录：public
```

## 九、注意事项

- 本项目只负责生成 Cloudflare Speed Test 下载测速地址，不提供网页界面。
- Direct Upload 部署时，重点是让 `_worker.js` 位于上传内容的根目录。
- 测速地址会消耗访问者和 Cloudflare 之间的网络流量，请根据自己的需求设置合适的测试大小。
- 如果绑定自定义域名，请在 Cloudflare Pages 项目设置中添加自定义域名。
- 如果路径中的单位省略，例如 `/200`，程序会按字节处理；日常使用建议写成 `/200mb`、`/1gb` 这类更清晰的格式。

## 十、免责声明

本项目仅供学习、研究和网络测速测试使用。使用者应自行遵守所在地区、所在国家以及服务器部署地区的相关法律法规。

任何个人或团体使用本项目所产生的后果均由使用者自行承担。项目整理者不对使用本项目可能造成的任何直接或间接损失负责。
