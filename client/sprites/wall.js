module.exports = wall

const html = require('bel')

function wall(scale) {
	var canvas = html`<canvas width=${scale} height=${scale}/>`
	var context = canvas.getContext('2d')

	context.fillStyle = 'white'
	context.fillRect(0, 0, scale, scale)

	return canvas
}
