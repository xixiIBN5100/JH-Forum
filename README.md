## 精弘论坛前端源码

**本论坛基于开源项目泡泡社区进行开发,感谢各位开发者的无私奉献QWQ**  

### dev环境启动
1. clone仓库develop分支到本地  

- `git clone -b develop https://github.com/zjutjh/JH-forum`

2. 安装依赖

- `pnpm i` 或者 `npm i`

3. 修改 `.env` 配置文件  

- 将`.evn`文件复制一份,命名为`.env.local`并且在`.env.local`文件中进行配置 (**一定要在`.env.local`文件中进行配置**) 
- `VITE_HOST`配置为服务器地址,本地运行就是`http://localhost:xxxx`,看你后端服务开在哪个端口,默认的是8008  (**8014端口是废弃服务端口,请不要使用**)

4. 启动项目  

- `pnpm run dev`

### 正式环境打包

使用`pnpm run build`打包以后得到dist文件夹,使用nginx指向文件夹所在目录即可


