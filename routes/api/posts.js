const express = require('express');
const router = express.Router();
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const formidable = require('formidable');
const uploadController = require("../../services/uploadController");

// Post Model
require('../../models/Post');
const mongoose = require('mongoose');
const Post = mongoose.model('post');
mongoose.set('useFindAndModify', false);

// @route   GET api/posts
// @desc    Get All posts
// @access  Public
router.get('/', (req, res) => {
  let status = req.query.status;
  if (typeof req.query.status !== 'undefined') {
    if (status === "All") {
      delete req.query.status;
    } else if (status === "Pending") {
      req.query.$and = [{
        approvedAt: {
          $exists: false
        }
      }, {
        disaprovedAt: {
          $exists: false
        }
      }]
      delete req.query.status;
    } else if (status === "Approve") {
      req.query.approvedAt = {$exists: true}
      delete req.query.status;
    }

    if(status.length > 7) {
      req.query.userId = status;
      delete req.query.status;
    }
  }
  req.query.deletedAt = {
		$exists: false
  };
  Post.find(req.query)
    .populate('userId')
    .then(posts => res.json(posts));
});

// @route   POST api/posts
// @desc    Create An Post
// @access  Private
router.post('/', uploadController.uploadImages, uploadController.resizeImages, uploadController.resizeImagesSmaller, (req, res) => {

  console.log(req.body);

	if (req.files == undefined) {
		res.json({success: false})
	} else {
		Post.create(req.body, function (err, post) {
			if (err) {
				res.json({success: false})
			} else {
				Post.findOne({_id: post._id}).populate('userId').sort({createdAt: -1}).then(post => res.json(post));
			}
		})
	}
  
});

// @route   PUT api/posts
// @desc    Update A Post Status
// @access  Private
router.put('/status/:id', (req, res) => {
  let query = {};
  if (req.body.status === "Approve") {
    query = {
      $set: {
        approvedAt: moment()
      },
      $unset: {
        disapprovedAt: 1
      }
    }
  } else if (req.body.status === "Disapprove") {
    query = {
      $unset: {
        approvedAt: 1
      },
      $set: {
        disapprovedAt: moment()
      }
    }
  }
  Post.findByIdAndUpdate(req.params.id, query, (err, updatedPost) => {
			if (err) {
				res.json({
					error: true,
					message: err
				})
			} else {
        Post.find().populate('userId').sort({date: -1}).then(posts => res.json(posts));
			}
		})

});

// @route   UPDATE api/posts/:id
// @desc    Update A Post
// @access  Private
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    })
    .then(() => res.json({
      success: true
    }))
    .catch(err => res.status(404).json({
      success: false
    }));
});

// @route   DELETE api/posts/:id
// @desc    Delete A Post
// @access  Private
router.delete('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
      $set: { deletedAt: moment() }
    }, {
      new: true
    })
    .then(() => res.json({
      success: true
    }))
    .catch(err => res.status(404).json({
      success: false
    }));
});

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
	}
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 100000000000
	},
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).array('file');

function checkFileType(file, cb) {
	const filetypes = /jpeg|jpg|png|gif|mp4/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}

module.exports = router;