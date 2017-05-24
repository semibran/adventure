exports.move = move

const { left, top, right, bottom, intersects } = require('hitbox')
const { index } = require('grid')
const { floor } = Math

function move(entity, delta, world) {
	entity.position.x += delta.x
	entity.position.y += delta.y

	if (world) {
		var bounds = {
			left: floor(left(entity) / world.scale),
			top: floor(top(entity) / world.scale),
			right: floor(right(entity) / world.scale),
			bottom: floor(bottom(entity) / world.scale)
		}
		for (var y = bounds.top; y <= bounds.bottom; y++) {
			for (var x = bounds.left; x <= bounds.right; x++) {
				var cell = { x, y }
				var tile = world.tiles[index(world, cell)]
				if (tile === 'wall') {
					var wall = {
						width: world.scale,
						height: world.scale,
						position: { x: (x + 0.5) * world.scale, y: (y + 0.5) * world.scale }
					}
					if (intersects(entity, wall)) {
						if (delta.x < 0) {
							entity.position.x = right(wall) + entity.width / 2
						} else if (delta.x > 0) {
							entity.position.x = left(wall) - entity.width / 2
						}
						if (delta.y < 0) {
							entity.position.y = bottom(wall) + entity.height / 2
						} else if (delta.y > 0) {
							entity.position.y = top(wall) - entity.height / 2
						}
					}
				}
			}
		}
	}
}
