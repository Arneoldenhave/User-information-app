const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();
// const fs = writeFileSync()

//app.use(bodyParser)
app.use(bodyParser.json());
// const urlencodedParsed = bodyParser.urlencoded ({extended : true})

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
		//render(view, local object object: data)

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
app.get('/notDroid', (req, res) => {
	res.render ('notDroid')
})

//Fihth: Add user
app.get('/addUser', (req, res) => {
	console.log('addUser called!')
	res.render ('addUser')
})



//Sixth: if users already exists
app.get('/oops', (req, res) => {
	res.render ('oops')
})

//Name comparerer
app.post('/search', (req, res) =>{
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
				console.log('TRIGGERRREEEDD!')
				theOne = users[i]
				res.send("Welcome: "+users[i].firstname + " " + users[i].lastname + " Email: " + users[i].email)
			} 
			else { 
				console.log('triggered')
			}
		}
		if (theOne === "") {
			res.render('notDroid')
		}
		console.log(theOne)
	})
})

//new user
app.post('/addUser', (req, res)=> {
	// var firstName = req.body.firstName
	// var lastName = req.body.lastName
	// var email = req.body.email

	var user = {
		firstname: req.body.firstName,
		lastname: req.body.lastName,
		email: req.body.email,
	}	
// check if already in database

	fs.readFile('./users.json', 'utf8', (err, data) => { //check
		if (err) throw err;
		var users =JSON.parse(data)
		for (var i = 0; i < users.length; i++) { // check: 124
			if (user.firstname === users[i].firstName || user.lastname === users[i].lastName || user.email === users[i].email) {
					res.render('oops')
			} //closes if
			else { 
				var users = JSON.parse(data);
				users.push(user)
				users = JSON.stringify(users)
			// if not in database it will write a file(for now)
				fs.writeFile('./users.json', users, 'utf-8', (err) => {
					if (err) throw err
						users = JSON.parse(users)
						res.render('index', {users : users});

					}) //for loop 
				} //write file
			} //else
	}) // fs.readfile
}) //app.post



// JSON.stringify(user) 
	// console.log(user.lastName)



		// fs.readFile('./users.json', 'utf8', (err, data)=> {
		// 	if (err) {
		// 		throw err
		// 	}
		// 	const users = JSON.parse(data);
		// 	for (var i = 0; i < users.length; i++) {
		// 		if (firstName !== users[i].firstName || lastName !== users[i].lastName) {
		// 			console.log("Welcome: "+ firstName + " " + lastName + " Email: " + email)
		// 		} droid
		// 	}
		// 	console.log(firstname, lastname, email)
		// })
// })


// 	fs.readFile('./users.json', 'utf8', (err, data) => {
// 		if (err) throw err;
// // check if already in database
// 			var users = JSON.parse(data);
// 			console.log(users)
// 		// for (var i = 0; i < users.length; i++) {
// 		// 	if (firstName === users[i].firstName || lastName === users[i].lastName || email === users[i].email) {
// 		// 			res.render('oops')
// 		// 	}
// 		// 	else { 
// 			users.push(user)
// 			console.log(users)
// 			users = JSON.stringify(users)
// 			console.log(users)
// 			// if not in database it will write a file(for now)
// 			fs.writeFile('./usersTest2.json', users, 'utf-8', (err) => {
// 				if (err) {
// 					throw err;
// 				}
// 			}) //for loop 
// 		// }// else stament	
// 	// }// if loop
// 			console.log(users[0])
// 	}) // fs.readfile
// }) //app.post

// JSON.stringify(user) 
	// console.log(user.lastName)




//Port selector
app.listen(3000, () => {
	console.log("Ready, set, GO!")
})


