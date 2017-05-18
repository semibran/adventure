module.exports = function render(size) {
	var canvas = document.createElement('canvas')
	canvas.width = size
	canvas.height = size

	var context = canvas.getContext('2d')

	context.strokeStyle = 'yellow'
	context.lineWidth = size / 6
	context.beginPath()
	context.arc(size / 3, size / 3, size / 3 - size / 12, 0, 2 * Math.PI)
	context.stroke()

	context.beginPath()
	context.moveTo(size / 2, size / 2)
	context.lineTo(size, size)
	context.stroke()

	context.beginPath()
	context.moveTo(size * 5 / 6, size * 5 / 6)
	context.lineTo(size * 2 / 3, size)
	context.stroke()

	return canvas
}
