var FlickrPhotos = require('../models/flickrphoto.js');
		module.exports = {
		initialiseFlickr: function(){
			console.log('Making a call to Flickr. May Allah be with us.')
		var Flickr = require("flickrapi");
	    var flickrOptions = {
	      api_key: "b7482822b681320d2045d18df77231bf",
	      secret: "f23c8f505cd35cc6"
	    };
	    return {Flickr : Flickr, flickrOptions : flickrOptions};
		},

		FlickrPageSize : 20,
		ConstructPhotoLinksFromAPI: function(photos){
		var photoLinks = new Array();

		for(var counter = 0; counter < photos.length; counter++){
			var photo = photos[counter];

			photoLinks.push(new FlickrPhotos({
				ThumbnailImage : 'https://farm' + photo['farm'] + '.staticflickr.com/' + photo['server'] + '/' + photo['id'] + '_'+ photo['secret']+ '_m' + '.jpg',
				FullImage : 'https://farm' + photo['farm'] + '.staticflickr.com/' + photo['server'] + '/' + photo['id'] + '_'+ photo['secret']+ '_b' + '.jpg',
				PhotoId : photo['id'],
				PhotoSecretId : photo['secret'],
				ServerId : photo['server'],
				FarmId : photo['farm'],
				Upvotes : 0,
				Downvotes :  0}));

		}
		return photoLinks;
	}
	};