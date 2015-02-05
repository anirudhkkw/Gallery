	var express = require('express');
	var router = express.Router();
	var FlickrPhotos = require('../models/flickrphoto.js');
	var flickrHelper = require('../helper/helper.js');

	/* GET home page. */
	router.get('/', function(req, res, next) {	
		
		var pageNumber = req.query.pageNumber;
		if(pageNumber === undefined || pageNumber === null){
			pageNumber = 1;
		}
		else{
			if(pageNumber < 25){
				pageNumber = parseInt(pageNumber) + 1;	
			}			
		}	
		if(req.query.Latitude !== undefined && req.query.Longitude !== undefined && req.query.Longitude != "false" && req.query.Latitude && "false"  ){
			GetPhotosForLocation(res,req.query.Latitude,req.query.Longitude,req.query.pageNumber);
		}
		else{	
			// deciding which branch based on sorting preference		
			if(req.query.sort==1){
				RenderPhotos(res,true,pageNumber);
			}	
			else if(req.query.sort == 2){
				RenderPhotos(res,false,pageNumber);
			}
			else{
				RenderPhotos(res,null,pageNumber);	
			}
		}
		
			  
	});


	module.exports = router;

	// Method used to get photos based on latitude and longitude
	function GetPhotosForLocation(res,Latitude,Longitude, pageNumber){
		var photoLinks = new Array();
		var flickrObject = flickrHelper.initialiseFlickr();

		var Flickr = flickrObject.Flickr;
		var flickrOptions = flickrObject.flickrOptions;
		if(pageNumber === undefined || pageNumber === null){
			pageNumber = 1;
		}
		else{
			pageNumber = parseInt(pageNumber) + 1;
		}
		Flickr.tokenOnly(flickrOptions, function(error, flickr) {
		flickr.photos.search({
		  lat : Latitude,
		  lon : Longitude,
		  accuracy : 11,
		  per_page: flickrHelper.FlickrPageSize,
		  page : pageNumber
		}, function(err, result) {				
			var photos = result["photos"];
	  		photoLinks = flickrHelper.ConstructPhotoLinksFromAPI(photos["photo"]);    	
			res.render('index', { photoLinks : photoLinks, pageNumber : pageNumber, Latitude : Latitude, Longitude : Longitude  });     		
		});
	});
	}

	//method used to render photos stored in the DB
	function RenderPhotos(res,sort, pageNumber){		
		// logic to calculate the number of photos to skip and take
		var skipPhotos = flickrHelper.FlickrPageSize * (pageNumber - 1);
		var takePhotos = skipPhotos + flickrHelper.FlickrPageSize;
		// no sorting selected
		if(sort === undefined || sort === null){					
			FlickrPhotos.find().select('ThumbnailImage FullImage PhotoId PhotoSecretId ServerId FarmId Upvotes Downvotes').exec(function(err,result){										
			res.render('index', { photoLinks : result.slice(skipPhotos, takePhotos), pageNumber : pageNumber, Latitude : false, Longitude : false  });     		
			
		});
		}
		else{
			// sorting by upvotes desc or downvotes desc
			FlickrPhotos.find().sort( (sort?'-Upvotes' : '-Downvotes') ).select('ThumbnailImage FullImage PhotoId PhotoSecretId ServerId FarmId Upvotes Downvotes').exec(function(err,result){									
			res.render('index', { photoLinks : result.slice(skipPhotos, takePhotos), pageNumber : pageNumber, Latitude : false, Longitude : false  });     		
		});
		}
		
	}
