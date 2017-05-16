module.exports = render

const { index, cells } = require('grid')
const { left, top } = require('hitbox')

function render(game, canvas) {
	if (!canvas) {
		canvas = document.createElement('canvas')
	}

	var room = game.world.rooms.find(room => room.entities.includes(game.hero))
	if (room) {
		canvas.width = room.width * room.scale
		canvas.height = room.height * room.scale

		var context = canvas.getContext('2d')
		for (var cell of cells(room)) {
			var tile = room.tiles[index(room, cell)]
			if (tile === 'wall') {
				context.fillStyle = 'silver'
				context.fillRect(cell.x * room.scale, cell.y * room.scale, room.scale, room.scale)
			}
		}

		for (var entity of room.entities) {
			context.fillStyle = 'lime'
			context.fillRect(left(entity), top(entity), entity.width, entity.height)
		}
	}

	return canvas
}
