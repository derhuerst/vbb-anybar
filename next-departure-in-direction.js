'use strict'

const {departures} = require('vbb-client')
const sink = require('stream-sink')

const linesInDirection = require('./lines-in-direction')

const nextDepartureInDirection = (station, direction) => {
	const now = Date.now()
	return linesInDirection(station, direction)
	.pipe(sink('object'))
	.then((lines) => {
		if (lines.length === 0) throw new Error('no lines found')
		return departures(station, {
			when: now + 30 * 1000, duration: 30
		})
		.then((deps) => deps.filter((dep) => {
			const line = dep.product.line.toLowerCase().trim()
			return lines.some((l) => l.name.toLowerCase().trim() === line)
		}))
	})
	.then((deps) => {
		const dep = deps
		.filter((dep) => dep.when > now)
		.sort((d1, d2) => d1.when - d2.when)
		[0]
		if (!dep) throw new Error('no departures found')
		return dep.when - now
	})
}

module.exports = nextDepartureInDirection
