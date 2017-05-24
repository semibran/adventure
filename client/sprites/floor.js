module.exports = floor

const html = require('bel')

function floor(scale) {
	var canvas = html`<canvas width=${scale} height=${scale}/>`
	var context = canvas.getContext('2d')

	context.fillStyle = 'black'
	context.fillRect(0, 0, scale, scale)

	return canvas
}
