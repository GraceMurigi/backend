// MongoDB PassWORD: G8cDRBmi75aa2MgB
// MongoDB Connection: mongodb+srv://grace:G8cDRBmi75aa2MgB@cluster0-9h4kg.mongodb.net/test?retryWrites=true&w=majority



// express app
const express = require('express');
const bodyParser = require('body-parser'); 
// for MongoDB
const mongoose = require('mongoose'); 
// for our monggose models
const Thing = require('./models/thing'); 

const app = express();

mongoose.connect('mongodb+srv://grace:G8cDRBmi75aa2MgB@cluster0-9h4kg.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
	console.log('successfully connceted to MongoDB Atlas');
})
.catch((error) => {
	console.log('Unable to connect to MongoDB Atlas!');
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); 

// POST middleware
app.post('/api/stuff', (req, res, next) => {
	const thing = new Thing({
		title: req.body.title, 
		description: req.body.description, 
		imageUrl: req.body.imageUrl, 
		price: req.body.price, 
		userId: req.body.userId
	}); 
	thing.save().then(
		() => {
			res.status(201).json({
				message: 'Post saved!'
			}); 
		}
	).catch(
		(error) => {
			res.status(400).json({
				error:error
			});
		}
	);

  // console.log(req.body);
  // res.status(201).json({
  //   message: 'Thing created successfully!'
  // });
});

app.get('/api/stuff/:id', (req, res, next) => {
	Thing.findOne({
		_id: req.params.id
	}).then(
		(thing) => {
			res.status(200).json(thing);
		}
	).catch(
		(error) => {
			res.status(404).json({
				error:error
			});
		}
	);
});

// update existing thing 
// here, we upadte the Thing parameter passed in the request — and replace it with the  Thing  passed as a second argument.
app.put('/api/stuff/:id', (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

// delete existing app 
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

app.use('/api/stuff', (req, res, next) => {
	Thing.find().then(
		(things) => {
			res.status(200).json(things);
		}

	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
  
});

// app.use((req, res, next) => {
//   console.log('Request received!');
//   next();
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Your request was successful!' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Response sent successfully!');
// });

module.exports = app;