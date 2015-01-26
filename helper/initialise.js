	var FlickrPhotos = require('../models/flickrphoto.js');
	var flickrHelper = require('../helper/helper.js');
	
	module.exports = {
		initialiseDb: function(){
			FlickrPhotos.count({}, function(err, c)
			{
				if(c < 500){
					console.log('Initialising DB with 500 records');
					var flickrObject = flickrHelper.initialiseFlickr();

					var Flickr = flickrObject.Flickr;
					var flickrOptions = flickrObject.flickrOptions;



					Flickr.tokenOnly(flickrOptions, function(error, flickr) {
						flickr.photos.search({
							text: "cute+puppy",
							per_page: 500
						}, function(err, result) {				
							var photos = result["photos"];
							var photoLinks = flickrHelper.ConstructPhotoLinksFromAPI(photos["photo"]);  
							for(var i =0;i<500;i++){
								var newPhoto = photoLinks[i];

								newPhoto.save(function(err){
									if(err){
										console.log(err);	
									}	  			  	
								});  	
							}
							
							console.log('Completed saving records');
						});
					});
				}
				else{
					console.log('Db has records, Lets continue :)');
				}
			});

		}
	};