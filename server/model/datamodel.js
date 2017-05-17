// simple insert, update and query from MongoDB
var Connect = require('../db/connect');

var DataModel = {};

DataModel.query = (collection, query) => {
	collection = collection || 'collections';
	query = query || {};

	return new Promise((resolve, reject) => {
		Connect.then((db) => {
			db.collection(collection).find(query).toArray((err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		}, (err) => {
			reject(err);
		});
	});
};

DataModel.queryOne = (collection, query) => {
	collection = collection || 'collections';
	query = query || {};

	return new Promise((resolve, reject) => {
		Connect.then((db) => {
			resolve(db.collection(collection).findOne(query));
		}, (err) => {
			reject(err);
		});
	});
};

DataModel.update = (collection, query, data) => {
	collection = collection || 'collections';
	query = query || {};
	data = data || {};

	return new Promise((resolve, reject) => {
		Connect.then((db) => {
			resolve(db.collection(collection).update(query, {$set: data}));
		}, (err) => {
			reject(err);
		});
	});
};

module.exports = DataModel;