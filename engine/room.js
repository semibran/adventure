exports.update = update
exports.snap = snap
exports.free = free

const { move } = require('./entity')
const { floor } = Math
const friction = 19 / 20

function update(room) {
	for (var entity of room.entities) {
		if (entity.velocity.x) {
			var delta = { x: entity.velocity.x, y: 0 }
			move(entity, delta, room)
		}
		if (entity.velocity.y) {
			var delta = { x: 0, y: entity.velocity.y }
			move(entity, delta, room)
		}
		entity.velocity.x *= friction
		entity.velocity.y *= friction
	}
}

function snap(value, scale) {
	return floor(value / scale)
}

function free(value, scale) {
	return (value + 0.5) * scale
}
