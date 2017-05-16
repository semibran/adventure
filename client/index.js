const render = require('./render')

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
	velocity: { x: 0, y: 0 }
}

room.entities.push(hero)

var game = { world, hero }

var canvas = render(game)
document.body.appendChild(canvas)
