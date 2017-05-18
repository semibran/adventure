const keys = require('keys')(window)
const render = require('./render')
const { update } = require('../engine/world')
const { move } = require('../engine/input')
const { resolve } = require('direction')
const { add, direction } = require('vector2d')

var world = {
	width: 45,
	height: 45,
	scale: 32,
	tiles: (
		'#############################################' +
		'#####     ######         #        #         #' +
		'###         #### ####### # ###### # # ##### #' +
		'##           ###   #   #   #    #   #   #   #' +
		'##           ### # # ####### ## ####### # ###' +
		'#     ###     ## # #       # ##   #   #   # #' +
		'#    #####    #### # ##### # ## ### # ### # #' +
		'#    #####    ##   # #   #   ##     #   #   #' +
		'#    #####    ## ### # ############ ##### ###' +
		'#     ###     ## #   # #          #   # #   #' +
		'##           ### ##### ##### #### ### # # # #' +
		'##           ###   #     #   ##       #   # #' +
		'###         #### ####### # #### ########### #' +
		'#####     ######             ##     ######  #' +
		'####### #######################     #####   #' +
		'####### #######################     ####   ##' +
		'#       #     ##             ##     ###   ###' +
		'# # ### # ### ##             ## ### ####   ##' +
		'# # #     #   ##  ###   ###  ## # # #####   #' +
		'# # ####### ####  #       #  ## ### ####   ##' +
		'# # #     # #     #       #         ###   ###' +
		'### #     # #     #       #     ### ####   ##' +
		'#         # #     #       #     # # #####   #' +
		'# ###     # #     #       #     ### ####   ##' +
		'#   #     # #     #       #         ###   ###' +
		'# # ####### # ##  #       #  ## ### ####   ##' +
		'# #   #     # ##  ###   ###  ## # # #####   #' +
		'### ### ### # ##             ## ### ####   ##' +
		'#         #   ##             ##     ###   ###' +
		'########################################   ##' +
		'#########################################   #' +
		'#             ##             ##     #####   #' +
		'# #   #       ##             ##     #####   #' +
		'# #           ##      #      ##         #   #' +
		'# ### #       ##      #      ##     ### #   #' +
		'# # # #       ##      #      ##     ###     #' +
		'# # # #       ##   #  #  ##  ##     #########' +
		'#             ##  ##      #  ##             #' +
		'#             ##  #    ## #  ## #######     #' +
		'#        # #  ##    #  #     ##   #   #     #' +
		'#             ##    ## #     ##   # # #     #' +
		'#       #   # ##     #       ##   # # #     #' +
		'#       ##### ##   #    ##   ###### # # #####' +
		'#                 ###   ##          #   #####' +
		'#############################################'
	)
		.split('')
		.map(char => {
			switch (char) {
				case '#': return 'wall'
				case ' ': return 'floor'
			}
		}),
	entities: [],
	items: []
}

var hero = {
	width: world.scale / 2,
	height: world.scale / 2,
	position: { x: world.width / 2 * world.scale, y: world.height / 2 * world.scale },
	velocity: { x: 0, y: 0 },
	speed: 1 / 3,
	bounce: 1 / 2,
	item: null
}

var key = {
	width: world.scale * 2 / 3,
	height: world.scale * 2 / 3,
	position: { x: world.width / 6 * world.scale, y: world.height / 2 * world.scale }
}

var canvas, sprite
var game = { world, hero }
world.entities.push(hero)
world.items.push(key)

load('./sprites/key.svg', key => {
	sprite = key
	canvas = render(game, null, sprite)
	document.body.appendChild(canvas)
	document.body.style.background = 'black'

	Object.assign(canvas.style, {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		imageRendering: 'pixelated'
	})

	next()
})

function load(path, callback) {
	var ajax = new XMLHttpRequest()
	ajax.open('GET', path, true)
	ajax.send()
	ajax.onload = function () {
		var image = new Image()
		image.src = 'data:image/svg+xml;base64,' + window.btoa(ajax.responseText)
		image.onload = function () {
			callback(image)
		}
	}
}

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
	update(world)
	render(game, canvas, sprite)
	next()
}

function next() {
	requestAnimationFrame(loop)
}
