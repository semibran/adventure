exports.update = update

const { move } = require('./entity')
const friction = 9 / 10

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
