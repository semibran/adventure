exports.move = move

const { index } = require('grid')
const { snap, free } = require('./room')
const { left, top, right, bottom, intersects } = require('hitbox')

function move(entity, delta, room) {
	entity.position.x += delta.x
	entity.position.y += delta.y

	if (room) {
		var bounds = {
			left: snap(left(entity), room.scale),
			top: snap(top(entity), room.scale),
			right: snap(right(entity), room.scale),
			bottom: snap(bottom(entity), room.scale)
		}
		for (var y = bounds.top; y <= bounds.bottom; y++) {
			for (var x = bounds.left; x <= bounds.right; x++) {
				var cell = { x, y }
				var tile = room.tiles[index(room, cell)]
				if (tile === 'wall') {
					var wall = {
						width: room.scale,
						height: room.scale,
						position: { x: free(x, room.scale), y: free(y, room.scale) }
					}
					if (intersects(entity, wall)) {
						if (delta.x < 0) {
							entity.position.x = right(wall) + entity.width / 2
							entity.velocity.x *= -entity.bounce
						} else if (delta.x > 0) {
							entity.position.x = left(wall) - entity.width / 2
							entity.velocity.x *= -entity.bounce
						}
						if (delta.y < 0) {
							entity.position.y = bottom(wall) + entity.height / 2
							entity.velocity.y *= -entity.bounce
						} else if (delta.y > 0) {
							entity.position.y = top(wall) - entity.height / 2
							entity.velocity.y *= -entity.bounce
						}
					}
				}
			}
		}
	}
}
