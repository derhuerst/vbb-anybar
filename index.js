#!/usr/bin/env node
'use strict'

const anybar = require('anybar')
const createHafas = require('vbb-hafas')

const {departures} = createHafas('vbb-anybar')

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
	if (Number.isNaN(timeToStation)) throw new Error('invalid when parameter')

	return departures(origin, {
		direction,
		results: 3,
		when: Date.now() + timeToStation * minute
	})
	.then((deps) => {
		const dep = deps.find(dep => !dep.cancelled)
		const msToDepature = new Date(dep.when) - Date.now()
		const minutesToDeparture = Math.floor(msToDepature / minute)
		const spareTimeBeforeDeparture = minutesToDeparture - timeToStation

		// Comment left in for future debugging as required
		// console.log(`Next departure is at ${dep.when}, in ${minutesToDeparture} minutes time. This gives ${spareTimeBeforeDeparture} minutes spare, after spending ${timeToStation} minutes on the way to the station.`)

		const timeColor = colors[spareTimeBeforeDeparture / 2]
		return setColor(timeColor || 'question')
	})
}
