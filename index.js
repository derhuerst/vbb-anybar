#!/usr/bin/env node
'use strict'

const anybar = require('anybar')
const depsInDirection = require('vbb-departures-in-direction')

const setColor = (color) => anybar(color, {port: 1738})

const colors = [
	'red', // < 2m
	'yellow', // < 4m
	'green', // < 6m
	'yellow', // < 8m
	'red' // < 10m
]
const minute = 1000 * 60

module.exports = (from, to) => {
	return depsInDirection(from, to)
	.then((deps) => {
		const dep = deps[0]

		const i = Math.floor((new Date(dep.when) - Date.now()) / 2 / minute)
		return setColor(colors[i] || 'question')
	})
}
