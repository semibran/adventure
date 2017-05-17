exports.move = move

const { resolve } = require('vector')
const { multiply } = require('vector2d')

function move(hero, direction) {
	var normal = resolve({ direction, magnitude: 1 })
	var delta = multiply(normal, hero.speed)
	hero.velocity.x += delta.x
	hero.velocity.y += delta.y
}
