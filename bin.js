#!/usr/bin/env node
'use strict'

const mri = require('mri')
const chalk = require('chalk')
const Conf = require('conf')

const update = require('.')

const showError = (err) => {
	const msg = err.message || err.toString()
	process.stdout.write(chalk.red(msg) + '\n')
	process.exit(1)
}

const argv = mri(process.argv.slice(2), {
	boolean: ['help', 'h']
})
const conf = new Conf()

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    vbb-anybar
    vbb-anybar init <station-id> <next-station-id> [<time-to-station>]
\n`)
	process.exit()
}

if (argv._[0] === 'init') {
	if (!argv._[1] || !argv._[2]) showError('Missing arguments.')
	conf.set('station-id', argv._[1])
	conf.set('next-station-id', argv._[2])
	argv._[3] ? conf.set('time-to-station', argv._[3]) : conf.set('time-to-station', 0)
	process.exit(0)
}

const stationId = process.env.STATION_ID || conf.get('station-id')
const nextStationId = process.env.NEXT_STATION_ID || conf.get('next-station-id')
const timeToStation = process.env.TIME_TO_STATION || conf.get('time-to-station') || 0

update(stationId, nextStationId, timeToStation)
.catch(showError)
