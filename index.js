#!/usr/bin/env node
'use strict'

const anybar = require('anybar')
const createDepsInDirection = require('hafas-departures-in-direction')
const {departures, journeyLeg} = require('vbb-hafas')

const depsInDirection = createDepsInDirection(departures, journeyLeg)

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

module.exports = (origin, direction, timeToStation = 0) => {
	const options = {results: 1}

	if (Number.isNaN(timeToStation)) throw new Error('invalid when parameter')
	options.when = Date.now() + timeToStation * minute

	return depsInDirection(origin, direction, options)
	.then((deps) => {
		const dep = deps[0]
		const msToDepature = new Date(dep.when) - Date.now()
		const minutesToDeparture = Math.floor(msToDepature / minute)
		const spareTimeBeforeDeparture = minutesToDeparture - timeToStation

		// Comment left in for future debugging as required
		// console.log(`Next departure is at ${dep.when}, in ${minutesToDeparture} minutes time. This gives ${spareTimeBeforeDeparture} minutes spare, after spending ${timeToStation} minutes on the way to the station.`)

		const timeColor = colors[spareTimeBeforeDeparture / 2]
		return setColor(timeColor || 'question')
	})
}
