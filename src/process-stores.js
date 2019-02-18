const fsp = require('fs-extra');
const storeJsonPath = './stores/';
const {HashMap} = require('hashmap');
const superagent = require('superagent');
const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

exports.processStores = async () => {
	/**
	 * Reads Store Json from directory into HashMap
	 * @return {HashMap} Hashmap of stores {label, String}
	 */
	async function readFiles() {
		const retStores = new HashMap();
		try {
			const names = await fsp.readdir(storeJsonPath);
			for (let i = 0; i < names.length; i++) {
				console.log(storeJsonPath + names[i]);
				let dat = await fsp.readJSON(storeJsonPath + names[i]);
				dat.map((x) => {
					retStores.set(x.value, x.label);
				});
			}
		} catch (e) {
			console.log('error: ', e);
		}
		console.log('Total Number of Stores :' + retStores.size);
		return retStores;
	}

	/**
	 * Checks a given store URL for presence of Pizzas
	 * @param {string} locationUrl store url
	 * @return {boolean} true or false if Sheese found
	 */
	async function checkStore(locationUrl) {
		const storeUrl = 'https://www.papajohns.co.uk/stores/' + locationUrl + '/pizzas.aspx';
		try {
			const response = await superagent.get(storeUrl);
			// 2 == OK
			if (response.statusType == 2) {
				if (response.text.indexOf('Sheese') !== -1) {
					return true;
				}
			} else {
				console.error(response);
				throw new Error('Bad Response');
			}
		} catch (e) {
			console.error(e);
		}
		return false;
	}

	/**
	 * Queries json store service
	 */
	async function getStoresJsonWriteToFiles() {
		const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
		const storeSvc = 'https://www.papajohns.co.uk/services/storenamesearch.aspx?term=';
		const localPath = './stores/';
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
	}

	/**
	 * Queries json store service
	 * @param {HashMap} storesMap hashmap of stores
	 */
	async function checkAllStores(storesMap) {
		const yesStores = new HashMap();
		const noStores = new HashMap();

		// run checkStore sequentially & slowly to avoid ddos!!
		for (let s of storesMap.entries()) {
			let storeKey = s[0];
			let storeLabel = s[1];

			await waitFor(300);
			checkStore(storeKey).then((status) => {
				if (status) {
					yesStores.set(storeKey, storeLabel);
				} else {
					noStores.set(storeKey, storeLabel);
				}
			});
		}

		console.log(yesStores.size + ' Stores have vegan sheese pizzas');
		console.log(noStores.size + ' Stores do not have vegan sheese pizzas');
	}

	// start

	try {
		if (fsp.existsSync(storeJsonPath)) {
			if (fsp.readdirSync(storeJsonPath).length < 1) {
				getStoresJsonWriteToFiles();
			}
		}
		let s = await readFiles();
		checkAllStores(s);
	} catch (e) {
		console.error(e);
	}

	return 'done';
};


