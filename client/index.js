const render = require('./view')
const keys = require('keys')(window)
const { move } = require('../engine/input')
const { radians } = require('radians')
const { resolve } = require('direction')
const { add, direction } = require('vector2d')

var room = {
	x: 1,
	y: 0,
	width: 9,
	height: 9
}

var world = {
	entities: [],
	width: room.width * 3,
	height: room.height * 2,
	scale: 24,
	tiles: [
		'###########################',
		'#       ##       ##       #',
		'#       ##       ##       #',
		'#                         #',
		'#                         #',
		'#                         #',
		'#       ##       ##       #',
		'#       ##       ##       #',
		'###   ######   ######   ###',
		'###   ######   ######   ###',
		'#       ##       ##       #',
		'#       ##       ##       #',
		'#                         #',
		'#                         #',
		'#                         #',
		'#       ##       ##       #',
		'#       ##       ##       #',
		'###########################'
	]
		.join('')
		.split('')
		.map(char => {
			switch (char) {
				case ' ': return 'floor'
				case '#': return 'wall'
			}
		})
}

var hero = {
	width: world.scale / 2,
	height: world.scale / 2,
	position: {
		x: (room.x + 0.5) * room.width * world.scale,
		y: (room.y + 0.5) * room.height * world.scale
	},
	room: room,
	speed: 1.5
}

world.entities.push(hero)

var game = { world, hero }
var view = render(game)
document.body.appendChild(view.tree.world)
document.body.style.background = 'black'
next()

function input(keys) {
	var left = keys.ArrowLeft || keys.KeyA
	var up = keys.ArrowUp || keys.KeyW
	var right = keys.ArrowRight || keys.KeyD
	var down = keys.ArrowDown || keys.KeyS

	var directions = []

	if (left && !right) {
		directions.push('left')
	} else if (right && !left) {
		directions.push('right')
	}

	if (up && !down) {
		directions.push('up')
	} else if (down && !up) {
		directions.push('down')
	}

	var delta = directions.reduce(
		(delta, direction) => add(delta, resolve(direction)),
		{ x: 0, y: 0 }
	)

	if (delta.x || delta.y) {
		move(game, radians(direction(delta)))
	}
}

function loop() {
	input(keys)
	render(game, view)
	next()
}

function next() {
	requestAnimationFrame(loop)
}
