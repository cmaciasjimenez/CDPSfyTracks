var fs = require('fs');
var path = require('path');
var request = require('request');

//Get
exports.findSong = function(req, res){
    var songName = req.params.name;

    var name = songName.toString();

    res.sendFile(name,{root: '/mnt/nas'});
};

//Post
exports.saveTrack = function(req, res){

  var NASUrl = "/mnt/nas/";

	var fileName = '';
	var urlRandomName = '';
  var mp3_file;
  var name = '';

  var body = '';
  var contador = 0;
        
  req.on('data', function (data) {
        if (contador == 0){

           	var random = Math.floor((Math.random() * 100) + 1);
           	name = new Date().getTime()+random+".mp3";

            urlRandomName = NASUrl + name;

           	mp3_file = fs.createWriteStream(urlRandomName);
           	mp3_file.write(data);
           	contador++;
        }else{
            mp3_file.write(data);
        }
    });
    
    req.on('end', function () {
        mp3_file.end();
        res.writeHead(200, {'Content-Type': 'text/html'});
       	res.end(name);
    });
};

//Delete
exports.deleteSong = function(req,res){
	var NASUrl =  "/mnt/nas/";
	var songName = req.params.name;
	console.log("entra");
	var songRoute = NASUrl + songName;
	console.log(songRoute);

	fs.unlink(songRoute, function (err){
	if (err) return console.log("err");
		console.log("Borrado");
	}); 
	console.log("Deleted: " + songRoute);
	res.status(204).end();
};
