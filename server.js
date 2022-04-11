// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

app.get('/api/:date', (req, res, next) => {
	const param = req.params.date;
	const toUnixEpoch = new Date(param).valueOf();

	const regEx = /\d{4}-[01]\d-[0-3]\d/gm;
	let test = regEx.test(param);

	if (test == true) {
		const toUTC = new Date(param).toUTCString();

		res.json({ unix: toUnixEpoch, utc: toUTC });
	} else {
		const toNum = parseInt(param);
		const dates = new Date(toNum).toUTCString();

		res.json({ unix: toNum, utc: dates });
	}
});

// listen for requests :)
/* var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
}); */
var listener = app.listen(3001, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
