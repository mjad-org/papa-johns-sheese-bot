const fsp = require('fs-extra');
const storeJsonPath = './stores/';
const {HashMap} = require('hashmap');
const superagent = require('superagent');


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
				console.log(localPath + names[i]);
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
			if (response.statusType == response.ok) {
				console.log('Checking Url ' + storeUrl);
				if (response.text.indexOf('Sheese') !== -1) {
					return true;
				}
			} else {
				throw new Error('Bad Response');
			}
		} catch (e) {
			console.error(e);
		}
		return false;
	}

	const storesMap = await readFiles();
	const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

	// run checkStore sequentially & slowly to avoid ddos!!
	for (let s of storesMap.entries()) {
		let storeKey = s[0];
		let storeLabel = s[1];

		await waitFor(1000);
		checkStore(storeKey).then((status) => {
			if (status) {
				console.log(storeLabel + ' Has Vegan Sheese Pizzas !!!!!');
			} else {
				console.log(storeLabel + ' Has No Vegan Sheese Pizzas');
			}
		});
	}

	return 'done';
};
