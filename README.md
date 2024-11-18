

一些命令:
```sh
# 查库
show dbs
# 查集合(表)
show collections
```

```sh
db.auth("admin", passwordPrompt())
secret
```

官方文档真的逆天啊, 全是广告;

https://www.mongodb.com/zh-cn/docs/manual/tutorial/authenticate-a-user/#std-label-authentication-auth-as-user

https://www.mongodb.com/zh-cn/docs/manual/tutorial/create-users/#std-label-create-users

https://www.mongodb.com/zh-cn/docs/manual/tutorial/create-users/#std-label-create-users

```sh
mongodb://localhost:27017/my-mongo
```


```sh
mongosh $MDB_CONNECTION_STRING;    
```

```sh
docker run -d -p 27017:27017 --name my-mongo mongodb
```


# Snappy - Chat Application 
Snappy is chat application build with the power of MERN Stack. You can find the tutorial [here](https://www.youtube.com/watch?v=otaQKODEUFs)


![login page](./images/snappy_login.png)

![home page](./images/snappy.png)

## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.
### Installation

#### First Method
```shell
git clone https://github.com/koolkishan/chat-app-react-nodejs
cd chat-app-react-nodejs
```
Now rename env files from .env.example to .env
```shell
cd public
mv .env.example .env
cd ..
cd server
mv .env.example .env
cd ..
```

Now install the dependencies
```shell
cd server
yarn
cd ..
cd public
yarn
```
We are almost done, Now just start the development server.

For Frontend.
```shell
cd public
yarn start
```
For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.
```shell
cd server
yarn start
```
Done! Now open localhost:3000 in your browser.

#### Second Method
- This method requires docker and docker-compose to be installed in your system.
- Make sure you are in the root of your project and run the following command.

```shell
docker compose build --no-cache
```
after the build is complete run the containers using the following command
```shell
docker compose up
```
now open localhost:3000 in your browser.