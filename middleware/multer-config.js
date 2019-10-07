const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ 
	// save files to images folder
	destination: (req, file, callback) => {
		callback(null, 'images'); 
	}, 
	// use the original name replace spaces with underscores and add date 
	filename: (req, file, callback) => {
		const name = file.originalname.split(' ').join('_'); 
		// use MIME type map to resolve appropriate file extension 
		const extension = MIME_TYPES[file.mimetype]; 
		callback(null, name + Date.now() + '.' + extension);
	}
});

module.exports = multer({storage: storage}).single('image');