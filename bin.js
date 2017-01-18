#!/usr/bin/env node
'use strict'

const chalk = require('chalk')
const yargs = require('yargs')
const Conf = require('conf')

const update = require('./index')

const showError = (err) => {
	const msg = err.message || err.toString()
	process.stdout.write(chalk.red(msg) + '\n')
	process.exit(1)
}



const argv = yargs.argv
const conf = new Conf()

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    vbb-anybar
    vbb-anybar init <station-id> <next-station-id>
\n`)
	process.exit()
}

if (argv._[0] === 'init') {
	if (!argv._[1] || !argv._[2]) showError('Missing arguments.')
	conf.set('station-id', argv._[0])
	conf.set('next-station-id', argv._[1])
	process.exit(0)
}



const stationId = process.env.STATION_ID || conf.get('station-id')
const nextStationId = process.env.NEXT_STATION_ID || conf.get('next-station-id')

update(stationId, nextStationId)
.catch(showError)
