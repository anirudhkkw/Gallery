	var express = require('express');
	var router = express.Router();
	var FlickrPhotos = require('../models/flickrphoto.js');

	router.post('/', function(req, res, next) {
		try{			
			UpdatePhoto(req.body);
				
		}catch(err){
			console.error(err);
			res.send(500);
		}

		
	  
	  res.send(200);
	});

	module.exports = router;

	function UpdatePhoto(details){
		
		FlickrPhotos.findOne({PhotoId : details.PhotoId}, 'PhotoId Upvotes Downvotes', function(err, Photo){			
			if(details.Like == "true"){				
					Photo.Upvotes += 1;	
				}
				else{
					Photo.Downvotes += 1;
				}				
				Photo.save();			
		});
	}
	
	