exports.move = move

const Entity = require('./entity')
const { resolve } = require('vector')
const { degrees } = require('radians')
const { floor } = Math

function move(game, angle) {
	var { world, hero } = game
	var normal = resolve({ direction: degrees(angle), magnitude: 1 })
	if (normal.x) {
		var delta = { x: normal.x * hero.speed, y: 0 }
		Entity.move(hero, delta, world)
	}
	if (normal.y) {
		var delta = { x: 0, y: normal.y * hero.speed }
		Entity.move(hero, delta, world)
	}
	hero.room.x = floor(hero.position.x / hero.room.width / world.scale)
	hero.room.y = floor(hero.position.y / hero.room.height / world.scale)
}
