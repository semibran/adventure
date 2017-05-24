module.exports = render

const { index, cells } = require('grid')
const { contains, equals } = require('rect')
const { left, top } = require('hitbox')
const sprites = require('./sprites')(24)
const html = require('bel')

function render(game, view) {
	if (!view) {
		var tiles = html`<canvas class='tiles'/>`
		var entities = html`<div class='entities'></div>`
		var world = html`
			<div class='world'>
				${tiles}
				${entities}
			</div>
		`

		Object.assign(world.style, {
			overflow: 'hidden',
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)'
		})

		var view = {
			tree: { world, tiles, entities },
			cache: { room: null, entities: new Map() }
		}
	}

	var { world, hero } = game
	var { cache, tree } = view
	var room = hero.room
	var camera = {
		x: room.x * room.width * world.scale,
		y: room.y * room.height * world.scale,
		width: room.width * world.scale,
		height: room.height * world.scale
	}

	if (!cache.room || !equals(cache.room, room)) {
		cache.room = Object.assign({}, room)
		var canvas = tree.tiles
		var context = canvas.getContext('2d')
		canvas.width = camera.width
		canvas.height = camera.height
		for (var y = room.height; y--;) {
			for (var x = room.width; x--;) {
				var cell = { x: room.x * room.width + x, y: room.y * room.height + y }
				var tile = world.tiles[index(world, cell)]
				var sprite = sprites[tile]
				context.drawImage(
					sprite,
					x * world.scale,
					y * world.scale,
					world.scale,
					world.scale
				)
			}
		}
	}

	for (var [entity, cached] of cache.entities) {
		if (!world.entities.includes(entity) || !contains(camera, entity.position)) {
			cache.entities.delete(entity)
			tree.entities.removeChild(cached.element)
		}
	}

	for (var entity of world.entities) {
		var element = null
		var cached = cache.entities.get(entity)
		if (!cached) {
			element = html`<div class='entity'></div>`
			cached = { element }
			cache.entities.set(entity, cached)
			tree.entities.appendChild(element)
			Object.assign(element.style, {
				width: entity.width + 'px',
				height: entity.height + 'px',
				position: 'absolute',
				background: entity === hero ? 'lime' : 'red',
				zIndex: entity === hero ? 1 : 0
			})
		} else {
			element = cached.element
		}
		Object.assign(element.style, {
			left: (left(entity) - camera.x) + 'px',
			top: (top(entity) - camera.y) + 'px'
		})
	}

	return view
}
