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
	entities: []
}

var hero = {
	width: world.scale / 2,
	height: world.scale / 2,
	position: { x: world.width / 2 * world.scale, y: world.height / 2 * world.scale },
	velocity: { x: 0, y: 0 },
	speed: 1 / 4,
	bounce: 1 / 2
}

var game = { world, hero }
world.entities.push(hero)

var canvas = render(game)
document.body.appendChild(canvas)

Object.assign(canvas.style, {
	position: 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
	imageRendering: 'pixelated'
})

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
	update(world)
	render(game, canvas)
	next()
}

function next() {
	requestAnimationFrame(loop)
}
