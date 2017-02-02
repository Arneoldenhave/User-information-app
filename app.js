const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();


// app.use(bodyParser)
const urlencodedParsed = bodyParser.urlencoded ({extended : true})

// app.use(bodyPArser.urlencoded({
// 	extended: false;
// }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');





//Frist page with list of users
app.get('/', (req, res)=> {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			throw err;
		}
		const users = JSON.parse(data);
		res.render ('index', {users : users})

	});

});


//Second page with search bar
app.get('/search', (req, res) => {
	res.render ('searchBar')
	console.log('/search refreshed')
	
});

//Name comparerer
app.post('/search', urlencodedParsed, (req, res) =>{
	var name=req.body.name;
	var htmlData = 'Hello: ' + name;
		fs.readFile('./users.json', 'utf8', (err, data) => {
			if (err) {
			throw err;
			}
			const users = JSON.parse(data);
			console.log('data is geparsed vriend')


			for (var i = 0; i < users.length; i++) {
				console.log('Looping')
				// if (firstName === req.body.firstName[i] && lastName === req.body.lastName[i]) {
				// console.log('Yeahbuddy!')
				// }
			}
		
	})

	res.send(htmlData)
	console.log(htmlData)

	
})




//Port selector
app.listen(3000, () => {
	console.log("Ready, set, GO!")
})