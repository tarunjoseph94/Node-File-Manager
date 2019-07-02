var express=require('express');
var app=express();
var upload=require('express-fileupload');
const fs = require('fs');
var alert=require("alert-node");
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


var path1=require("path");

let x=null;
let value=null;

app.use(upload());

app.get('/',function(req,res){
  res.sendfile('index.html');
  })
  app.post('/',function(req,res){
    if(req.files){
      var folderName=req.body.folderName;
      var file=req.files.fileName;
      var filename=file.name;

      if (!fs.existsSync("./upload/"+folderName)){
        fs.mkdirSync("./upload/"+folderName);

        file.mv("./upload/"+folderName+"/"+filename,function(err){
        if(err){
          console.log("err");
          alert("error occured");
        }
        else{
          console.log("uploaded");
        alert("File uploaded sucessfully");
           console.log(filename);


        }
      });
    }
  }
});


     app.post("/delete",function(req,res){
     if(req.body.delete){
        var fname=req.body.delete;
        console.log(fname);
        fs.unlink("./upload/"+fname, function (err) {
       if (err){
        alert("could not delete the file");
         throw err;
       }
       else{
         alert("file deleted sucessfully !")
       console.log('File deleted!');
     }
     });
     }
     });

     app.post("/deletefolder",function(req,res){
        if(req.body.folderNameDelete)
        {
          var path="./upload/"+req.body.folderNameDelete;
         if (fs.existsSync(path)) {
           fs.readdirSync(path).forEach(function(file, index){
             var curPath = path + "/" + file;
             if (fs.lstatSync(curPath).isDirectory()) { // recurse
               deleteFolderRecursive(curPath);
             } else { // delete file
               fs.unlinkSync(curPath);
             }
           });
           fs.rmdirSync(path);
           alert("Folder Deleted");
         }
         else {
           alert("Folder is not deleted");
         }
       }
     });

     app.post("/browse",function(req,res){
      if(req.body.filePath){
        if(req.body.folderPath)
        {
          var folderpath=req.body.folderPath;
         var filepath=req.body.filePath;
         var path=folderpath+"/"+filepath;
         console.log(path);
         res.download("./upload/"+path);
       }
      }
      });

app.listen(3000);
console.log('server running on port 3000');
