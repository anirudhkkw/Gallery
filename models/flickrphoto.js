
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var FlickrPhotosSchema = new schema({
	ThumbnailImage : String,
	FullImage : String,
	PhotoId : String,
	PhotoSecretId : String,
	ServerId : String,
	FarmId : String,
	Upvotes : Number,
	Downvotes : Number
});
FlickrPhotosSchema.index({ Upvotes : -1 });
FlickrPhotosSchema.index({ Downvotes : -1 });
module.exports = mongoose.model('FlickrPhotos',FlickrPhotosSchema);