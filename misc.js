/**
 * @typedef {Object} Collider
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

/** 
 * @typedef {Object} Vector
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {Collider} a 
 * @param {Collider} b 
 * @returns {boolean}
 */
const collision = (a, b) => !(a.x > b.x + b.width || a.x + a.width < b.x || a.y > b.y + b.height || a.y + a.height < b.y);

/**
 * @param {number} val 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
const limit = (val, min, max) => {
	if(val < min) return min;
	if(val > max) return max;
	return val;
}

/**
 * @param {Vector} val 
 * @param {Vector} min 
 * @param {Vector} max 
 * @returns {Vector}
 */
const limit2D = (val, min, max) => ({
	x: limit(val.x, min.x, max.x),
	y: limit(val.y, min.y, max.y)
});

const simpleLimit2D = (val, limitVal) => ({
	x: limit(val.x, -limitVal, limitVal),
	y: limit(val.y, -limitVal, limitVal)
});