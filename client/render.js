module.exports = render

const { contains, index, cells } = require('grid')
const { left, top } = require('hitbox')
const { floor } = Math
const viewport = {
	width: 15,
	height: 15
}

function render(game, canvas) {
	if (!canvas) {
		canvas = document.createElement('canvas')
	}

	var { world, hero } = game
	if (world) {
		canvas.width = viewport.width * world.scale
		canvas.height = viewport.height * world.scale

		var width = viewport.width * world.scale
		var height = viewport.height * world.scale
		var origin = {
			x: floor(hero.position.x / width),
			y: floor(hero.position.y / height)
		}

		var context = canvas.getContext('2d')
		for (var y = 0; y < viewport.height; y++) {
			for (var x = 0; x < viewport.width; x++) {
				var cell = { x: origin.x * viewport.width + x, y: origin.y * viewport.height + y }
				if (contains(world, cell)) {
					var tile = world.tiles[index(world, cell)]
					if (tile === 'wall') {
						context.fillStyle = 'silver'
						context.fillRect(x * world.scale, y * world.scale, world.scale, world.scale)
					}
				}
			}
		}

		for (var entity of world.entities) {
			context.fillStyle = entity === hero
				? 'lime'
				: 'red'
			context.fillRect(
				left(entity) - origin.x * viewport.width * world.scale,
				top(entity) - origin.y * viewport.height * world.scale,
				entity.width,
				entity.height
			)
		}
	}

	return canvas
}
