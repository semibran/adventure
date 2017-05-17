const keys = require('keys')(window)
const render = require('./render')
const { update } = require('../engine/room')
const { move } = require('../engine/input')
const { resolve } = require('direction')
const { add, direction } = require('vector2d')

var room = {
	width: 9,
	height: 9,
	scale: 32,
	tiles: (
		'#########' +
		'#       #' +
		'# ## ## #' +
		'# #   # #' +
		'# #   # #' +
		'# #   # #' +
		'# ## ## #' +
		'#       #' +
		'#########'
	)
		.split('')
		.map(char => {
			switch (char) {
				case '#': return 'wall'
				case ' ': return 'floor'
			}
		}),
	entities: []
}

var world = {
	width: 1,
	height: 1,
	rooms: [room]
}

var hero = {
	width: 24,
	height: 24,
	position: { x: room.width * room.scale / 2, y: room.height * room.scale / 2 },
	velocity: { x: 0, y: 0 },
	speed: 1 / 5,
	bounce: 1 / 4
}

room.entities.push(hero)

var game = { world, hero }

var canvas = render(game)
document.body.appendChild(canvas)

next()

function input(keys) {
	var directions = []
	if (keys.ArrowLeft || keys.KeyA) {
		directions.push('left')
	}
	if (keys.ArrowUp || keys.KeyW) {
		directions.push('up')
	}
	if (keys.ArrowRight || keys.KeyD) {
		directions.push('right')
	}
	if (keys.ArrowDown || keys.KeyS) {
		directions.push('down')
	}
	var delta = directions.reduce(
		(delta, direction) => add(delta, resolve(direction)),
		{ x: 0, y: 0 }
	)
	if (delta.x || delta.y) {
		move(hero, direction(delta))
	}
}

function loop() {
	input(keys)
	update(room)
	render(game, canvas)
	next()
}

function next() {
	requestAnimationFrame(loop)
}
