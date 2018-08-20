/**
 * Created by joey on 2018/8/20
 */
import helper from './utils';

function Map () {
	this.clear();
}

function setItem (property, value) {
	var index = helper.findIndex(this.__data__, function (value) {
		return value.key === property;
	});
	if (index !== -1) {
		this.__data__[index].value = value;
	} else {
		this.__data__.push({key: property, value: value});
	}
	return this;
}

function removeItem (property) {
	var index = helper.findIndex(this.__data__, function (value) {
		return value.key === property;
	});
	if (index !== -1) {
		this.__data__.splice(index, 1);
	}
	return this;
}

Object.defineProperties(Map.prototype, {
	constructor: {
		value: Map,
		configuarable: false,
	},
	
	size: {
		get: function () {
			return this.__data__.length;
		},
		configuarable: false,
	},
	
	has: {
		value: function (property) {
			return helper.findIndex(this.__data__, function (value) {
				return value.key === property;
			}) !== -1;
		},
		configuarable: false,
	},
	
	get: {
		value: function (property) {
			var index = helper.findIndex(this.__data__, function (value) {
				return value.key === property;
			});
			return index === -1 ? undefined : this.__data__[index].value;
		},
		configuarable: false,
	},
	
	set: {
		value: setItem,
		configuarable: false,
	},
	
	add: {
		value: setItem,
		configuarable: false,
	},
	
	remove: {
		value: removeItem,
		configuarable: false,
	},
	
	delete: {
		value: removeItem,
		configuarable: false,
	},
	
	clear: {
		value: function () {
			this.__data__ = [];
			return this;
		},
		configuarable: false,
	},
	
	keys: {
		get: function () {
			var keys = [];
			this.__data__.forEach(function (value) {
				keys.push(value.key);
			});
			return keys;
		},
		configuarable: false,
	},
	
	values: {
		get: function () {
			var values = [];
			this.__data__.forEach(function (value) {
				values.push(value.value);
			});
			return values;
		},
		configuarable: false,
	},
	
	entries: {
		get: function () {
			var entries = [];
			this.__data__.forEach(function (value) {
				entries.push([value.key, value.value]);
			});
			return entries;
		},
		configuarable: false,
	},
	
	forEach: {
		value: function (callback) {
			this.__data__.forEach(function (value) {
				callback(value.value, value.key);
			});
			return this;
		},
		configuarable: false,
	},
});

function map (object) {
	var _map = new Map;
	
	if (object instanceof Map) {
		object.forEach(function (value, key) {
			_map.set(key, value);
		});
	} else if (Array.isArray(object)) {
		var i = -1,
			n = object.length,
			o;
		while (++i < n && Array.isArray(o = object[i])) {
			_map.set(o[0], o[1]);
		}
	}
	
	return _map;
}

export default map;
