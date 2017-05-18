exports.move = move

const { left, top, right, bottom, intersects } = require('hitbox')
const { remove } = require('array')
const { index } = require('grid')
const { floor } = Math

function move(entity, delta, room) {
	entity.position.x += delta.x
	entity.position.y += delta.y

	if (room) {
		var bounds = {
			left: floor(left(entity) / room.scale),
			top: floor(top(entity) / room.scale),
			right: floor(right(entity) / room.scale),
			bottom: floor(bottom(entity) / room.scale)
		}
		for (var y = bounds.top; y <= bounds.bottom; y++) {
			for (var x = bounds.left; x <= bounds.right; x++) {
				var cell = { x, y }
				var tile = room.tiles[index(room, cell)]
				if (tile === 'wall') {
					var wall = {
						width: room.scale,
						height: room.scale,
						position: { x: (x + 0.5) * room.scale, y: (y + 0.5) * room.scale }
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
		var item = room.items.find(item => intersects(entity, item))
		if (item) {
			entity.item = item
			remove(room.items, item)
		}
	}
}
