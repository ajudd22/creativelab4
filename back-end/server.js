const express = require('express');
const Papa  = require("papaparse");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tests', {
	useUnifiedTopology: true,
	useNewUrlParser:true
});
const multer = require('multer');

const upload = multer({
	dest: 'public/testFiles/',
	limits: {
		fileSize: 1000000
	}
});

const ItemSchema = new mongoose.Schema({
 head:String,
 c:String,
 in1:String,
 in2:String,
 in3:String,
 options:[],
 test: {
    type: mongoose.Schema.ObjectId,
    ref: 'Test'
  },
});

const TestSchema = new mongoose.Schema({
	name:String,
	estTime: Number,
});
ItemSchema.virtual('id').get(function() {
	return this._id.toHexString();
});
TestSchema.virtual('id').get(function() {
        return this._id.toHexString();
});
ItemSchema.set('toJSON', {
	virtuals:true
});
TestSchema.set('toJSON', {
        virtuals:true
});

const Test = mongoose.model('Test', TestSchema);
const Item = mongoose.model('Item', ItemSchema);

app.post('/api/grade/', async (req,res) => {
	try{
		console.log(req.body.map);
		let answers = req.body.map;
		let incorrectItems = [];
		let correct = 0;
		for (answer in answers)
		{
			//console.log(answer);// item ID
			//console.log(answers[answer]); //Answer text
			let item = await Item.findOne({
				_id:answer,
			});
			if (item.c != answers[answer]){
				incorrectItems.push(answer);
			}
			else if (item.c == answers[answer]){
				correct++;
			}
		}
		console.log(incorrectItems);
		console.log("correct: " + correct);
		 res.send(incorrectItems);
	}catch(error){
		console.log(error);
		res.sendStatus(500);
}
});
//get all tests
app.get('/api/tests', async (req, res) => {
	try{
	  let tests = await Test.find();
	  res.send({tests: tests});
	}catch(error){
	console.log(error);
	res.sendStatus(500)
	}
});
//upload test
app.post('/api/tests', upload.single('file'), async(req,res) => {
	if(!req.file) {
		return res.sendStatus(400).send({
      message: "Must upload a file."
    });
	}
	try {
		let parsedData = await readCSV("public/testFiles/" + req.file.filename);
		const newTest = new Test({
	  	name: req.body.title,
			estTime: parsedData.length,
	  });
		importItems(parsedData, newTest);
		await newTest.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

async function importItems(parsedData, newTest) {
	for (let i= 0; i < parsedData.length; i++){
 	 var newitem = new Item({
 		 head: parsedData[i].head,
 		 c: parsedData[i].c,
 		 in1: parsedData[i].op1,
 		 in2: parsedData[i].op2,
 		 in3: parsedData[i].op3,
 		 test: newTest
 	 });
 	const promise = await newitem.save();
 }
}


const readCSV = async (filePath) => {
	const csvFile = fs.readFileSync(filePath);
	const csvData = csvFile.toString();
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        resolve(results.data);
      }
    });
  });
};

//get items for a test
app.get("/api/tests/:id/", async(req,res) =>{
	try{
		var items = await Item.find({
			test: req.params.id
		})
		items.forEach(function(item) {
			let option1 = item.c;
			let option2 = item.in1;
			let option3 = item.in2;
			let option4 = item.in3;
			var options = [option1, option2, option3, option4];
			for (var i = options.length -1; i >0; i--) {
				var j = Math.floor(Math.random() * (i +1));
				var temp = options[i];
				options[i] = options[j];
				options[j] = temp;
			}
			item.options = options;
		})
		//console.log(items);
		return res.send(items)
	} catch(error){
		console.log(error);
		return res.sendStatus(500);
	}
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
