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

//Third:Redirect page
app.get('/compare', (req, res) => {
	res.render ('compare')
	console.log('arriving at redirect')
})



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

			let theOne = "";
			for (var i = 0; i < users.length; i++) {
				if (name === users[i].firstname || name === users[i].lastname) {
					theOne = users[i]
					console.log("Welcome: "+users[i].firstname + " " + users[i].lastname + " Email: " + users[i].email)
					// res.redirect('/compare')
				} 
				// else if(name === users[i].lastname) {
				// 	console.log("Welcome: "+users[i].firstname + " " + users[i].lastname + " Email: " + users[i].email)
				// }			
			}
			//hier wil je het doorgeven
			console.log(theOne)
			res.render('compare', {neo:theOne})
		})

	// res.redirect('/compare')
	// console.log(htmlData)

	
})

//Redirect page
// app.get('/compare', (req, res) => {
// 	res.render ('compare')
// 	console.log('arriving at redirect')
// })

//Port selector
app.listen(3000, () => {
	console.log("Ready, set, GO!")
})





// app.post('/search', urlencodedParsed, (req, res) =>{
// 	var name=req.body.name;
// 	var htmlData = 'Hello: ' + name;
// 		fs.readFile('./users.json', 'utf8', (err, data) => {
// 			if (err) {
// 			throw err;
// 			}
// 			const users = JSON.parse(data);

// 			for (var i = 0; i < users.length; i++) {
// 				if (name === users[i].firstname) {
// 					console.log('Match first name')
// 				} else if(name === users[i].lastname) {
// 						console.log("Match last name")
// 				}			
// 			}
		
// 	})

// 	res.send(htmlData)
// 	console.log(htmlData)

	
// })

