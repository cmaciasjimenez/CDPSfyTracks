var fs = require('fs');
var path = require('path');
var request = require('request');

//Get
exports.findSong = function(req, res){
    var songName = req.params.name;
    var root = path.join(__dirname, './../tracks');
    var name = songName.toString();

    res.sendFile(name,{root: root});
};

//Post
exports.saveTrack = function(req, res){
	var urlSaveTrack = path.join(__dirname, './../tracks/');

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
           	urlRandomName = urlSaveTrack + name;

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
    var songName = req.params.name;
    var root = path.join(__dirname, './../tracks/');
    var songRoute = root + songName;

    var fs = require('fs');
    fs.unlinkSync(songRoute);
    res.status(200);
    console.log("Deleted: " + findURL);
};
