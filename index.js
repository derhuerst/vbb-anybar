#!/usr/bin/env node
'use strict'

const anybar = require('anybar')
const createDepsInDirection = require('vbb-departures-in-direction')
const departures = require('vbb-hafas/lib/departures')
const journeyPart = require('vbb-hafas/lib/journey-part')

const depsInDirection = createDepsInDirection(departures, journeyPart)

const setColor = (color) => {
	anybar(color, {port: 1738})
}

const colors = [
	'red', // < 2m
	'yellow', // < 4m
	'green', // < 6m
	'yellow', // < 8m
	'red' // < 10m
]
const minute = 1000 * 60

module.exports = (from, to, timeToStation = 0) => {
	const options = {}

	if (Number.isNaN(timeToStation)) throw new Error('invalid when parameter')
	options.when = Date.now() + timeToStation * minute

	return depsInDirection(from, to, options)
	.then((deps) => {
		const dep = deps[0]
		const minutesToDeparture = Math.floor((new Date(dep.when) - Date.now()) / minute)
		const spareTimeBeforeDeparture = minutesToDeparture - timeToStation

		// Comment left in for future debugging as required
		// console.log(`Next departure is at ${dep.when}, in ${minutesToDeparture} minutes time. This gives ${spareTimeBeforeDeparture} minutes spare, after spending ${timeToStation} minutes on the way to the station.`)

		const timeColor = colors[spareTimeBeforeDeparture / 2]
		return setColor(timeColor || 'question')
	})
}
