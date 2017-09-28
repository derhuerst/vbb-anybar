'use strict'

const trips = require('vbb-trips')
const filter = require('stream-filter')
const map = require('map-stream')
const unique = require('unique-stream')
const lines = require('vbb-lines')

const stations = require('./station-of-stop')



const schedulesInDirection = (station, nextStation) => {
	station = stations[station]
	nextStation = stations[nextStation]

	return trips.schedules()
	.pipe(filter.obj((schedule) => {
		const i = schedule.route.stops
			.findIndex((stop) => stations[stop] === station)
		if (i < 0) return false

		const a = schedule.route.stops[i]
		const b = schedule.route.stops[i + 1]
		return a && b && stations[b] === nextStation
	}))
}

const linesInDirection = (station, nextStation) =>
	schedulesInDirection(station, nextStation)
	.pipe(map((schedule, cb) => cb(null, schedule.route.line)))
	.pipe(unique())
	.pipe(map((lineId, cb) => {
		lines(true, lineId)
		.then((lines) => cb(null, lines[0]))
		.catch(cb)
	}))

module.exports = linesInDirection
