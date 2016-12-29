'use strict'

const all = require('vbb-stations/full.json')

const stationsOf = {}
for (let id in all) {
	stationsOf[id] = id
	for (let stop of all[id].stops)
	stationsOf[stop.id] = id
}

module.exports = stationsOf
