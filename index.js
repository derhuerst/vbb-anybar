#!/usr/bin/env node
'use strict'

const anybar = require('anybar')

const nextDepartureInDirection = require('./lib/next-departure-in-direction')

const setColor = (color) => anybar(color, {port: 1738})

const colors = [
	'red', // < 2m
	'yellow', // < 4m
	'green', // < 6m
	'yellow', // < 8m
	'red' // < 10m
]

module.exports = (from, to) => {
	return nextDepartureInDirection(from, to)
	.then((dep) => {
		const i = Math.floor((new Date(dep.when) - Date.now()) / 1000 / 60 / 2)
		return setColor(colors[i] || 'question')
	})
}
