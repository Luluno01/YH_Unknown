//------------------------------------------------
//WebSvr.js
//  一个演示Web服务器
//------------------------------------------------

//开始服务启动计时器
console.time('[PostHandler][Start]');

//请求模块
var libHttp = require('http');    //HTTP协议模块
var libUrl=require('url');    //URL解析模块
var libFs = require("fs");    //文件系统模块
var libPath = require("path");    //路径解析模块

//依据路径获取返回内容类型字符串,用于http返回头
var funGetContentType=function(filePath){
    var contentType="";

    //使用路径解析模块获取文件扩展名
    var ext=libPath.extname(filePath);

    switch(ext){
        case ".html":
            contentType= "text/html";
                        break;
                case ".js":
                        contentType="text/javascript";
            break;
                case ".css":
            contentType="text/css";
            break;
                case ".gif":
            contentType="image/gif";
            break;
                case ".jpg":
            contentType="image/jpeg";
            break;
                case ".png":
            contentType="image/png";
            break;
                case ".ico":
            contentType="image/icon";
            break;
                default:
            contentType="application/octet-stream";
    }

    return contentType; //返回内容类型字符串
}

//Web服务器主函数,解析请求,返回Web内容
var funWebSvr = function (req, res){
    var reqUrl=req.url; //获取请求的url
    res.setHeader("Access-Control-Allow-Origin", "http://littleluluno01.eicp.net:8024");

    //向控制台输出请求的路径
    console.log(reqUrl);
    if(reqUrl=='/halt') {
      res.writeHead(200);
      res.end("<h1>Server Halt</h1>");
      process.exit();
    }

    req.addListener("data", function(post_data) {
      console.log(String(post_data));
      console.log(JSON.parse(String(post_data)));
    });

    console.log("[PostHandler] Request type: " + req.method.toUpperCase());

    if(req.method.toUpperCase() == "GET") {

      res.writeHead(200, {"Content-Type": "text/html"});
      res.end("Rua");

    }
    else if(req.method.toUpperCase() == "POST") {
      //在返回头中写入内容类型
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end("PC");
    }


}

//创建一个http服务器
var webSvr=libHttp.createServer(funWebSvr);

//指定服务器错误事件响应
webSvr.on("error", function(error) {
  console.log(error);  //在控制台中输出错误信息
});


//开始侦听8024端口
webSvr.listen(8888, function(){

    //向控制台输出服务启动的信息
    console.log('[PostHandler][Start] running at http://127.0.0.1:8888/');

    //结束服务启动计时器并输出
    console.timeEnd('[PostHandler][Start]');
});
