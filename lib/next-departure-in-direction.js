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
			when: now + 60 * 1000, duration: 60,
			identifier: 'vbb-anybar'
		})
		.then((deps) => {
			const dep = deps
			.filter((dep) => {
				const name = dep.line.name.toLowerCase().trim()
				return lines.some((l) => l.name.toLowerCase().trim() === name)
			})
			.filter((dep) => dep.when > now)
			.sort((d1, d2) => d1.when - d2.when)
			[0]

			if (!dep) throw new Error('no departures found')
			return dep
		})
	})
}

module.exports = nextDepartureInDirection
