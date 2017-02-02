const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();

const urlencodedParsed = bodyParser.urlencoded ({extended : true})

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res)=> {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			throw err;
		}
		const users = JSON.parse(data);
		res.render ('index', {users : users})

	});

});


// Search page
app.get('/search', (req, res) => {
	res.render ('searchBar')

app.post('/search')

})



app.listen(3000, () => {
	console.log("Ready, set, GO!")
});