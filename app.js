const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();
// const fs = writeFileSync()

//app.use(bodyParser)
app.use(bodyParser.json());
 const urlencodedParsed = bodyParser.urlencoded ({extended : true})

app.use(bodyParser.urlencoded({extended: true}));

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


//Third:Redirect page
app.get('/compare', (req, res) => {
	res.render ('compare')
	console.log('arriving at redirect')
})

//Fourth: not the droid we are looking for
app.get('/notdroid', (req, res) => {
	res.render ('notDroid')
})

//Fihth: Add user
app.get('/addUser', (req, res) => {
	res.render ('addUser')
})


//Name comparerer
app.post('/search', urlencodedParsed, (req, res) =>{
	var name=req.body.name;
	var htmlData = 'Hello: ' + name;
		fs.readFile('./users.json', 'utf8', (err, data) => {
			if (err) {
				throw err;
			}
			const users = JSON.parse(data);

			let theOne = "";
			for (var i = 0; i < users.length; i++) {
				if (name === users[i].firstname || name === users[i].lastname) {
					theOne = users[i]
					console.log("Welcome: "+users[i].firstname + " " + users[i].lastname + " Email: " + users[i].email)
				} else { 
					res.render('notDroid')
				} 
			}
			console.log(theOne)
			res.render('compare', {neo:theOne})
	})
})

//new user

app.post('/addUser', (req, res)=> {
	var firstName=req.body.firstName;
	var lastName=req.body.lastName;
	var email=req.body.email; 
	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	}
console.log(user)

		// fs.readFile('./users.json', 'utf8', (err, data)=> {
		// 	if (err) {
		// 		throw err
		// 	}
		// 	const users = JSON.parse(data);
		// 	for (var i = 0; i < users.length; i++) {
		// 		if (firstName !== users[i].firstName || lastName !== users[i].lastName) {
		// 			console.log("Welcome: "+ firstName + " " + lastName + " Email: " + email)
		// 		} 
		// 	}
		// 	console.log(firstname, lastname, email)
		// })
})





//Port selector
app.listen(3000, () => {
	console.log("Ready, set, GO!")
})


