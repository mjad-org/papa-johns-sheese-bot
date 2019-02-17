const https = require('https');
const fs = require('fs');
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
const storeSvc = 'https://www.papajohns.co.uk/services/storenamesearch.aspx?term=';
const localPath = './stores/';

exports.getStoreList = async () => {
	const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
	alphabet.forEach(async (letter) => {
		await waitFor(2000);
		let storeFileName = letter + '-stores.json';
		console.log(storeFileName);
		let file = fs.createWriteStream(localPath + storeFileName);
		https.get(storeSvc + letter, (res) => {
			console.log(res.statusCode);
			res.pipe(file);
		});
	});
};
