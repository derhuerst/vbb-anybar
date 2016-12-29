'use strict'

const trips = require('vbb-trips')
const filter = require('stream-filter')
const map = require('map-stream')
const unique = require('unique-stream')
const lines = require('vbb-lines')

const stations = require('./station-of-stop')



const routesInDirection = (station, direction) => {
	station = stations['' + station]
	direction = stations['' + direction]

	return trips.routes()
	.pipe(filter.obj((trip) => {
		const i = trip.stops
			.findIndex((stop) => stations['' + stop.s] === station)
		if (i < 0) return false

		const a = trip.stops[i]
		const b = trip.stops[i + 1]
		return a && b && stations['' + b.s] === direction
	}))
}

const linesInDirection = (station, direction) =>
	routesInDirection(station, direction)
	.pipe(map((trip, cb) => cb(null, trip.lineId)))
	.pipe(unique())
	.pipe(map((lineId, cb) => {
		lines(true, lineId)
		.then((lines) => cb(null, lines[0]))
		.catch(cb)
	}))

module.exports = linesInDirection
