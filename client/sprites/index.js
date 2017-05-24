module.exports = function sprites(scale) {
	return {
		floor: require('./floor')(scale),
		wall: require('./wall')(scale)
	}
}
