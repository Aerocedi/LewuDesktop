/*!
 * Chart.js v3.0.0-alpha
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function noop() {}
var uid = function () {
  var id = 0;
  return function () {
    return id++;
  };
}();
function isNullOrUndef(value) {
  return value === null || typeof value === 'undefined';
}
function isArray(value) {
  if (Array.isArray && Array.isArray(value)) {
    return true;
  }
  var type = Object.prototype.toString.call(value);
  if (type.substr(0, 7) === '[object' && type.substr(-6) === 'Array]') {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
var isNumberFinite = value => (typeof value === 'number' || value instanceof Number) && isFinite(+value);
function valueOrDefault(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
}
function valueAtIndexOrDefault(value, index, defaultValue) {
  return valueOrDefault(isArray(value) ? value[index] : value, defaultValue);
}
function callback(fn, args, thisArg) {
  if (fn && typeof fn.call === 'function') {
    return fn.apply(thisArg, args);
  }
}
function each(loopable, fn, thisArg, reverse) {
  var i, len, keys;
  if (isArray(loopable)) {
    len = loopable.length;
    if (reverse) {
      for (i = len - 1; i >= 0; i--) {
        fn.call(thisArg, loopable[i], i);
      }
    } else {
      for (i = 0; i < len; i++) {
        fn.call(thisArg, loopable[i], i);
      }
    }
  } else if (isObject(loopable)) {
    keys = Object.keys(loopable);
    len = keys.length;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, loopable[keys[i]], keys[i]);
    }
  }
}
function arrayEquals(a0, a1) {
  var i, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i = 0, ilen = a0.length; i < ilen; ++i) {
    v0 = a0[i];
    v1 = a1[i];
    if (v0 instanceof Array && v1 instanceof Array) {
      if (!arrayEquals(v0, v1)) {
        return false;
      }
    } else if (v0 !== v1) {
      return false;
    }
  }
  return true;
}
function _elementsEqual(a0, a1) {
  var i, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i = 0, ilen = a0.length; i < ilen; ++i) {
    v0 = a0[i];
    v1 = a1[i];
    if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
      return false;
    }
  }
  return true;
}
function clone(source) {
  if (isArray(source)) {
    return source.map(clone);
  }
  if (isObject(source)) {
    var target = {};
    var keys = Object.keys(source);
    var klen = keys.length;
    var k = 0;
    for (; k < klen; ++k) {
      target[keys[k]] = clone(source[keys[k]]);
    }
    return target;
  }
  return source;
}
function _merger(key, target, source, options) {
  var tval = target[key];
  var sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    merge(tval, sval, options);
  } else {
    target[key] = clone(sval);
  }
}
function merge(target, source, options) {
  var sources = isArray(source) ? source : [source];
  var ilen = sources.length;
  if (!isObject(target)) {
    return target;
  }
  options = options || {};
  var merger = options.merger || _merger;
  for (var i = 0; i < ilen; ++i) {
    source = sources[i];
    if (!isObject(source)) {
      continue;
    }
    var keys = Object.keys(source);
    for (var k = 0, klen = keys.length; k < klen; ++k) {
      merger(keys[k], target, source, options);
    }
  }
  return target;
}
function mergeIf(target, source) {
  return merge(target, source, {
    merger: _mergerIf
  });
}
function _mergerIf(key, target, source) {
  var tval = target[key];
  var sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    mergeIf(tval, sval);
  } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
    target[key] = clone(sval);
  }
}
function inherits(extensions) {
  var me = this;
  var ChartElement = extensions && Object.prototype.hasOwnProperty.call(extensions, 'constructor') ? extensions.constructor : function () {
    return me.apply(this, arguments);
  };
  var Surrogate = function Surrogate() {
    this.constructor = ChartElement;
  };
  Surrogate.prototype = me.prototype;
  ChartElement.prototype = new Surrogate();
  ChartElement.extend = inherits;
  if (extensions) {
    _extends(ChartElement.prototype, extensions);
  }
  ChartElement.__super__ = me.prototype;
  return ChartElement;
}
function _deprecated(scope, value, previous, current) {
  if (value !== undefined) {
    console.warn(scope + ': "' + previous + '" is deprecated. Please use "' + current + '" instead');
  }
}

var coreHelpers = /*#__PURE__*/Object.freeze({
__proto__: null,
noop: noop,
uid: uid,
isNullOrUndef: isNullOrUndef,
isArray: isArray,
isObject: isObject,
isFinite: isNumberFinite,
valueOrDefault: valueOrDefault,
valueAtIndexOrDefault: valueAtIndexOrDefault,
callback: callback,
each: each,
arrayEquals: arrayEquals,
_elementsEqual: _elementsEqual,
clone: clone,
_merger: _merger,
merge: merge,
mergeIf: mergeIf,
_mergerIf: _mergerIf,
inherits: inherits,
_deprecated: _deprecated
});

var PI = Math.PI;
var RAD_PER_DEG = PI / 180;
var DOUBLE_PI = PI * 2;
var HALF_PI = PI / 2;
var QUARTER_PI = PI / 4;
var TWO_THIRDS_PI = PI * 2 / 3;
function _measureText(ctx, data, gc, longest, string) {
  var textWidth = data[string];
  if (!textWidth) {
    textWidth = data[string] = ctx.measureText(string).width;
    gc.push(string);
  }
  if (textWidth > longest) {
    longest = textWidth;
  }
  return longest;
}
function _longestText(ctx, font, arrayOfThings, cache) {
  cache = cache || {};
  var data = cache.data = cache.data || {};
  var gc = cache.garbageCollect = cache.garbageCollect || [];
  if (cache.font !== font) {
    data = cache.data = {};
    gc = cache.garbageCollect = [];
    cache.font = font;
  }
  ctx.save();
  ctx.font = font;
  var longest = 0;
  var ilen = arrayOfThings.length;
  var i, j, jlen, thing, nestedThing;
  for (i = 0; i < ilen; i++) {
    thing = arrayOfThings[i];
    if (thing !== undefined && thing !== null && isArray(thing) !== true) {
      longest = _measureText(ctx, data, gc, longest, thing);
    } else if (isArray(thing)) {
      for (j = 0, jlen = thing.length; j < jlen; j++) {
        nestedThing = thing[j];
        if (nestedThing !== undefined && nestedThing !== null && !isArray(nestedThing)) {
          longest = _measureText(ctx, data, gc, longest, nestedThing);
        }
      }
    }
  }
  ctx.restore();
  var gcLen = gc.length / 2;
  if (gcLen > arrayOfThings.length) {
    for (i = 0; i < gcLen; i++) {
      delete data[gc[i]];
    }
    gc.splice(0, gcLen);
  }
  return longest;
}
function _alignPixel(chart, pixel, width) {
  var devicePixelRatio = chart.currentDevicePixelRatio;
  var halfWidth = width / 2;
  return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
function clear(chart) {
  chart.ctx.clearRect(0, 0, chart.width, chart.height);
}
function drawPoint(ctx, options, x, y) {
  var type, xOffset, yOffset, size, cornerRadius;
  var style = options.pointStyle;
  var rotation = options.rotation;
  var radius = options.radius;
  var rad = (rotation || 0) * RAD_PER_DEG;
  if (style && typeof style === 'object') {
    type = style.toString();
    if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rad);
      ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
      ctx.restore();
      return;
    }
  }
  if (isNaN(radius) || radius <= 0) {
    return;
  }
  ctx.beginPath();
  switch (style) {
    default:
      ctx.arc(x, y, radius, 0, DOUBLE_PI);
      ctx.closePath();
      break;
    case 'triangle':
      ctx.moveTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * radius, y - Math.cos(rad) * radius);
      ctx.closePath();
      break;
    case 'rectRounded':
      cornerRadius = radius * 0.516;
      size = radius - cornerRadius;
      xOffset = Math.cos(rad + QUARTER_PI) * size;
      yOffset = Math.sin(rad + QUARTER_PI) * size;
      ctx.arc(x - xOffset, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
      ctx.arc(x + yOffset, y - xOffset, cornerRadius, rad - HALF_PI, rad);
      ctx.arc(x + xOffset, y + yOffset, cornerRadius, rad, rad + HALF_PI);
      ctx.arc(x - yOffset, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
      ctx.closePath();
      break;
    case 'rect':
      if (!rotation) {
        size = Math.SQRT1_2 * radius;
        ctx.rect(x - size, y - size, 2 * size, 2 * size);
        break;
      }
      rad += QUARTER_PI;
    case 'rectRot':
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + yOffset, y - xOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      ctx.lineTo(x - yOffset, y + xOffset);
      ctx.closePath();
      break;
    case 'crossRot':
      rad += QUARTER_PI;
    case 'cross':
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      ctx.moveTo(x + yOffset, y - xOffset);
      ctx.lineTo(x - yOffset, y + xOffset);
      break;
    case 'star':
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      ctx.moveTo(x + yOffset, y - xOffset);
      ctx.lineTo(x - yOffset, y + xOffset);
      rad += QUARTER_PI;
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      ctx.moveTo(x + yOffset, y - xOffset);
      ctx.lineTo(x - yOffset, y + xOffset);
      break;
    case 'line':
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      break;
    case 'dash':
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(rad) * radius, y + Math.sin(rad) * radius);
      break;
  }
  ctx.fill();
  if (options.borderWidth > 0) {
    ctx.stroke();
  }
}
function _isPointInArea(point, area) {
  var epsilon = 0.5;
  return point.x > area.left - epsilon && point.x < area.right + epsilon && point.y > area.top - epsilon && point.y < area.bottom + epsilon;
}
function clipArea(ctx, area) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
  ctx.clip();
}
function unclipArea(ctx) {
  ctx.restore();
}
function _steppedLineTo(ctx, previous, target, flip, mode) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  if (mode === 'middle') {
    var midpoint = (previous.x + target.x) / 2.0;
    ctx.lineTo(midpoint, previous.y);
    ctx.lineTo(midpoint, target.y);
  } else if (mode === 'after' !== !!flip) {
    ctx.lineTo(previous.x, target.y);
  } else {
    ctx.lineTo(target.x, previous.y);
  }
  ctx.lineTo(target.x, target.y);
}
function _bezierCurveTo(ctx, previous, target, flip) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(flip ? previous.controlPointPreviousX : previous.controlPointNextX, flip ? previous.controlPointPreviousY : previous.controlPointNextY, flip ? target.controlPointNextX : target.controlPointPreviousX, flip ? target.controlPointNextY : target.controlPointPreviousY, target.x, target.y);
}

var canvas = /*#__PURE__*/Object.freeze({
__proto__: null,
_measureText: _measureText,
_longestText: _longestText,
_alignPixel: _alignPixel,
clear: clear,
drawPoint: drawPoint,
_isPointInArea: _isPointInArea,
clipArea: clipArea,
unclipArea: unclipArea,
_steppedLineTo: _steppedLineTo,
_bezierCurveTo: _bezierCurveTo
});

var PI$1 = Math.PI;
var TAU = 2 * PI$1;
var PITAU = TAU + PI$1;
function _factorize(value) {
  var result = [];
  var sqrt = Math.sqrt(value);
  var i;
  for (i = 1; i < sqrt; i++) {
    if (value % i === 0) {
      result.push(i);
      result.push(value / i);
    }
  }
  if (sqrt === (sqrt | 0)) {
    result.push(sqrt);
  }
  result.sort((a, b) => a - b).pop();
  return result;
}
var log10 = Math.log10 || function (x) {
  var exponent = Math.log(x) * Math.LOG10E;
  var powerOf10 = Math.round(exponent);
  var isPowerOf10 = x === Math.pow(10, powerOf10);
  return isPowerOf10 ? powerOf10 : exponent;
};
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function almostEquals(x, y, epsilon) {
  return Math.abs(x - y) < epsilon;
}
function almostWhole(x, epsilon) {
  var rounded = Math.round(x);
  return rounded - epsilon <= x && rounded + epsilon >= x;
}
function _setMinAndMaxByKey(array, target, property) {
  var i, ilen, value;
  for (i = 0, ilen = array.length; i < ilen; i++) {
    value = array[i][property];
    if (!isNaN(value)) {
      target.min = Math.min(target.min, value);
      target.max = Math.max(target.max, value);
    }
  }
}
var sign = Math.sign ? function (x) {
  return Math.sign(x);
} : function (x) {
  x = +x;
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};
function toRadians(degrees) {
  return degrees * (PI$1 / 180);
}
function toDegrees(radians) {
  return radians * (180 / PI$1);
}
function _decimalPlaces(x) {
  if (!isNumberFinite(x)) {
    return;
  }
  var e = 1;
  var p = 0;
  while (Math.round(x * e) / e !== x) {
    e *= 10;
    p++;
  }
  return p;
}
function getAngleFromPoint(centrePoint, anglePoint) {
  var distanceFromXCenter = anglePoint.x - centrePoint.x;
  var distanceFromYCenter = anglePoint.y - centrePoint.y;
  var radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
  var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
  if (angle < -0.5 * PI$1) {
    angle += TAU;
  }
  return {
    angle,
    distance: radialDistanceFromCenter
  };
}
function distanceBetweenPoints(pt1, pt2) {
  return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function _angleDiff(a, b) {
  return (a - b + PITAU) % TAU - PI$1;
}
function _normalizeAngle(a) {
  return (a % TAU + TAU) % TAU;
}
function _angleBetween(angle, start, end) {
  var a = _normalizeAngle(angle);
  var s = _normalizeAngle(start);
  var e = _normalizeAngle(end);
  var angleToStart = _normalizeAngle(s - a);
  var angleToEnd = _normalizeAngle(e - a);
  var startToAngle = _normalizeAngle(a - s);
  var endToAngle = _normalizeAngle(a - e);
  return a === s || a === e || angleToStart > angleToEnd && startToAngle < endToAngle;
}
function _limitValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

var math = /*#__PURE__*/Object.freeze({
__proto__: null,
_factorize: _factorize,
log10: log10,
isNumber: isNumber,
almostEquals: almostEquals,
almostWhole: almostWhole,
_setMinAndMaxByKey: _setMinAndMaxByKey,
sign: sign,
toRadians: toRadians,
toDegrees: toDegrees,
_decimalPlaces: _decimalPlaces,
getAngleFromPoint: getAngleFromPoint,
distanceBetweenPoints: distanceBetweenPoints,
_angleDiff: _angleDiff,
_normalizeAngle: _normalizeAngle,
_angleBetween: _angleBetween,
_limitValue: _limitValue
});

var EPSILON = Number.EPSILON || 1e-14;
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
  var previous = firstPoint.skip ? middlePoint : firstPoint;
  var current = middlePoint;
  var next = afterPoint.skip ? middlePoint : afterPoint;
  var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
  var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
  var s01 = d01 / (d01 + d12);
  var s12 = d12 / (d01 + d12);
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;
  var fa = t * s01;
  var fb = t * s12;
  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y)
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y)
    }
  };
}
function splineCurveMonotone(points) {
  var pointsWithTangents = (points || []).map(point => ({
    model: point,
    deltaK: 0,
    mK: 0
  }));
  var pointsLen = pointsWithTangents.length;
  var i, pointBefore, pointCurrent, pointAfter;
  for (i = 0; i < pointsLen; ++i) {
    pointCurrent = pointsWithTangents[i];
    if (pointCurrent.model.skip) {
      continue;
    }
    pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
    pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
    if (pointAfter && !pointAfter.model.skip) {
      var slopeDeltaX = pointAfter.model.x - pointCurrent.model.x;
      pointCurrent.deltaK = slopeDeltaX !== 0 ? (pointAfter.model.y - pointCurrent.model.y) / slopeDeltaX : 0;
    }
    if (!pointBefore || pointBefore.model.skip) {
      pointCurrent.mK = pointCurrent.deltaK;
    } else if (!pointAfter || pointAfter.model.skip) {
      pointCurrent.mK = pointBefore.deltaK;
    } else if (sign(pointBefore.deltaK) !== sign(pointCurrent.deltaK)) {
      pointCurrent.mK = 0;
    } else {
      pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
    }
  }
  var alphaK, betaK, tauK, squaredMagnitude;
  for (i = 0; i < pointsLen - 1; ++i) {
    pointCurrent = pointsWithTangents[i];
    pointAfter = pointsWithTangents[i + 1];
    if (pointCurrent.model.skip || pointAfter.model.skip) {
      continue;
    }
    if (almostEquals(pointCurrent.deltaK, 0, EPSILON)) {
      pointCurrent.mK = pointAfter.mK = 0;
      continue;
    }
    alphaK = pointCurrent.mK / pointCurrent.deltaK;
    betaK = pointAfter.mK / pointCurrent.deltaK;
    squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
    if (squaredMagnitude <= 9) {
      continue;
    }
    tauK = 3 / Math.sqrt(squaredMagnitude);
    pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
    pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
  }
  var deltaX;
  for (i = 0; i < pointsLen; ++i) {
    pointCurrent = pointsWithTangents[i];
    if (pointCurrent.model.skip) {
      continue;
    }
    pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
    pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
    if (pointBefore && !pointBefore.model.skip) {
      deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
      pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
      pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
    }
    if (pointAfter && !pointAfter.model.skip) {
      deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
      pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
      pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
    }
  }
}
function capControlPoint(pt, min, max) {
  return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
  var i, ilen, point;
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    point = points[i];
    if (!_isPointInArea(point, area)) {
      continue;
    }
    if (i > 0 && _isPointInArea(points[i - 1], area)) {
      point.controlPointPreviousX = capControlPoint(point.controlPointPreviousX, area.left, area.right);
      point.controlPointPreviousY = capControlPoint(point.controlPointPreviousY, area.top, area.bottom);
    }
    if (i < points.length - 1 && _isPointInArea(points[i + 1], area)) {
      point.controlPointNextX = capControlPoint(point.controlPointNextX, area.left, area.right);
      point.controlPointNextY = capControlPoint(point.controlPointNextY, area.top, area.bottom);
    }
  }
}
function _updateBezierControlPoints(points, options, area, loop) {
  var i, ilen, point, controlPoints;
  if (options.spanGaps) {
    points = points.filter(pt => !pt.skip);
  }
  if (options.cubicInterpolationMode === 'monotone') {
    splineCurveMonotone(points);
  } else {
    var prev = loop ? points[points.length - 1] : points[0];
    for (i = 0, ilen = points.length; i < ilen; ++i) {
      point = points[i];
      controlPoints = splineCurve(prev, point, points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
      point.controlPointPreviousX = controlPoints.previous.x;
      point.controlPointPreviousY = controlPoints.previous.y;
      point.controlPointNextX = controlPoints.next.x;
      point.controlPointNextY = controlPoints.next.y;
      prev = point;
    }
  }
  if (options.capBezierPoints) {
    capBezierPoints(points, area);
  }
}

var curve = /*#__PURE__*/Object.freeze({
__proto__: null,
splineCurve: splineCurve,
splineCurveMonotone: splineCurveMonotone,
_updateBezierControlPoints: _updateBezierControlPoints
});

function isConstrainedValue(value) {
  return value !== undefined && value !== null && value !== 'none';
}
function _getParentNode(domNode) {
  var parent = domNode.parentNode;
  if (parent && parent.toString() === '[object ShadowRoot]') {
    parent = parent.host;
  }
  return parent;
}
function parseMaxStyle(styleValue, node, parentProperty) {
  var valueInPixels;
  if (typeof styleValue === 'string') {
    valueInPixels = parseInt(styleValue, 10);
    if (styleValue.indexOf('%') !== -1) {
      valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
    }
  } else {
    valueInPixels = styleValue;
  }
  return valueInPixels;
}
function getConstraintDimension(domNode, maxStyle, percentageProperty) {
  var view = document.defaultView;
  var parentNode = _getParentNode(domNode);
  var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
  var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
  var hasCNode = isConstrainedValue(constrainedNode);
  var hasCContainer = isConstrainedValue(constrainedContainer);
  var infinity = Number.POSITIVE_INFINITY;
  if (hasCNode || hasCContainer) {
    return Math.min(hasCNode ? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity, hasCContainer ? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
  }
}
function getStyle(el, property) {
  return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
}
function getConstraintWidth(domNode) {
  return getConstraintDimension(domNode, 'max-width', 'clientWidth');
}
function getConstraintHeight(domNode) {
  return getConstraintDimension(domNode, 'max-height', 'clientHeight');
}
function _calculatePadding(container, padding, parentDimension) {
  padding = getStyle(container, padding);
  return padding.indexOf('%') > -1 ? parentDimension * parseInt(padding, 10) / 100 : parseInt(padding, 10);
}
function getRelativePosition(evt, chart) {
  var mouseX, mouseY;
  var e = evt.originalEvent || evt;
  var canvasElement = chart.canvas;
  var boundingRect = canvasElement.getBoundingClientRect();
  var touches = e.touches;
  if (touches && touches.length > 0) {
    mouseX = touches[0].clientX;
    mouseY = touches[0].clientY;
  } else {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
  var paddingLeft = parseFloat(getStyle(canvasElement, 'padding-left'));
  var paddingTop = parseFloat(getStyle(canvasElement, 'padding-top'));
  var paddingRight = parseFloat(getStyle(canvasElement, 'padding-right'));
  var paddingBottom = parseFloat(getStyle(canvasElement, 'padding-bottom'));
  var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
  var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;
  mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / width * canvasElement.width / chart.currentDevicePixelRatio);
  mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / height * canvasElement.height / chart.currentDevicePixelRatio);
  return {
    x: mouseX,
    y: mouseY
  };
}
function getMaximumWidth(domNode) {
  var container = _getParentNode(domNode);
  if (!container) {
    if (typeof domNode.clientWidth === 'number') {
      return domNode.clientWidth;
    }
    return domNode.width;
  }
  var clientWidth = container.clientWidth;
  var paddingLeft = _calculatePadding(container, 'padding-left', clientWidth);
  var paddingRight = _calculatePadding(container, 'padding-right', clientWidth);
  var w = clientWidth - paddingLeft - paddingRight;
  var cw = getConstraintWidth(domNode);
  return isNaN(cw) ? w : Math.min(w, cw);
}
function getMaximumHeight(domNode) {
  var container = _getParentNode(domNode);
  if (!container) {
    if (typeof domNode.clientHeight === 'number') {
      return domNode.clientHeight;
    }
    return domNode.height;
  }
  var clientHeight = container.clientHeight;
  var paddingTop = _calculatePadding(container, 'padding-top', clientHeight);
  var paddingBottom = _calculatePadding(container, 'padding-bottom', clientHeight);
  var h = clientHeight - paddingTop - paddingBottom;
  var ch = getConstraintHeight(domNode);
  return isNaN(ch) ? h : Math.min(h, ch);
}
function retinaScale(chart, forceRatio) {
  var pixelRatio = chart.currentDevicePixelRatio = forceRatio || typeof window !== 'undefined' && window.devicePixelRatio || 1;
  var {
    canvas,
    width,
    height
  } = chart;
  canvas.height = height * pixelRatio;
  canvas.width = width * pixelRatio;
  chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  if (canvas.style && !canvas.style.height && !canvas.style.width) {
    canvas.style.height = height + 'px';
    canvas.style.width = width + 'px';
  }
}

var dom = /*#__PURE__*/Object.freeze({
__proto__: null,
_getParentNode: _getParentNode,
getStyle: getStyle,
getRelativePosition: getRelativePosition,
getMaximumWidth: getMaximumWidth,
getMaximumHeight: getMaximumHeight,
retinaScale: retinaScale
});

var effects = {
  linear(t) {
    return t;
  },
  easeInQuad(t) {
    return t * t;
  },
  easeOutQuad(t) {
    return -t * (t - 2);
  },
  easeInOutQuad(t) {
    if ((t /= 0.5) < 1) {
      return 0.5 * t * t;
    }
    return -0.5 * (--t * (t - 2) - 1);
  },
  easeInCubic(t) {
    return t * t * t;
  },
  easeOutCubic(t) {
    return (t -= 1) * t * t + 1;
  },
  easeInOutCubic(t) {
    if ((t /= 0.5) < 1) {
      return 0.5 * t * t * t;
    }
    return 0.5 * ((t -= 2) * t * t + 2);
  },
  easeInQuart(t) {
    return t * t * t * t;
  },
  easeOutQuart(t) {
    return -((t -= 1) * t * t * t - 1);
  },
  easeInOutQuart(t) {
    if ((t /= 0.5) < 1) {
      return 0.5 * t * t * t * t;
    }
    return -0.5 * ((t -= 2) * t * t * t - 2);
  },
  easeInQuint(t) {
    return t * t * t * t * t;
  },
  easeOutQuint(t) {
    return (t -= 1) * t * t * t * t + 1;
  },
  easeInOutQuint(t) {
    if ((t /= 0.5) < 1) {
      return 0.5 * t * t * t * t * t;
    }
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
  },
  easeInSine(t) {
    return -Math.cos(t * (Math.PI / 2)) + 1;
  },
  easeOutSine(t) {
    return Math.sin(t * (Math.PI / 2));
  },
  easeInOutSine(t) {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
  },
  easeInExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
  },
  easeOutExpo(t) {
    return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
  },
  easeInOutExpo(t) {
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    if ((t /= 0.5) < 1) {
      return 0.5 * Math.pow(2, 10 * (t - 1));
    }
    return 0.5 * (-Math.pow(2, -10 * --t) + 2);
  },
  easeInCirc(t) {
    if (t >= 1) {
      return t;
    }
    return -(Math.sqrt(1 - t * t) - 1);
  },
  easeOutCirc(t) {
    return Math.sqrt(1 - (t -= 1) * t);
  },
  easeInOutCirc(t) {
    if ((t /= 0.5) < 1) {
      return -0.5 * (Math.sqrt(1 - t * t) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
  },
  easeInElastic(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    if (!p) {
      p = 0.3;
    }
    {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
  },
  easeOutElastic(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t === 0) {
      return 0;
    }
    if (t === 1) {
      return 1;
    }
    if (!p) {
      p = 0.3;
    }
    {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
  },
  easeInOutElastic(t) {
    var s = 1.70158;
    var p = 0;
    var a = 1;
    if (t === 0) {
      return 0;
    }
    if ((t /= 0.5) === 2) {
      return 1;
    }
    if (!p) {
      p = 0.45;
    }
    {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }
    if (t < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    }
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  easeInBack(t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },
  easeOutBack(t) {
    var s = 1.70158;
    return (t -= 1) * t * ((s + 1) * t + s) + 1;
  },
  easeInOutBack(t) {
    var s = 1.70158;
    if ((t /= 0.5) < 1) {
      return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
    }
    return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
  },
  easeInBounce(t) {
    return 1 - effects.easeOutBounce(1 - t);
  },
  easeOutBounce(t) {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    }
    if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    }
    if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    }
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce(t) {
    if (t < 0.5) {
      return effects.easeInBounce(t * 2) * 0.5;
    }
    return effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5;
  }
};

class Defaults {
  constructor() {
    this.color = 'rgba(0,0,0,0.1)';
    this.elements = {};
    this.events = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'];
    this.fontColor = '#666';
    this.fontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    this.fontSize = 12;
    this.fontStyle = 'normal';
    this.lineHeight = 1.2;
    this.hover = {
      onHover: null,
      mode: 'nearest',
      intersect: true
    };
    this.maintainAspectRatio = true;
    this.onClick = null;
    this.responsive = true;
    this.showLines = true;
    this.plugins = undefined;
    this.scale = undefined;
    this.legend = undefined;
    this.title = undefined;
    this.tooltips = undefined;
    this.doughnut = undefined;
  }
  set(scope, values) {
    return merge(this[scope] || (this[scope] = {}), values);
  }
}
var defaults = new Defaults();

function toFontString(font) {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }
  return (font.style ? font.style + ' ' : '') + (font.weight ? font.weight + ' ' : '') + font.size + 'px ' + font.family;
}
function toLineHeight(value, size) {
  var matches = ('' + value).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
  if (!matches || matches[1] === 'normal') {
    return size * 1.2;
  }
  value = +matches[2];
  switch (matches[3]) {
    case 'px':
      return value;
    case '%':
      value /= 100;
      break;
  }
  return size * value;
}
function toPadding(value) {
  var t, r, b, l;
  if (isObject(value)) {
    t = +value.top || 0;
    r = +value.right || 0;
    b = +value.bottom || 0;
    l = +value.left || 0;
  } else {
    t = r = b = l = +value || 0;
  }
  return {
    top: t,
    right: r,
    bottom: b,
    left: l,
    height: t + b,
    width: l + r
  };
}
function _parseFont(options) {
  var size = valueOrDefault(options.fontSize, defaults.fontSize);
  if (typeof size === 'string') {
    size = parseInt(size, 10);
  }
  var font = {
    family: valueOrDefault(options.fontFamily, defaults.fontFamily),
    lineHeight: toLineHeight(valueOrDefault(options.lineHeight, defaults.lineHeight), size),
    size,
    style: valueOrDefault(options.fontStyle, defaults.fontStyle),
    weight: null,
    string: ''
  };
  font.string = toFontString(font);
  return font;
}
function resolve(inputs, context, index, info) {
  var cacheable = true;
  var i, ilen, value;
  for (i = 0, ilen = inputs.length; i < ilen; ++i) {
    value = inputs[i];
    if (value === undefined) {
      continue;
    }
    if (context !== undefined && typeof value === 'function') {
      value = value(context);
      cacheable = false;
    }
    if (index !== undefined && isArray(value)) {
      value = value[index];
      cacheable = false;
    }
    if (value !== undefined) {
      if (info && !cacheable) {
        info.cacheable = false;
      }
      return value;
    }
  }
}

var options = /*#__PURE__*/Object.freeze({
__proto__: null,
toLineHeight: toLineHeight,
toPadding: toPadding,
_parseFont: _parseFont,
resolve: resolve
});

var getRightToLeftAdapter = function getRightToLeftAdapter(rectX, width) {
  return {
    x(x) {
      return rectX + rectX + width - x;
    },
    setWidth(w) {
      width = w;
    },
    textAlign(align) {
      if (align === 'center') {
        return align;
      }
      return align === 'right' ? 'left' : 'right';
    },
    xPlus(x, value) {
      return x - value;
    },
    leftForLtr(x, itemWidth) {
      return x - itemWidth;
    }
  };
};
var getLeftToRightAdapter = function getLeftToRightAdapter() {
  return {
    x(x) {
      return x;
    },
    setWidth(w) {
    },
    textAlign(align) {
      return align;
    },
    xPlus(x, value) {
      return x + value;
    },
    leftForLtr(x, _itemWidth) {
      return x;
    }
  };
};
function getRtlAdapter(rtl, rectX, width) {
  return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
  var style, original;
  if (direction === 'ltr' || direction === 'rtl') {
    style = ctx.canvas.style;
    original = [style.getPropertyValue('direction'), style.getPropertyPriority('direction')];
    style.setProperty('direction', direction, 'important');
    ctx.prevTextDirection = original;
  }
}
function restoreTextDirection(ctx, original) {
  if (original !== undefined) {
    delete ctx.prevTextDirection;
    ctx.canvas.style.setProperty('direction', original[0], original[1]);
  }
}

var rtl = /*#__PURE__*/Object.freeze({
__proto__: null,
getRtlAdapter: getRtlAdapter,
overrideTextDirection: overrideTextDirection,
restoreTextDirection: restoreTextDirection
});

/*!
 * @kurkle/color v0.1.7
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */
var map = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15
};
var hex = '0123456789ABCDEF';
var h1 = b => hex[b & 0xF];
var h2 = b => hex[(b & 0xF0) >> 4] + hex[b & 0xF];
var eq = b => (b & 0xF0) >> 4 === (b & 0xF);
function isShort(v) {
  return eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
}
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === '#') {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & map[str[1]] * 17,
        g: 255 & map[str[2]] * 17,
        b: 255 & map[str[3]] * 17,
        a: len === 5 ? map[str[4]] * 17 : 255
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: map[str[1]] << 4 | map[str[2]],
        g: map[str[3]] << 4 | map[str[4]],
        b: map[str[5]] << 4 | map[str[6]],
        a: len === 9 ? map[str[7]] << 4 | map[str[8]] : 255
      };
    }
  }
  return ret;
}
function hexString(v) {
  var f = isShort(v) ? h1 : h2;
  return v ? '#' + f(v.r) + f(v.g) + f(v.b) + (v.a < 255 ? f(v.a) : '') : v;
}
function round(v) {
  return v + 0.5 | 0;
}
var lim = (v, l, h) => Math.max(Math.min(v, h), l);
function p2b(v) {
  return lim(round(v * 2.55), 0, 255);
}
function n2b(v) {
  return lim(round(v * 255), 0, 255);
}
function b2n(v) {
  return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
  return lim(round(v * 100), 0, 100);
}
var RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
  var m = RGB_RE.exec(str);
  var a = 255;
  var r, g, b;
  if (!m) {
    return;
  }
  if (m[7] !== r) {
    var v = +m[7];
    a = 255 & (m[8] ? p2b(v) : v * 255);
  }
  r = +m[1];
  g = +m[3];
  b = +m[5];
  r = 255 & (m[2] ? p2b(r) : r);
  g = 255 & (m[4] ? p2b(g) : g);
  b = 255 & (m[6] ? p2b(b) : b);
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
function rgbString(v) {
  return v && (v.a < 255 ? "rgba(".concat(v.r, ", ").concat(v.g, ", ").concat(v.b, ", ").concat(b2n(v.a), ")") : "rgb(".concat(v.r, ", ").concat(v.g, ", ").concat(v.b, ")"));
}
var HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h, s, l) {
  var a = s * Math.min(l, 1 - l);
  var f = function f(n) {
    var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0), f(8), f(4)];
}
function hsv2rgbn(h, s, v) {
  var f = function f(n) {
    var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (n + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  return [f(5), f(3), f(1)];
}
function hwb2rgbn(h, w, b) {
  var rgb = hsl2rgbn(h, 1, 0.5);
  var i;
  if (w + b > 1) {
    i = 1 / (w + b);
    w *= i;
    b *= i;
  }
  for (i = 0; i < 3; i++) {
    rgb[i] *= 1 - w - b;
    rgb[i] += w;
  }
  return rgb;
}
function rgb2hsl(v) {
  var range = 255;
  var r = v.r / range;
  var g = v.g / range;
  var b = v.b / range;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var l = (max + min) / 2;
  var h, s, d;
  if (max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = h * 60 + 0.5;
  }
  return [h | 0, s || 0, l];
}
function calln(f, a, b, c) {
  return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
}
function hsl2rgb(h, s, l) {
  return calln(hsl2rgbn, h, s, l);
}
function hwb2rgb(h, w, b) {
  return calln(hwb2rgbn, h, w, b);
}
function hsv2rgb(h, s, v) {
  return calln(hsv2rgbn, h, s, v);
}
function hue(h) {
  return (h % 360 + 360) % 360;
}
function hueParse(str) {
  var m = HUE_RE.exec(str);
  var a = 255;
  var v;
  if (!m) {
    return;
  }
  if (m[5] !== v) {
    a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
  }
  var h = hue(+m[2]);
  var p1 = +m[3] / 100;
  var p2 = +m[4] / 100;
  if (m[1] === 'hwb') {
    v = hwb2rgb(h, p1, p2);
  } else if (m[1] === 'hsv') {
    v = hsv2rgb(h, p1, p2);
  } else {
    v = hsl2rgb(h, p1, p2);
  }
  return {
    r: v[0],
    g: v[1],
    b: v[2],
    a: a
  };
}
function rotate(v, deg) {
  var h = rgb2hsl(v);
  h[0] = hue(h[0] + deg);
  h = hsl2rgb(h);
  v.r = h[0];
  v.g = h[1];
  v.b = h[2];
}
function hslString(v) {
  if (!v) {
    return;
  }
  var a = rgb2hsl(v);
  var h = a[0];
  var s = n2p(a[1]);
  var l = n2p(a[2]);
  return v.a < 255 ? "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(b2n(v.a), ")") : "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
}
var map$1 = {
  x: 'dark',
  Z: 'light',
  Y: 're',
  X: 'blu',
  W: 'gr',
  V: 'medium',
  U: 'slate',
  A: 'ee',
  T: 'ol',
  S: 'or',
  B: 'ra',
  C: 'lateg',
  D: 'ights',
  R: 'in',
  Q: 'turquois',
  E: 'hi',
  P: 'ro',
  O: 'al',
  N: 'le',
  M: 'de',
  L: 'yello',
  F: 'en',
  K: 'ch',
  G: 'arks',
  H: 'ea',
  I: 'ightg',
  J: 'wh'
};
function unpack(obj) {
  var unpacked = {};
  var keys = Object.keys(obj);
  var tkeys = Object.keys(map$1);
  var i, j, k, ok, nk;
  for (i = 0; i < keys.length; i++) {
    ok = nk = keys[i];
    for (j = 0; j < tkeys.length; j++) {
      k = tkeys[j];
      nk = nk.replace(k, map$1[k]);
    }
    k = parseInt(obj[ok], 16);
    unpacked[nk] = [k >> 16 & 0xFF, k >> 8 & 0xFF, k & 0xFF];
  }
  return unpacked;
}
var names = unpack({
  OiceXe: 'f0f8ff',
  antiquewEte: 'faebd7',
  aqua: 'ffff',
  aquamarRe: '7fffd4',
  azuY: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '0',
  blanKedOmond: 'ffebcd',
  Xe: 'ff',
  XeviTet: '8a2be2',
  bPwn: 'a52a2a',
  burlywood: 'deb887',
  caMtXe: '5f9ea0',
  KartYuse: '7fff00',
  KocTate: 'd2691e',
  cSO: 'ff7f50',
  cSnflowerXe: '6495ed',
  cSnsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: 'ffff',
  xXe: '8b',
  xcyan: '8b8b',
  xgTMnPd: 'b8860b',
  xWay: 'a9a9a9',
  xgYF: '6400',
  xgYy: 'a9a9a9',
  xkhaki: 'bdb76b',
  xmagFta: '8b008b',
  xTivegYF: '556b2f',
  xSange: 'ff8c00',
  xScEd: '9932cc',
  xYd: '8b0000',
  xsOmon: 'e9967a',
  xsHgYF: '8fbc8f',
  xUXe: '483d8b',
  xUWay: '2f4f4f',
  xUgYy: '2f4f4f',
  xQe: 'ced1',
  xviTet: '9400d3',
  dAppRk: 'ff1493',
  dApskyXe: 'bfff',
  dimWay: '696969',
  dimgYy: '696969',
  dodgerXe: '1e90ff',
  fiYbrick: 'b22222',
  flSOwEte: 'fffaf0',
  foYstWAn: '228b22',
  fuKsia: 'ff00ff',
  gaRsbSo: 'dcdcdc',
  ghostwEte: 'f8f8ff',
  gTd: 'ffd700',
  gTMnPd: 'daa520',
  Way: '808080',
  gYF: '8000',
  gYFLw: 'adff2f',
  gYy: '808080',
  honeyMw: 'f0fff0',
  hotpRk: 'ff69b4',
  RdianYd: 'cd5c5c',
  Rdigo: '4b0082',
  ivSy: 'fffff0',
  khaki: 'f0e68c',
  lavFMr: 'e6e6fa',
  lavFMrXsh: 'fff0f5',
  lawngYF: '7cfc00',
  NmoncEffon: 'fffacd',
  ZXe: 'add8e6',
  ZcSO: 'f08080',
  Zcyan: 'e0ffff',
  ZgTMnPdLw: 'fafad2',
  ZWay: 'd3d3d3',
  ZgYF: '90ee90',
  ZgYy: 'd3d3d3',
  ZpRk: 'ffb6c1',
  ZsOmon: 'ffa07a',
  ZsHgYF: '20b2aa',
  ZskyXe: '87cefa',
  ZUWay: '778899',
  ZUgYy: '778899',
  ZstAlXe: 'b0c4de',
  ZLw: 'ffffe0',
  lime: 'ff00',
  limegYF: '32cd32',
  lRF: 'faf0e6',
  magFta: 'ff00ff',
  maPon: '800000',
  VaquamarRe: '66cdaa',
  VXe: 'cd',
  VScEd: 'ba55d3',
  VpurpN: '9370db',
  VsHgYF: '3cb371',
  VUXe: '7b68ee',
  VsprRggYF: 'fa9a',
  VQe: '48d1cc',
  VviTetYd: 'c71585',
  midnightXe: '191970',
  mRtcYam: 'f5fffa',
  mistyPse: 'ffe4e1',
  moccasR: 'ffe4b5',
  navajowEte: 'ffdead',
  navy: '80',
  Tdlace: 'fdf5e6',
  Tive: '808000',
  TivedBb: '6b8e23',
  Sange: 'ffa500',
  SangeYd: 'ff4500',
  ScEd: 'da70d6',
  pOegTMnPd: 'eee8aa',
  pOegYF: '98fb98',
  pOeQe: 'afeeee',
  pOeviTetYd: 'db7093',
  papayawEp: 'ffefd5',
  pHKpuff: 'ffdab9',
  peru: 'cd853f',
  pRk: 'ffc0cb',
  plum: 'dda0dd',
  powMrXe: 'b0e0e6',
  purpN: '800080',
  YbeccapurpN: '663399',
  Yd: 'ff0000',
  Psybrown: 'bc8f8f',
  PyOXe: '4169e1',
  saddNbPwn: '8b4513',
  sOmon: 'fa8072',
  sandybPwn: 'f4a460',
  sHgYF: '2e8b57',
  sHshell: 'fff5ee',
  siFna: 'a0522d',
  silver: 'c0c0c0',
  skyXe: '87ceeb',
  UXe: '6a5acd',
  UWay: '708090',
  UgYy: '708090',
  snow: 'fffafa',
  sprRggYF: 'ff7f',
  stAlXe: '4682b4',
  tan: 'd2b48c',
  teO: '8080',
  tEstN: 'd8bfd8',
  tomato: 'ff6347',
  Qe: '40e0d0',
  viTet: 'ee82ee',
  JHt: 'f5deb3',
  wEte: 'ffffff',
  wEtesmoke: 'f5f5f5',
  Lw: 'ffff00',
  LwgYF: '9acd32'
});
names.transparent = [0, 0, 0, 0];
function nameParse(str) {
  var a = names[str];
  return a && {
    r: a[0],
    g: a[1],
    b: a[2],
    a: a.length === 4 ? a[3] : 255
  };
}
function modHSL(v, i, ratio) {
  if (v) {
    var tmp = rgb2hsl(v);
    tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v.r = tmp[0];
    v.g = tmp[1];
    v.b = tmp[2];
  }
}
function clone$1(v, proto) {
  return v ? _extends(proto || {}, v) : v;
}
function fromObject(input) {
  var v = {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  };
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v = {
        r: input[0],
        g: input[1],
        b: input[2],
        a: 255
      };
      if (input.length > 3) {
        v.a = n2b(input[3]);
      }
    }
  } else {
    v = clone$1(input, {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    });
    v.a = n2b(v.a);
  }
  return v;
}
function functionParse(str) {
  if (str.charAt(0) === 'r') {
    return rgbParse(str);
  }
  return hueParse(str);
}
class Color {
  constructor(input) {
    if (input instanceof Color) {
      return input;
    }
    var type = typeof input;
    var v;
    if (type === 'object') {
      v = fromObject(input);
    } else if (type === 'string') {
      v = hexParse(input) || nameParse(input) || functionParse(input);
    }
    this._rgb = v;
    this._valid = !!v;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var v = clone$1(this._rgb);
    if (v) {
      v.a = b2n(v.a);
    }
    return v;
  }
  set rgb(obj) {
    this._rgb = fromObject(obj);
  }
  rgbString() {
    return rgbString(this._rgb);
  }
  hexString() {
    return hexString(this._rgb);
  }
  hslString() {
    return hslString(this._rgb);
  }
  mix(color, weight) {
    var me = this;
    if (color) {
      var c1 = me.rgb;
      var c2 = color.rgb;
      var w2;
      var p = weight === w2 ? 0.5 : weight;
      var w = 2 * p - 1;
      var a = c1.a - c2.a;
      var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
      w2 = 1 - w1;
      c1.r = 0xFF & w1 * c1.r + w2 * c2.r + 0.5;
      c1.g = 0xFF & w1 * c1.g + w2 * c2.g + 0.5;
      c1.b = 0xFF & w1 * c1.b + w2 * c2.b + 0.5;
      c1.a = p * c1.a + (1 - p) * c2.a;
      me.rgb = c1;
    }
    return me;
  }
  clone() {
    return new Color(this.rgb);
  }
  alpha(a) {
    this._rgb.a = n2b(a);
    return this;
  }
  clearer(ratio) {
    var rgb = this._rgb;
    rgb.a *= 1 - ratio;
    return this;
  }
  greyscale() {
    var rgb = this._rgb;
    var val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
    rgb.r = rgb.g = rgb.b = val;
    return this;
  }
  opaquer(ratio) {
    var rgb = this._rgb;
    rgb.a *= 1 + ratio;
    return this;
  }
  negate() {
    var v = this._rgb;
    v.r = 255 - v.r;
    v.g = 255 - v.g;
    v.b = 255 - v.b;
    return this;
  }
  lighten(ratio) {
    modHSL(this._rgb, 2, ratio);
    return this;
  }
  darken(ratio) {
    modHSL(this._rgb, 2, -ratio);
    return this;
  }
  saturate(ratio) {
    modHSL(this._rgb, 1, ratio);
    return this;
  }
  desaturate(ratio) {
    modHSL(this._rgb, 1, -ratio);
    return this;
  }
  rotate(deg) {
    rotate(this._rgb, deg);
    return this;
  }
}
function index_esm(input) {
  return new Color(input);
}

var isPatternOrGradient = value => value instanceof CanvasGradient || value instanceof CanvasPattern;
function color(value) {
  return isPatternOrGradient(value) ? value : index_esm(value);
}
function getHoverColor(value) {
  return isPatternOrGradient(value) ? value : index_esm(value).saturate(0.5).darken(0.1).hexString();
}

var helpers = _objectSpread2({}, coreHelpers, {
  canvas,
  curve,
  dom,
  easing: {
    effects
  },
  options,
  math,
  rtl,
  requestAnimFrame: function () {
    if (typeof window === 'undefined') {
      return function (callback) {
        callback();
      };
    }
    return window.requestAnimationFrame;
  }(),
  fontString(pixelSize, fontStyle, fontFamily) {
    return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
  },
  color,
  getHoverColor
});

function drawFPS(chart, count, date, lastDate) {
  var fps = 1000 / (date - lastDate) | 0;
  var ctx = chart.ctx;
  ctx.save();
  ctx.clearRect(0, 0, 50, 24);
  ctx.fillStyle = 'black';
  ctx.textAlign = 'right';
  if (count) {
    ctx.fillText(count, 50, 8);
    ctx.fillText(fps + ' fps', 50, 18);
  }
  ctx.restore();
}
class Animator {
  constructor() {
    this._request = null;
    this._charts = new Map();
    this._running = false;
    this._lastDate = undefined;
  }
  _notify(chart, anims, date, type) {
    var callbacks = anims.listeners[type] || [];
    var numSteps = anims.duration;
    callbacks.forEach(fn => fn({
      chart,
      numSteps,
      currentStep: date - anims.start
    }));
  }
  _refresh() {
    var me = this;
    if (me._request) {
      return;
    }
    me._running = true;
    me._request = helpers.requestAnimFrame.call(window, () => {
      me._update();
      me._request = null;
      if (me._running) {
        me._refresh();
      }
    });
  }
  _update() {
    var me = this;
    var date = Date.now();
    var remaining = 0;
    me._charts.forEach((anims, chart) => {
      if (!anims.running || !anims.items.length) {
        return;
      }
      var items = anims.items;
      var i = items.length - 1;
      var draw = false;
      var item;
      for (; i >= 0; --i) {
        item = items[i];
        if (item._active) {
          item.tick(date);
          draw = true;
        } else {
          items[i] = items[items.length - 1];
          items.pop();
        }
      }
      if (draw) {
        chart.draw();
      }
      if (chart.options.animation.debug) {
        drawFPS(chart, items.length, date, me._lastDate);
      }
      me._notify(chart, anims, date, 'progress');
      if (!items.length) {
        anims.running = false;
        me._notify(chart, anims, date, 'complete');
      }
      remaining += items.length;
    });
    me._lastDate = date;
    if (remaining === 0) {
      me._running = false;
    }
  }
  _getAnims(chart) {
    var charts = this._charts;
    var anims = charts.get(chart);
    if (!anims) {
      anims = {
        running: false,
        items: [],
        listeners: {
          complete: [],
          progress: []
        }
      };
      charts.set(chart, anims);
    }
    return anims;
  }
  listen(chart, event, cb) {
    this._getAnims(chart).listeners[event].push(cb);
  }
  add(chart, items) {
    if (!items || !items.length) {
      return;
    }
    this._getAnims(chart).items.push(...items);
  }
  has(chart) {
    return this._getAnims(chart).items.length > 0;
  }
  start(chart) {
    var anims = this._charts.get(chart);
    if (!anims) {
      return;
    }
    anims.running = true;
    anims.start = Date.now();
    anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
    this._refresh();
  }
  running(chart) {
    if (!this._running) {
      return false;
    }
    var anims = this._charts.get(chart);
    if (!anims || !anims.running || !anims.items.length) {
      return false;
    }
    return true;
  }
  stop(chart) {
    var anims = this._charts.get(chart);
    if (!anims || !anims.items.length) {
      return;
    }
    var items = anims.items;
    var i = items.length - 1;
    for (; i >= 0; --i) {
      items[i].cancel();
    }
    anims.items = [];
    this._notify(chart, anims, Date.now(), 'complete');
  }
  remove(chart) {
    return this._charts.delete(chart);
  }
}
var Animator$1 = new Animator();

var transparent = 'transparent';
var interpolators = {
  boolean(from, to, factor) {
    return factor > 0.5 ? to : from;
  },
  color(from, to, factor) {
    var c0 = helpers.color(from || transparent);
    var c1 = c0.valid && helpers.color(to || transparent);
    return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to;
  },
  number(from, to, factor) {
    return from + (to - from) * factor;
  }
};
class Animation {
  constructor(cfg, target, prop, to) {
    var currentValue = target[prop];
    to = resolve([cfg.to, to, currentValue, cfg.from]);
    var from = resolve([cfg.from, currentValue, to]);
    this._active = true;
    this._fn = cfg.fn || interpolators[cfg.type || typeof from];
    this._easing = effects[cfg.easing || 'linear'];
    this._start = Math.floor(Date.now() + (cfg.delay || 0));
    this._duration = Math.floor(cfg.duration);
    this._loop = !!cfg.loop;
    this._target = target;
    this._prop = prop;
    this._from = from;
    this._to = to;
  }
  active() {
    return this._active;
  }
  update(cfg, to, date) {
    var me = this;
    if (me._active) {
      var currentValue = me._target[me._prop];
      var elapsed = date - me._start;
      var remain = me._duration - elapsed;
      me._start = date;
      me._duration = Math.floor(Math.max(remain, cfg.duration));
      me._to = resolve([cfg.to, to, currentValue, cfg.from]);
      me._from = resolve([cfg.from, currentValue, to]);
    }
  }
  cancel() {
    var me = this;
    if (me._active) {
      me.tick(Date.now());
      me._active = false;
    }
  }
  tick(date) {
    var me = this;
    var elapsed = date - me._start;
    var duration = me._duration;
    var prop = me._prop;
    var from = me._from;
    var loop = me._loop;
    var to = me._to;
    var factor;
    me._active = from !== to && (loop || elapsed < duration);
    if (!me._active) {
      me._target[prop] = to;
      return;
    }
    if (elapsed < 0) {
      me._target[prop] = from;
      return;
    }
    factor = elapsed / duration % 2;
    factor = loop && factor > 1 ? 2 - factor : factor;
    factor = me._easing(Math.min(1, Math.max(0, factor)));
    me._target[prop] = me._fn(from, to, factor);
  }
}

var numbers = ['x', 'y', 'borderWidth', 'radius', 'tension'];
var colors = ['borderColor', 'backgroundColor'];
defaults.set('animation', {
  duration: 1000,
  easing: 'easeOutQuart',
  onProgress: noop,
  onComplete: noop,
  colors: {
    type: 'color',
    properties: colors
  },
  numbers: {
    type: 'number',
    properties: numbers
  },
  active: {
    duration: 400
  },
  resize: {
    duration: 0
  },
  show: {
    colors: {
      type: 'color',
      properties: colors,
      from: 'transparent'
    },
    visible: {
      type: 'boolean',
      duration: 0
    }
  },
  hide: {
    colors: {
      type: 'color',
      properties: colors,
      to: 'transparent'
    },
    visible: {
      type: 'boolean',
      easing: 'easeInExpo'
    }
  }
});
function copyOptions(target, values) {
  var oldOpts = target.options;
  var newOpts = values.options;
  if (!oldOpts || !newOpts || newOpts.$shared) {
    return;
  }
  if (oldOpts.$shared) {
    target.options = _extends({}, oldOpts, newOpts, {
      $shared: false
    });
  } else {
    _extends(oldOpts, newOpts);
  }
  delete values.options;
}
function extensibleConfig(animations) {
  var result = {};
  Object.keys(animations).forEach(key => {
    var value = animations[key];
    if (!isObject(value)) {
      result[key] = value;
    }
  });
  return result;
}
class Animations {
  constructor(chart, animations) {
    this._chart = chart;
    this._properties = new Map();
    this.configure(animations);
  }
  configure(animations) {
    if (!isObject(animations)) {
      return;
    }
    var animatedProps = this._properties;
    var animDefaults = extensibleConfig(animations);
    Object.keys(animations).forEach(key => {
      var cfg = animations[key];
      if (!isObject(cfg)) {
        return;
      }
      (cfg.properties || [key]).forEach(prop => {
        if (!animatedProps.has(prop)) {
          animatedProps.set(prop, _extends({}, animDefaults, cfg));
        } else if (prop === key) {
          animatedProps.set(prop, _extends({}, animatedProps.get(prop), cfg));
        }
      });
    });
  }
  _animateOptions(target, values) {
    var newOptions = values.options;
    var animations = [];
    if (!newOptions) {
      return animations;
    }
    var options = target.options;
    if (options) {
      if (options.$shared) {
        target.options = options = _extends({}, options, {
          $shared: false,
          $animations: {}
        });
      }
      animations = this._createAnimations(options, newOptions);
    } else {
      target.options = newOptions;
    }
    return animations;
  }
  _createAnimations(target, values) {
    var animatedProps = this._properties;
    var animations = [];
    var running = target.$animations || (target.$animations = {});
    var props = Object.keys(values);
    var date = Date.now();
    var i;
    for (i = props.length - 1; i >= 0; --i) {
      var prop = props[i];
      if (prop.charAt(0) === '$') {
        continue;
      }
      if (prop === 'options') {
        animations.push(...this._animateOptions(target, values));
        continue;
      }
      var value = values[prop];
      var animation = running[prop];
      var cfg = animatedProps.get(prop);
      if (animation) {
        if (cfg && animation.active()) {
          animation.update(cfg, value, date);
          continue;
        } else {
          animation.cancel();
        }
      }
      if (!cfg || !cfg.duration) {
        target[prop] = value;
        continue;
      }
      running[prop] = animation = new Animation(cfg, target, prop, value);
      animations.push(animation);
    }
    return animations;
  }
  update(target, values) {
    if (this._properties.size === 0) {
      copyOptions(target, values);
      _extends(target, values);
      return;
    }
    var animations = this._createAnimations(target, values);
    if (animations.length) {
      Animator$1.add(this._chart, animations);
      return true;
    }
  }
}

var resolve$1 = helpers.options.resolve;
var arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];
function listenArrayEvents(array, listener) {
  if (array._chartjs) {
    array._chartjs.listeners.push(listener);
    return;
  }
  Object.defineProperty(array, '_chartjs', {
    configurable: true,
    enumerable: false,
    value: {
      listeners: [listener]
    }
  });
  arrayEvents.forEach(key => {
    var method = '_onData' + key.charAt(0).toUpperCase() + key.slice(1);
    var base = array[key];
    Object.defineProperty(array, key, {
      configurable: true,
      enumerable: false,
      value() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var res = base.apply(this, args);
        array._chartjs.listeners.forEach(object => {
          if (typeof object[method] === 'function') {
            object[method](...args);
          }
        });
        return res;
      }
    });
  });
}
function scaleClip(scale, allowedOverflow) {
  var opts = scale && scale.options || {};
  var reverse = opts.reverse;
  var min = opts.min === undefined ? allowedOverflow : 0;
  var max = opts.max === undefined ? allowedOverflow : 0;
  return {
    start: reverse ? max : min,
    end: reverse ? min : max
  };
}
function defaultClip(xScale, yScale, allowedOverflow) {
  if (allowedOverflow === false) {
    return false;
  }
  var x = scaleClip(xScale, allowedOverflow);
  var y = scaleClip(yScale, allowedOverflow);
  return {
    top: y.end,
    right: x.end,
    bottom: y.start,
    left: x.start
  };
}
function toClip(value) {
  var t, r, b, l;
  if (helpers.isObject(value)) {
    t = value.top;
    r = value.right;
    b = value.bottom;
    l = value.left;
  } else {
    t = r = b = l = value;
  }
  return {
    top: t,
    right: r,
    bottom: b,
    left: l
  };
}
function unlistenArrayEvents(array, listener) {
  var stub = array._chartjs;
  if (!stub) {
    return;
  }
  var listeners = stub.listeners;
  var index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
  if (listeners.length > 0) {
    return;
  }
  arrayEvents.forEach(key => {
    delete array[key];
  });
  delete array._chartjs;
}
function getSortedDatasetIndices(chart, filterVisible) {
  var keys = [];
  var metasets = chart._getSortedDatasetMetas(filterVisible);
  var i, ilen;
  for (i = 0, ilen = metasets.length; i < ilen; ++i) {
    keys.push(metasets[i].index);
  }
  return keys;
}
function applyStack(stack, value, dsIndex, allOther) {
  var keys = stack.keys;
  var i, ilen, datasetIndex, otherValue;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    datasetIndex = +keys[i];
    if (datasetIndex === dsIndex) {
      if (allOther) {
        continue;
      }
      break;
    }
    otherValue = stack.values[datasetIndex];
    if (!isNaN(otherValue) && (value === 0 || helpers.math.sign(value) === helpers.math.sign(otherValue))) {
      value += otherValue;
    }
  }
  return value;
}
function convertObjectDataToArray(data) {
  var keys = Object.keys(data);
  var adata = new Array(keys.length);
  var i, ilen, key;
  for (i = 0, ilen = keys.length; i < ilen; ++i) {
    key = keys[i];
    adata[i] = {
      x: key,
      y: data[key]
    };
  }
  return adata;
}
function isStacked(scale, meta) {
  var stacked = scale && scale.options.stacked;
  return stacked || stacked === undefined && meta.stack !== undefined;
}
function getStackKey(indexScale, valueScale, meta) {
  return indexScale.id + '.' + valueScale.id + '.' + meta.stack + '.' + meta.type;
}
function getUserBounds(scale) {
  var {
    min,
    max,
    minDefined,
    maxDefined
  } = scale.getUserBounds();
  return {
    min: minDefined ? min : Number.NEGATIVE_INFINITY,
    max: maxDefined ? max : Number.POSITIVE_INFINITY
  };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
  var subStack = stacks[stackKey] || (stacks[stackKey] = {});
  return subStack[indexValue] || (subStack[indexValue] = {});
}
function updateStacks(controller, parsed) {
  var {
    chart,
    _cachedMeta: meta
  } = controller;
  var stacks = chart._stacks || (chart._stacks = {});
  var {
    iScale,
    vScale,
    index: datasetIndex
  } = meta;
  var iAxis = iScale.axis;
  var vAxis = vScale.axis;
  var key = getStackKey(iScale, vScale, meta);
  var ilen = parsed.length;
  var stack;
  for (var i = 0; i < ilen; ++i) {
    var item = parsed[i];
    var {
      [iAxis]: index,
      [vAxis]: value
    } = item;
    var itemStacks = item._stacks || (item._stacks = {});
    stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index);
    stack[datasetIndex] = value;
  }
}
function getFirstScaleId(chart, axis) {
  var scales = chart.scales;
  return Object.keys(scales).filter(key => scales[key].axis === axis).shift();
}
class DatasetController {
  constructor(chart, datasetIndex) {
    this.chart = chart;
    this._ctx = chart.ctx;
    this.index = datasetIndex;
    this._cachedAnimations = {};
    this._cachedDataOpts = {};
    this._cachedMeta = this.getMeta();
    this._type = this._cachedMeta.type;
    this._config = undefined;
    this._parsing = false;
    this._data = undefined;
    this._dataCopy = undefined;
    this._objectData = undefined;
    this._labels = undefined;
    this._scaleStacked = {};
    this.initialize();
  }
  initialize() {
    var me = this;
    var meta = me._cachedMeta;
    me.configure();
    me.linkScales();
    meta._stacked = isStacked(meta.vScale, meta);
    me.addElements();
  }
  updateIndex(datasetIndex) {
    this.index = datasetIndex;
  }
  linkScales() {
    var me = this;
    var chart = me.chart;
    var meta = me._cachedMeta;
    var dataset = me.getDataset();
    var xid = meta.xAxisID = dataset.xAxisID || getFirstScaleId(chart, 'x');
    var yid = meta.yAxisID = dataset.yAxisID || getFirstScaleId(chart, 'y');
    var rid = meta.rAxisID = dataset.rAxisID || getFirstScaleId(chart, 'r');
    meta.xScale = me.getScaleForId(xid);
    meta.yScale = me.getScaleForId(yid);
    meta.rScale = me.getScaleForId(rid);
    meta.iScale = me._getIndexScale();
    meta.vScale = me._getValueScale();
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(scaleID) {
    return this.chart.scales[scaleID];
  }
  getValueScaleId() {
    return this._cachedMeta.yAxisID;
  }
  getIndexScaleId() {
    return this._cachedMeta.xAxisID;
  }
  _getValueScale() {
    return this.getScaleForId(this.getValueScaleId());
  }
  _getIndexScale() {
    return this.getScaleForId(this.getIndexScaleId());
  }
  _getOtherScale(scale) {
    var meta = this._cachedMeta;
    return scale === meta.iScale ? meta.vScale : meta.iScale;
  }
  reset() {
    this._update('reset');
  }
  _destroy() {
    if (this._data) {
      unlistenArrayEvents(this._data, this);
    }
  }
  _dataCheck() {
    var me = this;
    var dataset = me.getDataset();
    var data = dataset.data || (dataset.data = []);
    if (helpers.isObject(data)) {
      if (me._objectData === data) {
        return false;
      }
      me._data = convertObjectDataToArray(data);
      me._objectData = data;
    } else {
      if (me._data === data && helpers.arrayEquals(data, me._dataCopy)) {
        return false;
      }
      if (me._data) {
        unlistenArrayEvents(me._data, me);
      }
      me._dataCopy = data.slice(0);
      if (data && Object.isExtensible(data)) {
        listenArrayEvents(data, me);
      }
      me._data = data;
    }
    return true;
  }
  _labelCheck() {
    var me = this;
    var iScale = me._cachedMeta.iScale;
    var labels = iScale ? iScale.getLabels() : me.chart.data.labels;
    if (me._labels === labels) {
      return false;
    }
    me._labels = labels;
    return true;
  }
  addElements() {
    var me = this;
    var meta = me._cachedMeta;
    me._dataCheck();
    var data = me._data;
    var metaData = meta.data = new Array(data.length);
    for (var i = 0, ilen = data.length; i < ilen; ++i) {
      metaData[i] = new me.dataElementType();
    }
    if (me.datasetElementType) {
      meta.dataset = new me.datasetElementType();
    }
  }
  buildOrUpdateElements() {
    var me = this;
    var dataChanged = me._dataCheck();
    var labelsChanged = me._labelCheck();
    var scaleChanged = me._scaleCheck();
    var meta = me._cachedMeta;
    var dataset = me.getDataset();
    var stackChanged = false;
    meta._stacked = isStacked(meta.vScale, meta);
    if (meta.stack !== dataset.stack) {
      stackChanged = true;
      meta._parsed.forEach(parsed => {
        delete parsed._stacks[meta.vScale.id][meta.index];
      });
      meta.stack = dataset.stack;
    }
    me._resyncElements(dataChanged || labelsChanged || scaleChanged || stackChanged);
    if (stackChanged) {
      updateStacks(me, meta._parsed);
    }
  }
  configure() {
    var me = this;
    me._config = helpers.merge({}, [me.chart.options[me._type].datasets, me.getDataset()], {
      merger(key, target, source) {
        if (key !== 'data') {
          helpers._merger(key, target, source);
        }
      }
    });
    me._parsing = resolve$1([me._config.parsing, me.chart.options.parsing, true]);
  }
  parse(start, count) {
    var me = this;
    var {
      _cachedMeta: meta,
      _data: data
    } = me;
    var {
      iScale,
      vScale,
      _stacked
    } = meta;
    var iAxis = iScale.axis;
    var sorted = true;
    var i, parsed, cur, prev;
    if (start > 0) {
      sorted = meta._sorted;
      prev = meta._parsed[start - 1];
    }
    if (me._parsing === false) {
      meta._parsed = data;
      meta._sorted = true;
    } else {
      if (helpers.isArray(data[start])) {
        parsed = me.parseArrayData(meta, data, start, count);
      } else if (helpers.isObject(data[start])) {
        parsed = me.parseObjectData(meta, data, start, count);
      } else {
        parsed = me.parsePrimitiveData(meta, data, start, count);
      }
      for (i = 0; i < count; ++i) {
        meta._parsed[i + start] = cur = parsed[i];
        if (sorted) {
          if (prev && cur[iAxis] < prev[iAxis]) {
            sorted = false;
          }
          prev = cur;
        }
      }
      meta._sorted = sorted;
    }
    if (_stacked) {
      updateStacks(me, parsed);
    }
    iScale.invalidateCaches();
    vScale.invalidateCaches();
  }
  parsePrimitiveData(meta, data, start, count) {
    var {
      iScale,
      vScale
    } = meta;
    var iAxis = iScale.axis;
    var vAxis = vScale.axis;
    var labels = iScale.getLabels();
    var singleScale = iScale === vScale;
    var parsed = new Array(count);
    var i, ilen, index;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      parsed[i] = {
        [iAxis]: singleScale || iScale.parse(labels[index], index),
        [vAxis]: vScale.parse(data[index], index)
      };
    }
    return parsed;
  }
  parseArrayData(meta, data, start, count) {
    var {
      xScale,
      yScale
    } = meta;
    var parsed = new Array(count);
    var i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parse(item[0], index),
        y: yScale.parse(item[1], index)
      };
    }
    return parsed;
  }
  parseObjectData(meta, data, start, count) {
    var {
      xScale,
      yScale
    } = meta;
    var parsed = new Array(count);
    var i, ilen, index, item;
    for (i = 0, ilen = count; i < ilen; ++i) {
      index = i + start;
      item = data[index];
      parsed[i] = {
        x: xScale.parseObject(item, 'x', index),
        y: yScale.parseObject(item, 'y', index)
      };
    }
    return parsed;
  }
  getParsed(index) {
    return this._cachedMeta._parsed[index];
  }
  applyStack(scale, parsed) {
    var chart = this.chart;
    var meta = this._cachedMeta;
    var value = parsed[scale.axis];
    var stack = {
      keys: getSortedDatasetIndices(chart, true),
      values: parsed._stacks[scale.axis]
    };
    return applyStack(stack, value, meta.index);
  }
  getMinMax(scale, canStack) {
    var meta = this._cachedMeta;
    var _parsed = meta._parsed;
    var sorted = meta._sorted && scale === meta.iScale;
    var ilen = _parsed.length;
    var otherScale = this._getOtherScale(scale);
    var stack = canStack && meta._stacked && {
      keys: getSortedDatasetIndices(this.chart, true),
      values: null
    };
    var min = Number.POSITIVE_INFINITY;
    var max = Number.NEGATIVE_INFINITY;
    var {
      min: otherMin,
      max: otherMax
    } = getUserBounds(otherScale);
    var i, value, parsed, otherValue;
    function _compute() {
      if (stack) {
        stack.values = parsed._stacks[scale.axis];
        min = Math.min(min, value);
        max = Math.max(max, value);
        value = applyStack(stack, value, meta.index, true);
      }
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
    function _skip() {
      parsed = _parsed[i];
      value = parsed[scale.axis];
      otherValue = parsed[otherScale.axis];
      return isNaN(value) || otherMin > otherValue || otherMax < otherValue;
    }
    for (i = 0; i < ilen; ++i) {
      if (_skip()) {
        continue;
      }
      _compute();
      if (sorted) {
        break;
      }
    }
    if (sorted) {
      for (i = ilen - 1; i >= 0; --i) {
        if (_skip()) {
          continue;
        }
        _compute();
        break;
      }
    }
    return {
      min,
      max
    };
  }
  getAllParsedValues(scale) {
    var parsed = this._cachedMeta._parsed;
    var values = [];
    var i, ilen, value;
    for (i = 0, ilen = parsed.length; i < ilen; ++i) {
      value = parsed[i][scale.axis];
      if (!isNaN(value)) {
        values.push(value);
      }
    }
    return values;
  }
  _cacheScaleStackStatus() {
    var me = this;
    var meta = me._cachedMeta;
    var iScale = meta.iScale;
    var vScale = meta.vScale;
    var cache = me._scaleStacked = {};
    if (iScale && vScale) {
      cache[iScale.id] = iScale.options.stacked;
      cache[vScale.id] = vScale.options.stacked;
    }
  }
  _scaleCheck() {
    var me = this;
    var meta = me._cachedMeta;
    var iScale = meta.iScale;
    var vScale = meta.vScale;
    var cache = me._scaleStacked;
    return !cache || !iScale || !vScale || cache[iScale.id] !== iScale.options.stacked || cache[vScale.id] !== vScale.options.stacked;
  }
  getMaxOverflow() {
    return false;
  }
  getLabelAndValue(index) {
    var me = this;
    var meta = me._cachedMeta;
    var iScale = meta.iScale;
    var vScale = meta.vScale;
    var parsed = me.getParsed(index);
    return {
      label: iScale ? '' + iScale.getLabelForValue(parsed[iScale.axis]) : '',
      value: vScale ? '' + vScale.getLabelForValue(parsed[vScale.axis]) : ''
    };
  }
  _update(mode) {
    var me = this;
    var meta = me._cachedMeta;
    me.configure();
    me._cachedAnimations = {};
    me._cachedDataOpts = {};
    me.update(mode);
    meta._clip = toClip(helpers.valueOrDefault(me._config.clip, defaultClip(meta.xScale, meta.yScale, me.getMaxOverflow())));
    me._cacheScaleStackStatus();
  }
  update(mode) {}
  draw() {
    var ctx = this._ctx;
    var meta = this._cachedMeta;
    var elements = meta.data || [];
    var ilen = elements.length;
    var i = 0;
    if (meta.dataset) {
      meta.dataset.draw(ctx);
    }
    for (; i < ilen; ++i) {
      elements[i].draw(ctx);
    }
  }
  _addAutomaticHoverColors(index, options) {
    var me = this;
    var getHoverColor = helpers.getHoverColor;
    var normalOptions = me.getStyle(index);
    var missingColors = Object.keys(normalOptions).filter(key => key.indexOf('Color') !== -1 && !(key in options));
    var i = missingColors.length - 1;
    var color;
    for (; i >= 0; i--) {
      color = missingColors[i];
      options[color] = getHoverColor(normalOptions[color]);
    }
  }
  getStyle(index, active) {
    var me = this;
    var meta = me._cachedMeta;
    var dataset = meta.dataset;
    if (!me._config) {
      me.configure();
    }
    var options = dataset && index === undefined ? me.resolveDatasetElementOptions(active) : me.resolveDataElementOptions(index || 0, active && 'active');
    if (active) {
      me._addAutomaticHoverColors(index, options);
    }
    return options;
  }
  _getContext(index, active) {
    return {
      chart: this.chart,
      dataIndex: index,
      dataset: this.getDataset(),
      datasetIndex: this.index,
      active
    };
  }
  resolveDatasetElementOptions(active) {
    var me = this;
    var chart = me.chart;
    var datasetOpts = me._config;
    var options = chart.options.elements[me.datasetElementType._type] || {};
    var elementOptions = me.datasetElementOptions;
    var values = {};
    var context = me._getContext(undefined, active);
    var i, ilen, key, readKey, value;
    for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
      key = elementOptions[i];
      readKey = active ? 'hover' + key.charAt(0).toUpperCase() + key.slice(1) : key;
      value = resolve$1([datasetOpts[readKey], options[readKey]], context);
      if (value !== undefined) {
        values[key] = value;
      }
    }
    return values;
  }
  resolveDataElementOptions(index, mode) {
    var me = this;
    var active = mode === 'active';
    var cached = me._cachedDataOpts;
    if (cached[mode]) {
      return cached[mode];
    }
    var chart = me.chart;
    var datasetOpts = me._config;
    var options = chart.options.elements[me.dataElementType._type] || {};
    var elementOptions = me.dataElementOptions;
    var values = {};
    var context = me._getContext(index, active);
    var info = {
      cacheable: !active
    };
    var keys, i, ilen, key, value, readKey;
    if (helpers.isArray(elementOptions)) {
      for (i = 0, ilen = elementOptions.length; i < ilen; ++i) {
        key = elementOptions[i];
        readKey = active ? 'hover' + key.charAt(0).toUpperCase() + key.slice(1) : key;
        value = resolve$1([datasetOpts[readKey], options[readKey]], context, index, info);
        if (value !== undefined) {
          values[key] = value;
        }
      }
    } else {
      keys = Object.keys(elementOptions);
      for (i = 0, ilen = keys.length; i < ilen; ++i) {
        key = keys[i];
        readKey = active ? 'hover' + key.charAt(0).toUpperCase() + key.slice(1) : key;
        value = resolve$1([datasetOpts[elementOptions[readKey]], datasetOpts[readKey], options[readKey]], context, index, info);
        if (value !== undefined) {
          values[key] = value;
        }
      }
    }
    if (info.cacheable) {
      values.$shared = true;
      cached[mode] = values;
    }
    return values;
  }
  _resolveAnimations(index, mode, active) {
    var me = this;
    var chart = me.chart;
    var cached = me._cachedAnimations;
    mode = mode || 'default';
    if (cached[mode]) {
      return cached[mode];
    }
    var info = {
      cacheable: true
    };
    var context = me._getContext(index, active);
    var datasetAnim = resolve$1([me._config.animation], context, index, info);
    var chartAnim = resolve$1([chart.options.animation], context, index, info);
    var config = helpers.mergeIf({}, [datasetAnim, chartAnim]);
    if (config[mode]) {
      config = _extends({}, config, config[mode]);
    }
    var animations = new Animations(chart, config);
    if (info.cacheable) {
      cached[mode] = animations && Object.freeze(animations);
    }
    return animations;
  }
  getSharedOptions(mode, el, options) {
    if (!mode) {
      this._sharedOptions = options && options.$shared;
    }
    if (mode !== 'reset' && options && options.$shared && el && el.options && el.options.$shared) {
      return {
        target: el.options,
        options
      };
    }
  }
  includeOptions(mode, sharedOptions) {
    if (mode === 'hide' || mode === 'show') {
      return true;
    }
    return mode !== 'resize' && !sharedOptions;
  }
  updateElement(element, index, properties, mode) {
    if (mode === 'reset' || mode === 'none') {
      _extends(element, properties);
    } else {
      this._resolveAnimations(index, mode).update(element, properties);
    }
  }
  updateSharedOptions(sharedOptions, mode) {
    if (sharedOptions) {
      this._resolveAnimations(undefined, mode).update(sharedOptions.target, sharedOptions.options);
    }
  }
  _setStyle(element, index, mode, active) {
    element.active = active;
    this._resolveAnimations(index, mode, active).update(element, {
      options: this.getStyle(index, active)
    });
  }
  removeHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, 'active', false);
  }
  setHoverStyle(element, datasetIndex, index) {
    this._setStyle(element, index, 'active', true);
  }
  _removeDatasetHoverStyle() {
    var element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, undefined, 'active', false);
    }
  }
  _setDatasetHoverStyle() {
    var element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, undefined, 'active', true);
    }
  }
  _resyncElements(changed) {
    var me = this;
    var meta = me._cachedMeta;
    var numMeta = meta.data.length;
    var numData = me._data.length;
    if (numData > numMeta) {
      me._insertElements(numMeta, numData - numMeta);
      if (changed && numMeta) {
        me.parse(0, numMeta);
      }
    } else if (numData < numMeta) {
      meta.data.splice(numData, numMeta - numData);
      meta._parsed.splice(numData, numMeta - numData);
      me.parse(0, numData);
    } else if (changed) {
      me.parse(0, numData);
    }
  }
  _insertElements(start, count) {
    var me = this;
    var elements = new Array(count);
    var meta = me._cachedMeta;
    var data = meta.data;
    var i;
    for (i = 0; i < count; ++i) {
      elements[i] = new me.dataElementType();
    }
    data.splice(start, 0, ...elements);
    if (me._parsing) {
      meta._parsed.splice(start, 0, ...new Array(count));
    }
    me.parse(start, count);
    me.updateElements(elements, start, 'reset');
  }
  updateElements(element, start, mode) {}
  _removeElements(start, count) {
    var me = this;
    if (me._parsing) {
      me._cachedMeta._parsed.splice(start, count);
    }
    me._cachedMeta.data.splice(start, count);
  }
  _onDataPush() {
    var count = arguments.length;
    this._insertElements(this.getDataset().data.length - count, count);
  }
  _onDataPop() {
    this._removeElements(this._cachedMeta.data.length - 1, 1);
  }
  _onDataShift() {
    this._removeElements(0, 1);
  }
  _onDataSplice(start, count) {
    this._removeElements(start, count);
    this._insertElements(start, arguments.length - 2);
  }
  _onDataUnshift() {
    this._insertElements(0, arguments.length);
  }
}
_defineProperty(DatasetController, "extend", helpers.inherits);
DatasetController.prototype.datasetElementType = null;
DatasetController.prototype.dataElementType = null;
DatasetController.prototype.datasetElementOptions = ['backgroundColor', 'borderCapStyle', 'borderColor', 'borderDash', 'borderDashOffset', 'borderJoinStyle', 'borderWidth'];
DatasetController.prototype.dataElementOptions = ['backgroundColor', 'borderColor', 'borderWidth', 'pointStyle'];

class Element {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.active = false;
    this.options = undefined;
    this.$animations = undefined;
  }
  tooltipPosition(useFinalPosition) {
    var {
      x,
      y
    } = this.getProps(['x', 'y'], useFinalPosition);
    return {
      x,
      y
    };
  }
  hasValue() {
    return isNumber(this.x) && isNumber(this.y);
  }
  getProps(props, final) {
    var me = this;
    var anims = this.$animations;
    if (!final || !anims) {
      return me;
    }
    var ret = {};
    props.forEach(prop => {
      ret[prop] = anims[prop] && anims[prop].active ? anims[prop]._to : me[prop];
    });
    return ret;
  }
}
_defineProperty(Element, "extend", inherits);

var TAU$1 = Math.PI * 2;
defaults.set('elements', {
  arc: {
    backgroundColor: defaults.color,
    borderAlign: 'center',
    borderColor: '#fff',
    borderWidth: 2
  }
});
function clipArc(ctx, arc) {
  var {
    startAngle,
    endAngle,
    pixelMargin,
    x,
    y
  } = arc;
  var angleMargin = pixelMargin / arc.outerRadius;
  ctx.beginPath();
  ctx.arc(x, y, arc.outerRadius, startAngle - angleMargin, endAngle + angleMargin);
  if (arc.innerRadius > pixelMargin) {
    angleMargin = pixelMargin / arc.innerRadius;
    ctx.arc(x, y, arc.innerRadius - pixelMargin, endAngle + angleMargin, startAngle - angleMargin, true);
  } else {
    ctx.arc(x, y, pixelMargin, endAngle + Math.PI / 2, startAngle - Math.PI / 2);
  }
  ctx.closePath();
  ctx.clip();
}
function drawFullCircleBorders(ctx, vm, arc, inner) {
  var endAngle = arc.endAngle;
  var i;
  if (inner) {
    arc.endAngle = arc.startAngle + TAU$1;
    clipArc(ctx, arc);
    arc.endAngle = endAngle;
    if (arc.endAngle === arc.startAngle && arc.fullCircles) {
      arc.endAngle += TAU$1;
      arc.fullCircles--;
    }
  }
  ctx.beginPath();
  ctx.arc(arc.x, arc.y, arc.innerRadius, arc.startAngle + TAU$1, arc.startAngle, true);
  for (i = 0; i < arc.fullCircles; ++i) {
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.startAngle + TAU$1);
  for (i = 0; i < arc.fullCircles; ++i) {
    ctx.stroke();
  }
}
function drawBorder(ctx, vm, arc) {
  var options = vm.options;
  var inner = options.borderAlign === 'inner';
  if (inner) {
    ctx.lineWidth = options.borderWidth * 2;
    ctx.lineJoin = 'round';
  } else {
    ctx.lineWidth = options.borderWidth;
    ctx.lineJoin = 'bevel';
  }
  if (arc.fullCircles) {
    drawFullCircleBorders(ctx, vm, arc, inner);
  }
  if (inner) {
    clipArc(ctx, arc);
  }
  ctx.beginPath();
  ctx.arc(arc.x, arc.y, vm.outerRadius, arc.startAngle, arc.endAngle);
  ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
  ctx.closePath();
  ctx.stroke();
}
class Arc extends Element {
  constructor(cfg) {
    super();
    this.options = undefined;
    this.circumference = undefined;
    this.startAngle = undefined;
    this.endAngle = undefined;
    this.innerRadius = undefined;
    this.outerRadius = undefined;
    if (cfg) {
      _extends(this, cfg);
    }
  }
  inRange(chartX, chartY, useFinalPosition) {
    var point = this.getProps(['x', 'y'], useFinalPosition);
    var {
      angle,
      distance
    } = getAngleFromPoint(point, {
      x: chartX,
      y: chartY
    });
    var {
      startAngle,
      endAngle,
      innerRadius,
      outerRadius,
      circumference
    } = this.getProps(['startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'circumference'], useFinalPosition);
    var betweenAngles = circumference >= TAU$1 || _angleBetween(angle, startAngle, endAngle);
    var withinRadius = distance >= innerRadius && distance <= outerRadius;
    return betweenAngles && withinRadius;
  }
  getCenterPoint(useFinalPosition) {
    var {
      x,
      y,
      startAngle,
      endAngle,
      innerRadius,
      outerRadius
    } = this.getProps(['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius'], useFinalPosition);
    var halfAngle = (startAngle + endAngle) / 2;
    var halfRadius = (innerRadius + outerRadius) / 2;
    return {
      x: x + Math.cos(halfAngle) * halfRadius,
      y: y + Math.sin(halfAngle) * halfRadius
    };
  }
  tooltipPosition(useFinalPosition) {
    return this.getCenterPoint(useFinalPosition);
  }
  draw(ctx) {
    var me = this;
    var options = me.options;
    var pixelMargin = options.borderAlign === 'inner' ? 0.33 : 0;
    var arc = {
      x: me.x,
      y: me.y,
      innerRadius: me.innerRadius,
      outerRadius: Math.max(me.outerRadius - pixelMargin, 0),
      pixelMargin,
      startAngle: me.startAngle,
      endAngle: me.endAngle,
      fullCircles: Math.floor(me.circumference / TAU$1)
    };
    var i;
    ctx.save();
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    if (arc.fullCircles) {
      arc.endAngle = arc.startAngle + TAU$1;
      ctx.beginPath();
      ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
      ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
      ctx.closePath();
      for (i = 0; i < arc.fullCircles; ++i) {
        ctx.fill();
      }
      arc.endAngle = arc.startAngle + me.circumference % TAU$1;
    }
    ctx.beginPath();
    ctx.arc(arc.x, arc.y, arc.outerRadius, arc.startAngle, arc.endAngle);
    ctx.arc(arc.x, arc.y, arc.innerRadius, arc.endAngle, arc.startAngle, true);
    ctx.closePath();
    ctx.fill();
    if (options.borderWidth) {
      drawBorder(ctx, me, arc);
    }
    ctx.restore();
  }
}
_defineProperty(Arc, "_type", 'arc');

function _pointInLine(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y)
  };
}
function _steppedInterpolation(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: mode === 'middle' ? t < 0.5 ? p1.y : p2.y : mode === 'after' ? t < 1 ? p1.y : p2.y : t > 0 ? p2.y : p1.y
  };
}
function _bezierInterpolation(p1, p2, t, mode) {
  var cp1 = {
    x: p1.controlPointNextX,
    y: p1.controlPointNextY
  };
  var cp2 = {
    x: p2.controlPointPreviousX,
    y: p2.controlPointPreviousY
  };
  var a = _pointInLine(p1, cp1, t);
  var b = _pointInLine(cp1, cp2, t);
  var c = _pointInLine(cp2, p2, t);
  var d = _pointInLine(a, b, t);
  var e = _pointInLine(b, c, t);
  return _pointInLine(d, e, t);
}

function propertyFn(property) {
  if (property === 'angle') {
    return {
      between: _angleBetween,
      compare: _angleDiff,
      normalize: _normalizeAngle
    };
  }
  return {
    between: (n, s, e) => n >= s && n <= e,
    compare: (a, b) => a - b,
    normalize: x => x
  };
}
function makeSubSegment(start, end, loop, count) {
  return {
    start: start % count,
    end: end % count,
    loop: loop && (end - start + 1) % count === 0
  };
}
function getSegment(segment, points, bounds) {
  var {
    property,
    start: startBound,
    end: endBound
  } = bounds;
  var {
    between,
    normalize
  } = propertyFn(property);
  var count = points.length;
  var {
    start,
    end,
    loop
  } = segment;
  var i, ilen;
  if (loop) {
    start += count;
    end += count;
    for (i = 0, ilen = count; i < ilen; ++i) {
      if (!between(normalize(points[start % count][property]), startBound, endBound)) {
        break;
      }
      start--;
      end--;
    }
    start %= count;
    end %= count;
  }
  if (end < start) {
    end += count;
  }
  return {
    start,
    end,
    loop
  };
}
function _boundSegment(segment, points, bounds) {
  if (!bounds) {
    return [segment];
  }
  var {
    property,
    start: startBound,
    end: endBound
  } = bounds;
  var count = points.length;
  var {
    compare,
    between,
    normalize
  } = propertyFn(property);
  var {
    start,
    end,
    loop
  } = getSegment(segment, points, bounds);
  var result = [];
  var inside = false;
  var subStart = null;
  var i, value, point, prev;
  for (i = start; i <= end; ++i) {
    point = points[i % count];
    if (point.skip) {
      continue;
    }
    value = normalize(point[property]);
    inside = between(value, startBound, endBound);
    if (subStart === null && inside) {
      subStart = i > start && compare(value, startBound) > 0 ? prev : i;
    }
    if (subStart !== null && (!inside || compare(value, endBound) === 0)) {
      result.push(makeSubSegment(subStart, i, loop, count));
      subStart = null;
    }
    prev = i;
  }
  if (subStart !== null) {
    result.push(makeSubSegment(subStart, end, loop, count));
  }
  return result;
}
function _boundSegments(line, bounds) {
  var result = [];
  var segments = line.segments;
  for (var i = 0; i < segments.length; i++) {
    var sub = _boundSegment(segments[i], line.points, bounds);
    if (sub.length) {
      result.push(...sub);
    }
  }
  return result;
}
function findStartAndEnd(points, count, loop, spanGaps) {
  var start = 0;
  var end = count - 1;
  if (loop && !spanGaps) {
    while (start < count && !points[start].skip) {
      start++;
    }
  }
  while (start < count && points[start].skip) {
    start++;
  }
  start %= count;
  if (loop) {
    end += start;
  }
  while (end > start && points[end % count].skip) {
    end--;
  }
  end %= count;
  return {
    start,
    end
  };
}
function solidSegments(points, start, max, loop) {
  var count = points.length;
  var result = [];
  var last = start;
  var prev = points[start];
  var end;
  for (end = start + 1; end <= max; ++end) {
    var cur = points[end % count];
    if (cur.skip || cur.stop) {
      if (!prev.skip) {
        loop = false;
        result.push({
          start: start % count,
          end: (end - 1) % count,
          loop
        });
        start = last = cur.stop ? end : null;
      }
    } else {
      last = end;
      if (prev.skip) {
        start = end;
      }
    }
    prev = cur;
  }
  if (last !== null) {
    result.push({
      start: start % count,
      end: last % count,
      loop
    });
  }
  return result;
}
function _computeSegments(line) {
  var points = line.points;
  var spanGaps = line.options.spanGaps;
  var count = points.length;
  if (!count) {
    return [];
  }
  var loop = !!line._loop;
  var {
    start,
    end
  } = findStartAndEnd(points, count, loop, spanGaps);
  if (spanGaps === true) {
    return [{
      start,
      end,
      loop
    }];
  }
  var max = end < start ? end + count : end;
  var completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
  return solidSegments(points, start, max, completeLoop);
}

var defaultColor = defaults.color;
defaults.set('elements', {
  line: {
    backgroundColor: defaultColor,
    borderCapStyle: 'butt',
    borderColor: defaultColor,
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderWidth: 3,
    capBezierPoints: true,
    fill: true,
    tension: 0.4
  }
});
function setStyle(ctx, vm) {
  ctx.lineCap = vm.borderCapStyle;
  ctx.setLineDash(vm.borderDash);
  ctx.lineDashOffset = vm.borderDashOffset;
  ctx.lineJoin = vm.borderJoinStyle;
  ctx.lineWidth = vm.borderWidth;
  ctx.strokeStyle = vm.borderColor;
}
function lineTo(ctx, previous, target) {
  ctx.lineTo(target.x, target.y);
}
function getLineMethod(options) {
  if (options.stepped) {
    return _steppedLineTo;
  }
  if (options.tension) {
    return _bezierCurveTo;
  }
  return lineTo;
}
function pathSegment(ctx, line, segment, params) {
  var {
    start,
    end,
    loop
  } = segment;
  var {
    points,
    options
  } = line;
  var lineMethod = getLineMethod(options);
  var count = points.length;
  var {
    move = true,
    reverse
  } = params || {};
  var ilen = end < start ? count + end - start : end - start;
  var i, point, prev;
  for (i = 0; i <= ilen; ++i) {
    point = points[(start + (reverse ? ilen - i : i)) % count];
    if (point.skip) {
      continue;
    } else if (move) {
      ctx.moveTo(point.x, point.y);
      move = false;
    } else {
      lineMethod(ctx, prev, point, reverse, options.stepped);
    }
    prev = point;
  }
  if (loop) {
    point = points[(start + (reverse ? ilen : 0)) % count];
    lineMethod(ctx, prev, point, reverse, options.stepped);
  }
  return !!loop;
}
function fastPathSegment(ctx, line, segment, params) {
  var points = line.points;
  var count = points.length;
  var {
    start,
    end
  } = segment;
  var {
    move = true,
    reverse
  } = params || {};
  var ilen = end < start ? count + end - start : end - start;
  var avgX = 0;
  var countX = 0;
  var i, point, prevX, minY, maxY, lastY;
  if (move) {
    point = points[(start + (reverse ? ilen : 0)) % count];
    ctx.moveTo(point.x, point.y);
  }
  for (i = 0; i <= ilen; ++i) {
    point = points[(start + (reverse ? ilen - i : i)) % count];
    if (point.skip) {
      continue;
    }
    var x = point.x;
    var y = point.y;
    var truncX = x | 0;
    if (truncX === prevX) {
      if (y < minY) {
        minY = y;
      } else if (y > maxY) {
        maxY = y;
      }
      avgX = (countX * avgX + x) / ++countX;
    } else {
      if (minY !== maxY) {
        ctx.lineTo(avgX, maxY);
        ctx.lineTo(avgX, minY);
        ctx.lineTo(avgX, lastY);
      }
      ctx.lineTo(x, y);
      prevX = truncX;
      countX = 0;
      minY = maxY = y;
    }
    lastY = y;
  }
}
function _getSegmentMethod(line) {
  var opts = line.options;
  var borderDash = opts.borderDash && opts.borderDash.length;
  var useFastPath = !line._loop && !opts.tension && !opts.stepped && !borderDash;
  return useFastPath ? fastPathSegment : pathSegment;
}
function _getInterpolationMethod(options) {
  if (options.stepped) {
    return _steppedInterpolation;
  }
  if (options.tension) {
    return _bezierInterpolation;
  }
  return _pointInLine;
}
class Line extends Element {
  constructor(cfg) {
    super();
    this.options = undefined;
    this._loop = undefined;
    this._fullLoop = undefined;
    this._controlPointsUpdated = undefined;
    this._points = undefined;
    this._segments = undefined;
    if (cfg) {
      _extends(this, cfg);
    }
  }
  updateControlPoints(chartArea) {
    var me = this;
    if (me._controlPointsUpdated) {
      return;
    }
    var options = me.options;
    if (options.tension && !options.stepped) {
      var loop = options.spanGaps ? me._loop : me._fullLoop;
      _updateBezierControlPoints(me._points, options, chartArea, loop);
    }
  }
  set points(points) {
    this._points = points;
    delete this._segments;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = _computeSegments(this));
  }
  first() {
    var segments = this.segments;
    var points = this.points;
    return segments.length && points[segments[0].start];
  }
  last() {
    var segments = this.segments;
    var points = this.points;
    var count = segments.length;
    return count && points[segments[count - 1].end];
  }
  interpolate(point, property) {
    var me = this;
    var options = me.options;
    var value = point[property];
    var points = me.points;
    var segments = _boundSegments(me, {
      property,
      start: value,
      end: value
    });
    if (!segments.length) {
      return;
    }
    var result = [];
    var _interpolate = _getInterpolationMethod(options);
    var i, ilen;
    for (i = 0, ilen = segments.length; i < ilen; ++i) {
      var {
        start,
        end
      } = segments[i];
      var p1 = points[start];
      var p2 = points[end];
      if (p1 === p2) {
        result.push(p1);
        continue;
      }
      var t = Math.abs((value - p1[property]) / (p2[property] - p1[property]));
      var interpolated = _interpolate(p1, p2, t, options.stepped);
      interpolated[property] = point[property];
      result.push(interpolated);
    }
    return result.length === 1 ? result[0] : result;
  }
  pathSegment(ctx, segment, params) {
    var segmentMethod = _getSegmentMethod(this);
    return segmentMethod(ctx, this, segment, params);
  }
  path(ctx) {
    var me = this;
    var segments = me.segments;
    var ilen = segments.length;
    var segmentMethod = _getSegmentMethod(me);
    var loop = me._loop;
    for (var i = 0; i < ilen; ++i) {
      loop &= segmentMethod(ctx, me, segments[i]);
    }
    return !!loop;
  }
  draw(ctx) {
    var me = this;
    if (!me.points.length) {
      return;
    }
    ctx.save();
    setStyle(ctx, me.options);
    ctx.beginPath();
    if (me.path(ctx)) {
      ctx.closePath();
    }
    ctx.stroke();
    ctx.restore();
  }
}
_defineProperty(Line, "_type", 'line');

var defaultColor$1 = defaults.color;
defaults.set('elements', {
  point: {
    backgroundColor: defaultColor$1,
    borderColor: defaultColor$1,
    borderWidth: 1,
    hitRadius: 1,
    hoverBorderWidth: 1,
    hoverRadius: 4,
    pointStyle: 'circle',
    radius: 3
  }
});
class Point extends Element {
  constructor(cfg) {
    super();
    this.options = undefined;
    this.skip = undefined;
    this.stop = undefined;
    if (cfg) {
      _extends(this, cfg);
    }
  }
  inRange(mouseX, mouseY, useFinalPosition) {
    var options = this.options;
    var {
      x,
      y
    } = this.getProps(['x', 'y'], useFinalPosition);
    return Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(options.hitRadius + options.radius, 2);
  }
  inXRange(mouseX, useFinalPosition) {
    var options = this.options;
    var {
      x
    } = this.getProps(['x'], useFinalPosition);
    return Math.abs(mouseX - x) < options.radius + options.hitRadius;
  }
  inYRange(mouseY, useFinalPosition) {
    var options = this.options;
    var {
      y
    } = this.getProps(['x'], useFinalPosition);
    return Math.abs(mouseY - y) < options.radius + options.hitRadius;
  }
  getCenterPoint(useFinalPosition) {
    var {
      x,
      y
    } = this.getProps(['x', 'y'], useFinalPosition);
    return {
      x,
      y
    };
  }
  size() {
    var options = this.options || {};
    var radius = Math.max(options.radius, options.hoverRadius) || 0;
    var borderWidth = radius && options.borderWidth || 0;
    return (radius + borderWidth) * 2;
  }
  draw(ctx, chartArea) {
    var me = this;
    var options = me.options;
    if (me.skip || options.radius <= 0) {
      return;
    }
    if (chartArea === undefined || _isPointInArea(me, chartArea)) {
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.fillStyle = options.backgroundColor;
      drawPoint(ctx, options, me.x, me.y);
    }
  }
  getRange() {
    var options = this.options || {};
    return options.radius + options.hitRadius;
  }
}
_defineProperty(Point, "_type", 'point');

var defaultColor$2 = defaults.color;
defaults.set('elements', {
  rectangle: {
    backgroundColor: defaultColor$2,
    borderColor: defaultColor$2,
    borderSkipped: 'bottom',
    borderWidth: 0
  }
});
function getBarBounds(bar, useFinalPosition) {
  var {
    x,
    y,
    base,
    width,
    height
  } = bar.getProps(['x', 'y', 'base', 'width', 'height'], useFinalPosition);
  var left, right, top, bottom, half;
  if (bar.horizontal) {
    half = height / 2;
    left = Math.min(x, base);
    right = Math.max(x, base);
    top = y - half;
    bottom = y + half;
  } else {
    half = width / 2;
    left = x - half;
    right = x + half;
    top = Math.min(y, base);
    bottom = Math.max(y, base);
  }
  return {
    left,
    top,
    right,
    bottom
  };
}
function swap(orig, v1, v2) {
  return orig === v1 ? v2 : orig === v2 ? v1 : orig;
}
function parseBorderSkipped(bar) {
  var edge = bar.options.borderSkipped;
  var res = {};
  if (!edge) {
    return res;
  }
  if (bar.horizontal) {
    if (bar.base > bar.x) {
      edge = swap(edge, 'left', 'right');
    }
  } else if (bar.base < bar.y) {
    edge = swap(edge, 'bottom', 'top');
  }
  res[edge] = true;
  return res;
}
function skipOrLimit(skip, value, min, max) {
  return skip ? 0 : Math.max(Math.min(value, max), min);
}
function parseBorderWidth(bar, maxW, maxH) {
  var value = bar.options.borderWidth;
  var skip = parseBorderSkipped(bar);
  var t, r, b, l;
  if (isObject(value)) {
    t = +value.top || 0;
    r = +value.right || 0;
    b = +value.bottom || 0;
    l = +value.left || 0;
  } else {
    t = r = b = l = +value || 0;
  }
  return {
    t: skipOrLimit(skip.top, t, 0, maxH),
    r: skipOrLimit(skip.right, r, 0, maxW),
    b: skipOrLimit(skip.bottom, b, 0, maxH),
    l: skipOrLimit(skip.left, l, 0, maxW)
  };
}
function boundingRects(bar) {
  var bounds = getBarBounds(bar);
  var width = bounds.right - bounds.left;
  var height = bounds.bottom - bounds.top;
  var border = parseBorderWidth(bar, width / 2, height / 2);
  return {
    outer: {
      x: bounds.left,
      y: bounds.top,
      w: width,
      h: height
    },
    inner: {
      x: bounds.left + border.l,
      y: bounds.top + border.t,
      w: width - border.l - border.r,
      h: height - border.t - border.b
    }
  };
}
function inRange(bar, x, y, useFinalPosition) {
  var skipX = x === null;
  var skipY = y === null;
  var bounds = !bar || skipX && skipY ? false : getBarBounds(bar, useFinalPosition);
  return bounds && (skipX || x >= bounds.left && x <= bounds.right) && (skipY || y >= bounds.top && y <= bounds.bottom);
}
class Rectangle extends Element {
  constructor(cfg) {
    super();
    this.options = undefined;
    this.horizontal = undefined;
    this.base = undefined;
    this.width = undefined;
    this.height = undefined;
    if (cfg) {
      _extends(this, cfg);
    }
  }
  draw(ctx) {
    var options = this.options;
    var {
      inner,
      outer
    } = boundingRects(this);
    ctx.save();
    if (outer.w !== inner.w || outer.h !== inner.h) {
      ctx.beginPath();
      ctx.rect(outer.x, outer.y, outer.w, outer.h);
      ctx.clip();
      ctx.rect(inner.x, inner.y, inner.w, inner.h);
      ctx.fillStyle = options.borderColor;
      ctx.fill('evenodd');
    }
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(inner.x, inner.y, inner.w, inner.h);
    ctx.restore();
  }
  inRange(mouseX, mouseY, useFinalPosition) {
    return inRange(this, mouseX, mouseY, useFinalPosition);
  }
  inXRange(mouseX, useFinalPosition) {
    return inRange(this, mouseX, null, useFinalPosition);
  }
  inYRange(mouseY, useFinalPosition) {
    return inRange(this, null, mouseY, useFinalPosition);
  }
  getCenterPoint(useFinalPosition) {
    var {
      x,
      y,
      base,
      horizontal
    } = this.getProps(['x', 'y', 'base', 'horizontal'], useFinalPosition);
    return {
      x: horizontal ? (x + base) / 2 : x,
      y: horizontal ? y : (y + base) / 2
    };
  }
  getRange(axis) {
    return axis === 'x' ? this.width / 2 : this.height / 2;
  }
}
_defineProperty(Rectangle, "_type", 'rectangle');

var elements = /*#__PURE__*/Object.freeze({
__proto__: null,
Arc: Arc,
Line: Line,
Point: Point,
Rectangle: Rectangle
});

defaults.set('bar', {
  hover: {
    mode: 'index'
  },
  datasets: {
    categoryPercentage: 0.8,
    barPercentage: 0.9,
    animation: {
      numbers: {
        type: 'number',
        properties: ['x', 'y', 'base', 'width', 'height']
      }
    }
  },
  scales: {
    x: {
      type: 'category',
      offset: true,
      gridLines: {
        offsetGridLines: true
      }
    },
    y: {
      type: 'linear',
      beginAtZero: true
    }
  }
});
function computeMinSampleSize(scale, pixels) {
  var min = scale._length;
  var prev, curr, i, ilen;
  for (i = 1, ilen = pixels.length; i < ilen; ++i) {
    min = Math.min(min, Math.abs(pixels[i] - pixels[i - 1]));
  }
  for (i = 0, ilen = scale.ticks.length; i < ilen; ++i) {
    curr = scale.getPixelForTick(i);
    min = i > 0 ? Math.min(min, Math.abs(curr - prev)) : min;
    prev = curr;
  }
  return min;
}
function computeFitCategoryTraits(index, ruler, options) {
  var thickness = options.barThickness;
  var count = ruler.stackCount;
  var size, ratio;
  if (isNullOrUndef(thickness)) {
    size = ruler.min * options.categoryPercentage;
    ratio = options.barPercentage;
  } else {
    size = thickness * count;
    ratio = 1;
  }
  return {
    chunk: size / count,
    ratio,
    start: ruler.pixels[index] - size / 2
  };
}
function computeFlexCategoryTraits(index, ruler, options) {
  var pixels = ruler.pixels;
  var curr = pixels[index];
  var prev = index > 0 ? pixels[index - 1] : null;
  var next = index < pixels.length - 1 ? pixels[index + 1] : null;
  var percent = options.categoryPercentage;
  if (prev === null) {
    prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
  }
  if (next === null) {
    next = curr + curr - prev;
  }
  var start = curr - (curr - Math.min(prev, next)) / 2 * percent;
  var size = Math.abs(next - prev) / 2 * percent;
  return {
    chunk: size / ruler.stackCount,
    ratio: options.barPercentage,
    start
  };
}
function parseFloatBar(arr, item, vScale, i) {
  var startValue = vScale.parse(arr[0], i);
  var endValue = vScale.parse(arr[1], i);
  var min = Math.min(startValue, endValue);
  var max = Math.max(startValue, endValue);
  var barStart = min;
  var barEnd = max;
  if (Math.abs(min) > Math.abs(max)) {
    barStart = max;
    barEnd = min;
  }
  item[vScale.axis] = barEnd;
  item._custom = {
    barStart,
    barEnd,
    start: startValue,
    end: endValue,
    min,
    max
  };
}
function parseArrayOrPrimitive(meta, data, start, count) {
  var iScale = meta.iScale;
  var vScale = meta.vScale;
  var labels = iScale.getLabels();
  var singleScale = iScale === vScale;
  var parsed = [];
  var i, ilen, item, entry;
  for (i = start, ilen = start + count; i < ilen; ++i) {
    entry = data[i];
    item = {};
    item[iScale.axis] = singleScale || iScale.parse(labels[i], i);
    if (isArray(entry)) {
      parseFloatBar(entry, item, vScale, i);
    } else {
      item[vScale.axis] = vScale.parse(entry, i);
    }
    parsed.push(item);
  }
  return parsed;
}
function isFloatBar(custom) {
  return custom && custom.barStart !== undefined && custom.barEnd !== undefined;
}
class BarController extends DatasetController {
  parsePrimitiveData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseArrayData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseObjectData(meta, data, start, count) {
    var {
      iScale,
      vScale
    } = meta;
    var vProp = vScale.axis;
    var parsed = [];
    var i, ilen, item, obj, value;
    for (i = start, ilen = start + count; i < ilen; ++i) {
      obj = data[i];
      item = {};
      item[iScale.axis] = iScale.parseObject(obj, iScale.axis, i);
      value = obj[vProp];
      if (isArray(value)) {
        parseFloatBar(value, item, vScale, i);
      } else {
        item[vScale.axis] = vScale.parseObject(obj, vProp, i);
      }
      parsed.push(item);
    }
    return parsed;
  }
  getLabelAndValue(index) {
    var me = this;
    var meta = me._cachedMeta;
    var {
      iScale,
      vScale
    } = meta;
    var parsed = me.getParsed(index);
    var custom = parsed._custom;
    var value = isFloatBar(custom) ? '[' + custom.start + ', ' + custom.end + ']' : '' + vScale.getLabelForValue(parsed[vScale.axis]);
    return {
      label: '' + iScale.getLabelForValue(parsed[iScale.axis]),
      value
    };
  }
  initialize() {
    var me = this;
    super.initialize();
    var meta = me._cachedMeta;
    meta.stack = me.getDataset().stack;
    meta.bar = true;
  }
  update(mode) {
    var me = this;
    var meta = me._cachedMeta;
    me.updateElements(meta.data, 0, mode);
  }
  updateElements(rectangles, start, mode) {
    var me = this;
    var reset = mode === 'reset';
    var vscale = me._cachedMeta.vScale;
    var base = vscale.getBasePixel();
    var horizontal = vscale.isHorizontal();
    var ruler = me._getRuler();
    var firstOpts = me.resolveDataElementOptions(start, mode);
    var sharedOptions = me.getSharedOptions(mode, rectangles[start], firstOpts);
    var includeOptions = me.includeOptions(mode, sharedOptions);
    var i;
    for (i = 0; i < rectangles.length; i++) {
      var index = start + i;
      var options = me.resolveDataElementOptions(index, mode);
      var vpixels = me._calculateBarValuePixels(index, options);
      var ipixels = me._calculateBarIndexPixels(index, ruler, options);
      var properties = {
        horizontal,
        base: reset ? base : vpixels.base,
        x: horizontal ? reset ? base : vpixels.head : ipixels.center,
        y: horizontal ? ipixels.center : reset ? base : vpixels.head,
        height: horizontal ? ipixels.size : undefined,
        width: horizontal ? undefined : ipixels.size
      };
      if (includeOptions) {
        properties.options = options;
      }
      me.updateElement(rectangles[i], index, properties, mode);
    }
    me.updateSharedOptions(sharedOptions, mode);
  }
  _getStacks(last) {
    var me = this;
    var meta = me._cachedMeta;
    var iScale = meta.iScale;
    var metasets = iScale.getMatchingVisibleMetas(me._type);
    var stacked = iScale.options.stacked;
    var ilen = metasets.length;
    var stacks = [];
    var i, item;
    for (i = 0; i < ilen; ++i) {
      item = metasets[i];
      if (stacked === false || stacks.indexOf(item.stack) === -1 || stacked === undefined && item.stack === undefined) {
        stacks.push(item.stack);
      }
      if (item.index === last) {
        break;
      }
    }
    if (!stacks.length) {
      stacks.push(undefined);
    }
    return stacks;
  }
  _getStackCount() {
    return this._getStacks().length;
  }
  _getStackIndex(datasetIndex, name) {
    var stacks = this._getStacks(datasetIndex);
    var index = name !== undefined ? stacks.indexOf(name) : -1;
    return index === -1 ? stacks.length - 1 : index;
  }
  _getRuler() {
    var me = this;
    var meta = me._cachedMeta;
    var iScale = meta.iScale;
    var pixels = [];
    var i, ilen;
    for (i = 0, ilen = meta.data.length; i < ilen; ++i) {
      pixels.push(iScale.getPixelForValue(me.getParsed(i)[iScale.axis]));
    }
    var min = computeMinSampleSize(iScale, pixels);
    return {
      min,
      pixels,
      start: iScale._startPixel,
      end: iScale._endPixel,
      stackCount: me._getStackCount(),
      scale: iScale
    };
  }
  _calculateBarValuePixels(index, options) {
    var me = this;
    var meta = me._cachedMeta;
    var vScale = meta.vScale;
    var minBarLength = options.minBarLength;
    var parsed = me.getParsed(index);
    var custom = parsed._custom;
    var value = parsed[vScale.axis];
    var start = 0;
    var length = meta._stacked ? me.applyStack(vScale, parsed) : value;
    var head, size;
    if (length !== value) {
      start = length - value;
      length = value;
    }
    if (isFloatBar(custom)) {
      value = custom.barStart;
      length = custom.barEnd - custom.barStart;
      if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
        start = 0;
      }
      start += value;
    }
    var base = _limitValue(vScale.getPixelForValue(start), vScale._startPixel - 10, vScale._endPixel + 10);
    head = vScale.getPixelForValue(start + length);
    size = head - base;
    if (minBarLength !== undefined && Math.abs(size) < minBarLength) {
      size = size < 0 ? -minBarLength : minBarLength;
      head = base + size;
    }
    return {
      size,
      base,
      head,
      center: head + size / 2
    };
  }
  _calculateBarIndexPixels(index, ruler, options) {
    var me = this;
    var range = options.barThickness === 'flex' ? computeFlexCategoryTraits(index, ruler, options) : computeFitCategoryTraits(index, ruler, options);
    var stackIndex = me._getStackIndex(me.index, me._cachedMeta.stack);
    var center = range.start + range.chunk * stackIndex + range.chunk / 2;
    var size = Math.min(valueOrDefault(options.maxBarThickness, Infinity), range.chunk * range.ratio);
    return {
      base: center - size / 2,
      head: center + size / 2,
      center,
      size
    };
  }
  draw() {
    var me = this;
    var chart = me.chart;
    var meta = me._cachedMeta;
    var vScale = meta.vScale;
    var rects = meta.data;
    var ilen = rects.length;
    var i = 0;
    clipArea(chart.ctx, chart.chartArea);
    for (; i < ilen; ++i) {
      if (!isNaN(me.getParsed(i)[vScale.axis])) {
        rects[i].draw(me._ctx);
      }
    }
    unclipArea(chart.ctx);
  }
}
BarController.prototype.dataElementType = Rectangle;
BarController.prototype.dataElementOptions = ['backgroundColor', 'borderColor', 'borderSkipped', 'borderWidth', 'barPercentage', 'barThickness', 'categoryPercentage', 'maxBarThickness', 'minBarLength'];

defaults.set('bubble', {
  animation: {
    numbers: {
      properties: ['x', 'y', 'borderWidth', 'radius']
    }
  },
  scales: {
    x: {
      type: 'linear'
    },
    y: {
      type: 'linear'
    }
  },
  tooltips: {
    callbacks: {
      title() {
        return '';
      }
    }
  }
});
class BubbleController extends DatasetController {
  parseObjectData(meta, data, start, count) {
    var {
      xScale,
      yScale
    } = meta;
    var parsed = [];
    var i, ilen, item;
    for (i = start, ilen = start + count; i < ilen; ++i) {
      item = data[i];
      parsed.push({
        x: xScale.parseObject(item, 'x', i),
        y: yScale.parseObject(item, 'y', i),
        _custom: item && item.r && +item.r
      });
    }
    return parsed;
  }
  getMaxOverflow() {
    var me = this;
    var meta = me._cachedMeta;
    var i = (meta.data || []).length - 1;
    var max = 0;
    for (; i >= 0; --i) {
      max = Math.max(max, me.getStyle(i, true).radius);
    }
    return max > 0 && max;
  }
  getLabelAndValue(index) {
    var me = this;
    var meta = me._cachedMeta;
    var {
      xScale,
      yScale
    } = meta;
    var parsed = me.getParsed(index);
    var x = xScale.getLabelForValue(parsed.x);
    var y = yScale.getLabelForValue(parsed.y);
    var r = parsed._custom;
    return {
      label: meta.label,
      value: '(' + x + ', ' + y + (r ? ', ' + r : '') + ')'
    };
  }
  update(mode) {
    var me = this;
    var points = me._cachedMeta.data;
    me.updateElements(points, 0, mode);
  }
  updateElements(points, start, mode) {
    var me = this;
    var reset = mode === 'reset';
    var {
      xScale,
      yScale
    } = me._cachedMeta;
    var firstOpts = me.resolveDataElementOptions(start, mode);
    var sharedOptions = me.getSharedOptions(mode, points[start], firstOpts);
    var includeOptions = me.includeOptions(mode, sharedOptions);
    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var index = start + i;
      var parsed = !reset && me.getParsed(index);
      var x = reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(parsed.x);
      var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(parsed.y);
      var properties = {
        x,
        y,
        skip: isNaN(x) || isNaN(y)
      };
      if (includeOptions) {
        properties.options = me.resolveDataElementOptions(i, mode);
        if (reset) {
          properties.options.radius = 0;
        }
      }
      me.updateElement(point, index, properties, mode);
    }
    me.updateSharedOptions(sharedOptions, mode);
  }
  resolveDataElementOptions(index, mode) {
    var me = this;
    var chart = me.chart;
    var dataset = me.getDataset();
    var parsed = me.getParsed(index);
    var values = super.resolveDataElementOptions(index, mode);
    var context = {
      chart,
      dataIndex: index,
      dataset,
      datasetIndex: me.index
    };
    if (values.$shared) {
      values = _extends({}, values, {
        $shared: false
      });
    }
    if (mode !== 'active') {
      values.radius = 0;
    }
    values.radius += resolve([parsed && parsed._custom, me._config.radius, chart.options.elements.point.radius], context, index);
    return values;
  }
}
BubbleController.prototype.dataElementType = Point;
BubbleController.prototype.dataElementOptions = ['backgroundColor', 'borderColor', 'borderWidth', 'hitRadius', 'radius', 'pointStyle', 'rotation'];

var PI$2 = Math.PI;
var DOUBLE_PI$1 = PI$2 * 2;
var HALF_PI$1 = PI$2 / 2;
defaults.set('doughnut', {
  animation: {
    numbers: {
      type: 'number',
      properties: ['circumference', 'endAngle', 'innerRadius', 'outerRadius', 'startAngle', 'x', 'y']
    },
    animateRotate: true,
    animateScale: false
  },
  legend: {
    labels: {
      generateLabels(chart) {
        var data = chart.data;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map((label, i) => {
            var meta = chart.getDatasetMeta(0);
            var style = meta.controller.getStyle(i);
            return {
              text: label,
              fillStyle: style.backgroundColor,
              strokeStyle: style.borderColor,
              lineWidth: style.borderWidth,
              hidden: !chart.getDataVisibility(i),
              index: i
            };
          });
        }
        return [];
      }
    },
    onClick(e, legendItem) {
      this.chart.toggleDataVisibility(legendItem.index);
      this.chart.update();
    }
  },
  cutoutPercentage: 50,
  rotation: -HALF_PI$1,
  circumference: DOUBLE_PI$1,
  tooltips: {
    callbacks: {
      title() {
        return '';
      },
      label(tooltipItem, data) {
        var dataLabel = data.labels[tooltipItem.index];
        var value = ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        if (isArray(dataLabel)) {
          dataLabel = dataLabel.slice();
          dataLabel[0] += value;
        } else {
          dataLabel += value;
        }
        return dataLabel;
      }
    }
  }
});
function getRatioAndOffset(rotation, circumference, cutout) {
  var ratioX = 1;
  var ratioY = 1;
  var offsetX = 0;
  var offsetY = 0;
  if (circumference < DOUBLE_PI$1) {
    var startAngle = rotation % DOUBLE_PI$1;
    startAngle += startAngle >= PI$2 ? -DOUBLE_PI$1 : startAngle < -PI$2 ? DOUBLE_PI$1 : 0;
    var endAngle = startAngle + circumference;
    var startX = Math.cos(startAngle);
    var startY = Math.sin(startAngle);
    var endX = Math.cos(endAngle);
    var endY = Math.sin(endAngle);
    var contains0 = startAngle <= 0 && endAngle >= 0 || endAngle >= DOUBLE_PI$1;
    var contains90 = startAngle <= HALF_PI$1 && endAngle >= HALF_PI$1 || endAngle >= DOUBLE_PI$1 + HALF_PI$1;
    var contains180 = startAngle === -PI$2 || endAngle >= PI$2;
    var contains270 = startAngle <= -HALF_PI$1 && endAngle >= -HALF_PI$1 || endAngle >= PI$2 + HALF_PI$1;
    var minX = contains180 ? -1 : Math.min(startX, startX * cutout, endX, endX * cutout);
    var minY = contains270 ? -1 : Math.min(startY, startY * cutout, endY, endY * cutout);
    var maxX = contains0 ? 1 : Math.max(startX, startX * cutout, endX, endX * cutout);
    var maxY = contains90 ? 1 : Math.max(startY, startY * cutout, endY, endY * cutout);
    ratioX = (maxX - minX) / 2;
    ratioY = (maxY - minY) / 2;
    offsetX = -(maxX + minX) / 2;
    offsetY = -(maxY + minY) / 2;
  }
  return {
    ratioX,
    ratioY,
    offsetX,
    offsetY
  };
}
class DoughnutController extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this.innerRadius = undefined;
    this.outerRadius = undefined;
    this.offsetX = undefined;
    this.offsetY = undefined;
  }
  linkScales() {}
  parse(start, count) {
    var data = this.getDataset().data;
    var meta = this._cachedMeta;
    var i, ilen;
    for (i = start, ilen = start + count; i < ilen; ++i) {
      meta._parsed[i] = +data[i];
    }
  }
  getRingIndex(datasetIndex) {
    var ringIndex = 0;
    for (var j = 0; j < datasetIndex; ++j) {
      if (this.chart.isDatasetVisible(j)) {
        ++ringIndex;
      }
    }
    return ringIndex;
  }
  update(mode) {
    var me = this;
    var chart = me.chart;
    var {
      chartArea,
      options
    } = chart;
    var meta = me._cachedMeta;
    var arcs = meta.data;
    var cutout = options.cutoutPercentage / 100 || 0;
    var chartWeight = me._getRingWeight(me.index);
    var {
      ratioX,
      ratioY,
      offsetX,
      offsetY
    } = getRatioAndOffset(options.rotation, options.circumference, cutout);
    var borderWidth = me.getMaxBorderWidth();
    var maxWidth = (chartArea.right - chartArea.left - borderWidth) / ratioX;
    var maxHeight = (chartArea.bottom - chartArea.top - borderWidth) / ratioY;
    var outerRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
    var innerRadius = Math.max(outerRadius * cutout, 0);
    var radiusLength = (outerRadius - innerRadius) / me._getVisibleDatasetWeightTotal();
    me.offsetX = offsetX * outerRadius;
    me.offsetY = offsetY * outerRadius;
    meta.total = me.calculateTotal();
    me.outerRadius = outerRadius - radiusLength * me._getRingWeightOffset(me.index);
    me.innerRadius = Math.max(me.outerRadius - radiusLength * chartWeight, 0);
    me.updateElements(arcs, 0, mode);
  }
  _circumference(i, reset) {
    var me = this;
    var opts = me.chart.options;
    var meta = me._cachedMeta;
    return reset && opts.animation.animateRotate ? 0 : this.chart.getDataVisibility(i) ? me.calculateCircumference(meta._parsed[i] * opts.circumference / DOUBLE_PI$1) : 0;
  }
  updateElements(arcs, start, mode) {
    var me = this;
    var reset = mode === 'reset';
    var chart = me.chart;
    var chartArea = chart.chartArea;
    var opts = chart.options;
    var animationOpts = opts.animation;
    var centerX = (chartArea.left + chartArea.right) / 2;
    var centerY = (chartArea.top + chartArea.bottom) / 2;
    var animateScale = reset && animationOpts.animateScale;
    var innerRadius = animateScale ? 0 : me.innerRadius;
    var outerRadius = animateScale ? 0 : me.outerRadius;
    var firstOpts = me.resolveDataElementOptions(start, mode);
    var sharedOptions = me.getSharedOptions(mode, arcs[start], firstOpts);
    var includeOptions = me.includeOptions(mode, sharedOptions);
    var startAngle = opts.rotation;
    var i;
    for (i = 0; i < start; ++i) {
      startAngle += me._circumference(i, reset);
    }
    for (i = 0; i < arcs.length; ++i) {
      var index = start + i;
      var circumference = me._circumference(index, reset);
      var arc = arcs[i];
      var properties = {
        x: centerX + me.offsetX,
        y: centerY + me.offsetY,
        startAngle,
        endAngle: startAngle + circumference,
        circumference,
        outerRadius,
        innerRadius
      };
      if (includeOptions) {
        properties.options = me.resolveDataElementOptions(index, mode);
      }
      startAngle += circumference;
      me.updateElement(arc, index, properties, mode);
    }
    me.updateSharedOptions(sharedOptions, mode);
  }
  calculateTotal() {
    var meta = this._cachedMeta;
    var metaData = meta.data;
    var total = 0;
    var i;
    for (i = 0; i < metaData.length; i++) {
      var value = meta._parsed[i];
      if (!isNaN(value) && this.chart.getDataVisibility(i)) {
        total += Math.abs(value);
      }
    }
    return total;
  }
  calculateCircumference(value) {
    var total = this._cachedMeta.total;
    if (total > 0 && !isNaN(value)) {
      return DOUBLE_PI$1 * (Math.abs(value) / total);
    }
    return 0;
  }
  getMaxBorderWidth(arcs) {
    var me = this;
    var max = 0;
    var chart = me.chart;
    var i, ilen, meta, controller, options;
    if (!arcs) {
      for (i = 0, ilen = chart.data.datasets.length; i < ilen; ++i) {
        if (chart.isDatasetVisible(i)) {
          meta = chart.getDatasetMeta(i);
          arcs = meta.data;
          controller = meta.controller;
          if (controller !== me) {
            controller.configure();
          }
          break;
        }
      }
    }
    if (!arcs) {
      return 0;
    }
    for (i = 0, ilen = arcs.length; i < ilen; ++i) {
      options = controller.resolveDataElementOptions(i);
      if (options.borderAlign !== 'inner') {
        max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
      }
    }
    return max;
  }
  _getRingWeightOffset(datasetIndex) {
    var ringWeightOffset = 0;
    for (var i = 0; i < datasetIndex; ++i) {
      if (this.chart.isDatasetVisible(i)) {
        ringWeightOffset += this._getRingWeight(i);
      }
    }
    return ringWeightOffset;
  }
  _getRingWeight(datasetIndex) {
    return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
DoughnutController.prototype.dataElementType = Arc;
DoughnutController.prototype.dataElementOptions = ['backgroundColor', 'borderColor', 'borderWidth', 'borderAlign', 'hoverBackgroundColor', 'hoverBorderColor', 'hoverBorderWidth'];

defaults.set('horizontalBar', {
  hover: {
    mode: 'index',
    axis: 'y'
  },
  scales: {
    x: {
      type: 'linear',
      beginAtZero: true
    },
    y: {
      type: 'category',
      offset: true,
      gridLines: {
        offsetGridLines: true
      }
    }
  },
  datasets: {
    categoryPercentage: 0.8,
    barPercentage: 0.9
  },
  elements: {
    rectangle: {
      borderSkipped: 'left'
    }
  },
  tooltips: {
    mode: 'index',
    axis: 'y'
  }
});
class HorizontalBarController extends BarController {
  getValueScaleId() {
    return this._cachedMeta.xAxisID;
  }
  getIndexScaleId() {
    return this._cachedMeta.yAxisID;
  }
}

defaults.set('line', {
  showLines: true,
  spanGaps: false,
  hover: {
    mode: 'index'
  },
  scales: {
    x: {
      type: 'category'
    },
    y: {
      type: 'linear'
    }
  }
});
class LineController extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this._showLine = false;
  }
  update(mode) {
    var me = this;
    var meta = me._cachedMeta;
    var line = meta.dataset;
    var points = meta.data || [];
    var options = me.chart.options;
    var config = me._config;
    var showLine = me._showLine = valueOrDefault(config.showLine, options.showLines);
    if (showLine && mode !== 'resize') {
      var properties = {
        points,
        options: me.resolveDatasetElementOptions()
      };
      me.updateElement(line, undefined, properties, mode);
    }
    me.updateElements(points, 0, mode);
  }
  updateElements(points, start, mode) {
    var me = this;
    var reset = mode === 'reset';
    var {
      xScale,
      yScale,
      _stacked
    } = me._cachedMeta;
    var firstOpts = me.resolveDataElementOptions(start, mode);
    var sharedOptions = me.getSharedOptions(mode, points[start], firstOpts);
    var includeOptions = me.includeOptions(mode, sharedOptions);
    var spanGaps = valueOrDefault(me._config.spanGaps, me.chart.options.spanGaps);
    var maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
    var prevParsed;
    for (var i = 0; i < points.length; ++i) {
      var index = start + i;
      var point = points[i];
      var parsed = me.getParsed(index);
      var x = xScale.getPixelForValue(parsed.x);
      var y = reset ? yScale.getBasePixel() : yScale.getPixelForValue(_stacked ? me.applyStack(yScale, parsed) : parsed.y);
      var properties = {
        x,
        y,
        skip: isNaN(x) || isNaN(y),
        stop: i > 0 && parsed.x - prevParsed.x > maxGapLength
      };
      if (includeOptions) {
        properties.options = me.resolveDataElementOptions(index, mode);
      }
      me.updateElement(point, index, properties, mode);
      prevParsed = parsed;
    }
    me.updateSharedOptions(sharedOptions, mode);
  }
  resolveDatasetElementOptions(active) {
    var me = this;
    var config = me._config;
    var options = me.chart.options;
    var lineOptions = options.elements.line;
    var values = super.resolveDatasetElementOptions(active);
    values.spanGaps = valueOrDefault(config.spanGaps, options.spanGaps);
    values.tension = valueOrDefault(config.lineTension, lineOptions.tension);
    values.stepped = resolve([config.stepped, lineOptions.stepped]);
    return values;
  }
  getMaxOverflow() {
    var me = this;
    var meta = me._cachedMeta;
    var border = me._showLine && meta.dataset.options.borderWidth || 0;
    var data = meta.data || [];
    if (!data.length) {
      return border;
    }
    var firstPoint = data[0].size();
    var lastPoint = data[data.length - 1].size();
    return Math.max(border, firstPoint, lastPoint) / 2;
  }
  draw() {
    var me = this;
    var ctx = me._ctx;
    var chart = me.chart;
    var meta = me._cachedMeta;
    var points = meta.data || [];
    var area = chart.chartArea;
    var active = [];
    var ilen = points.length;
    var i, point;
    if (me._showLine) {
      meta.dataset.draw(ctx, area);
    }
    for (i = 0; i < ilen; ++i) {
      point = points[i];
      if (point.active) {
        active.push(point);
      } else {
        point.draw(ctx, area);
      }
    }
    for (i = 0, ilen = active.length; i < ilen; ++i) {
      active[i].draw(ctx, area);
    }
  }
}
LineController.prototype.datasetElementType = Line;
LineController.prototype.dataElementType = Point;
LineController.prototype.datasetElementOptions = ['backgroundColor', 'borderCapStyle', 'borderColor', 'borderDash', 'borderDashOffset', 'borderJoinStyle', 'borderWidth', 'capBezierPoints', 'cubicInterpolationMode', 'fill'];
LineController.prototype.dataElementOptions = {
  backgroundColor: 'pointBackgroundColor',
  borderColor: 'pointBorderColor',
  borderWidth: 'pointBorderWidth',
  hitRadius: 'pointHitRadius',
  hoverHitRadius: 'pointHitRadius',
  hoverBackgroundColor: 'pointHoverBackgroundColor',
  hoverBorderColor: 'pointHoverBorderColor',
  hoverBorderWidth: 'pointHoverBorderWidth',
  hoverRadius: 'pointHoverRadius',
  pointStyle: 'pointStyle',
  radius: 'pointRadius',
  rotation: 'pointRotation'
};

defaults.set('polarArea', {
  animation: {
    numbers: {
      type: 'number',
      properties: ['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius']
    },
    animateRotate: true,
    animateScale: true
  },
  scales: {
    r: {
      type: 'radialLinear',
      angleLines: {
        display: false
      },
      beginAtZero: true,
      gridLines: {
        circular: true
      },
      pointLabels: {
        display: false
      }
    }
  },
  startAngle: 0,
  legend: {
    labels: {
      generateLabels(chart) {
        var data = chart.data;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map((label, i) => {
            var meta = chart.getDatasetMeta(0);
            var style = meta.controller.getStyle(i);
            return {
              text: label,
              fillStyle: style.backgroundColor,
              strokeStyle: style.borderColor,
              lineWidth: style.borderWidth,
              hidden: !chart.getDataVisibility(i),
              index: i
            };
          });
        }
        return [];
      }
    },
    onClick(e, legendItem) {
      this.chart.toggleDataVisibility(legendItem.index);
      this.chart.update();
    }
  },
  tooltips: {
    callbacks: {
      title() {
        return '';
      },
      label(item, data) {
        return data.labels[item.index] + ': ' + item.value;
      }
    }
  }
});
function getStartAngleRadians(deg) {
  return toRadians(deg) - 0.5 * Math.PI;
}
class PolarAreaController extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this.innerRadius = undefined;
    this.outerRadius = undefined;
  }
  getIndexScaleId() {
    return this._cachedMeta.rAxisID;
  }
  getValueScaleId() {
    return this._cachedMeta.rAxisID;
  }
  update(mode) {
    var arcs = this._cachedMeta.data;
    this._updateRadius();
    this.updateElements(arcs, 0, mode);
  }
  _updateRadius() {
    var me = this;
    var chart = me.chart;
    var chartArea = chart.chartArea;
    var opts = chart.options;
    var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    var outerRadius = Math.max(minSize / 2, 0);
    var innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
    var radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
    me.outerRadius = outerRadius - radiusLength * me.index;
    me.innerRadius = me.outerRadius - radiusLength;
  }
  updateElements(arcs, start, mode) {
    var me = this;
    var reset = mode === 'reset';
    var chart = me.chart;
    var dataset = me.getDataset();
    var opts = chart.options;
    var animationOpts = opts.animation;
    var scale = chart.scales.r;
    var centerX = scale.xCenter;
    var centerY = scale.yCenter;
    var datasetStartAngle = getStartAngleRadians(opts.startAngle);
    var angle = datasetStartAngle;
    var i;
    me._cachedMeta.count = me.countVisibleElements();
    for (i = 0; i < start; ++i) {
      angle += me._computeAngle(i);
    }
    for (i = 0; i < arcs.length; i++) {
      var arc = arcs[i];
      var index = start + i;
      var startAngle = angle;
      var endAngle = angle + me._computeAngle(index);
      var outerRadius = this.chart.getDataVisibility(index) ? scale.getDistanceFromCenterForValue(dataset.data[index]) : 0;
      angle = endAngle;
      if (reset) {
        if (animationOpts.animateScale) {
          outerRadius = 0;
        }
        if (animationOpts.animateRotate) {
          startAngle = datasetStartAngle;
          endAngle = datasetStartAngle;
        }
      }
      var properties = {
        x: centerX,
        y: centerY,
        innerRadius: 0,
        outerRadius,
        startAngle,
        endAngle,
        options: me.resolveDataElementOptions(index)
      };
      me.updateElement(arc, index, properties, mode);
    }
  }
  countVisibleElements() {
    var dataset = this.getDataset();
    var meta = this._cachedMeta;
    var count = 0;
    meta.data.forEach((element, index) => {
      if (!isNaN(dataset.data[index]) && this.chart.getDataVisibility(index)) {
        count++;
      }
    });
    return count;
  }
  _computeAngle(index) {
    var me = this;
    var meta = me._cachedMeta;
    var count = meta.count;
    var dataset = me.getDataset();
    if (isNaN(dataset.data[index]) || !this.chart.getDataVisibility(index)) {
      return 0;
    }
    var context = {
      chart: me.chart,
      dataIndex: index,
      dataset,
      datasetIndex: me.index
    };
    return resolve([me.chart.options.elements.arc.angle, 2 * Math.PI / count], context, index);
  }
}
PolarAreaController.prototype.dataElementType = Arc;
PolarAreaController.prototype.dataElementOptions = ['backgroundColor', 'borderColor', 'borderWidth', 'borderAlign', 'hoverBackgroundColor', 'hoverBorderColor', 'hoverBorderWidth'];

defaults.set('pie', clone(defaults.doughnut));
defaults.set('pie', {
  cutoutPercentage: 0
});

defaults.set('radar', {
  spanGaps: false,
  scales: {
    r: {
      type: 'radialLinear'
    }
  },
  elements: {
    line: {
      tension: 0
    }
  }
});
class RadarController extends DatasetController {
  getIndexScaleId() {
    return this._cachedMeta.rAxisID;
  }
  getValueScaleId() {
    return this._cachedMeta.rAxisID;
  }
  getLabelAndValue(index) {
    var me = this;
    var vScale = me._cachedMeta.vScale;
    var parsed = me.getParsed(index);
    return {
      label: vScale.getLabels()[index],
      value: '' + vScale.getLabelForValue(parsed[vScale.axis])
    };
  }
  update(mode) {
    var me = this;
    var meta = me._cachedMeta;
    var line = meta.dataset;
    var points = meta.data || [];
    var labels = meta.iScale.getLabels();
    var properties = {
      points,
      _loop: true,
      _fullLoop: labels.length === points.length,
      options: me.resolveDatasetElementOptions()
    };
    me.updateElement(line, undefined, properties, mode);
    me.updateElements(points, 0, mode);
    line.updateControlPoints(me.chart.chartArea);
  }
  updateElements(points, start, mode) {
    var me = this;
    var dataset = me.getDataset();
    var scale = me.chart.scales.r;
    var reset = mode === 'reset';
    var i;
    for (i = 0; i < points.length; i++) {
      var point = points[i];
      var index = start + i;
      var options = me.resolveDataElementOptions(index);
      var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);
      var x = reset ? scale.xCenter : pointPosition.x;
      var y = reset ? scale.yCenter : pointPosition.y;
      var properties = {
        x,
        y,
        angle: pointPosition.angle,
        skip: isNaN(x) || isNaN(y),
        options
      };
      me.updateElement(point, index, properties, mode);
    }
  }
  resolveDatasetElementOptions(active) {
    var me = this;
    var config = me._config;
    var options = me.chart.options;
    var values = super.resolveDatasetElementOptions(active);
    values.spanGaps = valueOrDefault(config.spanGaps, options.spanGaps);
    values.tension = valueOrDefault(config.lineTension, options.elements.line.tension);
    return values;
  }
}
RadarController.prototype.datasetElementType = Line;
RadarController.prototype.dataElementType = Point;
RadarController.prototype.datasetElementOptions = ['backgroundColor', 'borderColor', 'borderCapStyle', 'borderDash', 'borderDashOffset', 'borderJoinStyle', 'borderWidth', 'fill'];
RadarController.prototype.dataElementOptions = {
  backgroundColor: 'pointBackgroundColor',
  borderColor: 'pointBorderColor',
  borderWidth: 'pointBorderWidth',
  hitRadius: 'pointHitRadius',
  hoverBackgroundColor: 'pointHoverBackgroundColor',
  hoverBorderColor: 'pointHoverBorderColor',
  hoverBorderWidth: 'pointHoverBorderWidth',
  hoverRadius: 'pointHoverRadius',
  pointStyle: 'pointStyle',
  radius: 'pointRadius',
  rotation: 'pointRotation'
};

defaults.set('scatter', {
  scales: {
    x: {
      type: 'linear'
    },
    y: {
      type: 'linear'
    }
  },
  datasets: {
    showLine: false
  },
  tooltips: {
    callbacks: {
      title() {
        return '';
      },
      label(item) {
        return '(' + item.label + ', ' + item.value + ')';
      }
    }
  }
});

var controllers = {
  bar: BarController,
  bubble: BubbleController,
  doughnut: DoughnutController,
  horizontalBar: HorizontalBarController,
  line: LineController,
  polarArea: PolarAreaController,
  pie: DoughnutController,
  radar: RadarController,
  scatter: LineController
};

function _lookup(table, value) {
  var hi = table.length - 1;
  var lo = 0;
  var mid;
  while (hi - lo > 1) {
    mid = lo + hi >> 1;
    if (table[mid] < value) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {
    lo,
    hi
  };
}
function _lookupByKey(table, key, value) {
  var hi = table.length - 1;
  var lo = 0;
  var mid;
  while (hi - lo > 1) {
    mid = lo + hi >> 1;
    if (table[mid][key] < value) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {
    lo,
    hi
  };
}
function _rlookupByKey(table, key, value) {
  var hi = table.length - 1;
  var lo = 0;
  var mid;
  while (hi - lo > 1) {
    mid = lo + hi >> 1;
    if (table[mid][key] < value) {
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return {
    lo,
    hi
  };
}
function _filterBetween(values, min, max) {
  var start = 0;
  var end = values.length;
  while (start < end && values[start] < min) {
    start++;
  }
  while (end > start && values[end - 1] > max) {
    end--;
  }
  return start > 0 || end < values.length ? values.slice(start, end) : values;
}

function getRelativePosition$1(e, chart) {
  if ('native' in e) {
    return {
      x: e.x,
      y: e.y
    };
  }
  return helpers.dom.getRelativePosition(e, chart);
}
function evaluateAllVisibleItems(chart, handler) {
  var metasets = chart.getSortedVisibleDatasetMetas();
  var index, data, element;
  for (var i = 0, ilen = metasets.length; i < ilen; ++i) {
    ({
      index,
      data
    } = metasets[i]);
    for (var j = 0, jlen = data.length; j < jlen; ++j) {
      element = data[j];
      if (!element.skip) {
        handler(element, index, j);
      }
    }
  }
}
function binarySearch(metaset, axis, value, intersect) {
  var {
    controller,
    data,
    _sorted
  } = metaset;
  var iScale = controller._cachedMeta.iScale;
  if (iScale && axis === iScale.axis && _sorted && data.length) {
    var lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
    if (!intersect) {
      return lookupMethod(data, axis, value);
    } else if (controller._sharedOptions) {
      var el = data[0];
      var range = typeof el.getRange === 'function' && el.getRange(axis);
      if (range) {
        var start = lookupMethod(data, axis, value - range);
        var end = lookupMethod(data, axis, value + range);
        return {
          lo: start.lo,
          hi: end.hi
        };
      }
    }
  }
  return {
    lo: 0,
    hi: data.length - 1
  };
}
function optimizedEvaluateItems(chart, axis, position, handler, intersect) {
  var metasets = chart.getSortedVisibleDatasetMetas();
  var value = position[axis];
  for (var i = 0, ilen = metasets.length; i < ilen; ++i) {
    var {
      index,
      data
    } = metasets[i];
    var {
      lo,
      hi
    } = binarySearch(metasets[i], axis, value, intersect);
    for (var j = lo; j <= hi; ++j) {
      var element = data[j];
      if (!element.skip) {
        handler(element, index, j);
      }
    }
  }
}
function getDistanceMetricForAxis(axis) {
  var useX = axis.indexOf('x') !== -1;
  var useY = axis.indexOf('y') !== -1;
  return function (pt1, pt2) {
    var deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
    var deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };
}
function getIntersectItems(chart, position, axis, useFinalPosition) {
  var items = [];
  if (!_isPointInArea(position, chart.chartArea)) {
    return items;
  }
  var evaluationFunc = function evaluationFunc(element, datasetIndex, index) {
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  };
  optimizedEvaluateItems(chart, axis, position, evaluationFunc, true);
  return items;
}
function getNearestItems(chart, position, axis, intersect, useFinalPosition) {
  var distanceMetric = getDistanceMetricForAxis(axis);
  var minDistance = Number.POSITIVE_INFINITY;
  var items = [];
  if (!_isPointInArea(position, chart.chartArea)) {
    return items;
  }
  var evaluationFunc = function evaluationFunc(element, datasetIndex, index) {
    if (intersect && !element.inRange(position.x, position.y, useFinalPosition)) {
      return;
    }
    var center = element.getCenterPoint(useFinalPosition);
    var distance = distanceMetric(position, center);
    if (distance < minDistance) {
      items = [{
        element,
        datasetIndex,
        index
      }];
      minDistance = distance;
    } else if (distance === minDistance) {
      items.push({
        element,
        datasetIndex,
        index
      });
    }
  };
  optimizedEvaluateItems(chart, axis, position, evaluationFunc);
  return items;
}
var Interaction = {
  modes: {
    index(chart, e, options, useFinalPosition) {
      var position = getRelativePosition$1(e, chart);
      var axis = options.axis || 'x';
      var items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);
      var elements = [];
      if (!items.length) {
        return [];
      }
      chart.getSortedVisibleDatasetMetas().forEach(meta => {
        var index = items[0].index;
        var element = meta.data[index];
        if (element && !element.skip) {
          elements.push({
            element,
            datasetIndex: meta.index,
            index
          });
        }
      });
      return elements;
    },
    dataset(chart, e, options, useFinalPosition) {
      var position = getRelativePosition$1(e, chart);
      var axis = options.axis || 'xy';
      var items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition) : getNearestItems(chart, position, axis, false, useFinalPosition);
      if (items.length > 0) {
        var datasetIndex = items[0].datasetIndex;
        var data = chart.getDatasetMeta(datasetIndex).data;
        items = [];
        for (var i = 0; i < data.length; ++i) {
          items.push({
            element: data[i],
            datasetIndex,
            index: i
          });
        }
      }
      return items;
    },
    point(chart, e, options, useFinalPosition) {
      var position = getRelativePosition$1(e, chart);
      var axis = options.axis || 'xy';
      return getIntersectItems(chart, position, axis, useFinalPosition);
    },
    nearest(chart, e, options, useFinalPosition) {
      var position = getRelativePosition$1(e, chart);
      var axis = options.axis || 'xy';
      return getNearestItems(chart, position, axis, options.intersect, useFinalPosition);
    },
    x(chart, e, options, useFinalPosition) {
      var position = getRelativePosition$1(e, chart);
      var items = [];
      var intersectsItem = false;
      evaluateAllVisibleItems(chart, (element, datasetIndex, index) => {
        if (element.inXRange(position.x, useFinalPosition)) {
          items.push({
            element,
            datasetIndex,
            index
          });
        }
        if (element.inRange(position.x, position.y, useFinalPosition)) {
          intersectsItem = true;
        }
      });
      if (options.intersect && !intersectsItem) {
        return [];
      }
      return items;
    },
    y(chart, e, options, useFinalPosition) {
      var position = getRelativePosition$1(e, chart);
      var items = [];
      var intersectsItem = false;
      evaluateAllVisibleItems(chart, (element, datasetIndex, index) => {
        if (element.inYRange(position.y, useFinalPosition)) {
          items.push({
            element,
            datasetIndex,
            index
          });
        }
        if (element.inRange(position.x, position.y, useFinalPosition)) {
          intersectsItem = true;
        }
      });
      if (options.intersect && !intersectsItem) {
        return [];
      }
      return items;
    }
  }
};

var STATIC_POSITIONS = ['left', 'top', 'right', 'bottom'];
function filterByPosition(array, position) {
  return array.filter(v => v.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
  return array.filter(v => STATIC_POSITIONS.indexOf(v.pos) === -1 && v.box.axis === axis);
}
function sortByWeight(array, reverse) {
  return array.sort((a, b) => {
    var v0 = reverse ? b : a;
    var v1 = reverse ? a : b;
    return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
  });
}
function wrapBoxes(boxes) {
  var layoutBoxes = [];
  var i, ilen, box;
  for (i = 0, ilen = (boxes || []).length; i < ilen; ++i) {
    box = boxes[i];
    layoutBoxes.push({
      index: i,
      box,
      pos: box.position,
      horizontal: box.isHorizontal(),
      weight: box.weight
    });
  }
  return layoutBoxes;
}
function setLayoutDims(layouts, params) {
  var i, ilen, layout;
  for (i = 0, ilen = layouts.length; i < ilen; ++i) {
    layout = layouts[i];
    layout.width = layout.horizontal ? layout.box.fullWidth && params.availableWidth : params.vBoxMaxWidth;
    layout.height = layout.horizontal && params.hBoxMaxHeight;
  }
}
function buildLayoutBoxes(boxes) {
  var layoutBoxes = wrapBoxes(boxes);
  var left = sortByWeight(filterByPosition(layoutBoxes, 'left'), true);
  var right = sortByWeight(filterByPosition(layoutBoxes, 'right'));
  var top = sortByWeight(filterByPosition(layoutBoxes, 'top'), true);
  var bottom = sortByWeight(filterByPosition(layoutBoxes, 'bottom'));
  var centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, 'x');
  var centerVertical = filterDynamicPositionByAxis(layoutBoxes, 'y');
  return {
    leftAndTop: left.concat(top),
    rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
    chartArea: filterByPosition(layoutBoxes, 'chartArea'),
    vertical: left.concat(right).concat(centerVertical),
    horizontal: top.concat(bottom).concat(centerHorizontal)
  };
}
function getCombinedMax(maxPadding, chartArea, a, b) {
  return Math.max(maxPadding[a], chartArea[a]) + Math.max(maxPadding[b], chartArea[b]);
}
function updateDims(chartArea, params, layout) {
  var box = layout.box;
  var maxPadding = chartArea.maxPadding;
  if (layout.size) {
    chartArea[layout.pos] -= layout.size;
  }
  layout.size = layout.horizontal ? box.height : box.width;
  chartArea[layout.pos] += layout.size;
  if (box.getPadding) {
    var boxPadding = box.getPadding();
    maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
    maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
    maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
    maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
  }
  var newWidth = params.outerWidth - getCombinedMax(maxPadding, chartArea, 'left', 'right');
  var newHeight = params.outerHeight - getCombinedMax(maxPadding, chartArea, 'top', 'bottom');
  if (newWidth !== chartArea.w || newHeight !== chartArea.h) {
    chartArea.w = newWidth;
    chartArea.h = newHeight;
    return layout.horizontal ? newWidth !== chartArea.w : newHeight !== chartArea.h;
  }
}
function handleMaxPadding(chartArea) {
  var maxPadding = chartArea.maxPadding;
  function updatePos(pos) {
    var change = Math.max(maxPadding[pos] - chartArea[pos], 0);
    chartArea[pos] += change;
    return change;
  }
  chartArea.y += updatePos('top');
  chartArea.x += updatePos('left');
  updatePos('right');
  updatePos('bottom');
}
function getMargins(horizontal, chartArea) {
  var maxPadding = chartArea.maxPadding;
  function marginForPositions(positions) {
    var margin = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    positions.forEach(pos => {
      margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
    });
    return margin;
  }
  return horizontal ? marginForPositions(['left', 'right']) : marginForPositions(['top', 'bottom']);
}
function fitBoxes(boxes, chartArea, params) {
  var refitBoxes = [];
  var i, ilen, layout, box, refit, changed;
  for (i = 0, ilen = boxes.length; i < ilen; ++i) {
    layout = boxes[i];
    box = layout.box;
    box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
    if (updateDims(chartArea, params, layout)) {
      changed = true;
      if (refitBoxes.length) {
        refit = true;
      }
    }
    if (!box.fullWidth) {
      refitBoxes.push(layout);
    }
  }
  return refit ? fitBoxes(refitBoxes, chartArea, params) || changed : changed;
}
function placeBoxes(boxes, chartArea, params) {
  var userPadding = params.padding;
  var x = chartArea.x;
  var y = chartArea.y;
  var i, ilen, layout, box;
  for (i = 0, ilen = boxes.length; i < ilen; ++i) {
    layout = boxes[i];
    box = layout.box;
    if (layout.horizontal) {
      box.left = box.fullWidth ? userPadding.left : chartArea.left;
      box.right = box.fullWidth ? params.outerWidth - userPadding.right : chartArea.left + chartArea.w;
      box.top = y;
      box.bottom = y + box.height;
      box.width = box.right - box.left;
      y = box.bottom;
    } else {
      box.left = x;
      box.right = x + box.width;
      box.top = chartArea.top;
      box.bottom = chartArea.top + chartArea.h;
      box.height = box.bottom - box.top;
      x = box.right;
    }
  }
  chartArea.x = x;
  chartArea.y = y;
}
defaults.set('layout', {
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
var layouts = {
  addBox(chart, item) {
    if (!chart.boxes) {
      chart.boxes = [];
    }
    item.fullWidth = item.fullWidth || false;
    item.position = item.position || 'top';
    item.weight = item.weight || 0;
    item._layers = item._layers || function () {
      return [{
        z: 0,
        draw(chartArea) {
          item.draw(chartArea);
        }
      }];
    };
    chart.boxes.push(item);
  },
  removeBox(chart, layoutItem) {
    var index = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
    if (index !== -1) {
      chart.boxes.splice(index, 1);
    }
  },
  configure(chart, item, options) {
    var props = ['fullWidth', 'position', 'weight'];
    var ilen = props.length;
    var i = 0;
    var prop;
    for (; i < ilen; ++i) {
      prop = props[i];
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        item[prop] = options[prop];
      }
    }
  },
  update(chart, width, height) {
    if (!chart) {
      return;
    }
    var layoutOptions = chart.options.layout || {};
    var padding = toPadding(layoutOptions.padding);
    var availableWidth = width - padding.width;
    var availableHeight = height - padding.height;
    var boxes = buildLayoutBoxes(chart.boxes);
    var verticalBoxes = boxes.vertical;
    var horizontalBoxes = boxes.horizontal;
    var params = Object.freeze({
      outerWidth: width,
      outerHeight: height,
      padding,
      availableWidth,
      vBoxMaxWidth: availableWidth / 2 / verticalBoxes.length,
      hBoxMaxHeight: availableHeight / 2
    });
    var chartArea = _extends({
      maxPadding: _extends({}, padding),
      w: availableWidth,
      h: availableHeight,
      x: padding.left,
      y: padding.top
    }, padding);
    setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
    fitBoxes(verticalBoxes, chartArea, params);
    if (fitBoxes(horizontalBoxes, chartArea, params)) {
      fitBoxes(verticalBoxes, chartArea, params);
    }
    handleMaxPadding(chartArea);
    placeBoxes(boxes.leftAndTop, chartArea, params);
    chartArea.x += chartArea.w;
    chartArea.y += chartArea.h;
    placeBoxes(boxes.rightAndBottom, chartArea, params);
    chart.chartArea = {
      left: chartArea.left,
      top: chartArea.top,
      right: chartArea.left + chartArea.w,
      bottom: chartArea.top + chartArea.h,
      height: chartArea.h,
      width: chartArea.w
    };
    each(boxes.chartArea, layout => {
      var box = layout.box;
      _extends(box, chart.chartArea);
      box.update(chartArea.w, chartArea.h);
    });
  }
};

class BasePlatform {
  acquireContext(canvas, options) {}
  releaseContext(context) {
    return false;
  }
  addEventListener(chart, type, listener) {}
  removeEventListener(chart, type, listener) {}
  getDevicePixelRatio() {
    return 1;
  }
}

class BasicPlatform extends BasePlatform {
  acquireContext(item) {
    return item && item.getContext && item.getContext('2d') || null;
  }
}

var EXPANDO_KEY = '$chartjs';
var EVENT_TYPES = {
  touchstart: 'mousedown',
  touchmove: 'mousemove',
  touchend: 'mouseup',
  pointerenter: 'mouseenter',
  pointerdown: 'mousedown',
  pointermove: 'mousemove',
  pointerup: 'mouseup',
  pointerleave: 'mouseout',
  pointerout: 'mouseout'
};
function readUsedSize(element, property) {
  var value = helpers.dom.getStyle(element, property);
  var matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : undefined;
}
function initCanvas(canvas, config) {
  var style = canvas.style;
  var renderHeight = canvas.getAttribute('height');
  var renderWidth = canvas.getAttribute('width');
  canvas[EXPANDO_KEY] = {
    initial: {
      height: renderHeight,
      width: renderWidth,
      style: {
        display: style.display,
        height: style.height,
        width: style.width
      }
    }
  };
  style.display = style.display || 'block';
  style.boxSizing = style.boxSizing || 'border-box';
  if (renderWidth === null || renderWidth === '') {
    var displayWidth = readUsedSize(canvas, 'width');
    if (displayWidth !== undefined) {
      canvas.width = displayWidth;
    }
  }
  if (renderHeight === null || renderHeight === '') {
    if (canvas.style.height === '') {
      canvas.height = canvas.width / (config.options.aspectRatio || 2);
    } else {
      var displayHeight = readUsedSize(canvas, 'height');
      if (displayHeight !== undefined) {
        canvas.height = displayHeight;
      }
    }
  }
  return canvas;
}
var supportsEventListenerOptions = function () {
  var passiveSupported = false;
  try {
    var options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (e) {
  }
  return passiveSupported;
}();
var eventListenerOptions = supportsEventListenerOptions ? {
  passive: true
} : false;
function addListener(node, type, listener) {
  node.addEventListener(type, listener, eventListenerOptions);
}
function removeListener(node, type, listener) {
  node.removeEventListener(type, listener, eventListenerOptions);
}
function createEvent(type, chart, x, y, nativeEvent) {
  return {
    type,
    chart,
    native: nativeEvent || null,
    x: x !== undefined ? x : null,
    y: y !== undefined ? y : null
  };
}
function fromNativeEvent(event, chart) {
  var type = EVENT_TYPES[event.type] || event.type;
  var pos = helpers.dom.getRelativePosition(event, chart);
  return createEvent(type, chart, pos.x, pos.y, event);
}
function throttled(fn, thisArg) {
  var ticking = false;
  var args = [];
  return function () {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }
    args = Array.prototype.slice.call(rest);
    if (!ticking) {
      ticking = true;
      helpers.requestAnimFrame.call(window, () => {
        ticking = false;
        fn.apply(thisArg, args);
      });
    }
  };
}
function watchForResize(element, fn) {
  var resize = throttled((width, height) => {
    var w = element.clientWidth;
    fn(width, height);
    if (w < element.clientWidth) {
      fn();
    }
  }, window);
  var observer = new ResizeObserver(entries => {
    var entry = entries[0];
    resize(entry.contentRect.width, entry.contentRect.height);
  });
  observer.observe(element);
  return observer;
}
function watchForAttachment(element, fn) {
  var observer = new MutationObserver(entries => {
    var parent = _getParentNode(element);
    entries.forEach(entry => {
      for (var i = 0; i < entry.addedNodes.length; i++) {
        var added = entry.addedNodes[i];
        if (added === element || added === parent) {
          fn(entry.target);
        }
      }
    });
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
function watchForDetachment(element, fn) {
  var parent = _getParentNode(element);
  if (!parent) {
    return;
  }
  var observer = new MutationObserver(entries => {
    entries.forEach(entry => {
      for (var i = 0; i < entry.removedNodes.length; i++) {
        if (entry.removedNodes[i] === element) {
          fn();
          break;
        }
      }
    });
  });
  observer.observe(parent, {
    childList: true
  });
  return observer;
}
function removeObserver(proxies, type) {
  var observer = proxies[type];
  if (observer) {
    observer.disconnect();
    proxies[type] = undefined;
  }
}
function unlistenForResize(proxies) {
  removeObserver(proxies, 'attach');
  removeObserver(proxies, 'detach');
  removeObserver(proxies, 'resize');
}
function listenForResize(canvas, proxies, listener) {
  var detached = () => listenForResize(canvas, proxies, listener);
  unlistenForResize(proxies);
  var container = _getParentNode(canvas);
  if (container) {
    proxies.resize = watchForResize(container, listener);
    proxies.detach = watchForDetachment(canvas, detached);
  } else {
    proxies.attach = watchForAttachment(canvas, () => {
      removeObserver(proxies, 'attach');
      var parent = _getParentNode(canvas);
      proxies.resize = watchForResize(parent, listener);
      proxies.detach = watchForDetachment(canvas, detached);
    });
  }
}
class DomPlatform extends BasePlatform {
  acquireContext(canvas, config) {
    var context = canvas && canvas.getContext && canvas.getContext('2d');
    if (context && context.canvas === canvas) {
      initCanvas(canvas, config);
      return context;
    }
    return null;
  }
  releaseContext(context) {
    var canvas = context.canvas;
    if (!canvas[EXPANDO_KEY]) {
      return false;
    }
    var initial = canvas[EXPANDO_KEY].initial;
    ['height', 'width'].forEach(prop => {
      var value = initial[prop];
      if (helpers.isNullOrUndef(value)) {
        canvas.removeAttribute(prop);
      } else {
        canvas.setAttribute(prop, value);
      }
    });
    var style = initial.style || {};
    Object.keys(style).forEach(key => {
      canvas.style[key] = style[key];
    });
    canvas.width = canvas.width;
    delete canvas[EXPANDO_KEY];
    return true;
  }
  addEventListener(chart, type, listener) {
    this.removeEventListener(chart, type);
    var canvas = chart.canvas;
    var proxies = chart.$proxies || (chart.$proxies = {});
    if (type === 'resize') {
      return listenForResize(canvas, proxies, listener);
    }
    var proxy = proxies[type] = throttled(event => {
      listener(fromNativeEvent(event, chart));
    }, chart);
    addListener(canvas, type, proxy);
  }
  removeEventListener(chart, type) {
    var canvas = chart.canvas;
    var proxies = chart.$proxies || (chart.$proxies = {});
    if (type === 'resize') {
      return unlistenForResize(proxies);
    }
    var proxy = proxies[type];
    if (!proxy) {
      return;
    }
    removeListener(canvas, type, proxy);
    proxies[type] = undefined;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
}

var platforms = {
  BasicPlatform,
  DomPlatform,
  BasePlatform
};

defaults.set('plugins', {});
class PluginService {
  constructor() {
    this._plugins = [];
    this._cacheId = 0;
  }
  register(plugins) {
    var p = this._plugins;
    [].concat(plugins).forEach(plugin => {
      if (p.indexOf(plugin) === -1) {
        p.push(plugin);
      }
    });
    this._cacheId++;
  }
  unregister(plugins) {
    var p = this._plugins;
    [].concat(plugins).forEach(plugin => {
      var idx = p.indexOf(plugin);
      if (idx !== -1) {
        p.splice(idx, 1);
      }
    });
    this._cacheId++;
  }
  clear() {
    this._plugins = [];
    this._cacheId++;
  }
  count() {
    return this._plugins.length;
  }
  getAll() {
    return this._plugins;
  }
  notify(chart, hook, args) {
    var descriptors = this._descriptors(chart);
    var ilen = descriptors.length;
    var i, descriptor, plugin, params, method;
    for (i = 0; i < ilen; ++i) {
      descriptor = descriptors[i];
      plugin = descriptor.plugin;
      method = plugin[hook];
      if (typeof method === 'function') {
        params = [chart].concat(args || []);
        params.push(descriptor.options);
        if (method.apply(plugin, params) === false) {
          return false;
        }
      }
    }
    return true;
  }
  _descriptors(chart) {
    var cache = chart.$plugins || (chart.$plugins = {});
    if (cache.id === this._cacheId) {
      return cache.descriptors;
    }
    var plugins = [];
    var descriptors = [];
    var config = chart && chart.config || {};
    var options = config.options && config.options.plugins || {};
    this._plugins.concat(config.plugins || []).forEach(plugin => {
      var idx = plugins.indexOf(plugin);
      if (idx !== -1) {
        return;
      }
      var id = plugin.id;
      var opts = options[id];
      if (opts === false) {
        return;
      }
      if (opts === true) {
        opts = clone(defaults.plugins[id]);
      }
      plugins.push(plugin);
      descriptors.push({
        plugin,
        options: opts || {}
      });
    });
    cache.descriptors = descriptors;
    cache.id = this._cacheId;
    return descriptors;
  }
  invalidate(chart) {
    delete chart.$plugins;
  }
}
var pluginsCore = new PluginService();

var scaleService = {
  constructors: {},
  defaults: {},
  registerScale(scaleConstructor) {
    var me = this;
    var type = scaleConstructor.id;
    me.constructors[type] = scaleConstructor;
    me.defaults[type] = clone(scaleConstructor.defaults);
  },
  getScaleConstructor(type) {
    return Object.prototype.hasOwnProperty.call(this.constructors, type) ? this.constructors[type] : undefined;
  },
  getScaleDefaults(type) {
    return Object.prototype.hasOwnProperty.call(this.defaults, type) ? merge({}, [defaults.scale, this.defaults[type]]) : {};
  },
  updateScaleDefaults(type, additions) {
    var me = this;
    if (Object.prototype.hasOwnProperty.call(me.defaults, type)) {
      me.defaults[type] = _extends(me.defaults[type], additions);
    }
  },
  addScalesToLayout(chart) {
    each(chart.scales, scale => {
      scale.fullWidth = scale.options.fullWidth;
      scale.position = scale.options.position;
      scale.weight = scale.options.weight;
      layouts.addBox(chart, scale);
    });
  }
};

var version = "3.0.0-alpha";

var valueOrDefault$1 = helpers.valueOrDefault;
function mergeScaleConfig(config, options) {
  options = options || {};
  var chartDefaults = defaults[config.type] || {
    scales: {}
  };
  var configScales = options.scales || {};
  var firstIDs = {};
  var scales = {};
  Object.keys(configScales).forEach(id => {
    var axis = id[0];
    firstIDs[axis] = firstIDs[axis] || id;
    scales[id] = helpers.mergeIf({}, [configScales[id], chartDefaults.scales[axis]]);
  });
  if (options.scale) {
    scales[options.scale.id || 'r'] = helpers.mergeIf({}, [options.scale, chartDefaults.scales.r]);
    firstIDs.r = firstIDs.r || options.scale.id || 'r';
  }
  config.data.datasets.forEach(dataset => {
    var datasetDefaults = defaults[dataset.type || config.type] || {
      scales: {}
    };
    var defaultScaleOptions = datasetDefaults.scales || {};
    Object.keys(defaultScaleOptions).forEach(defaultID => {
      var id = dataset[defaultID + 'AxisID'] || firstIDs[defaultID] || defaultID;
      scales[id] = scales[id] || {};
      helpers.mergeIf(scales[id], [configScales[id], defaultScaleOptions[defaultID]]);
    });
  });
  Object.keys(scales).forEach(key => {
    var scale = scales[key];
    helpers.mergeIf(scale, scaleService.getScaleDefaults(scale.type));
  });
  return scales;
}
function mergeConfig()
{
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return helpers.merge({}, args, {
    merger(key, target, source, options) {
      if (key !== 'scales' && key !== 'scale') {
        helpers._merger(key, target, source, options);
      }
    }
  });
}
function initConfig(config) {
  config = config || {};
  var data = config.data = config.data || {
    datasets: [],
    labels: []
  };
  data.datasets = data.datasets || [];
  data.labels = data.labels || [];
  var scaleConfig = mergeScaleConfig(config, config.options);
  config.options = mergeConfig(defaults, defaults[config.type], config.options || {});
  config.options.scales = scaleConfig;
  return config;
}
function isAnimationDisabled(config) {
  return !config.animation;
}
function updateConfig(chart) {
  var newOptions = chart.options;
  helpers.each(chart.scales, scale => {
    layouts.removeBox(chart, scale);
  });
  var scaleConfig = mergeScaleConfig(chart.config, newOptions);
  newOptions = mergeConfig(defaults, defaults[chart.config.type], newOptions);
  chart.options = chart.config.options = newOptions;
  chart.options.scales = scaleConfig;
  chart._animationsDisabled = isAnimationDisabled(newOptions);
  chart.ensureScalesHaveIDs();
  chart.buildOrUpdateScales();
}
var KNOWN_POSITIONS = new Set(['top', 'bottom', 'left', 'right', 'chartArea']);
function positionIsHorizontal(position, axis) {
  return position === 'top' || position === 'bottom' || !KNOWN_POSITIONS.has(position) && axis === 'x';
}
function compare2Level(l1, l2) {
  return function (a, b) {
    return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
  };
}
function onAnimationsComplete(ctx) {
  var chart = ctx.chart;
  var animationOptions = chart.options.animation;
  pluginsCore.notify(chart, 'afterRender');
  helpers.callback(animationOptions && animationOptions.onComplete, [ctx], chart);
}
function onAnimationProgress(ctx) {
  var chart = ctx.chart;
  var animationOptions = chart.options.animation;
  helpers.callback(animationOptions && animationOptions.onProgress, [ctx], chart);
}
function isDomSupported() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
function getCanvas(item) {
  if (isDomSupported() && typeof item === 'string') {
    item = document.getElementById(item);
  } else if (item.length) {
    item = item[0];
  }
  if (item && item.canvas) {
    item = item.canvas;
  }
  return item;
}
class Chart {
  constructor(item, config) {
    var me = this;
    config = initConfig(config);
    var initialCanvas = getCanvas(item);
    this.platform = me._initializePlatform(initialCanvas, config);
    var context = me.platform.acquireContext(initialCanvas, config);
    var canvas = context && context.canvas;
    var height = canvas && canvas.height;
    var width = canvas && canvas.width;
    this.id = helpers.uid();
    this.ctx = context;
    this.canvas = canvas;
    this.config = config;
    this.width = width;
    this.height = height;
    this.aspectRatio = height ? width / height : null;
    this.options = config.options;
    this._bufferedRender = false;
    this._layers = [];
    this._metasets = [];
    this.boxes = [];
    this.currentDevicePixelRatio = undefined;
    this.chartArea = undefined;
    this.data = undefined;
    this.active = undefined;
    this.lastActive = [];
    this._lastEvent = undefined;
    this._listeners = {};
    this._sortedMetasets = [];
    this._updating = false;
    this.scales = {};
    this.scale = undefined;
    this.$plugins = undefined;
    this.$proxies = {};
    this._hiddenIndices = {};
    Chart.instances[me.id] = me;
    Object.defineProperty(me, 'data', {
      get() {
        return me.config.data;
      },
      set(value) {
        me.config.data = value;
      }
    });
    if (!context || !canvas) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Animator$1.listen(me, 'complete', onAnimationsComplete);
    Animator$1.listen(me, 'progress', onAnimationProgress);
    me._initialize();
    me.update();
  }
  _initialize() {
    var me = this;
    pluginsCore.notify(me, 'beforeInit');
    if (me.options.responsive) {
      me.resize(true);
    } else {
      helpers.dom.retinaScale(me, me.options.devicePixelRatio);
    }
    me.bindEvents();
    pluginsCore.notify(me, 'afterInit');
    return me;
  }
  _initializePlatform(canvas, config) {
    if (config.platform) {
      return new config.platform();
    } else if (!isDomSupported() || typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas) {
      return new BasicPlatform();
    }
    return new DomPlatform();
  }
  clear() {
    helpers.canvas.clear(this);
    return this;
  }
  stop() {
    Animator$1.stop(this);
    return this;
  }
  resize(silent, width, height) {
    var me = this;
    var options = me.options;
    var canvas = me.canvas;
    var aspectRatio = options.maintainAspectRatio && me.aspectRatio;
    if (width === undefined || height === undefined) {
      width = getMaximumWidth(canvas);
      height = getMaximumHeight(canvas);
    }
    var newWidth = Math.max(0, Math.floor(width));
    var newHeight = Math.max(0, Math.floor(aspectRatio ? newWidth / aspectRatio : height));
    var oldRatio = me.currentDevicePixelRatio;
    var newRatio = options.devicePixelRatio || me.platform.getDevicePixelRatio();
    if (me.width === newWidth && me.height === newHeight && oldRatio === newRatio) {
      return;
    }
    canvas.width = me.width = newWidth;
    canvas.height = me.height = newHeight;
    if (canvas.style) {
      canvas.style.width = newWidth + 'px';
      canvas.style.height = newHeight + 'px';
    }
    helpers.dom.retinaScale(me, newRatio);
    if (!silent) {
      var newSize = {
        width: newWidth,
        height: newHeight
      };
      pluginsCore.notify(me, 'resize', [newSize]);
      if (options.onResize) {
        options.onResize(me, newSize);
      }
      me.update('resize');
    }
  }
  ensureScalesHaveIDs() {
    var options = this.options;
    var scalesOptions = options.scales || {};
    var scaleOptions = options.scale;
    helpers.each(scalesOptions, (axisOptions, axisID) => {
      axisOptions.id = axisID;
    });
    if (scaleOptions) {
      scaleOptions.id = scaleOptions.id || 'scale';
    }
  }
  buildOrUpdateScales() {
    var me = this;
    var options = me.options;
    var scaleOpts = options.scales;
    var scales = me.scales || {};
    var updated = Object.keys(scales).reduce((obj, id) => {
      obj[id] = false;
      return obj;
    }, {});
    var items = [];
    if (scaleOpts) {
      items = items.concat(Object.keys(scaleOpts).map(axisID => {
        var axisOptions = scaleOpts[axisID];
        var isRadial = axisID.charAt(0).toLowerCase() === 'r';
        var isHorizontal = axisID.charAt(0).toLowerCase() === 'x';
        return {
          options: axisOptions,
          dposition: isRadial ? 'chartArea' : isHorizontal ? 'bottom' : 'left',
          dtype: isRadial ? 'radialLinear' : isHorizontal ? 'category' : 'linear'
        };
      }));
    }
    helpers.each(items, item => {
      var scaleOptions = item.options;
      var id = scaleOptions.id;
      var scaleType = valueOrDefault$1(scaleOptions.type, item.dtype);
      if (scaleOptions.position === undefined || positionIsHorizontal(scaleOptions.position, scaleOptions.axis || id[0]) !== positionIsHorizontal(item.dposition)) {
        scaleOptions.position = item.dposition;
      }
      updated[id] = true;
      var scale = null;
      if (id in scales && scales[id].type === scaleType) {
        scale = scales[id];
        scale.options = scaleOptions;
        scale.ctx = me.ctx;
        scale.chart = me;
      } else {
        var scaleClass = scaleService.getScaleConstructor(scaleType);
        if (!scaleClass) {
          return;
        }
        scale = new scaleClass({
          id,
          type: scaleType,
          options: scaleOptions,
          ctx: me.ctx,
          chart: me
        });
        scales[scale.id] = scale;
      }
      scale.axis = scale.options.position === 'chartArea' ? 'r' : scale.isHorizontal() ? 'x' : 'y';
      scale._userMin = scale.parse(scale.options.min);
      scale._userMax = scale.parse(scale.options.max);
      if (item.isDefault) {
        me.scale = scale;
      }
    });
    helpers.each(updated, (hasUpdated, id) => {
      if (!hasUpdated) {
        delete scales[id];
      }
    });
    me.scales = scales;
    scaleService.addScalesToLayout(this);
  }
  _updateMetasetIndex(meta, index) {
    var metasets = this._metasets;
    var oldIndex = meta.index;
    if (oldIndex !== index) {
      metasets[oldIndex] = metasets[index];
      metasets[index] = meta;
      meta.index = index;
    }
  }
  _updateMetasets() {
    var me = this;
    var metasets = me._metasets;
    var numData = me.data.datasets.length;
    var numMeta = metasets.length;
    if (numMeta > numData) {
      for (var i = numData; i < numMeta; ++i) {
        me._destroyDatasetMeta(i);
      }
      metasets.splice(numData, numMeta - numData);
    }
    me._sortedMetasets = metasets.slice(0).sort(compare2Level('order', 'index'));
  }
  buildOrUpdateControllers() {
    var me = this;
    var newControllers = [];
    var datasets = me.data.datasets;
    var i, ilen;
    for (i = 0, ilen = datasets.length; i < ilen; i++) {
      var dataset = datasets[i];
      var meta = me.getDatasetMeta(i);
      var type = dataset.type || me.config.type;
      if (meta.type && meta.type !== type) {
        me._destroyDatasetMeta(i);
        meta = me.getDatasetMeta(i);
      }
      meta.type = type;
      meta.order = dataset.order || 0;
      me._updateMetasetIndex(meta, i);
      meta.label = '' + dataset.label;
      meta.visible = me.isDatasetVisible(i);
      if (meta.controller) {
        meta.controller.updateIndex(i);
        meta.controller.linkScales();
      } else {
        var ControllerClass = controllers[meta.type];
        if (ControllerClass === undefined) {
          throw new Error('"' + meta.type + '" is not a chart type.');
        }
        meta.controller = new ControllerClass(me, i);
        newControllers.push(meta.controller);
      }
    }
    me._updateMetasets();
    return newControllers;
  }
  _resetElements() {
    var me = this;
    helpers.each(me.data.datasets, (dataset, datasetIndex) => {
      me.getDatasetMeta(datasetIndex).controller.reset();
    }, me);
  }
  reset() {
    this._resetElements();
    pluginsCore.notify(this, 'reset');
  }
  update(mode) {
    var me = this;
    var i, ilen;
    me._updating = true;
    updateConfig(me);
    pluginsCore.invalidate(me);
    if (pluginsCore.notify(me, 'beforeUpdate') === false) {
      return;
    }
    var newControllers = me.buildOrUpdateControllers();
    for (i = 0, ilen = me.data.datasets.length; i < ilen; i++) {
      me.getDatasetMeta(i).controller.buildOrUpdateElements();
    }
    me._updateLayout();
    if (me.options.animation) {
      helpers.each(newControllers, controller => {
        controller.reset();
      });
    }
    me._updateDatasets(mode);
    pluginsCore.notify(me, 'afterUpdate');
    me._layers.sort(compare2Level('z', '_idx'));
    if (me._lastEvent) {
      me._eventHandler(me._lastEvent, true);
    }
    me.render();
    me._updating = false;
  }
  _updateLayout() {
    var me = this;
    if (pluginsCore.notify(me, 'beforeLayout') === false) {
      return;
    }
    layouts.update(me, me.width, me.height);
    me._layers = [];
    helpers.each(me.boxes, box => {
      if (box.configure) {
        box.configure();
      }
      me._layers.push(...box._layers());
    }, me);
    me._layers.forEach((item, index) => {
      item._idx = index;
    });
    pluginsCore.notify(me, 'afterLayout');
  }
  _updateDatasets(mode) {
    var me = this;
    var isFunction = typeof mode === 'function';
    if (pluginsCore.notify(me, 'beforeDatasetsUpdate') === false) {
      return;
    }
    for (var i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
      me._updateDataset(i, isFunction ? mode({
        datasetIndex: i
      }) : mode);
    }
    pluginsCore.notify(me, 'afterDatasetsUpdate');
  }
  _updateDataset(index, mode) {
    var me = this;
    var meta = me.getDatasetMeta(index);
    var args = {
      meta,
      index,
      mode
    };
    if (pluginsCore.notify(me, 'beforeDatasetUpdate', [args]) === false) {
      return;
    }
    meta.controller._update(mode);
    pluginsCore.notify(me, 'afterDatasetUpdate', [args]);
  }
  render() {
    var me = this;
    var animationOptions = me.options.animation;
    if (pluginsCore.notify(me, 'beforeRender') === false) {
      return;
    }
    var onComplete = function onComplete() {
      pluginsCore.notify(me, 'afterRender');
      helpers.callback(animationOptions && animationOptions.onComplete, [], me);
    };
    if (Animator$1.has(me)) {
      if (!Animator$1.running(me)) {
        Animator$1.start(me);
      }
    } else {
      me.draw();
      onComplete();
    }
  }
  draw() {
    var me = this;
    var i;
    me.clear();
    if (me.width <= 0 || me.height <= 0) {
      return;
    }
    if (pluginsCore.notify(me, 'beforeDraw') === false) {
      return;
    }
    var layers = me._layers;
    for (i = 0; i < layers.length && layers[i].z <= 0; ++i) {
      layers[i].draw(me.chartArea);
    }
    me._drawDatasets();
    for (; i < layers.length; ++i) {
      layers[i].draw(me.chartArea);
    }
    pluginsCore.notify(me, 'afterDraw');
  }
  _getSortedDatasetMetas(filterVisible) {
    var me = this;
    var metasets = me._sortedMetasets;
    var result = [];
    var i, ilen;
    for (i = 0, ilen = metasets.length; i < ilen; ++i) {
      var meta = metasets[i];
      if (!filterVisible || meta.visible) {
        result.push(meta);
      }
    }
    return result;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(true);
  }
  _drawDatasets() {
    var me = this;
    if (pluginsCore.notify(me, 'beforeDatasetsDraw') === false) {
      return;
    }
    var metasets = me.getSortedVisibleDatasetMetas();
    for (var i = metasets.length - 1; i >= 0; --i) {
      me._drawDataset(metasets[i]);
    }
    pluginsCore.notify(me, 'afterDatasetsDraw');
  }
  _drawDataset(meta) {
    var me = this;
    var ctx = me.ctx;
    var clip = meta._clip;
    var area = me.chartArea;
    var args = {
      meta,
      index: meta.index
    };
    if (pluginsCore.notify(me, 'beforeDatasetDraw', [args]) === false) {
      return;
    }
    helpers.canvas.clipArea(ctx, {
      left: clip.left === false ? 0 : area.left - clip.left,
      right: clip.right === false ? me.width : area.right + clip.right,
      top: clip.top === false ? 0 : area.top - clip.top,
      bottom: clip.bottom === false ? me.height : area.bottom + clip.bottom
    });
    meta.controller.draw();
    helpers.canvas.unclipArea(ctx);
    pluginsCore.notify(me, 'afterDatasetDraw', [args]);
  }
  getElementAtEvent(e) {
    return Interaction.modes.nearest(this, e, {
      intersect: true
    });
  }
  getElementsAtEvent(e) {
    return Interaction.modes.index(this, e, {
      intersect: true
    });
  }
  getElementsAtXAxis(e) {
    return Interaction.modes.index(this, e, {
      intersect: false
    });
  }
  getElementsAtEventForMode(e, mode, options, useFinalPosition) {
    var method = Interaction.modes[mode];
    if (typeof method === 'function') {
      return method(this, e, options, useFinalPosition);
    }
    return [];
  }
  getDatasetAtEvent(e) {
    return Interaction.modes.dataset(this, e, {
      intersect: true
    });
  }
  getDatasetMeta(datasetIndex) {
    var me = this;
    var dataset = me.data.datasets[datasetIndex];
    var metasets = me._metasets;
    var meta = metasets.filter(x => x._dataset === dataset).pop();
    if (!meta) {
      meta = metasets[datasetIndex] = {
        type: null,
        data: [],
        dataset: null,
        controller: null,
        hidden: null,
        xAxisID: null,
        yAxisID: null,
        order: dataset.order || 0,
        index: datasetIndex,
        _dataset: dataset,
        _parsed: [],
        _sorted: false
      };
    }
    return meta;
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(datasetIndex) {
    var meta = this.getDatasetMeta(datasetIndex);
    return typeof meta.hidden === 'boolean' ? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
  }
  setDatasetVisibility(datasetIndex, visible) {
    var meta = this.getDatasetMeta(datasetIndex);
    meta.hidden = !visible;
  }
  toggleDataVisibility(index) {
    this._hiddenIndices[index] = !this._hiddenIndices[index];
  }
  getDataVisibility(index) {
    return !this._hiddenIndices[index];
  }
  _updateDatasetVisibility(datasetIndex, visible) {
    var me = this;
    var mode = visible ? 'show' : 'hide';
    var meta = me.getDatasetMeta(datasetIndex);
    var anims = meta.controller._resolveAnimations(undefined, mode);
    me.setDatasetVisibility(datasetIndex, visible);
    anims.update(meta, {
      visible
    });
    me.update(ctx => ctx.datasetIndex === datasetIndex ? mode : undefined);
  }
  hide(datasetIndex) {
    this._updateDatasetVisibility(datasetIndex, false);
  }
  show(datasetIndex) {
    this._updateDatasetVisibility(datasetIndex, true);
  }
  _destroyDatasetMeta(datasetIndex) {
    var me = this;
    var meta = me._metasets && me._metasets[datasetIndex];
    if (meta) {
      meta.controller._destroy();
      delete me._metasets[datasetIndex];
    }
  }
  destroy() {
    var me = this;
    var canvas = me.canvas;
    var i, ilen;
    me.stop();
    Animator$1.remove(me);
    for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
      me._destroyDatasetMeta(i);
    }
    if (canvas) {
      me.unbindEvents();
      helpers.canvas.clear(me);
      me.platform.releaseContext(me.ctx);
      me.canvas = null;
      me.ctx = null;
    }
    pluginsCore.notify(me, 'destroy');
    delete Chart.instances[me.id];
  }
  toBase64Image() {
    return this.canvas.toDataURL(...arguments);
  }
  bindEvents() {
    var me = this;
    var listeners = me._listeners;
    var listener = function listener(e) {
      me._eventHandler(e);
    };
    helpers.each(me.options.events, type => {
      me.platform.addEventListener(me, type, listener);
      listeners[type] = listener;
    });
    if (me.options.responsive) {
      listener = function listener(width, height) {
        if (me.canvas) {
          me.resize(false, width, height);
        }
      };
      me.platform.addEventListener(me, 'resize', listener);
      listeners.resize = listener;
    }
  }
  unbindEvents() {
    var me = this;
    var listeners = me._listeners;
    if (!listeners) {
      return;
    }
    delete me._listeners;
    helpers.each(listeners, (listener, type) => {
      me.platform.removeEventListener(me, type, listener);
    });
  }
  updateHoverStyle(items, mode, enabled) {
    var prefix = enabled ? 'set' : 'remove';
    var meta, item, i, ilen;
    if (mode === 'dataset') {
      meta = this.getDatasetMeta(items[0].datasetIndex);
      meta.controller['_' + prefix + 'DatasetHoverStyle']();
    }
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      item = items[i];
      if (item) {
        this.getDatasetMeta(item.datasetIndex).controller[prefix + 'HoverStyle'](item.element, item.datasetIndex, item.index);
      }
    }
  }
  _updateHoverStyles() {
    var me = this;
    var options = me.options || {};
    var hoverOptions = options.hover;
    if (me.lastActive.length) {
      me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
    }
    if (me.active.length && hoverOptions.mode) {
      me.updateHoverStyle(me.active, hoverOptions.mode, true);
    }
  }
  _eventHandler(e, replay) {
    var me = this;
    if (pluginsCore.notify(me, 'beforeEvent', [e, replay]) === false) {
      return;
    }
    me._handleEvent(e, replay);
    pluginsCore.notify(me, 'afterEvent', [e, replay]);
    me.render();
    return me;
  }
  _handleEvent(e, replay) {
    var me = this;
    var options = me.options;
    var hoverOptions = options.hover;
    var useFinalPosition = replay;
    var changed = false;
    if (e.type === 'mouseout') {
      me.active = [];
      me._lastEvent = null;
    } else {
      me.active = me.getElementsAtEventForMode(e, hoverOptions.mode, hoverOptions, useFinalPosition);
      me._lastEvent = e.type === 'click' ? me._lastEvent : e;
    }
    helpers.callback(options.onHover || options.hover.onHover, [e.native, me.active], me);
    if (e.type === 'mouseup' || e.type === 'click') {
      if (options.onClick && helpers.canvas._isPointInArea(e, me.chartArea)) {
        options.onClick.call(me, e.native, me.active);
      }
    }
    changed = !helpers._elementsEqual(me.active, me.lastActive);
    if (changed || replay) {
      me._updateHoverStyles();
    }
    me.lastActive = me.active;
    return changed;
  }
}
_defineProperty(Chart, "version", version);
_defineProperty(Chart, "instances", {});

function abstract() {
  throw new Error('This method is not implemented: either no adapter can be found or an incomplete integration was provided.');
}
class DateAdapter {
  constructor(options) {
    this.options = options || {};
  }
  formats() {
    return abstract();
  }
  parse(value, format) {
    return abstract();
  }
  format(timestamp, format) {
    return abstract();
  }
  add(timestamp, amount, unit) {
    return abstract();
  }
  diff(a, b, unit) {
    return abstract();
  }
  startOf(timestamp, unit, weekday) {
    return abstract();
  }
  endOf(timestamp, unit) {
    return abstract();
  }
}
DateAdapter.override = function (members) {
  _extends(DateAdapter.prototype, members);
};
var _adapters = {
  _date: DateAdapter
};

var formatters = {
  values(value) {
    return isArray(value) ? value : '' + value;
  },
  numeric(tickValue, index, ticks) {
    if (tickValue === 0) {
      return '0';
    }
    var delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
    if (Math.abs(delta) > 1 && tickValue !== Math.floor(tickValue)) {
      delta = tickValue - Math.floor(tickValue);
    }
    var logDelta = log10(Math.abs(delta));
    var maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
    var minTick = Math.min(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
    var locale = this.chart.options.locale;
    if (maxTick < 1e-4 || minTick > 1e+7) {
      var logTick = log10(Math.abs(tickValue));
      var numExponential = Math.floor(logTick) - Math.floor(logDelta);
      numExponential = Math.max(Math.min(numExponential, 20), 0);
      return tickValue.toExponential(numExponential);
    }
    var numDecimal = -1 * Math.floor(logDelta);
    numDecimal = Math.max(Math.min(numDecimal, 20), 0);
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: numDecimal,
      maximumFractionDigits: numDecimal
    }).format(tickValue);
  }
};
formatters.logarithmic = function (tickValue, index, ticks) {
  if (tickValue === 0) {
    return '0';
  }
  var remain = tickValue / Math.pow(10, Math.floor(log10(tickValue)));
  if (remain === 1 || remain === 2 || remain === 5) {
    return formatters.numeric.call(this, tickValue, index, ticks);
  }
  return '';
};
var Ticks = {
  formatters
};

defaults.set('scale', {
  display: true,
  offset: false,
  reverse: false,
  beginAtZero: false,
  gridLines: {
    display: true,
    color: 'rgba(0,0,0,0.1)',
    lineWidth: 1,
    drawBorder: true,
    drawOnChartArea: true,
    drawTicks: true,
    tickMarkLength: 10,
    offsetGridLines: false,
    borderDash: [],
    borderDashOffset: 0.0
  },
  scaleLabel: {
    display: false,
    labelString: '',
    padding: {
      top: 4,
      bottom: 4
    }
  },
  ticks: {
    minRotation: 0,
    maxRotation: 50,
    mirror: false,
    lineWidth: 0,
    strokeStyle: '',
    padding: 0,
    display: true,
    autoSkip: true,
    autoSkipPadding: 0,
    labelOffset: 0,
    callback: Ticks.formatters.values,
    minor: {},
    major: {}
  }
});
function sample(arr, numItems) {
  var result = [];
  var increment = arr.length / numItems;
  var len = arr.length;
  var i = 0;
  for (; i < len; i += increment) {
    result.push(arr[Math.floor(i)]);
  }
  return result;
}
function getPixelForGridLine(scale, index, offsetGridLines) {
  var length = scale.ticks.length;
  var validIndex = Math.min(index, length - 1);
  var start = scale._startPixel;
  var end = scale._endPixel;
  var epsilon = 1e-6;
  var lineValue = scale.getPixelForTick(validIndex);
  var offset;
  if (offsetGridLines) {
    if (length === 1) {
      offset = Math.max(lineValue - start, end - lineValue);
    } else if (index === 0) {
      offset = (scale.getPixelForTick(1) - lineValue) / 2;
    } else {
      offset = (lineValue - scale.getPixelForTick(validIndex - 1)) / 2;
    }
    lineValue += validIndex < index ? offset : -offset;
    if (lineValue < start - epsilon || lineValue > end + epsilon) {
      return;
    }
  }
  return lineValue;
}
function garbageCollect(caches, length) {
  each(caches, cache => {
    var gc = cache.gc;
    var gcLen = gc.length / 2;
    var i;
    if (gcLen > length) {
      for (i = 0; i < gcLen; ++i) {
        delete cache.data[gc[i]];
      }
      gc.splice(0, gcLen);
    }
  });
}
function getTickMarkLength(options) {
  return options.drawTicks ? options.tickMarkLength : 0;
}
function getScaleLabelHeight(options) {
  if (!options.display) {
    return 0;
  }
  var font = _parseFont(options);
  var padding = toPadding(options.padding);
  return font.lineHeight + padding.height;
}
function getEvenSpacing(arr) {
  var len = arr.length;
  var i, diff;
  if (len < 2) {
    return false;
  }
  for (diff = arr[0], i = 1; i < len; ++i) {
    if (arr[i] - arr[i - 1] !== diff) {
      return false;
    }
  }
  return diff;
}
function calculateSpacing(majorIndices, ticks, ticksLimit) {
  var evenMajorSpacing = getEvenSpacing(majorIndices);
  var spacing = ticks.length / ticksLimit;
  if (!evenMajorSpacing) {
    return Math.max(spacing, 1);
  }
  var factors = _factorize(evenMajorSpacing);
  for (var i = 0, ilen = factors.length - 1; i < ilen; i++) {
    var factor = factors[i];
    if (factor > spacing) {
      return factor;
    }
  }
  return Math.max(spacing, 1);
}
function getMajorIndices(ticks) {
  var result = [];
  var i, ilen;
  for (i = 0, ilen = ticks.length; i < ilen; i++) {
    if (ticks[i].major) {
      result.push(i);
    }
  }
  return result;
}
function skipMajors(ticks, newTicks, majorIndices, spacing) {
  var count = 0;
  var next = majorIndices[0];
  var i;
  spacing = Math.ceil(spacing);
  for (i = 0; i < ticks.length; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = majorIndices[count * spacing];
    }
  }
}
function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
  var start = valueOrDefault(majorStart, 0);
  var end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
  var count = 0;
  var length, i, next;
  spacing = Math.ceil(spacing);
  if (majorEnd) {
    length = majorEnd - majorStart;
    spacing = length / Math.floor(length / spacing);
  }
  next = start;
  while (next < 0) {
    count++;
    next = Math.round(start + count * spacing);
  }
  for (i = Math.max(start, 0); i < end; i++) {
    if (i === next) {
      newTicks.push(ticks[i]);
      count++;
      next = Math.round(start + count * spacing);
    }
  }
}
class Scale extends Element {
  constructor(cfg) {
    super();
    this.id = cfg.id;
    this.type = cfg.type;
    this.options = cfg.options;
    this.ctx = cfg.ctx;
    this.chart = cfg.chart;
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
    this.width = undefined;
    this.height = undefined;
    this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this.maxWidth = undefined;
    this.maxHeight = undefined;
    this.paddingTop = undefined;
    this.paddingBottom = undefined;
    this.paddingLeft = undefined;
    this.paddingRight = undefined;
    this.axis = undefined;
    this.labelRotation = undefined;
    this.min = undefined;
    this.max = undefined;
    this.ticks = [];
    this._gridLineItems = null;
    this._labelItems = null;
    this._labelSizes = null;
    this._length = 0;
    this._longestTextCache = {};
    this._startPixel = undefined;
    this._endPixel = undefined;
    this._reversePixels = false;
    this._userMax = undefined;
    this._userMin = undefined;
    this._ticksLength = 0;
    this._borderValue = 0;
  }
  parse(raw, index) {
    return raw;
  }
  parseObject(obj, axis, index) {
    if (obj[axis] !== undefined) {
      return this.parse(obj[axis], index);
    }
    return null;
  }
  getUserBounds() {
    var min = this._userMin;
    var max = this._userMax;
    if (isNullOrUndef(min) || isNaN(min)) {
      min = Number.POSITIVE_INFINITY;
    }
    if (isNullOrUndef(max) || isNaN(max)) {
      max = Number.NEGATIVE_INFINITY;
    }
    return {
      min,
      max,
      minDefined: isNumberFinite(min),
      maxDefined: isNumberFinite(max)
    };
  }
  getMinMax(canStack) {
    var me = this;
    var {
      min,
      max,
      minDefined,
      maxDefined
    } = me.getUserBounds();
    var minmax;
    if (minDefined && maxDefined) {
      return {
        min,
        max
      };
    }
    var metas = me.getMatchingVisibleMetas();
    for (var i = 0, ilen = metas.length; i < ilen; ++i) {
      minmax = metas[i].controller.getMinMax(me, canStack);
      if (!minDefined) {
        min = Math.min(min, minmax.min);
      }
      if (!maxDefined) {
        max = Math.max(max, minmax.max);
      }
    }
    return {
      min,
      max
    };
  }
  invalidateCaches() {}
  getPadding() {
    var me = this;
    return {
      left: me.paddingLeft || 0,
      top: me.paddingTop || 0,
      right: me.paddingRight || 0,
      bottom: me.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    var data = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
  }
  beforeUpdate() {
    callback(this.options.beforeUpdate, [this]);
  }
  update(maxWidth, maxHeight, margins) {
    var me = this;
    var tickOpts = me.options.ticks;
    var sampleSize = tickOpts.sampleSize;
    me.beforeUpdate();
    me.maxWidth = maxWidth;
    me.maxHeight = maxHeight;
    me._margins = _extends({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, margins);
    me.ticks = null;
    me._labelSizes = null;
    me._gridLineItems = null;
    me._labelItems = null;
    me.beforeSetDimensions();
    me.setDimensions();
    me.afterSetDimensions();
    me.beforeDataLimits();
    me.determineDataLimits();
    me.afterDataLimits();
    me.beforeBuildTicks();
    me.ticks = me.buildTicks() || [];
    me.afterBuildTicks();
    var samplingEnabled = sampleSize < me.ticks.length;
    me._convertTicksToLabels(samplingEnabled ? sample(me.ticks, sampleSize) : me.ticks);
    me.configure();
    me.beforeCalculateLabelRotation();
    me.calculateLabelRotation();
    me.afterCalculateLabelRotation();
    me.beforeFit();
    me.fit();
    me.afterFit();
    me.ticks = tickOpts.display && (tickOpts.autoSkip || tickOpts.source === 'auto') ? me._autoSkip(me.ticks) : me.ticks;
    if (samplingEnabled) {
      me._convertTicksToLabels(me.ticks);
    }
    me.afterUpdate();
  }
  configure() {
    var me = this;
    var reversePixels = me.options.reverse;
    var startPixel, endPixel;
    if (me.isHorizontal()) {
      startPixel = me.left;
      endPixel = me.right;
    } else {
      startPixel = me.top;
      endPixel = me.bottom;
      reversePixels = !reversePixels;
    }
    me._startPixel = startPixel;
    me._endPixel = endPixel;
    me._reversePixels = reversePixels;
    me._length = endPixel - startPixel;
  }
  afterUpdate() {
    callback(this.options.afterUpdate, [this]);
  }
  beforeSetDimensions() {
    callback(this.options.beforeSetDimensions, [this]);
  }
  setDimensions() {
    var me = this;
    if (me.isHorizontal()) {
      me.width = me.maxWidth;
      me.left = 0;
      me.right = me.width;
    } else {
      me.height = me.maxHeight;
      me.top = 0;
      me.bottom = me.height;
    }
    me.paddingLeft = 0;
    me.paddingTop = 0;
    me.paddingRight = 0;
    me.paddingBottom = 0;
  }
  afterSetDimensions() {
    callback(this.options.afterSetDimensions, [this]);
  }
  beforeDataLimits() {
    callback(this.options.beforeDataLimits, [this]);
  }
  determineDataLimits() {}
  afterDataLimits() {
    callback(this.options.afterDataLimits, [this]);
  }
  beforeBuildTicks() {
    callback(this.options.beforeBuildTicks, [this]);
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    callback(this.options.afterBuildTicks, [this]);
  }
  beforeTickToLabelConversion() {
    callback(this.options.beforeTickToLabelConversion, [this]);
  }
  generateTickLabels(ticks) {
    var me = this;
    var tickOpts = me.options.ticks;
    var i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; i++) {
      tick = ticks[i];
      tick.label = callback(tickOpts.callback, [tick.value, i, ticks], me);
    }
  }
  afterTickToLabelConversion() {
    callback(this.options.afterTickToLabelConversion, [this]);
  }
  beforeCalculateLabelRotation() {
    callback(this.options.beforeCalculateLabelRotation, [this]);
  }
  calculateLabelRotation() {
    var me = this;
    var options = me.options;
    var tickOpts = options.ticks;
    var numTicks = me.ticks.length;
    var minRotation = tickOpts.minRotation || 0;
    var maxRotation = tickOpts.maxRotation;
    var labelRotation = minRotation;
    var tickWidth, maxHeight, maxLabelDiagonal;
    if (!me._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !me.isHorizontal()) {
      me.labelRotation = minRotation;
      return;
    }
    var labelSizes = me._getLabelSizes();
    var maxLabelWidth = labelSizes.widest.width;
    var maxLabelHeight = labelSizes.highest.height - labelSizes.highest.offset;
    var maxWidth = Math.min(me.maxWidth, me.chart.width - maxLabelWidth);
    tickWidth = options.offset ? me.maxWidth / numTicks : maxWidth / (numTicks - 1);
    if (maxLabelWidth + 6 > tickWidth) {
      tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
      maxHeight = me.maxHeight - getTickMarkLength(options.gridLines) - tickOpts.padding - getScaleLabelHeight(options.scaleLabel);
      maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
      labelRotation = toDegrees(Math.min(Math.asin(Math.min((labelSizes.highest.height + 6) / tickWidth, 1)), Math.asin(Math.min(maxHeight / maxLabelDiagonal, 1)) - Math.asin(maxLabelHeight / maxLabelDiagonal)));
      labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
    }
    me.labelRotation = labelRotation;
  }
  afterCalculateLabelRotation() {
    callback(this.options.afterCalculateLabelRotation, [this]);
  }
  beforeFit() {
    callback(this.options.beforeFit, [this]);
  }
  fit() {
    var me = this;
    var minSize = {
      width: 0,
      height: 0
    };
    var chart = me.chart;
    var opts = me.options;
    var tickOpts = opts.ticks;
    var scaleLabelOpts = opts.scaleLabel;
    var gridLineOpts = opts.gridLines;
    var display = me._isVisible();
    var labelsBelowTicks = opts.position !== 'top' && me.axis === 'x';
    var isHorizontal = me.isHorizontal();
    if (isHorizontal) {
      minSize.width = me.maxWidth;
    } else if (display) {
      minSize.width = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
    }
    if (!isHorizontal) {
      minSize.height = me.maxHeight;
    } else if (display) {
      minSize.height = getTickMarkLength(gridLineOpts) + getScaleLabelHeight(scaleLabelOpts);
    }
    if (tickOpts.display && display && me.ticks.length) {
      var labelSizes = me._getLabelSizes();
      var firstLabelSize = labelSizes.first;
      var lastLabelSize = labelSizes.last;
      var widestLabelSize = labelSizes.widest;
      var highestLabelSize = labelSizes.highest;
      var lineSpace = highestLabelSize.offset * 0.8;
      var tickPadding = tickOpts.padding;
      if (isHorizontal) {
        var isRotated = me.labelRotation !== 0;
        var angleRadians = toRadians(me.labelRotation);
        var cosRotation = Math.cos(angleRadians);
        var sinRotation = Math.sin(angleRadians);
        var labelHeight = sinRotation * widestLabelSize.width + cosRotation * (highestLabelSize.height - (isRotated ? highestLabelSize.offset : 0)) + (isRotated ? 0 : lineSpace);
        minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight + tickPadding);
        var offsetLeft = me.getPixelForTick(0) - me.left;
        var offsetRight = me.right - me.getPixelForTick(me.ticks.length - 1);
        var paddingLeft, paddingRight;
        if (isRotated) {
          paddingLeft = labelsBelowTicks ? cosRotation * firstLabelSize.width + sinRotation * firstLabelSize.offset : sinRotation * (firstLabelSize.height - firstLabelSize.offset);
          paddingRight = labelsBelowTicks ? sinRotation * (lastLabelSize.height - lastLabelSize.offset) : cosRotation * lastLabelSize.width + sinRotation * lastLabelSize.offset;
        } else {
          paddingLeft = firstLabelSize.width / 2;
          paddingRight = lastLabelSize.width / 2;
        }
        me.paddingLeft = Math.max((paddingLeft - offsetLeft) * me.width / (me.width - offsetLeft), 0) + 3;
        me.paddingRight = Math.max((paddingRight - offsetRight) * me.width / (me.width - offsetRight), 0) + 3;
      } else {
        var labelWidth = tickOpts.mirror ? 0 :
        widestLabelSize.width + tickPadding + lineSpace;
        minSize.width = Math.min(me.maxWidth, minSize.width + labelWidth);
        me.paddingTop = firstLabelSize.height / 2;
        me.paddingBottom = lastLabelSize.height / 2;
      }
    }
    me._handleMargins();
    if (isHorizontal) {
      me.width = me._length = chart.width - me._margins.left - me._margins.right;
      me.height = minSize.height;
    } else {
      me.width = minSize.width;
      me.height = me._length = chart.height - me._margins.top - me._margins.bottom;
    }
  }
  _handleMargins() {
    var me = this;
    if (me._margins) {
      me._margins.left = Math.max(me.paddingLeft, me._margins.left);
      me._margins.top = Math.max(me.paddingTop, me._margins.top);
      me._margins.right = Math.max(me.paddingRight, me._margins.right);
      me._margins.bottom = Math.max(me.paddingBottom, me._margins.bottom);
    }
  }
  afterFit() {
    callback(this.options.afterFit, [this]);
  }
  isHorizontal() {
    var {
      axis,
      position
    } = this.options;
    return position === 'top' || position === 'bottom' || axis === 'x';
  }
  isFullWidth() {
    return this.options.fullWidth;
  }
  _convertTicksToLabels(ticks) {
    var me = this;
    me.beforeTickToLabelConversion();
    me.generateTickLabels(ticks);
    me.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    var me = this;
    var labelSizes = me._labelSizes;
    if (!labelSizes) {
      me._labelSizes = labelSizes = me._computeLabelSizes();
    }
    return labelSizes;
  }
  _computeLabelSizes() {
    var me = this;
    var ctx = me.ctx;
    var caches = me._longestTextCache;
    var sampleSize = me.options.ticks.sampleSize;
    var widths = [];
    var heights = [];
    var offsets = [];
    var ticks = me.ticks;
    if (sampleSize < ticks.length) {
      ticks = sample(ticks, sampleSize);
    }
    var length = ticks.length;
    var i, j, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
    for (i = 0; i < length; ++i) {
      label = ticks[i].label;
      tickFont = me._resolveTickFontOptions(i);
      ctx.font = fontString = tickFont.string;
      cache = caches[fontString] = caches[fontString] || {
        data: {},
        gc: []
      };
      lineHeight = tickFont.lineHeight;
      width = height = 0;
      if (!isNullOrUndef(label) && !isArray(label)) {
        width = _measureText(ctx, cache.data, cache.gc, width, label);
        height = lineHeight;
      } else if (isArray(label)) {
        for (j = 0, jlen = label.length; j < jlen; ++j) {
          nestedLabel = label[j];
          if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
            width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
            height += lineHeight;
          }
        }
      }
      widths.push(width);
      heights.push(height);
      offsets.push(lineHeight / 2);
    }
    garbageCollect(caches, length);
    var widest = widths.indexOf(Math.max.apply(null, widths));
    var highest = heights.indexOf(Math.max.apply(null, heights));
    function valueAt(idx) {
      return {
        width: widths[idx] || 0,
        height: heights[idx] || 0,
        offset: offsets[idx] || 0
      };
    }
    return {
      first: valueAt(0),
      last: valueAt(length - 1),
      widest: valueAt(widest),
      highest: valueAt(highest)
    };
  }
  getLabelForValue(value) {
    return value;
  }
  getPixelForValue(value) {
    return NaN;
  }
  getValueForPixel(pixel) {}
  getPixelForTick(index) {
    var ticks = this.ticks;
    if (index < 0 || index > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index].value);
  }
  getPixelForDecimal(decimal) {
    var me = this;
    if (me._reversePixels) {
      decimal = 1 - decimal;
    }
    return me._startPixel + decimal * me._length;
  }
  getDecimalForPixel(pixel) {
    var decimal = (pixel - this._startPixel) / this._length;
    return this._reversePixels ? 1 - decimal : decimal;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    var {
      min,
      max
    } = this;
    return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
  }
  _autoSkip(ticks) {
    var me = this;
    var tickOpts = me.options.ticks;
    var ticksLimit = tickOpts.maxTicksLimit || me._length / me._tickSize();
    var majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
    var numMajorIndices = majorIndices.length;
    var first = majorIndices[0];
    var last = majorIndices[numMajorIndices - 1];
    var newTicks = [];
    if (numMajorIndices > ticksLimit) {
      skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
      return newTicks;
    }
    var spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
    if (numMajorIndices > 0) {
      var i, ilen;
      var avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
      skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
      for (i = 0, ilen = numMajorIndices - 1; i < ilen; i++) {
        skip(ticks, newTicks, spacing, majorIndices[i], majorIndices[i + 1]);
      }
      skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
      return newTicks;
    }
    skip(ticks, newTicks, spacing);
    return newTicks;
  }
  _tickSize() {
    var me = this;
    var optionTicks = me.options.ticks;
    var rot = toRadians(me.labelRotation);
    var cos = Math.abs(Math.cos(rot));
    var sin = Math.abs(Math.sin(rot));
    var labelSizes = me._getLabelSizes();
    var padding = optionTicks.autoSkipPadding || 0;
    var w = labelSizes ? labelSizes.widest.width + padding : 0;
    var h = labelSizes ? labelSizes.highest.height + padding : 0;
    return me.isHorizontal() ? h * cos > w * sin ? w / cos : h / sin : h * sin < w * cos ? h / cos : w / sin;
  }
  _isVisible() {
    var display = this.options.display;
    if (display !== 'auto') {
      return !!display;
    }
    return this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(chartArea) {
    var me = this;
    var axis = me.axis;
    var chart = me.chart;
    var options = me.options;
    var {
      gridLines,
      position
    } = options;
    var offsetGridLines = gridLines.offsetGridLines;
    var isHorizontal = me.isHorizontal();
    var ticks = me.ticks;
    var ticksLength = ticks.length + (offsetGridLines ? 1 : 0);
    var tl = getTickMarkLength(gridLines);
    var items = [];
    var context = {
      scale: me,
      tick: ticks[0]
    };
    var axisWidth = gridLines.drawBorder ? resolve([gridLines.borderWidth, gridLines.lineWidth, 0], context, 0) : 0;
    var axisHalfWidth = axisWidth / 2;
    var alignBorderValue = function alignBorderValue(pixel) {
      return _alignPixel(chart, pixel, axisWidth);
    };
    var borderValue, i, lineValue, alignedLineValue;
    var tx1, ty1, tx2, ty2, x1, y1, x2, y2;
    if (position === 'top') {
      borderValue = alignBorderValue(me.bottom);
      ty1 = me.bottom - tl;
      ty2 = borderValue - axisHalfWidth;
      y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
      y2 = chartArea.bottom;
    } else if (position === 'bottom') {
      borderValue = alignBorderValue(me.top);
      y1 = chartArea.top;
      y2 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
      ty1 = borderValue + axisHalfWidth;
      ty2 = me.top + tl;
    } else if (position === 'left') {
      borderValue = alignBorderValue(me.right);
      tx1 = me.right - tl;
      tx2 = borderValue - axisHalfWidth;
      x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
      x2 = chartArea.right;
    } else if (position === 'right') {
      borderValue = alignBorderValue(me.left);
      x1 = chartArea.left;
      x2 = alignBorderValue(chartArea.right) - axisHalfWidth;
      tx1 = borderValue + axisHalfWidth;
      tx2 = me.left + tl;
    } else if (axis === 'x') {
      if (position === 'center') {
        borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2);
      } else if (isObject(position)) {
        var positionAxisID = Object.keys(position)[0];
        var value = position[positionAxisID];
        borderValue = alignBorderValue(me.chart.scales[positionAxisID].getPixelForValue(value));
      }
      y1 = chartArea.top;
      y2 = chartArea.bottom;
      ty1 = borderValue + axisHalfWidth;
      ty2 = ty1 + tl;
    } else if (axis === 'y') {
      if (position === 'center') {
        borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
      } else if (isObject(position)) {
        var _positionAxisID = Object.keys(position)[0];
        var _value = position[_positionAxisID];
        borderValue = alignBorderValue(me.chart.scales[_positionAxisID].getPixelForValue(_value));
      }
      tx1 = borderValue - axisHalfWidth;
      tx2 = tx1 - tl;
      x1 = chartArea.left;
      x2 = chartArea.right;
    }
    for (i = 0; i < ticksLength; ++i) {
      var tick = ticks[i] || {};
      context = {
        scale: me,
        tick
      };
      var lineWidth = resolve([gridLines.lineWidth], context, i);
      var lineColor = resolve([gridLines.color], context, i);
      var borderDash = gridLines.borderDash || [];
      var borderDashOffset = resolve([gridLines.borderDashOffset], context, i);
      lineValue = getPixelForGridLine(me, i, offsetGridLines);
      if (lineValue === undefined) {
        continue;
      }
      alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
      if (isHorizontal) {
        tx1 = tx2 = x1 = x2 = alignedLineValue;
      } else {
        ty1 = ty2 = y1 = y2 = alignedLineValue;
      }
      items.push({
        tx1,
        ty1,
        tx2,
        ty2,
        x1,
        y1,
        x2,
        y2,
        width: lineWidth,
        color: lineColor,
        borderDash,
        borderDashOffset
      });
    }
    me._ticksLength = ticksLength;
    me._borderValue = borderValue;
    return items;
  }
  _computeLabelItems(chartArea) {
    var me = this;
    var axis = me.axis;
    var options = me.options;
    var {
      position,
      ticks: optionTicks
    } = options;
    var isMirrored = optionTicks.mirror;
    var isHorizontal = me.isHorizontal();
    var ticks = me.ticks;
    var tickPadding = optionTicks.padding;
    var tl = getTickMarkLength(options.gridLines);
    var rotation = -toRadians(me.labelRotation);
    var items = [];
    var i, ilen, tick, label, x, y, textAlign, pixel, font, lineHeight, lineCount, textOffset;
    if (position === 'top') {
      y = me.bottom - tl - tickPadding;
      textAlign = !rotation ? 'center' : 'left';
    } else if (position === 'bottom') {
      y = me.top + tl + tickPadding;
      textAlign = !rotation ? 'center' : 'right';
    } else if (position === 'left') {
      x = me.right - (isMirrored ? 0 : tl) - tickPadding;
      textAlign = isMirrored ? 'left' : 'right';
    } else if (position === 'right') {
      x = me.left + (isMirrored ? 0 : tl) + tickPadding;
      textAlign = isMirrored ? 'right' : 'left';
    } else if (axis === 'x') {
      if (position === 'center') {
        y = (chartArea.top + chartArea.bottom) / 2 + tl + tickPadding;
      } else if (isObject(position)) {
        var positionAxisID = Object.keys(position)[0];
        var value = position[positionAxisID];
        y = me.chart.scales[positionAxisID].getPixelForValue(value) + tl + tickPadding;
      }
      textAlign = !rotation ? 'center' : 'right';
    } else if (axis === 'y') {
      if (position === 'center') {
        x = (chartArea.left + chartArea.right) / 2 - tl - tickPadding;
      } else if (isObject(position)) {
        var _positionAxisID2 = Object.keys(position)[0];
        var _value2 = position[_positionAxisID2];
        x = me.chart.scales[_positionAxisID2].getPixelForValue(_value2);
      }
      textAlign = 'right';
    }
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      label = tick.label;
      pixel = me.getPixelForTick(i) + optionTicks.labelOffset;
      font = me._resolveTickFontOptions(i);
      lineHeight = font.lineHeight;
      lineCount = isArray(label) ? label.length : 1;
      if (isHorizontal) {
        x = pixel;
        if (position === 'top') {
          textOffset = (Math.sin(rotation) * (lineCount / 2) + 0.5) * lineHeight;
          textOffset -= (rotation === 0 ? lineCount - 0.5 : Math.cos(rotation) * (lineCount / 2)) * lineHeight;
        } else {
          textOffset = Math.sin(rotation) * (lineCount / 2) * lineHeight;
          textOffset += (rotation === 0 ? 0.5 : Math.cos(rotation) * (lineCount / 2)) * lineHeight;
        }
      } else {
        y = pixel;
        textOffset = (1 - lineCount) * lineHeight / 2;
      }
      items.push({
        x,
        y,
        rotation,
        label,
        font,
        textOffset,
        textAlign
      });
    }
    return items;
  }
  drawGrid(chartArea) {
    var me = this;
    var gridLines = me.options.gridLines;
    var ctx = me.ctx;
    var chart = me.chart;
    var context = {
      scale: me,
      tick: me.ticks[0]
    };
    var axisWidth = gridLines.drawBorder ? resolve([gridLines.borderWidth, gridLines.lineWidth, 0], context, 0) : 0;
    var items = me._gridLineItems || (me._gridLineItems = me._computeGridLineItems(chartArea));
    var i, ilen;
    if (gridLines.display) {
      for (i = 0, ilen = items.length; i < ilen; ++i) {
        var item = items[i];
        var width = item.width;
        var color = item.color;
        if (width && color) {
          ctx.save();
          ctx.lineWidth = width;
          ctx.strokeStyle = color;
          if (ctx.setLineDash) {
            ctx.setLineDash(item.borderDash);
            ctx.lineDashOffset = item.borderDashOffset;
          }
          ctx.beginPath();
          if (gridLines.drawTicks) {
            ctx.moveTo(item.tx1, item.ty1);
            ctx.lineTo(item.tx2, item.ty2);
          }
          if (gridLines.drawOnChartArea) {
            ctx.moveTo(item.x1, item.y1);
            ctx.lineTo(item.x2, item.y2);
          }
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    if (axisWidth) {
      var firstLineWidth = axisWidth;
      context = {
        scale: me,
        tick: me.ticks[me._ticksLength - 1]
      };
      var lastLineWidth = resolve([gridLines.lineWidth, 1], context, me._ticksLength - 1);
      var borderValue = me._borderValue;
      var x1, x2, y1, y2;
      if (me.isHorizontal()) {
        x1 = _alignPixel(chart, me.left, firstLineWidth) - firstLineWidth / 2;
        x2 = _alignPixel(chart, me.right, lastLineWidth) + lastLineWidth / 2;
        y1 = y2 = borderValue;
      } else {
        y1 = _alignPixel(chart, me.top, firstLineWidth) - firstLineWidth / 2;
        y2 = _alignPixel(chart, me.bottom, lastLineWidth) + lastLineWidth / 2;
        x1 = x2 = borderValue;
      }
      ctx.lineWidth = axisWidth;
      ctx.strokeStyle = resolve([gridLines.borderColor, gridLines.color], context, 0);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
  drawLabels(chartArea) {
    var me = this;
    var optionTicks = me.options.ticks;
    if (!optionTicks.display) {
      return;
    }
    var ctx = me.ctx;
    var items = me._labelItems || (me._labelItems = me._computeLabelItems(chartArea));
    var i, j, ilen, jlen;
    for (i = 0, ilen = items.length; i < ilen; ++i) {
      var item = items[i];
      var tickFont = item.font;
      var useStroke = tickFont.lineWidth > 0 && tickFont.strokeStyle !== '';
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);
      ctx.font = tickFont.string;
      ctx.fillStyle = tickFont.color;
      ctx.textBaseline = 'middle';
      ctx.textAlign = item.textAlign;
      if (useStroke) {
        ctx.strokeStyle = tickFont.strokeStyle;
        ctx.lineWidth = tickFont.lineWidth;
      }
      var label = item.label;
      var y = item.textOffset;
      if (isArray(label)) {
        for (j = 0, jlen = label.length; j < jlen; ++j) {
          if (useStroke) {
            ctx.strokeText('' + label[j], 0, y);
          }
          ctx.fillText('' + label[j], 0, y);
          y += tickFont.lineHeight;
        }
      } else {
        if (useStroke) {
          ctx.strokeText(label, 0, y);
        }
        ctx.fillText(label, 0, y);
      }
      ctx.restore();
    }
  }
  drawTitle(chartArea) {
    var me = this;
    var ctx = me.ctx;
    var options = me.options;
    var scaleLabel = options.scaleLabel;
    if (!scaleLabel.display) {
      return;
    }
    var scaleLabelFontColor = valueOrDefault(scaleLabel.fontColor, defaults.fontColor);
    var scaleLabelFont = _parseFont(scaleLabel);
    var scaleLabelPadding = toPadding(scaleLabel.padding);
    var halfLineHeight = scaleLabelFont.lineHeight / 2;
    var scaleLabelAlign = scaleLabel.align;
    var position = options.position;
    var isReverse = me.options.reverse;
    var rotation = 0;
    var textAlign;
    var scaleLabelX, scaleLabelY;
    if (me.isHorizontal()) {
      switch (scaleLabelAlign) {
        case 'start':
          scaleLabelX = me.left + (isReverse ? me.width : 0);
          textAlign = isReverse ? 'right' : 'left';
          break;
        case 'end':
          scaleLabelX = me.left + (isReverse ? 0 : me.width);
          textAlign = isReverse ? 'left' : 'right';
          break;
        default:
          scaleLabelX = me.left + me.width / 2;
          textAlign = 'center';
      }
      scaleLabelY = position === 'top' ? me.top + halfLineHeight + scaleLabelPadding.top : me.bottom - halfLineHeight - scaleLabelPadding.bottom;
    } else {
      var isLeft = position === 'left';
      scaleLabelX = isLeft ? me.left + halfLineHeight + scaleLabelPadding.top : me.right - halfLineHeight - scaleLabelPadding.top;
      switch (scaleLabelAlign) {
        case 'start':
          scaleLabelY = me.top + (isReverse ? 0 : me.height);
          textAlign = isReverse === isLeft ? 'right' : 'left';
          break;
        case 'end':
          scaleLabelY = me.top + (isReverse ? me.height : 0);
          textAlign = isReverse === isLeft ? 'left' : 'right';
          break;
        default:
          scaleLabelY = me.top + me.height / 2;
          textAlign = 'center';
      }
      rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
    }
    ctx.save();
    ctx.translate(scaleLabelX, scaleLabelY);
    ctx.rotate(rotation);
    ctx.textAlign = textAlign;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = scaleLabelFontColor;
    ctx.font = scaleLabelFont.string;
    ctx.fillText(scaleLabel.labelString, 0, 0);
    ctx.restore();
  }
  draw(chartArea) {
    var me = this;
    if (!me._isVisible()) {
      return;
    }
    me.drawGrid(chartArea);
    me.drawTitle();
    me.drawLabels(chartArea);
  }
  _layers() {
    var me = this;
    var opts = me.options;
    var tz = opts.ticks && opts.ticks.z || 0;
    var gz = opts.gridLines && opts.gridLines.z || 0;
    if (!me._isVisible() || tz === gz || me.draw !== me._draw) {
      return [{
        z: tz,
        draw(chartArea) {
          me.draw(chartArea);
        }
      }];
    }
    return [{
      z: gz,
      draw(chartArea) {
        me.drawGrid(chartArea);
        me.drawTitle();
      }
    }, {
      z: tz,
      draw(chartArea) {
        me.drawLabels(chartArea);
      }
    }];
  }
  getMatchingVisibleMetas(type) {
    var me = this;
    var metas = me.chart.getSortedVisibleDatasetMetas();
    var axisID = me.axis + 'AxisID';
    var result = [];
    var i, ilen;
    for (i = 0, ilen = metas.length; i < ilen; ++i) {
      var meta = metas[i];
      if (meta[axisID] === me.id && (!type || meta.type === type)) {
        result.push(meta);
      }
    }
    return result;
  }
  _resolveTickFontOptions(index) {
    var me = this;
    var options = me.options.ticks;
    var context = {
      chart: me.chart,
      scale: me,
      tick: me.ticks[index],
      index
    };
    return _extends(_parseFont({
      fontFamily: resolve([options.fontFamily], context),
      fontSize: resolve([options.fontSize], context),
      fontStyle: resolve([options.fontStyle], context),
      lineHeight: resolve([options.lineHeight], context)
    }), {
      color: resolve([options.fontColor, defaults.fontColor], context),
      lineWidth: resolve([options.lineWidth], context),
      strokeStyle: resolve([options.strokeStyle], context)
    });
  }
}
Scale.prototype._draw = Scale.prototype.draw;

var defaultConfig = {};
class CategoryScale extends Scale {
  constructor(cfg) {
    super(cfg);
    this._numLabels = 0;
    this._startValue = undefined;
    this._valueRange = 0;
  }
  parse(raw, index) {
    var labels = this.getLabels();
    if (labels[index] === raw) {
      return index;
    }
    var first = labels.indexOf(raw);
    var last = labels.lastIndexOf(raw);
    return first === -1 || first !== last ? index : first;
  }
  determineDataLimits() {
    var me = this;
    var max = me.getLabels().length - 1;
    me.min = Math.max(me._userMin || 0, 0);
    me.max = Math.min(me._userMax || max, max);
  }
  buildTicks() {
    var me = this;
    var min = me.min;
    var max = me.max;
    var offset = me.options.offset;
    var labels = me.getLabels();
    labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
    me._numLabels = labels.length;
    me._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
    me._startValue = me.min - (offset ? 0.5 : 0);
    return labels.map(l => ({
      value: l
    }));
  }
  getLabelForValue(value) {
    var me = this;
    var labels = me.getLabels();
    if (value >= 0 && value < labels.length) {
      return labels[value];
    }
    return value;
  }
  configure() {
    var me = this;
    super.configure();
    if (!me.isHorizontal()) {
      me._reversePixels = !me._reversePixels;
    }
  }
  getPixelForValue(value) {
    var me = this;
    if (typeof value !== 'number') {
      value = me.parse(value);
    }
    return me.getPixelForDecimal((value - me._startValue) / me._valueRange);
  }
  getPixelForTick(index) {
    var me = this;
    var ticks = me.ticks;
    if (index < 0 || index > ticks.length - 1) {
      return null;
    }
    return me.getPixelForValue(index * me._numLabels / ticks.length + me.min);
  }
  getValueForPixel(pixel) {
    var me = this;
    var value = Math.round(me._startValue + me.getDecimalForPixel(pixel) * me._valueRange);
    return Math.min(Math.max(value, 0), me.ticks.length - 1);
  }
  getBasePixel() {
    return this.bottom;
  }
}
_defineProperty(CategoryScale, "id", 'category');
_defineProperty(CategoryScale, "defaults", defaultConfig);

function niceNum(range, round) {
  var exponent = Math.floor(log10(range));
  var fraction = range / Math.pow(10, exponent);
  var niceFraction;
  if (round) {
    if (fraction < 1.5) {
      niceFraction = 1;
    } else if (fraction < 3) {
      niceFraction = 2;
    } else if (fraction < 7) {
      niceFraction = 5;
    } else {
      niceFraction = 10;
    }
  } else if (fraction <= 1.0) {
    niceFraction = 1;
  } else if (fraction <= 2) {
    niceFraction = 2;
  } else if (fraction <= 5) {
    niceFraction = 5;
  } else {
    niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
}
function generateTicks(generationOptions, dataRange) {
  var ticks = [];
  var MIN_SPACING = 1e-14;
  var {
    stepSize,
    min,
    max,
    precision
  } = generationOptions;
  var unit = stepSize || 1;
  var maxNumSpaces = generationOptions.maxTicks - 1;
  var {
    min: rmin,
    max: rmax
  } = dataRange;
  var spacing = niceNum((rmax - rmin) / maxNumSpaces / unit) * unit;
  var factor, niceMin, niceMax, numSpaces;
  if (spacing < MIN_SPACING && isNullOrUndef(min) && isNullOrUndef(max)) {
    return [{
      value: rmin
    }, {
      value: rmax
    }];
  }
  numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
  if (numSpaces > maxNumSpaces) {
    spacing = niceNum(numSpaces * spacing / maxNumSpaces / unit) * unit;
  }
  if (stepSize || isNullOrUndef(precision)) {
    factor = Math.pow(10, _decimalPlaces(spacing));
  } else {
    factor = Math.pow(10, precision);
    spacing = Math.ceil(spacing * factor) / factor;
  }
  niceMin = Math.floor(rmin / spacing) * spacing;
  niceMax = Math.ceil(rmax / spacing) * spacing;
  if (stepSize && !isNullOrUndef(min) && !isNullOrUndef(max)) {
    if (almostWhole((max - min) / stepSize, spacing / 1000)) {
      niceMin = min;
      niceMax = max;
    }
  }
  numSpaces = (niceMax - niceMin) / spacing;
  if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
    numSpaces = Math.round(numSpaces);
  } else {
    numSpaces = Math.ceil(numSpaces);
  }
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;
  ticks.push({
    value: isNullOrUndef(min) ? niceMin : min
  });
  for (var j = 1; j < numSpaces; ++j) {
    ticks.push({
      value: Math.round((niceMin + j * spacing) * factor) / factor
    });
  }
  ticks.push({
    value: isNullOrUndef(max) ? niceMax : max
  });
  return ticks;
}
class LinearScaleBase extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = undefined;
    this.end = undefined;
    this._startValue = undefined;
    this._endValue = undefined;
    this._valueRange = 0;
  }
  parse(raw, index) {
    if (isNullOrUndef(raw)) {
      return NaN;
    }
    if ((typeof raw === 'number' || raw instanceof Number) && !isFinite(+raw)) {
      return NaN;
    }
    return +raw;
  }
  handleTickRangeOptions() {
    var me = this;
    var opts = me.options;
    if (opts.beginAtZero) {
      var minSign = sign(me.min);
      var maxSign = sign(me.max);
      if (minSign < 0 && maxSign < 0) {
        me.max = 0;
      } else if (minSign > 0 && maxSign > 0) {
        me.min = 0;
      }
    }
    var setMin = opts.min !== undefined || opts.suggestedMin !== undefined;
    var setMax = opts.max !== undefined || opts.suggestedMax !== undefined;
    if (opts.min !== undefined) {
      me.min = opts.min;
    } else if (opts.suggestedMin !== undefined) {
      if (me.min === null) {
        me.min = opts.suggestedMin;
      } else {
        me.min = Math.min(me.min, opts.suggestedMin);
      }
    }
    if (opts.max !== undefined) {
      me.max = opts.max;
    } else if (opts.suggestedMax !== undefined) {
      if (me.max === null) {
        me.max = opts.suggestedMax;
      } else {
        me.max = Math.max(me.max, opts.suggestedMax);
      }
    }
    if (setMin !== setMax) {
      if (me.min >= me.max) {
        if (setMin) {
          me.max = me.min + 1;
        } else {
          me.min = me.max - 1;
        }
      }
    }
    if (me.min === me.max) {
      me.max++;
      if (!opts.beginAtZero) {
        me.min--;
      }
    }
  }
  getTickLimit() {
    var me = this;
    var tickOpts = me.options.ticks;
    var {
      maxTicksLimit,
      stepSize
    } = tickOpts;
    var maxTicks;
    if (stepSize) {
      maxTicks = Math.ceil(me.max / stepSize) - Math.floor(me.min / stepSize) + 1;
    } else {
      maxTicks = me.computeTickLimit();
      maxTicksLimit = maxTicksLimit || 11;
    }
    if (maxTicksLimit) {
      maxTicks = Math.min(maxTicksLimit, maxTicks);
    }
    return maxTicks;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  handleDirectionalChanges(ticks) {
    return ticks;
  }
  buildTicks() {
    var me = this;
    var opts = me.options;
    var tickOpts = opts.ticks;
    var maxTicks = me.getTickLimit();
    maxTicks = Math.max(2, maxTicks);
    var numericGeneratorOptions = {
      maxTicks,
      min: opts.min,
      max: opts.max,
      precision: tickOpts.precision,
      stepSize: valueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize)
    };
    var ticks = generateTicks(numericGeneratorOptions, me);
    ticks = me.handleDirectionalChanges(ticks);
    _setMinAndMaxByKey(ticks, me, 'value');
    if (opts.reverse) {
      ticks.reverse();
      me.start = me.max;
      me.end = me.min;
    } else {
      me.start = me.min;
      me.end = me.max;
    }
    return ticks;
  }
  configure() {
    var me = this;
    var ticks = me.ticks;
    var start = me.min;
    var end = me.max;
    super.configure();
    if (me.options.offset && ticks.length) {
      var offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
      start -= offset;
      end += offset;
    }
    me._startValue = start;
    me._endValue = end;
    me._valueRange = end - start;
  }
  getLabelForValue(value) {
    return new Intl.NumberFormat(this.options.locale).format(value);
  }
}

var defaultConfig$1 = {
  ticks: {
    callback: Ticks.formatters.numeric
  }
};
class LinearScale extends LinearScaleBase {
  determineDataLimits() {
    var me = this;
    var options = me.options;
    var minmax = me.getMinMax(true);
    var min = minmax.min;
    var max = minmax.max;
    me.min = isNumberFinite(min) ? min : valueOrDefault(options.suggestedMin, 0);
    me.max = isNumberFinite(max) ? max : valueOrDefault(options.suggestedMax, 1);
    if (options.stacked && min > 0) {
      me.min = 0;
    }
    me.handleTickRangeOptions();
  }
  computeTickLimit() {
    var me = this;
    if (me.isHorizontal()) {
      return Math.ceil(me.width / 40);
    }
    var tickFont = _parseFont(me.options.ticks);
    return Math.ceil(me.height / tickFont.lineHeight);
  }
  handleDirectionalChanges(ticks) {
    return this.isHorizontal() ? ticks : ticks.reverse();
  }
  getPixelForValue(value) {
    var me = this;
    return me.getPixelForDecimal((value - me._startValue) / me._valueRange);
  }
  getValueForPixel(pixel) {
    return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
  }
}
_defineProperty(LinearScale, "id", 'linear');
_defineProperty(LinearScale, "defaults", defaultConfig$1);

function isMajor(tickVal) {
  var remain = tickVal / Math.pow(10, Math.floor(log10(tickVal)));
  return remain === 1;
}
function finiteOrDefault(value, def) {
  return isNumberFinite(value) ? value : def;
}
function generateTicks$1(generationOptions, dataRange) {
  var endExp = Math.floor(log10(dataRange.max));
  var endSignificand = Math.ceil(dataRange.max / Math.pow(10, endExp));
  var ticks = [];
  var tickVal = finiteOrDefault(generationOptions.min, Math.pow(10, Math.floor(log10(dataRange.min))));
  var exp = Math.floor(log10(tickVal));
  var significand = Math.floor(tickVal / Math.pow(10, exp));
  var precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
  do {
    ticks.push({
      value: tickVal,
      major: isMajor(tickVal)
    });
    ++significand;
    if (significand === 10) {
      significand = 1;
      ++exp;
      precision = exp >= 0 ? 1 : precision;
    }
    tickVal = Math.round(significand * Math.pow(10, exp) * precision) / precision;
  } while (exp < endExp || exp === endExp && significand < endSignificand);
  var lastTick = finiteOrDefault(generationOptions.max, tickVal);
  ticks.push({
    value: lastTick,
    major: isMajor(tickVal)
  });
  return ticks;
}
var defaultConfig$2 = {
  ticks: {
    callback: Ticks.formatters.logarithmic,
    major: {
      enabled: true
    }
  }
};
class LogarithmicScale extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = undefined;
    this.end = undefined;
    this._startValue = undefined;
    this._valueRange = 0;
  }
  parse(raw, index) {
    var value = LinearScaleBase.prototype.parse.apply(this, [raw, index]);
    if (value === 0) {
      return undefined;
    }
    return isNumberFinite(value) && value > 0 ? value : NaN;
  }
  determineDataLimits() {
    var me = this;
    var minmax = me.getMinMax(true);
    var min = minmax.min;
    var max = minmax.max;
    me.min = isNumberFinite(min) ? Math.max(0, min) : null;
    me.max = isNumberFinite(max) ? Math.max(0, max) : null;
    me.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    var me = this;
    var DEFAULT_MIN = 1;
    var DEFAULT_MAX = 10;
    var min = me.min;
    var max = me.max;
    if (min === max) {
      if (min <= 0) {
        min = DEFAULT_MIN;
        max = DEFAULT_MAX;
      } else {
        min = Math.pow(10, Math.floor(log10(min)) - 1);
        max = Math.pow(10, Math.floor(log10(max)) + 1);
      }
    }
    if (min <= 0) {
      min = Math.pow(10, Math.floor(log10(max)) - 1);
    }
    if (max <= 0) {
      max = Math.pow(10, Math.floor(log10(min)) + 1);
    }
    me.min = min;
    me.max = max;
  }
  buildTicks() {
    var me = this;
    var opts = me.options;
    var generationOptions = {
      min: me._userMin,
      max: me._userMax
    };
    var ticks = generateTicks$1(generationOptions, me);
    var reverse = !me.isHorizontal();
    _setMinAndMaxByKey(ticks, me, 'value');
    if (opts.reverse) {
      reverse = !reverse;
      me.start = me.max;
      me.end = me.min;
    } else {
      me.start = me.min;
      me.end = me.max;
    }
    if (reverse) {
      ticks.reverse();
    }
    return ticks;
  }
  getLabelForValue(value) {
    return value === undefined ? '0' : new Intl.NumberFormat(this.options.locale).format(value);
  }
  configure() {
    var me = this;
    var start = me.min;
    super.configure();
    me._startValue = log10(start);
    me._valueRange = log10(me.max) - log10(start);
  }
  getPixelForValue(value) {
    var me = this;
    if (value === undefined || value === 0) {
      value = me.min;
    }
    return me.getPixelForDecimal(value === me.min ? 0 : (log10(value) - me._startValue) / me._valueRange);
  }
  getValueForPixel(pixel) {
    var me = this;
    var decimal = me.getDecimalForPixel(pixel);
    return Math.pow(10, me._startValue + decimal * me._valueRange);
  }
}
_defineProperty(LogarithmicScale, "id", 'logarithmic');
_defineProperty(LogarithmicScale, "defaults", defaultConfig$2);

var valueOrDefault$2 = helpers.valueOrDefault;
var valueAtIndexOrDefault$1 = helpers.valueAtIndexOrDefault;
var resolve$2 = helpers.options.resolve;
var defaultConfig$3 = {
  display: true,
  animate: true,
  position: 'chartArea',
  angleLines: {
    display: true,
    color: 'rgba(0,0,0,0.1)',
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0.0
  },
  gridLines: {
    circular: false
  },
  ticks: {
    showLabelBackdrop: true,
    backdropColor: 'rgba(255,255,255,0.75)',
    backdropPaddingY: 2,
    backdropPaddingX: 2,
    callback: Ticks.formatters.numeric
  },
  pointLabels: {
    display: true,
    fontSize: 10,
    callback(label) {
      return label;
    }
  }
};
function getTickBackdropHeight(opts) {
  var tickOpts = opts.ticks;
  if (tickOpts.display && opts.display) {
    return valueOrDefault$2(tickOpts.fontSize, defaults.fontSize) + tickOpts.backdropPaddingY * 2;
  }
  return 0;
}
function measureLabelSize(ctx, lineHeight, label) {
  if (helpers.isArray(label)) {
    return {
      w: _longestText(ctx, ctx.font, label),
      h: label.length * lineHeight
    };
  }
  return {
    w: ctx.measureText(label).width,
    h: lineHeight
  };
}
function determineLimits(angle, pos, size, min, max) {
  if (angle === min || angle === max) {
    return {
      start: pos - size / 2,
      end: pos + size / 2
    };
  } else if (angle < min || angle > max) {
    return {
      start: pos - size,
      end: pos
    };
  }
  return {
    start: pos,
    end: pos + size
  };
}
function fitWithPointLabels(scale) {
  var plFont = helpers.options._parseFont(scale.options.pointLabels);
  var furthestLimits = {
    l: 0,
    r: scale.width,
    t: 0,
    b: scale.height - scale.paddingTop
  };
  var furthestAngles = {};
  var i, textSize, pointPosition;
  scale.ctx.font = plFont.string;
  scale._pointLabelSizes = [];
  var valueCount = scale.chart.data.labels.length;
  for (i = 0; i < valueCount; i++) {
    pointPosition = scale.getPointPosition(i, scale.drawingArea + 5);
    textSize = measureLabelSize(scale.ctx, plFont.lineHeight, scale.pointLabels[i]);
    scale._pointLabelSizes[i] = textSize;
    var angleRadians = scale.getIndexAngle(i);
    var angle = toDegrees(angleRadians);
    var hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
    var vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
    if (hLimits.start < furthestLimits.l) {
      furthestLimits.l = hLimits.start;
      furthestAngles.l = angleRadians;
    }
    if (hLimits.end > furthestLimits.r) {
      furthestLimits.r = hLimits.end;
      furthestAngles.r = angleRadians;
    }
    if (vLimits.start < furthestLimits.t) {
      furthestLimits.t = vLimits.start;
      furthestAngles.t = angleRadians;
    }
    if (vLimits.end > furthestLimits.b) {
      furthestLimits.b = vLimits.end;
      furthestAngles.b = angleRadians;
    }
  }
  scale._setReductions(scale.drawingArea, furthestLimits, furthestAngles);
}
function getTextAlignForAngle(angle) {
  if (angle === 0 || angle === 180) {
    return 'center';
  } else if (angle < 180) {
    return 'left';
  }
  return 'right';
}
function fillText(ctx, text, position, lineHeight) {
  var y = position.y + lineHeight / 2;
  var i, ilen;
  if (helpers.isArray(text)) {
    for (i = 0, ilen = text.length; i < ilen; ++i) {
      ctx.fillText(text[i], position.x, y);
      y += lineHeight;
    }
  } else {
    ctx.fillText(text, position.x, y);
  }
}
function adjustPointPositionForLabelHeight(angle, textSize, position) {
  if (angle === 90 || angle === 270) {
    position.y -= textSize.h / 2;
  } else if (angle > 270 || angle < 90) {
    position.y -= textSize.h;
  }
}
function drawPointLabels(scale) {
  var ctx = scale.ctx;
  var opts = scale.options;
  var pointLabelOpts = opts.pointLabels;
  var tickBackdropHeight = getTickBackdropHeight(opts);
  var outerDistance = scale.getDistanceFromCenterForValue(opts.ticks.reverse ? scale.min : scale.max);
  var plFont = helpers.options._parseFont(pointLabelOpts);
  ctx.save();
  ctx.font = plFont.string;
  ctx.textBaseline = 'middle';
  for (var i = scale.chart.data.labels.length - 1; i >= 0; i--) {
    var extra = i === 0 ? tickBackdropHeight / 2 : 0;
    var pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + 5);
    var pointLabelFontColor = valueAtIndexOrDefault$1(pointLabelOpts.fontColor, i, defaults.fontColor);
    ctx.fillStyle = pointLabelFontColor;
    var angleRadians = scale.getIndexAngle(i);
    var angle = toDegrees(angleRadians);
    ctx.textAlign = getTextAlignForAngle(angle);
    adjustPointPositionForLabelHeight(angle, scale._pointLabelSizes[i], pointLabelPosition);
    fillText(ctx, scale.pointLabels[i], pointLabelPosition, plFont.lineHeight);
  }
  ctx.restore();
}
function drawRadiusLine(scale, gridLineOpts, radius, index) {
  var ctx = scale.ctx;
  var circular = gridLineOpts.circular;
  var valueCount = scale.chart.data.labels.length;
  var lineColor = valueAtIndexOrDefault$1(gridLineOpts.color, index - 1, undefined);
  var lineWidth = valueAtIndexOrDefault$1(gridLineOpts.lineWidth, index - 1, undefined);
  var pointPosition;
  if (!circular && !valueCount || !lineColor || !lineWidth) {
    return;
  }
  ctx.save();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  if (ctx.setLineDash) {
    ctx.setLineDash(gridLineOpts.borderDash || []);
    ctx.lineDashOffset = gridLineOpts.borderDashOffset || 0.0;
  }
  ctx.beginPath();
  if (circular) {
    ctx.arc(scale.xCenter, scale.yCenter, radius, 0, Math.PI * 2);
  } else {
    pointPosition = scale.getPointPosition(0, radius);
    ctx.moveTo(pointPosition.x, pointPosition.y);
    for (var i = 1; i < valueCount; i++) {
      pointPosition = scale.getPointPosition(i, radius);
      ctx.lineTo(pointPosition.x, pointPosition.y);
    }
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function numberOrZero(param) {
  return isNumber(param) ? param : 0;
}
class RadialLinearScale extends LinearScaleBase {
  constructor(cfg) {
    super(cfg);
    this.xCenter = undefined;
    this.yCenter = undefined;
    this.drawingArea = undefined;
    this.pointLabels = [];
  }
  setDimensions() {
    var me = this;
    me.width = me.maxWidth;
    me.height = me.maxHeight;
    me.paddingTop = getTickBackdropHeight(me.options) / 2;
    me.xCenter = Math.floor(me.width / 2);
    me.yCenter = Math.floor((me.height - me.paddingTop) / 2);
    me.drawingArea = Math.min(me.height - me.paddingTop, me.width) / 2;
  }
  determineDataLimits() {
    var me = this;
    var minmax = me.getMinMax(false);
    var min = minmax.min;
    var max = minmax.max;
    me.min = helpers.isFinite(min) && !isNaN(min) ? min : 0;
    me.max = helpers.isFinite(max) && !isNaN(max) ? max : 0;
    me.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
  }
  generateTickLabels(ticks) {
    var me = this;
    LinearScaleBase.prototype.generateTickLabels.call(me, ticks);
    me.pointLabels = me.chart.data.labels.map((value, index) => {
      var label = helpers.callback(me.options.pointLabels.callback, [value, index], me);
      return label || label === 0 ? label : '';
    });
  }
  fit() {
    var me = this;
    var opts = me.options;
    if (opts.display && opts.pointLabels.display) {
      fitWithPointLabels(me);
    } else {
      me.setCenterPoint(0, 0, 0, 0);
    }
  }
  _setReductions(largestPossibleRadius, furthestLimits, furthestAngles) {
    var me = this;
    var radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l);
    var radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r);
    var radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t);
    var radiusReductionBottom = -Math.max(furthestLimits.b - (me.height - me.paddingTop), 0) / Math.cos(furthestAngles.b);
    radiusReductionLeft = numberOrZero(radiusReductionLeft);
    radiusReductionRight = numberOrZero(radiusReductionRight);
    radiusReductionTop = numberOrZero(radiusReductionTop);
    radiusReductionBottom = numberOrZero(radiusReductionBottom);
    me.drawingArea = Math.min(Math.floor(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2), Math.floor(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2));
    me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom);
  }
  setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
    var me = this;
    var maxRight = me.width - rightMovement - me.drawingArea;
    var maxLeft = leftMovement + me.drawingArea;
    var maxTop = topMovement + me.drawingArea;
    var maxBottom = me.height - me.paddingTop - bottomMovement - me.drawingArea;
    me.xCenter = Math.floor((maxLeft + maxRight) / 2 + me.left);
    me.yCenter = Math.floor((maxTop + maxBottom) / 2 + me.top + me.paddingTop);
  }
  getIndexAngle(index) {
    var chart = this.chart;
    var angleMultiplier = Math.PI * 2 / chart.data.labels.length;
    var options = chart.options || {};
    var startAngle = options.startAngle || 0;
    return _normalizeAngle(index * angleMultiplier + toRadians(startAngle));
  }
  getDistanceFromCenterForValue(value) {
    var me = this;
    if (helpers.isNullOrUndef(value)) {
      return NaN;
    }
    var scalingFactor = me.drawingArea / (me.max - me.min);
    if (me.options.reverse) {
      return (me.max - value) * scalingFactor;
    }
    return (value - me.min) * scalingFactor;
  }
  getPointPosition(index, distanceFromCenter) {
    var me = this;
    var angle = me.getIndexAngle(index) - Math.PI / 2;
    return {
      x: Math.cos(angle) * distanceFromCenter + me.xCenter,
      y: Math.sin(angle) * distanceFromCenter + me.yCenter,
      angle
    };
  }
  getPointPositionForValue(index, value) {
    return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
  }
  getBasePosition(index) {
    return this.getPointPositionForValue(index || 0, this.getBaseValue());
  }
  drawGrid() {
    var me = this;
    var ctx = me.ctx;
    var opts = me.options;
    var gridLineOpts = opts.gridLines;
    var angleLineOpts = opts.angleLines;
    var lineWidth = valueOrDefault$2(angleLineOpts.lineWidth, gridLineOpts.lineWidth);
    var lineColor = valueOrDefault$2(angleLineOpts.color, gridLineOpts.color);
    var i, offset, position;
    if (opts.pointLabels.display) {
      drawPointLabels(me);
    }
    if (gridLineOpts.display) {
      me.ticks.forEach((tick, index) => {
        if (index !== 0) {
          offset = me.getDistanceFromCenterForValue(me.ticks[index].value);
          drawRadiusLine(me, gridLineOpts, offset, index);
        }
      });
    }
    if (angleLineOpts.display && lineWidth && lineColor) {
      ctx.save();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      if (ctx.setLineDash) {
        ctx.setLineDash(resolve$2([angleLineOpts.borderDash, gridLineOpts.borderDash, []]));
        ctx.lineDashOffset = resolve$2([angleLineOpts.borderDashOffset, gridLineOpts.borderDashOffset, 0.0]);
      }
      for (i = me.chart.data.labels.length - 1; i >= 0; i--) {
        offset = me.getDistanceFromCenterForValue(opts.ticks.reverse ? me.min : me.max);
        position = me.getPointPosition(i, offset);
        ctx.beginPath();
        ctx.moveTo(me.xCenter, me.yCenter);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  drawLabels() {
    var me = this;
    var ctx = me.ctx;
    var opts = me.options;
    var tickOpts = opts.ticks;
    if (!tickOpts.display) {
      return;
    }
    var startAngle = me.getIndexAngle(0);
    var tickFont = helpers.options._parseFont(tickOpts);
    var tickFontColor = valueOrDefault$2(tickOpts.fontColor, defaults.fontColor);
    var offset, width;
    ctx.save();
    ctx.font = tickFont.string;
    ctx.translate(me.xCenter, me.yCenter);
    ctx.rotate(startAngle);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    me.ticks.forEach((tick, index) => {
      if (index === 0 && !opts.reverse) {
        return;
      }
      offset = me.getDistanceFromCenterForValue(me.ticks[index].value);
      if (tickOpts.showLabelBackdrop) {
        width = ctx.measureText(tick.label).width;
        ctx.fillStyle = tickOpts.backdropColor;
        ctx.fillRect(-width / 2 - tickOpts.backdropPaddingX, -offset - tickFont.size / 2 - tickOpts.backdropPaddingY, width + tickOpts.backdropPaddingX * 2, tickFont.size + tickOpts.backdropPaddingY * 2);
      }
      ctx.fillStyle = tickFontColor;
      ctx.fillText(tick.label, 0, -offset);
    });
    ctx.restore();
  }
  drawTitle() {}
}
_defineProperty(RadialLinearScale, "id", 'radialLinear');
_defineProperty(RadialLinearScale, "defaults", defaultConfig$3);

var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
var INTERVALS = {
  millisecond: {
    common: true,
    size: 1,
    steps: 1000
  },
  second: {
    common: true,
    size: 1000,
    steps: 60
  },
  minute: {
    common: true,
    size: 60000,
    steps: 60
  },
  hour: {
    common: true,
    size: 3600000,
    steps: 24
  },
  day: {
    common: true,
    size: 86400000,
    steps: 30
  },
  week: {
    common: false,
    size: 604800000,
    steps: 4
  },
  month: {
    common: true,
    size: 2.628e9,
    steps: 12
  },
  quarter: {
    common: false,
    size: 7.884e9,
    steps: 4
  },
  year: {
    common: true,
    size: 3.154e10
  }
};
var UNITS =
Object.keys(INTERVALS);
function sorter(a, b) {
  return a - b;
}
function arrayUnique(items) {
  var set = new Set();
  var i, ilen;
  for (i = 0, ilen = items.length; i < ilen; ++i) {
    set.add(items[i]);
  }
  if (set.size === ilen) {
    return items;
  }
  return [...set];
}
function parse(scale, input) {
  if (isNullOrUndef(input)) {
    return null;
  }
  var adapter = scale._adapter;
  var options = scale.options.time;
  var {
    parser,
    round,
    isoWeekday
  } = options;
  var value = input;
  if (typeof parser === 'function') {
    value = parser(value);
  }
  if (!isNumberFinite(value)) {
    value = typeof parser === 'string' ? adapter.parse(value, parser) : adapter.parse(value);
  }
  if (value === null) {
    return value;
  }
  if (round) {
    value = round === 'week' && isoWeekday ? scale._adapter.startOf(value, 'isoWeek', isoWeekday) : scale._adapter.startOf(value, round);
  }
  return +value;
}
function getDataTimestamps(scale) {
  var isSeries = scale.options.distribution === 'series';
  var timestamps = scale._cache.data || [];
  var i, ilen;
  if (timestamps.length) {
    return timestamps;
  }
  var metas = scale.getMatchingVisibleMetas();
  if (isSeries && metas.length) {
    return metas[0].controller.getAllParsedValues(scale);
  }
  for (i = 0, ilen = metas.length; i < ilen; ++i) {
    timestamps = timestamps.concat(metas[i].controller.getAllParsedValues(scale));
  }
  return scale._cache.data = arrayUnique(timestamps.sort(sorter));
}
function getLabelTimestamps(scale) {
  var isSeries = scale.options.distribution === 'series';
  var timestamps = scale._cache.labels || [];
  var i, ilen;
  if (timestamps.length) {
    return timestamps;
  }
  var labels = scale.getLabels();
  for (i = 0, ilen = labels.length; i < ilen; ++i) {
    timestamps.push(parse(scale, labels[i]));
  }
  return scale._cache.labels = isSeries ? timestamps : arrayUnique(timestamps.sort(sorter));
}
function getAllTimestamps(scale) {
  var timestamps = scale._cache.all || [];
  if (timestamps.length) {
    return timestamps;
  }
  var data = getDataTimestamps(scale);
  var label = getLabelTimestamps(scale);
  if (data.length && label.length) {
    timestamps = arrayUnique(data.concat(label).sort(sorter));
  } else {
    timestamps = data.length ? data : label;
  }
  timestamps = scale._cache.all = timestamps;
  return timestamps;
}
function buildLookupTable(timestamps, min, max, distribution) {
  if (distribution === 'linear' || !timestamps.length) {
    return [{
      time: min,
      pos: 0
    }, {
      time: max,
      pos: 1
    }];
  }
  var table = [];
  var items = [min];
  var i, ilen, prev, curr, next;
  for (i = 0, ilen = timestamps.length; i < ilen; ++i) {
    curr = timestamps[i];
    if (curr > min && curr < max) {
      items.push(curr);
    }
  }
  items.push(max);
  for (i = 0, ilen = items.length; i < ilen; ++i) {
    next = items[i + 1];
    prev = items[i - 1];
    curr = items[i];
    if (prev === undefined || next === undefined || Math.round((next + prev) / 2) !== curr) {
      table.push({
        time: curr,
        pos: i / (ilen - 1)
      });
    }
  }
  return table;
}
function interpolate(table, skey, sval, tkey) {
  var {
    lo,
    hi
  } = _lookupByKey(table, skey, sval);
  var prev = table[lo];
  var next = table[hi];
  var span = next[skey] - prev[skey];
  var ratio = span ? (sval - prev[skey]) / span : 0;
  var offset = (next[tkey] - prev[tkey]) * ratio;
  return prev[tkey] + offset;
}
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
  var ilen = UNITS.length;
  for (var i = UNITS.indexOf(minUnit); i < ilen - 1; ++i) {
    var interval = INTERVALS[UNITS[i]];
    var factor = interval.steps ? interval.steps : MAX_INTEGER;
    if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
      return UNITS[i];
    }
  }
  return UNITS[ilen - 1];
}
function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
  for (var i = UNITS.length - 1; i >= UNITS.indexOf(minUnit); i--) {
    var unit = UNITS[i];
    if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
      return unit;
    }
  }
  return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
function determineMajorUnit(unit) {
  for (var i = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i < ilen; ++i) {
    if (INTERVALS[UNITS[i]].common) {
      return UNITS[i];
    }
  }
}
function addTick(timestamps, ticks, time) {
  if (!timestamps.length) {
    return;
  }
  var {
    lo,
    hi
  } = _lookup(timestamps, time);
  var timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
  ticks.add(timestamp);
}
function generate(scale) {
  var adapter = scale._adapter;
  var min = scale.min;
  var max = scale.max;
  var options = scale.options;
  var timeOpts = options.time;
  var minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, scale._getLabelCapacity(min));
  var stepSize = valueOrDefault(timeOpts.stepSize, 1);
  var weekday = minor === 'week' ? timeOpts.isoWeekday : false;
  var ticks = new Set();
  var first = min;
  var time;
  if (weekday) {
    first = +adapter.startOf(first, 'isoWeek', weekday);
  }
  first = +adapter.startOf(first, weekday ? 'day' : minor);
  if (adapter.diff(max, min, minor) > 100000 * stepSize) {
    throw new Error(min + ' and ' + max + ' are too far apart with stepSize of ' + stepSize + ' ' + minor);
  }
  if (scale.options.ticks.source === 'data') {
    var timestamps = getDataTimestamps(scale);
    for (time = first; time < max; time = +adapter.add(time, stepSize, minor)) {
      addTick(timestamps, ticks, time);
    }
    if (time === max || options.bounds === 'ticks') {
      addTick(timestamps, ticks, time);
    }
  } else {
    for (time = first; time < max; time = +adapter.add(time, stepSize, minor)) {
      ticks.add(time);
    }
    if (time === max || options.bounds === 'ticks') {
      ticks.add(time);
    }
  }
  return [...ticks];
}
function computeOffsets(table, timestamps, min, max, options) {
  var start = 0;
  var end = 0;
  var first, last;
  if (options.offset && timestamps.length) {
    first = interpolate(table, 'time', timestamps[0], 'pos');
    if (timestamps.length === 1) {
      start = 1 - first;
    } else {
      start = (interpolate(table, 'time', timestamps[1], 'pos') - first) / 2;
    }
    last = interpolate(table, 'time', timestamps[timestamps.length - 1], 'pos');
    if (timestamps.length === 1) {
      end = last;
    } else {
      end = (last - interpolate(table, 'time', timestamps[timestamps.length - 2], 'pos')) / 2;
    }
  }
  return {
    start,
    end,
    factor: 1 / (start + 1 + end)
  };
}
function setMajorTicks(scale, ticks, map, majorUnit) {
  var adapter = scale._adapter;
  var first = +adapter.startOf(ticks[0].value, majorUnit);
  var last = ticks[ticks.length - 1].value;
  var major, index;
  for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
    index = map[major];
    if (index >= 0) {
      ticks[index].major = true;
    }
  }
  return ticks;
}
function ticksFromTimestamps(scale, values, majorUnit) {
  var ticks = [];
  var map = {};
  var ilen = values.length;
  var i, value;
  for (i = 0; i < ilen; ++i) {
    value = values[i];
    map[value] = i;
    ticks.push({
      value,
      major: false
    });
  }
  return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map, majorUnit);
}
function getTimestampsForTicks(scale) {
  if (scale.options.ticks.source === 'labels') {
    return getLabelTimestamps(scale);
  }
  return generate(scale);
}
function getTimestampsForTable(scale) {
  return scale.options.distribution === 'series' ? getAllTimestamps(scale) : [scale.min, scale.max];
}
function getLabelBounds(scale) {
  var arr = getLabelTimestamps(scale);
  var min = Number.POSITIVE_INFINITY;
  var max = Number.NEGATIVE_INFINITY;
  if (arr.length) {
    min = arr[0];
    max = arr[arr.length - 1];
  }
  return {
    min,
    max
  };
}
var defaultConfig$4 = {
  distribution: 'linear',
  bounds: 'data',
  adapters: {},
  time: {
    parser: false,
    unit: false,
    round: false,
    isoWeekday: false,
    minUnit: 'millisecond',
    displayFormats: {}
  },
  ticks: {
    autoSkip: false,
    source: 'auto',
    major: {
      enabled: false
    }
  }
};
class TimeScale extends Scale {
  constructor(props) {
    super(props);
    var options = this.options;
    var time = options.time || (options.time = {});
    var adapter = this._adapter = new _adapters._date(options.adapters.date);
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
    this._unit = 'day';
    this._majorUnit = undefined;
    this._offsets = {};
    this._table = [];
    mergeIf(time.displayFormats, adapter.formats());
  }
  parse(raw, index) {
    if (raw === undefined) {
      return NaN;
    }
    return parse(this, raw);
  }
  parseObject(obj, axis, index) {
    if (obj && obj.t) {
      return this.parse(obj.t, index);
    }
    if (obj[axis] !== undefined) {
      return this.parse(obj[axis], index);
    }
    return null;
  }
  invalidateCaches() {
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    var me = this;
    var options = me.options;
    var adapter = me._adapter;
    var unit = options.time.unit || 'day';
    var {
      min,
      max,
      minDefined,
      maxDefined
    } = me.getUserBounds();
    function _applyBounds(bounds) {
      if (!minDefined && !isNaN(bounds.min)) {
        min = Math.min(min, bounds.min);
      }
      if (!maxDefined && !isNaN(bounds.max)) {
        max = Math.max(max, bounds.max);
      }
    }
    if (!minDefined || !maxDefined) {
      _applyBounds(getLabelBounds(me));
      if (options.bounds !== 'ticks' || options.ticks.source !== 'labels') {
        _applyBounds(me.getMinMax(false));
      }
    }
    min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
    max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
    me.min = Math.min(min, max);
    me.max = Math.max(min + 1, max);
  }
  buildTicks() {
    var me = this;
    var options = me.options;
    var timeOpts = options.time;
    var tickOpts = options.ticks;
    var distribution = options.distribution;
    var timestamps = getTimestampsForTicks(me);
    if (options.bounds === 'ticks' && timestamps.length) {
      me.min = me._userMin || timestamps[0];
      me.max = me._userMax || timestamps[timestamps.length - 1];
    }
    var min = me.min;
    var max = me.max;
    var ticks = _filterBetween(timestamps, min, max);
    me._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, me.min, me.max, me._getLabelCapacity(min)) : determineUnitForFormatting(me, ticks.length, timeOpts.minUnit, me.min, me.max));
    me._majorUnit = !tickOpts.major.enabled || me._unit === 'year' ? undefined : determineMajorUnit(me._unit);
    me._table = buildLookupTable(getTimestampsForTable(me), min, max, distribution);
    me._offsets = computeOffsets(me._table, getDataTimestamps(me), min, max, options);
    if (options.reverse) {
      ticks.reverse();
    }
    return ticksFromTimestamps(me, ticks, me._majorUnit);
  }
  getLabelForValue(value) {
    var me = this;
    var adapter = me._adapter;
    var timeOpts = me.options.time;
    if (timeOpts.tooltipFormat) {
      return adapter.format(value, timeOpts.tooltipFormat);
    }
    return adapter.format(value, timeOpts.displayFormats.datetime);
  }
  _tickFormatFunction(time, index, ticks, format) {
    var me = this;
    var options = me.options;
    var formats = options.time.displayFormats;
    var unit = me._unit;
    var majorUnit = me._majorUnit;
    var minorFormat = unit && formats[unit];
    var majorFormat = majorUnit && formats[majorUnit];
    var tick = ticks[index];
    var major = majorUnit && majorFormat && tick && tick.major;
    var label = me._adapter.format(time, format || (major ? majorFormat : minorFormat));
    var formatter = options.ticks.callback;
    return formatter ? formatter(label, index, ticks) : label;
  }
  generateTickLabels(ticks) {
    var i, ilen, tick;
    for (i = 0, ilen = ticks.length; i < ilen; ++i) {
      tick = ticks[i];
      tick.label = this._tickFormatFunction(tick.value, i, ticks);
    }
  }
  getPixelForValue(value) {
    var me = this;
    var offsets = me._offsets;
    var pos = interpolate(me._table, 'time', value, 'pos');
    return me.getPixelForDecimal((offsets.start + pos) * offsets.factor);
  }
  getValueForPixel(pixel) {
    var me = this;
    var offsets = me._offsets;
    var pos = me.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return interpolate(me._table, 'pos', pos, 'time');
  }
  _getLabelSize(label) {
    var me = this;
    var ticksOpts = me.options.ticks;
    var tickLabelWidth = me.ctx.measureText(label).width;
    var angle = toRadians(me.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
    var cosRotation = Math.cos(angle);
    var sinRotation = Math.sin(angle);
    var tickFontSize = valueOrDefault(ticksOpts.fontSize, defaults.fontSize);
    return {
      w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
      h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
    };
  }
  _getLabelCapacity(exampleTime) {
    var me = this;
    var timeOpts = me.options.time;
    var displayFormats = timeOpts.displayFormats;
    var format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
    var exampleLabel = me._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(me, [exampleTime], me._majorUnit), format);
    var size = me._getLabelSize(exampleLabel);
    var capacity = Math.floor(me.isHorizontal() ? me.width / size.w : me.height / size.h) - 1;
    return capacity > 0 ? capacity : 1;
  }
}
_defineProperty(TimeScale, "id", 'time');
_defineProperty(TimeScale, "defaults", defaultConfig$4);

var scales = /*#__PURE__*/Object.freeze({
__proto__: null,
CategoryScale: CategoryScale,
LinearScale: LinearScale,
LogarithmicScale: LogarithmicScale,
RadialLinearScale: RadialLinearScale,
TimeScale: TimeScale
});

defaults.set('plugins', {
  filler: {
    propagate: true
  }
});
function getLineByIndex(chart, index) {
  var meta = chart.getDatasetMeta(index);
  var visible = meta && chart.isDatasetVisible(index);
  return visible ? meta.dataset : null;
}
function parseFillOption(line) {
  var options = line.options;
  var fillOption = options.fill;
  var fill = valueOrDefault(fillOption && fillOption.target, fillOption);
  if (fill === undefined) {
    fill = !!options.backgroundColor;
  }
  if (fill === false || fill === null) {
    return false;
  }
  if (fill === true) {
    return 'origin';
  }
  return fill;
}
function decodeFill(line, index, count) {
  var fill = parseFillOption(line);
  var target = parseFloat(fill);
  if (isNumberFinite(target) && Math.floor(target) === target) {
    if (fill[0] === '-' || fill[0] === '+') {
      target = index + target;
    }
    if (target === index || target < 0 || target >= count) {
      return false;
    }
    return target;
  }
  return ['origin', 'start', 'end'].indexOf(fill) >= 0 ? fill : false;
}
function computeLinearBoundary(source) {
  var {
    scale = {},
    fill
  } = source;
  var target = null;
  var horizontal;
  if (fill === 'start') {
    target = scale.bottom;
  } else if (fill === 'end') {
    target = scale.top;
  } else if (scale.getBasePixel) {
    target = scale.getBasePixel();
  }
  if (isNumberFinite(target)) {
    horizontal = scale.isHorizontal();
    return {
      x: horizontal ? target : null,
      y: horizontal ? null : target
    };
  }
  return null;
}
class simpleArc {
  constructor(opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.radius = opts.radius;
  }
  pathSegment(ctx, bounds, opts) {
    var {
      x,
      y,
      radius
    } = this;
    bounds = bounds || {
      start: 0,
      end: Math.PI * 2
    };
    if (opts.reverse) {
      ctx.arc(x, y, radius, bounds.end, bounds.start, true);
    } else {
      ctx.arc(x, y, radius, bounds.start, bounds.end);
    }
    return !opts.bounds;
  }
  interpolate(point, property) {
    var {
      x,
      y,
      radius
    } = this;
    var angle = point.angle;
    if (property === 'angle') {
      return {
        x: x + Math.cos(angle) * radius,
        y: y + Math.sin(angle) * radius,
        angle
      };
    }
  }
}
function computeCircularBoundary(source) {
  var {
    scale,
    fill
  } = source;
  var options = scale.options;
  var length = scale.getLabels().length;
  var target = [];
  var start = options.reverse ? scale.max : scale.min;
  var end = options.reverse ? scale.min : scale.max;
  var value = fill === 'start' ? start : fill === 'end' ? end : scale.getBaseValue();
  var i, center;
  if (options.gridLines.circular) {
    center = scale.getPointPositionForValue(0, start);
    return new simpleArc({
      x: center.x,
      y: center.y,
      radius: scale.getDistanceFromCenterForValue(value)
    });
  }
  for (i = 0; i < length; ++i) {
    target.push(scale.getPointPositionForValue(i, value));
  }
  return target;
}
function computeBoundary(source) {
  var scale = source.scale || {};
  if (scale.getPointPositionForValue) {
    return computeCircularBoundary(source);
  }
  return computeLinearBoundary(source);
}
function pointsFromSegments(boundary, line) {
  var {
    x = null,
    y = null
  } = boundary || {};
  var linePoints = line.points;
  var points = [];
  line.segments.forEach(segment => {
    var first = linePoints[segment.start];
    var last = linePoints[segment.end];
    if (y !== null) {
      points.push({
        x: first.x,
        y,
        _prop: 'x',
        _ref: first
      });
      points.push({
        x: last.x,
        y,
        _prop: 'x',
        _ref: last
      });
    } else if (x !== null) {
      points.push({
        x,
        y: first.y,
        _prop: 'y',
        _ref: first
      });
      points.push({
        x,
        y: last.y,
        _prop: 'y',
        _ref: last
      });
    }
  });
  return points;
}
function getTarget(source) {
  var {
    chart,
    fill,
    line
  } = source;
  if (isNumberFinite(fill)) {
    return getLineByIndex(chart, fill);
  }
  var boundary = computeBoundary(source);
  var points = [];
  var _loop = false;
  var _refPoints = false;
  if (boundary instanceof simpleArc) {
    return boundary;
  }
  if (isArray(boundary)) {
    _loop = true;
    points = boundary;
  } else {
    points = pointsFromSegments(boundary, line);
    _refPoints = true;
  }
  return points.length ? new Line({
    points,
    options: {
      tension: 0
    },
    _loop,
    _fullLoop: _loop,
    _refPoints
  }) : null;
}
function resolveTarget(sources, index, propagate) {
  var source = sources[index];
  var fill = source.fill;
  var visited = [index];
  var target;
  if (!propagate) {
    return fill;
  }
  while (fill !== false && visited.indexOf(fill) === -1) {
    if (!isNumberFinite(fill)) {
      return fill;
    }
    target = sources[fill];
    if (!target) {
      return false;
    }
    if (target.visible) {
      return fill;
    }
    visited.push(fill);
    fill = target.fill;
  }
  return false;
}
function _clip(ctx, target, clipY) {
  ctx.beginPath();
  target.path(ctx);
  ctx.lineTo(target.last().x, clipY);
  ctx.lineTo(target.first().x, clipY);
  ctx.closePath();
  ctx.clip();
}
function getBounds(property, first, last, loop) {
  if (loop) {
    return;
  }
  var start = first[property];
  var end = last[property];
  if (property === 'angle') {
    start = _normalizeAngle(start);
    end = _normalizeAngle(end);
  }
  return {
    property,
    start,
    end
  };
}
function _getEdge(a, b, prop, fn) {
  if (a && b) {
    return fn(a[prop], b[prop]);
  }
  return a ? a[prop] : b ? b[prop] : 0;
}
function _segments(line, target, property) {
  var segments = line.segments;
  var points = line.points;
  var tpoints = target.points;
  var parts = [];
  if (target._refPoints) {
    for (var i = 0, ilen = tpoints.length; i < ilen; ++i) {
      var point = tpoints[i];
      var prop = point._prop;
      if (prop) {
        point[prop] = point._ref[prop];
      }
    }
  }
  for (var _i = 0; _i < segments.length; _i++) {
    var segment = segments[_i];
    var bounds = getBounds(property, points[segment.start], points[segment.end], segment.loop);
    if (!target.segments) {
      parts.push({
        source: segment,
        target: bounds,
        start: points[segment.start],
        end: points[segment.end]
      });
      continue;
    }
    var subs = _boundSegments(target, bounds);
    for (var j = 0; j < subs.length; ++j) {
      var sub = subs[j];
      var subBounds = getBounds(property, tpoints[sub.start], tpoints[sub.end], sub.loop);
      var fillSources = _boundSegment(segment, points, subBounds);
      for (var k = 0; k < fillSources.length; k++) {
        parts.push({
          source: fillSources[k],
          target: sub,
          start: {
            [property]: _getEdge(bounds, subBounds, 'start', Math.max)
          },
          end: {
            [property]: _getEdge(bounds, subBounds, 'end', Math.min)
          }
        });
      }
    }
  }
  return parts;
}
function clipBounds(ctx, scale, bounds) {
  var {
    top,
    bottom
  } = scale.chart.chartArea;
  var {
    property,
    start,
    end
  } = bounds || {};
  if (property === 'x') {
    ctx.beginPath();
    ctx.rect(start, top, end - start, bottom - top);
    ctx.clip();
  }
}
function interpolatedLineTo(ctx, target, point, property) {
  var interpolatedPoint = target.interpolate(point, property);
  if (interpolatedPoint) {
    ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
  }
}
function _fill(ctx, cfg) {
  var {
    line,
    target,
    property,
    color,
    scale
  } = cfg;
  var segments = _segments(cfg.line, cfg.target, property);
  ctx.fillStyle = color;
  for (var i = 0, ilen = segments.length; i < ilen; ++i) {
    var {
      source: src,
      target: tgt,
      start,
      end
    } = segments[i];
    ctx.save();
    clipBounds(ctx, scale, getBounds(property, start, end));
    ctx.beginPath();
    var lineLoop = !!line.pathSegment(ctx, src);
    if (lineLoop) {
      ctx.closePath();
    } else {
      interpolatedLineTo(ctx, target, end, property);
    }
    var targetLoop = !!target.pathSegment(ctx, tgt, {
      move: lineLoop,
      reverse: true
    });
    var loop = lineLoop && targetLoop;
    if (!loop) {
      interpolatedLineTo(ctx, target, start, property);
    }
    ctx.closePath();
    ctx.fill(loop ? 'evenodd' : 'nonzero');
    ctx.restore();
  }
}
function doFill(ctx, cfg) {
  var {
    line,
    target,
    above,
    below,
    area,
    scale
  } = cfg;
  var property = line._loop ? 'angle' : 'x';
  ctx.save();
  if (property === 'x' && below !== above) {
    _clip(ctx, target, area.top);
    _fill(ctx, {
      line,
      target,
      color: above,
      scale,
      property
    });
    ctx.restore();
    ctx.save();
    _clip(ctx, target, area.bottom);
  }
  _fill(ctx, {
    line,
    target,
    color: below,
    scale,
    property
  });
  ctx.restore();
}
var filler = {
  id: 'filler',
  afterDatasetsUpdate(chart, options) {
    var count = (chart.data.datasets || []).length;
    var propagate = options.propagate;
    var sources = [];
    var meta, i, line, source;
    for (i = 0; i < count; ++i) {
      meta = chart.getDatasetMeta(i);
      line = meta.dataset;
      source = null;
      if (line && line.options && line instanceof Line) {
        source = {
          visible: chart.isDatasetVisible(i),
          fill: decodeFill(line, i, count),
          chart,
          scale: meta.vScale,
          line,
          target: undefined
        };
      }
      meta.$filler = source;
      sources.push(source);
    }
    for (i = 0; i < count; ++i) {
      source = sources[i];
      if (!source || source.fill === false) {
        continue;
      }
      source.fill = resolveTarget(sources, i, propagate);
      source.target = source.fill !== false && getTarget(source);
    }
  },
  beforeDatasetsDraw(chart) {
    var metasets = chart.getSortedVisibleDatasetMetas();
    var area = chart.chartArea;
    var i, meta;
    for (i = metasets.length - 1; i >= 0; --i) {
      meta = metasets[i].$filler;
      if (meta) {
        meta.line.updateControlPoints(area);
      }
    }
  },
  beforeDatasetDraw(chart, args) {
    var area = chart.chartArea;
    var ctx = chart.ctx;
    var meta = args.meta.$filler;
    if (!meta || meta.fill === false) {
      return;
    }
    var {
      line,
      target,
      scale
    } = meta;
    var lineOpts = line.options;
    var fillOption = lineOpts.fill;
    var color = lineOpts.backgroundColor || defaults.color;
    var {
      above = color,
      below = color
    } = fillOption || {};
    if (target && line.points.length) {
      clipArea(ctx, area);
      doFill(ctx, {
        line,
        target,
        above,
        below,
        area,
        scale
      });
      unclipArea(ctx);
    }
  }
};

defaults.set('legend', {
  display: true,
  position: 'top',
  align: 'center',
  fullWidth: true,
  reverse: false,
  weight: 1000,
  onClick(e, legendItem) {
    var index = legendItem.datasetIndex;
    var ci = this.chart;
    if (ci.isDatasetVisible(index)) {
      ci.hide(index);
      legendItem.hidden = true;
    } else {
      ci.show(index);
      legendItem.hidden = false;
    }
  },
  onHover: null,
  onLeave: null,
  labels: {
    boxWidth: 40,
    padding: 10,
    generateLabels(chart) {
      var datasets = chart.data.datasets;
      var options = chart.options.legend || {};
      var usePointStyle = options.labels && options.labels.usePointStyle;
      return chart._getSortedDatasetMetas().map(meta => {
        var style = meta.controller.getStyle(usePointStyle ? 0 : undefined);
        return {
          text: datasets[meta.index].label,
          fillStyle: style.backgroundColor,
          hidden: !meta.visible,
          lineCap: style.borderCapStyle,
          lineDash: style.borderDash,
          lineDashOffset: style.borderDashOffset,
          lineJoin: style.borderJoinStyle,
          lineWidth: style.borderWidth,
          strokeStyle: style.borderColor,
          pointStyle: style.pointStyle,
          rotation: style.rotation,
          datasetIndex: meta.index
        };
      }, this);
    }
  },
  title: {
    display: false,
    position: 'center',
    text: ''
  }
});
function getBoxWidth(labelOpts, fontSize) {
  return labelOpts.usePointStyle && labelOpts.boxWidth > fontSize ? fontSize : labelOpts.boxWidth;
}
class Legend extends Element {
  constructor(config) {
    super();
    _extends(this, config);
    this.legendHitBoxes = [];
    this._hoveredItem = null;
    this.doughnutMode = false;
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this.legendItems = undefined;
    this.columnWidths = undefined;
    this.columnHeights = undefined;
    this.lineWidths = undefined;
    this._minSize = undefined;
    this.maxHeight = undefined;
    this.maxWidth = undefined;
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
    this.height = undefined;
    this.width = undefined;
    this._margins = undefined;
    this.paddingTop = undefined;
    this.paddingBottom = undefined;
    this.paddingLeft = undefined;
    this.paddingRight = undefined;
    this.position = undefined;
    this.weight = undefined;
    this.fullWidth = undefined;
  }
  beforeUpdate() {}
  update(maxWidth, maxHeight, margins) {
    var me = this;
    me.beforeUpdate();
    me.maxWidth = maxWidth;
    me.maxHeight = maxHeight;
    me._margins = margins;
    me.beforeSetDimensions();
    me.setDimensions();
    me.afterSetDimensions();
    me.beforeBuildLabels();
    me.buildLabels();
    me.afterBuildLabels();
    me.beforeFit();
    me.fit();
    me.afterFit();
    me.afterUpdate();
  }
  afterUpdate() {}
  beforeSetDimensions() {}
  setDimensions() {
    var me = this;
    if (me.isHorizontal()) {
      me.width = me.maxWidth;
      me.left = 0;
      me.right = me.width;
    } else {
      me.height = me.maxHeight;
      me.top = 0;
      me.bottom = me.height;
    }
    me.paddingLeft = 0;
    me.paddingTop = 0;
    me.paddingRight = 0;
    me.paddingBottom = 0;
    me._minSize = {
      width: 0,
      height: 0
    };
  }
  afterSetDimensions() {}
  beforeBuildLabels() {}
  buildLabels() {
    var me = this;
    var labelOpts = me.options.labels || {};
    var legendItems = callback(labelOpts.generateLabels, [me.chart], me) || [];
    if (labelOpts.filter) {
      legendItems = legendItems.filter(item => labelOpts.filter(item, me.chart.data));
    }
    if (me.options.reverse) {
      legendItems.reverse();
    }
    me.legendItems = legendItems;
  }
  afterBuildLabels() {}
  beforeFit() {}
  fit() {
    var me = this;
    var opts = me.options;
    var labelOpts = opts.labels;
    var display = opts.display;
    var ctx = me.ctx;
    var labelFont = _parseFont(labelOpts);
    var fontSize = labelFont.size;
    var hitboxes = me.legendHitBoxes = [];
    var minSize = me._minSize;
    var isHorizontal = me.isHorizontal();
    var titleHeight = me._computeTitleHeight();
    if (isHorizontal) {
      minSize.width = me.maxWidth;
      minSize.height = display ? 10 : 0;
    } else {
      minSize.width = display ? 10 : 0;
      minSize.height = me.maxHeight;
    }
    if (!display) {
      me.width = minSize.width = me.height = minSize.height = 0;
      return;
    }
    ctx.font = labelFont.string;
    if (isHorizontal) {
      var lineWidths = me.lineWidths = [0];
      var totalHeight = titleHeight;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      me.legendItems.forEach((legendItem, i) => {
        var boxWidth = getBoxWidth(labelOpts, fontSize);
        var width = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
        if (i === 0 || lineWidths[lineWidths.length - 1] + width + 2 * labelOpts.padding > minSize.width) {
          totalHeight += fontSize + labelOpts.padding;
          lineWidths[lineWidths.length - (i > 0 ? 0 : 1)] = 0;
        }
        hitboxes[i] = {
          left: 0,
          top: 0,
          width,
          height: fontSize
        };
        lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
      });
      minSize.height += totalHeight;
    } else {
      var vPadding = labelOpts.padding;
      var columnWidths = me.columnWidths = [];
      var columnHeights = me.columnHeights = [];
      var totalWidth = labelOpts.padding;
      var currentColWidth = 0;
      var currentColHeight = 0;
      var heightLimit = minSize.height - titleHeight;
      me.legendItems.forEach((legendItem, i) => {
        var boxWidth = getBoxWidth(labelOpts, fontSize);
        var itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
        if (i > 0 && currentColHeight + fontSize + 2 * vPadding > heightLimit) {
          totalWidth += currentColWidth + labelOpts.padding;
          columnWidths.push(currentColWidth);
          columnHeights.push(currentColHeight);
          currentColWidth = 0;
          currentColHeight = 0;
        }
        currentColWidth = Math.max(currentColWidth, itemWidth);
        currentColHeight += fontSize + vPadding;
        hitboxes[i] = {
          left: 0,
          top: 0,
          width: itemWidth,
          height: fontSize
        };
      });
      totalWidth += currentColWidth;
      columnWidths.push(currentColWidth);
      columnHeights.push(currentColHeight);
      minSize.width += totalWidth;
    }
    me.width = minSize.width;
    me.height = minSize.height;
  }
  afterFit() {}
  isHorizontal() {
    return this.options.position === 'top' || this.options.position === 'bottom';
  }
  draw() {
    var me = this;
    var opts = me.options;
    var labelOpts = opts.labels;
    var defaultColor = defaults.color;
    var lineDefault = defaults.elements.line;
    var legendHeight = me.height;
    var columnHeights = me.columnHeights;
    var legendWidth = me.width;
    var lineWidths = me.lineWidths;
    if (!opts.display) {
      return;
    }
    me.drawTitle();
    var rtlHelper = getRtlAdapter(opts.rtl, me.left, me._minSize.width);
    var ctx = me.ctx;
    var fontColor = valueOrDefault(labelOpts.fontColor, defaults.fontColor);
    var labelFont = _parseFont(labelOpts);
    var fontSize = labelFont.size;
    var cursor;
    ctx.textAlign = rtlHelper.textAlign('left');
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = fontColor;
    ctx.fillStyle = fontColor;
    ctx.font = labelFont.string;
    var boxWidth = getBoxWidth(labelOpts, fontSize);
    var hitboxes = me.legendHitBoxes;
    var drawLegendBox = function drawLegendBox(x, y, legendItem) {
      if (isNaN(boxWidth) || boxWidth <= 0) {
        return;
      }
      ctx.save();
      var lineWidth = valueOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
      ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
      ctx.lineCap = valueOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
      ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
      ctx.lineJoin = valueOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
      if (ctx.setLineDash) {
        ctx.setLineDash(valueOrDefault(legendItem.lineDash, lineDefault.borderDash));
      }
      if (labelOpts && labelOpts.usePointStyle) {
        var drawOptions = {
          radius: boxWidth * Math.SQRT2 / 2,
          pointStyle: legendItem.pointStyle,
          rotation: legendItem.rotation,
          borderWidth: lineWidth
        };
        var centerX = rtlHelper.xPlus(x, boxWidth / 2);
        var centerY = y + fontSize / 2;
        drawPoint(ctx, drawOptions, centerX, centerY);
      } else {
        ctx.fillRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
        if (lineWidth !== 0) {
          ctx.strokeRect(rtlHelper.leftForLtr(x, boxWidth), y, boxWidth, fontSize);
        }
      }
      ctx.restore();
    };
    var fillText = function fillText(x, y, legendItem, textWidth) {
      var halfFontSize = fontSize / 2;
      var xLeft = rtlHelper.xPlus(x, boxWidth + halfFontSize);
      var yMiddle = y + halfFontSize;
      ctx.fillText(legendItem.text, xLeft, yMiddle);
      if (legendItem.hidden) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(xLeft, yMiddle);
        ctx.lineTo(rtlHelper.xPlus(xLeft, textWidth), yMiddle);
        ctx.stroke();
      }
    };
    var alignmentOffset = function alignmentOffset(dimension, blockSize) {
      switch (opts.align) {
        case 'start':
          return labelOpts.padding;
        case 'end':
          return dimension - blockSize;
        default:
          return (dimension - blockSize + labelOpts.padding) / 2;
      }
    };
    var isHorizontal = me.isHorizontal();
    var titleHeight = this._computeTitleHeight();
    if (isHorizontal) {
      cursor = {
        x: me.left + alignmentOffset(legendWidth, lineWidths[0]),
        y: me.top + labelOpts.padding + titleHeight,
        line: 0
      };
    } else {
      cursor = {
        x: me.left + labelOpts.padding,
        y: me.top + alignmentOffset(legendHeight, columnHeights[0]) + titleHeight,
        line: 0
      };
    }
    overrideTextDirection(me.ctx, opts.textDirection);
    var itemHeight = fontSize + labelOpts.padding;
    me.legendItems.forEach((legendItem, i) => {
      var textWidth = ctx.measureText(legendItem.text).width;
      var width = boxWidth + fontSize / 2 + textWidth;
      var x = cursor.x;
      var y = cursor.y;
      rtlHelper.setWidth(me._minSize.width);
      if (isHorizontal) {
        if (i > 0 && x + width + labelOpts.padding > me.left + me._minSize.width) {
          y = cursor.y += itemHeight;
          cursor.line++;
          x = cursor.x = me.left + alignmentOffset(legendWidth, lineWidths[cursor.line]);
        }
      } else if (i > 0 && y + itemHeight > me.top + me._minSize.height) {
        x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
        cursor.line++;
        y = cursor.y = me.top + alignmentOffset(legendHeight, columnHeights[cursor.line]);
      }
      var realX = rtlHelper.x(x);
      drawLegendBox(realX, y, legendItem);
      hitboxes[i].left = rtlHelper.leftForLtr(realX, hitboxes[i].width);
      hitboxes[i].top = y;
      fillText(realX, y, legendItem, textWidth);
      if (isHorizontal) {
        cursor.x += width + labelOpts.padding;
      } else {
        cursor.y += itemHeight;
      }
    });
    restoreTextDirection(me.ctx, opts.textDirection);
  }
  drawTitle() {
    var me = this;
    var opts = me.options;
    var titleOpts = opts.title;
    var titleFont = _parseFont(titleOpts);
    var titlePadding = toPadding(titleOpts.padding);
    if (!titleOpts.display) {
      return;
    }
    var rtlHelper = getRtlAdapter(opts.rtl, me.left, me._minSize.width);
    var ctx = me.ctx;
    var fontColor = valueOrDefault(titleOpts.fontColor, defaults.fontColor);
    var position = titleOpts.position;
    var x, textAlign;
    var halfFontSize = titleFont.size / 2;
    var y = me.top + titlePadding.top + halfFontSize;
    var left = me.left;
    var maxWidth = me.width;
    if (this.isHorizontal()) {
      maxWidth = Math.max(...me.lineWidths);
      switch (opts.align) {
        case 'start':
          break;
        case 'end':
          left = me.right - maxWidth;
          break;
        default:
          left = (me.left + me.right) / 2 - maxWidth / 2;
          break;
      }
    } else {
      var maxHeight = Math.max(...me.columnHeights);
      switch (opts.align) {
        case 'start':
          break;
        case 'end':
          y += me.height - maxHeight;
          break;
        default:
          y += (me.height - maxHeight) / 2;
          break;
      }
    }
    switch (position) {
      case 'start':
        x = left;
        textAlign = 'left';
        break;
      case 'end':
        x = left + maxWidth;
        textAlign = 'right';
        break;
      default:
        x = left + maxWidth / 2;
        textAlign = 'center';
        break;
    }
    ctx.textAlign = rtlHelper.textAlign(textAlign);
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = fontColor;
    ctx.fillStyle = fontColor;
    ctx.font = titleFont.string;
    ctx.fillText(titleOpts.text, x, y);
  }
  _computeTitleHeight() {
    var titleOpts = this.options.title;
    var titleFont = _parseFont(titleOpts);
    var titlePadding = toPadding(titleOpts.padding);
    return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
  }
  _getLegendItemAt(x, y) {
    var me = this;
    var i, hitBox, lh;
    if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
      lh = me.legendHitBoxes;
      for (i = 0; i < lh.length; ++i) {
        hitBox = lh[i];
        if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
          return me.legendItems[i];
        }
      }
    }
    return null;
  }
  handleEvent(e) {
    var me = this;
    var opts = me.options;
    var type = e.type === 'mouseup' ? 'click' : e.type;
    if (type === 'mousemove') {
      if (!opts.onHover && !opts.onLeave) {
        return;
      }
    } else if (type === 'click') {
      if (!opts.onClick) {
        return;
      }
    } else {
      return;
    }
    var hoveredItem = me._getLegendItemAt(e.x, e.y);
    if (type === 'click') {
      if (hoveredItem && opts.onClick) {
        opts.onClick.call(me, e.native, hoveredItem);
      }
    } else {
      if (opts.onLeave && hoveredItem !== me._hoveredItem) {
        if (me._hoveredItem) {
          opts.onLeave.call(me, e.native, me._hoveredItem);
        }
        me._hoveredItem = hoveredItem;
      }
      if (opts.onHover && hoveredItem) {
        opts.onHover.call(me, e.native, hoveredItem);
      }
    }
  }
}
function createNewLegendAndAttach(chart, legendOpts) {
  var legend = new Legend({
    ctx: chart.ctx,
    options: legendOpts,
    chart
  });
  layouts.configure(chart, legend, legendOpts);
  layouts.addBox(chart, legend);
  chart.legend = legend;
}
var legend = {
  id: 'legend',
  _element: Legend,
  beforeInit(chart) {
    var legendOpts = chart.options.legend;
    if (legendOpts) {
      createNewLegendAndAttach(chart, legendOpts);
    }
  },
  afterUpdate(chart) {
    var legendOpts = chart.options.legend;
    var legend = chart.legend;
    if (legendOpts) {
      mergeIf(legendOpts, defaults.legend);
      if (legend) {
        layouts.configure(chart, legend, legendOpts);
        legend.options = legendOpts;
        legend.buildLabels();
      } else {
        createNewLegendAndAttach(chart, legendOpts);
      }
    } else if (legend) {
      layouts.removeBox(chart, legend);
      delete chart.legend;
    }
  },
  afterEvent(chart, e) {
    var legend = chart.legend;
    if (legend) {
      legend.handleEvent(e);
    }
  }
};

defaults.set('title', {
  align: 'center',
  display: false,
  fontStyle: 'bold',
  fullWidth: true,
  padding: 10,
  position: 'top',
  text: '',
  weight: 2000
});
class Title extends Element {
  constructor(config) {
    super();
    _extends(this, config);
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this._margins = undefined;
    this._padding = undefined;
    this.legendHitBoxes = [];
    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;
    this.width = undefined;
    this.height = undefined;
    this.maxWidth = undefined;
    this.maxHeight = undefined;
    this.position = undefined;
    this.weight = undefined;
    this.fullWidth = undefined;
  }
  beforeUpdate() {}
  update(maxWidth, maxHeight, margins) {
    var me = this;
    me.beforeUpdate();
    me.maxWidth = maxWidth;
    me.maxHeight = maxHeight;
    me._margins = margins;
    me.beforeSetDimensions();
    me.setDimensions();
    me.afterSetDimensions();
    me.beforeBuildLabels();
    me.buildLabels();
    me.afterBuildLabels();
    me.beforeFit();
    me.fit();
    me.afterFit();
    me.afterUpdate();
  }
  afterUpdate() {}
  beforeSetDimensions() {}
  setDimensions() {
    var me = this;
    if (me.isHorizontal()) {
      me.width = me.maxWidth;
      me.left = 0;
      me.right = me.width;
    } else {
      me.height = me.maxHeight;
      me.top = 0;
      me.bottom = me.height;
    }
  }
  afterSetDimensions() {}
  beforeBuildLabels() {}
  buildLabels() {}
  afterBuildLabels() {}
  beforeFit() {}
  fit() {
    var me = this;
    var opts = me.options;
    var minSize = {};
    var isHorizontal = me.isHorizontal();
    if (!opts.display) {
      me.width = minSize.width = me.height = minSize.height = 0;
      return;
    }
    var lineCount = helpers.isArray(opts.text) ? opts.text.length : 1;
    me._padding = helpers.options.toPadding(opts.padding);
    var textSize = lineCount * helpers.options._parseFont(opts).lineHeight + me._padding.height;
    me.width = minSize.width = isHorizontal ? me.maxWidth : textSize;
    me.height = minSize.height = isHorizontal ? textSize : me.maxHeight;
  }
  afterFit() {}
  isHorizontal() {
    var pos = this.options.position;
    return pos === 'top' || pos === 'bottom';
  }
  draw() {
    var me = this;
    var ctx = me.ctx;
    var opts = me.options;
    if (!opts.display) {
      return;
    }
    var fontOpts = helpers.options._parseFont(opts);
    var lineHeight = fontOpts.lineHeight;
    var offset = lineHeight / 2 + me._padding.top;
    var rotation = 0;
    var top = me.top;
    var left = me.left;
    var bottom = me.bottom;
    var right = me.right;
    var maxWidth, titleX, titleY;
    var align;
    if (me.isHorizontal()) {
      switch (opts.align) {
        case 'start':
          titleX = left;
          align = 'left';
          break;
        case 'end':
          titleX = right;
          align = 'right';
          break;
        default:
          titleX = left + (right - left) / 2;
          align = 'center';
          break;
      }
      titleY = top + offset;
      maxWidth = right - left;
    } else {
      titleX = opts.position === 'left' ? left + offset : right - offset;
      switch (opts.align) {
        case 'start':
          titleY = opts.position === 'left' ? bottom : top;
          align = 'left';
          break;
        case 'end':
          titleY = opts.position === 'left' ? top : bottom;
          align = 'right';
          break;
        default:
          titleY = top + (bottom - top) / 2;
          align = 'center';
          break;
      }
      maxWidth = bottom - top;
      rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
    }
    ctx.save();
    ctx.fillStyle = helpers.valueOrDefault(opts.fontColor, defaults.fontColor);
    ctx.font = fontOpts.string;
    ctx.translate(titleX, titleY);
    ctx.rotate(rotation);
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    var text = opts.text;
    if (helpers.isArray(text)) {
      var y = 0;
      for (var i = 0; i < text.length; ++i) {
        ctx.fillText(text[i], 0, y, maxWidth);
        y += lineHeight;
      }
    } else {
      ctx.fillText(text, 0, 0, maxWidth);
    }
    ctx.restore();
  }
}
function createNewTitleBlockAndAttach(chart, titleOpts) {
  var title = new Title({
    ctx: chart.ctx,
    options: titleOpts,
    chart
  });
  layouts.configure(chart, title, titleOpts);
  layouts.addBox(chart, title);
  chart.titleBlock = title;
}
var title = {
  id: 'title',
  _element: Title,
  beforeInit(chart) {
    var titleOpts = chart.options.title;
    if (titleOpts) {
      createNewTitleBlockAndAttach(chart, titleOpts);
    }
  },
  beforeUpdate(chart) {
    var titleOpts = chart.options.title;
    var titleBlock = chart.titleBlock;
    if (titleOpts) {
      helpers.mergeIf(titleOpts, defaults.title);
      if (titleBlock) {
        layouts.configure(chart, titleBlock, titleOpts);
        titleBlock.options = titleOpts;
      } else {
        createNewTitleBlockAndAttach(chart, titleOpts);
      }
    } else if (titleBlock) {
      layouts.removeBox(chart, titleBlock);
      delete chart.titleBlock;
    }
  }
};

var valueOrDefault$3 = helpers.valueOrDefault;
var getRtlHelper = helpers.rtl.getRtlAdapter;
defaults.set('tooltips', {
  enabled: true,
  custom: null,
  mode: 'nearest',
  position: 'average',
  intersect: true,
  backgroundColor: 'rgba(0,0,0,0.8)',
  titleFontStyle: 'bold',
  titleSpacing: 2,
  titleMarginBottom: 6,
  titleFontColor: '#fff',
  titleAlign: 'left',
  bodySpacing: 2,
  bodyFontColor: '#fff',
  bodyAlign: 'left',
  footerFontStyle: 'bold',
  footerSpacing: 2,
  footerMarginTop: 6,
  footerFontColor: '#fff',
  footerAlign: 'left',
  yPadding: 6,
  xPadding: 6,
  caretPadding: 2,
  caretSize: 5,
  cornerRadius: 6,
  multiKeyBackground: '#fff',
  displayColors: true,
  borderColor: 'rgba(0,0,0,0)',
  borderWidth: 0,
  animation: {
    duration: 400,
    easing: 'easeOutQuart',
    numbers: {
      type: 'number',
      properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY']
    },
    opacity: {
      easing: 'linear',
      duration: 200
    }
  },
  callbacks: {
    beforeTitle: helpers.noop,
    title(tooltipItems, data) {
      var title = '';
      var labels = data.labels;
      var labelCount = labels ? labels.length : 0;
      if (tooltipItems.length > 0) {
        var item = tooltipItems[0];
        if (item.label) {
          title = item.label;
        } else if (labelCount > 0 && item.index < labelCount) {
          title = labels[item.index];
        }
      }
      return title;
    },
    afterTitle: helpers.noop,
    beforeBody: helpers.noop,
    beforeLabel: helpers.noop,
    label(tooltipItem, data) {
      var label = data.datasets[tooltipItem.datasetIndex].label || '';
      if (label) {
        label += ': ';
      }
      var value = tooltipItem.value;
      if (!helpers.isNullOrUndef(value)) {
        label += value;
      }
      return label;
    },
    labelColor(tooltipItem, chart) {
      var meta = chart.getDatasetMeta(tooltipItem.datasetIndex);
      var options = meta.controller.getStyle(tooltipItem.index);
      return {
        borderColor: options.borderColor,
        backgroundColor: options.backgroundColor
      };
    },
    labelTextColor() {
      return this.options.bodyFontColor;
    },
    afterLabel: helpers.noop,
    afterBody: helpers.noop,
    beforeFooter: helpers.noop,
    footer: helpers.noop,
    afterFooter: helpers.noop
  }
});
var positioners = {
  average(items) {
    if (!items.length) {
      return false;
    }
    var i, len;
    var x = 0;
    var y = 0;
    var count = 0;
    for (i = 0, len = items.length; i < len; ++i) {
      var el = items[i].element;
      if (el && el.hasValue()) {
        var pos = el.tooltipPosition();
        x += pos.x;
        y += pos.y;
        ++count;
      }
    }
    return {
      x: x / count,
      y: y / count
    };
  },
  nearest(items, eventPosition) {
    var x = eventPosition.x;
    var y = eventPosition.y;
    var minDistance = Number.POSITIVE_INFINITY;
    var i, len, nearestElement;
    for (i = 0, len = items.length; i < len; ++i) {
      var el = items[i].element;
      if (el && el.hasValue()) {
        var center = el.getCenterPoint();
        var d = helpers.math.distanceBetweenPoints(eventPosition, center);
        if (d < minDistance) {
          minDistance = d;
          nearestElement = el;
        }
      }
    }
    if (nearestElement) {
      var tp = nearestElement.tooltipPosition();
      x = tp.x;
      y = tp.y;
    }
    return {
      x,
      y
    };
  }
};
function pushOrConcat(base, toPush) {
  if (toPush) {
    if (helpers.isArray(toPush)) {
      Array.prototype.push.apply(base, toPush);
    } else {
      base.push(toPush);
    }
  }
  return base;
}
function splitNewlines(str) {
  if ((typeof str === 'string' || str instanceof String) && str.indexOf('\n') > -1) {
    return str.split('\n');
  }
  return str;
}
function createTooltipItem(chart, item) {
  var {
    datasetIndex,
    index
  } = item;
  var {
    label,
    value
  } = chart.getDatasetMeta(datasetIndex).controller.getLabelAndValue(index);
  return {
    label,
    value,
    index,
    datasetIndex
  };
}
function resolveOptions(options) {
  options = _extends({}, defaults.tooltips, options);
  options.bodyFontFamily = valueOrDefault$3(options.bodyFontFamily, defaults.fontFamily);
  options.bodyFontStyle = valueOrDefault$3(options.bodyFontStyle, defaults.fontStyle);
  options.bodyFontSize = valueOrDefault$3(options.bodyFontSize, defaults.fontSize);
  options.boxHeight = valueOrDefault$3(options.boxHeight, options.bodyFontSize);
  options.boxWidth = valueOrDefault$3(options.boxWidth, options.bodyFontSize);
  options.titleFontFamily = valueOrDefault$3(options.titleFontFamily, defaults.fontFamily);
  options.titleFontStyle = valueOrDefault$3(options.titleFontStyle, defaults.fontStyle);
  options.titleFontSize = valueOrDefault$3(options.titleFontSize, defaults.fontSize);
  options.footerFontFamily = valueOrDefault$3(options.footerFontFamily, defaults.fontFamily);
  options.footerFontStyle = valueOrDefault$3(options.footerFontStyle, defaults.fontStyle);
  options.footerFontSize = valueOrDefault$3(options.footerFontSize, defaults.fontSize);
  return options;
}
function getTooltipSize(tooltip) {
  var ctx = tooltip._chart.ctx;
  var {
    body,
    footer,
    options,
    title
  } = tooltip;
  var {
    bodyFontSize,
    footerFontSize,
    titleFontSize,
    boxWidth,
    boxHeight
  } = options;
  var titleLineCount = title.length;
  var footerLineCount = footer.length;
  var bodyLineItemCount = body.length;
  var height = options.yPadding * 2;
  var width = 0;
  var combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
  combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
  if (titleLineCount) {
    height += titleLineCount * titleFontSize + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
  }
  if (combinedBodyLength) {
    var bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFontSize) : bodyFontSize;
    height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFontSize + (combinedBodyLength - 1) * options.bodySpacing;
  }
  if (footerLineCount) {
    height += options.footerMarginTop + footerLineCount * footerFontSize + (footerLineCount - 1) * options.footerSpacing;
  }
  var widthPadding = 0;
  var maxLineWidth = function maxLineWidth(line) {
    width = Math.max(width, ctx.measureText(line).width + widthPadding);
  };
  ctx.save();
  ctx.font = helpers.fontString(titleFontSize, options.titleFontStyle, options.titleFontFamily);
  helpers.each(tooltip.title, maxLineWidth);
  ctx.font = helpers.fontString(bodyFontSize, options.bodyFontStyle, options.bodyFontFamily);
  helpers.each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
  widthPadding = options.displayColors ? boxWidth + 2 : 0;
  helpers.each(body, bodyItem => {
    helpers.each(bodyItem.before, maxLineWidth);
    helpers.each(bodyItem.lines, maxLineWidth);
    helpers.each(bodyItem.after, maxLineWidth);
  });
  widthPadding = 0;
  ctx.font = helpers.fontString(footerFontSize, options.footerFontStyle, options.footerFontFamily);
  helpers.each(tooltip.footer, maxLineWidth);
  ctx.restore();
  width += 2 * options.xPadding;
  return {
    width,
    height
  };
}
function determineAlignment(chart, options, size) {
  var {
    x,
    y,
    width,
    height
  } = size;
  var chartArea = chart.chartArea;
  var xAlign = 'center';
  var yAlign = 'center';
  if (y < height) {
    yAlign = 'top';
  } else if (y > chart.height - height) {
    yAlign = 'bottom';
  }
  var lf, rf;
  var midX = (chartArea.left + chartArea.right) / 2;
  var midY = (chartArea.top + chartArea.bottom) / 2;
  if (yAlign === 'center') {
    lf = value => value <= midX;
    rf = value => value > midX;
  } else {
    lf = value => value <= width / 2;
    rf = value => value >= chart.width - width / 2;
  }
  var olf = value => value + width + options.caretSize + options.caretPadding > chart.width;
  var orf = value => value - width - options.caretSize - options.caretPadding < 0;
  var yf = value => value <= midY ? 'top' : 'bottom';
  if (lf(x)) {
    xAlign = 'left';
    if (olf(x)) {
      xAlign = 'center';
      yAlign = yf(y);
    }
  } else if (rf(x)) {
    xAlign = 'right';
    if (orf(x)) {
      xAlign = 'center';
      yAlign = yf(y);
    }
  }
  return {
    xAlign: options.xAlign ? options.xAlign : xAlign,
    yAlign: options.yAlign ? options.yAlign : yAlign
  };
}
function alignX(size, xAlign, chartWidth) {
  var {
    x,
    width
  } = size;
  if (xAlign === 'right') {
    x -= width;
  } else if (xAlign === 'center') {
    x -= width / 2;
    if (x + width > chartWidth) {
      x = chartWidth - width;
    }
    if (x < 0) {
      x = 0;
    }
  }
  return x;
}
function alignY(size, yAlign, paddingAndSize) {
  var {
    y,
    height
  } = size;
  if (yAlign === 'top') {
    y += paddingAndSize;
  } else if (yAlign === 'bottom') {
    y -= height + paddingAndSize;
  } else {
    y -= height / 2;
  }
  return y;
}
function getBackgroundPoint(options, size, alignment, chart) {
  var {
    caretSize,
    caretPadding,
    cornerRadius
  } = options;
  var {
    xAlign,
    yAlign
  } = alignment;
  var paddingAndSize = caretSize + caretPadding;
  var radiusAndPadding = cornerRadius + caretPadding;
  var x = alignX(size, xAlign, chart.width);
  var y = alignY(size, yAlign, paddingAndSize);
  if (yAlign === 'center') {
    if (xAlign === 'left') {
      x += paddingAndSize;
    } else if (xAlign === 'right') {
      x -= paddingAndSize;
    }
  } else if (xAlign === 'left') {
    x -= radiusAndPadding;
  } else if (xAlign === 'right') {
    x += radiusAndPadding;
  }
  return {
    x,
    y
  };
}
function getAlignedX(tooltip, align) {
  var options = tooltip.options;
  return align === 'center' ? tooltip.x + tooltip.width / 2 : align === 'right' ? tooltip.x + tooltip.width - options.xPadding : tooltip.x + options.xPadding;
}
function getBeforeAfterBodyLines(callback) {
  return pushOrConcat([], splitNewlines(callback));
}
class Tooltip extends Element {
  constructor(config) {
    super();
    this.opacity = 0;
    this._active = [];
    this._chart = config._chart;
    this._eventPosition = undefined;
    this._size = undefined;
    this._cachedAnimations = undefined;
    this.$animations = undefined;
    this.options = undefined;
    this.dataPoints = undefined;
    this.title = undefined;
    this.beforeBody = undefined;
    this.body = undefined;
    this.afterBody = undefined;
    this.footer = undefined;
    this.xAlign = undefined;
    this.yAlign = undefined;
    this.x = undefined;
    this.y = undefined;
    this.height = undefined;
    this.width = undefined;
    this.caretX = undefined;
    this.caretY = undefined;
    this.labelColors = undefined;
    this.labelTextColors = undefined;
    this.initialize();
  }
  initialize() {
    var me = this;
    me.options = resolveOptions(me._chart.options.tooltips);
  }
  _resolveAnimations() {
    var me = this;
    var cached = me._cachedAnimations;
    if (cached) {
      return cached;
    }
    var chart = me._chart;
    var opts = chart.options.animation && me.options.animation;
    var animations = new Animations(me._chart, opts);
    me._cachedAnimations = Object.freeze(animations);
    return animations;
  }
  getTitle(tooltipitem, data) {
    var me = this;
    var opts = me.options;
    var callbacks = opts.callbacks;
    var beforeTitle = callbacks.beforeTitle.apply(me, [tooltipitem, data]);
    var title = callbacks.title.apply(me, [tooltipitem, data]);
    var afterTitle = callbacks.afterTitle.apply(me, [tooltipitem, data]);
    var lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeTitle));
    lines = pushOrConcat(lines, splitNewlines(title));
    lines = pushOrConcat(lines, splitNewlines(afterTitle));
    return lines;
  }
  getBeforeBody(tooltipitem, data) {
    return getBeforeAfterBodyLines(this.options.callbacks.beforeBody.apply(this, [tooltipitem, data]));
  }
  getBody(tooltipItems, data) {
    var me = this;
    var callbacks = me.options.callbacks;
    var bodyItems = [];
    helpers.each(tooltipItems, tooltipItem => {
      var bodyItem = {
        before: [],
        lines: [],
        after: []
      };
      pushOrConcat(bodyItem.before, splitNewlines(callbacks.beforeLabel.call(me, tooltipItem, data)));
      pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
      pushOrConcat(bodyItem.after, splitNewlines(callbacks.afterLabel.call(me, tooltipItem, data)));
      bodyItems.push(bodyItem);
    });
    return bodyItems;
  }
  getAfterBody(tooltipitem, data) {
    return getBeforeAfterBodyLines(this.options.callbacks.afterBody.apply(this, [tooltipitem, data]));
  }
  getFooter(tooltipitem, data) {
    var me = this;
    var callbacks = me.options.callbacks;
    var beforeFooter = callbacks.beforeFooter.apply(me, [tooltipitem, data]);
    var footer = callbacks.footer.apply(me, [tooltipitem, data]);
    var afterFooter = callbacks.afterFooter.apply(me, [tooltipitem, data]);
    var lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeFooter));
    lines = pushOrConcat(lines, splitNewlines(footer));
    lines = pushOrConcat(lines, splitNewlines(afterFooter));
    return lines;
  }
  _createItems() {
    var me = this;
    var active = me._active;
    var options = me.options;
    var data = me._chart.data;
    var labelColors = [];
    var labelTextColors = [];
    var tooltipItems = [];
    var i, len;
    for (i = 0, len = active.length; i < len; ++i) {
      tooltipItems.push(createTooltipItem(me._chart, active[i]));
    }
    if (options.filter) {
      tooltipItems = tooltipItems.filter(a => options.filter(a, data));
    }
    if (options.itemSort) {
      tooltipItems = tooltipItems.sort((a, b) => options.itemSort(a, b, data));
    }
    helpers.each(tooltipItems, tooltipItem => {
      labelColors.push(options.callbacks.labelColor.call(me, tooltipItem, me._chart));
      labelTextColors.push(options.callbacks.labelTextColor.call(me, tooltipItem, me._chart));
    });
    me.labelColors = labelColors;
    me.labelTextColors = labelTextColors;
    me.dataPoints = tooltipItems;
    return tooltipItems;
  }
  update(changed) {
    var me = this;
    var options = me.options;
    var active = me._active;
    var properties;
    if (!active.length) {
      if (me.opacity !== 0) {
        properties = {
          opacity: 0
        };
      }
    } else {
      var data = me._chart.data;
      var position = positioners[options.position].call(me, active, me._eventPosition);
      var tooltipItems = me._createItems();
      me.title = me.getTitle(tooltipItems, data);
      me.beforeBody = me.getBeforeBody(tooltipItems, data);
      me.body = me.getBody(tooltipItems, data);
      me.afterBody = me.getAfterBody(tooltipItems, data);
      me.footer = me.getFooter(tooltipItems, data);
      var size = me._size = getTooltipSize(me);
      var positionAndSize = _extends({}, position, size);
      var alignment = determineAlignment(me._chart, options, positionAndSize);
      var backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, me._chart);
      me.xAlign = alignment.xAlign;
      me.yAlign = alignment.yAlign;
      properties = {
        opacity: 1,
        x: backgroundPoint.x,
        y: backgroundPoint.y,
        width: size.width,
        height: size.height,
        caretX: position.x,
        caretY: position.y
      };
    }
    if (properties) {
      me._resolveAnimations().update(me, properties);
    }
    if (changed && options.custom) {
      options.custom.call(me);
    }
  }
  drawCaret(tooltipPoint, ctx, size) {
    var caretPosition = this.getCaretPosition(tooltipPoint, size);
    ctx.lineTo(caretPosition.x1, caretPosition.y1);
    ctx.lineTo(caretPosition.x2, caretPosition.y2);
    ctx.lineTo(caretPosition.x3, caretPosition.y3);
  }
  getCaretPosition(tooltipPoint, size) {
    var {
      xAlign,
      yAlign,
      options
    } = this;
    var {
      cornerRadius,
      caretSize
    } = options;
    var {
      x: ptX,
      y: ptY
    } = tooltipPoint;
    var {
      width,
      height
    } = size;
    var x1, x2, x3, y1, y2, y3;
    if (yAlign === 'center') {
      y2 = ptY + height / 2;
      if (xAlign === 'left') {
        x1 = ptX;
        x2 = x1 - caretSize;
      } else {
        x1 = ptX + width;
        x2 = x1 + caretSize;
      }
      x3 = x1;
      y1 = y2 + caretSize;
      y3 = y2 - caretSize;
    } else {
      if (xAlign === 'left') {
        x2 = ptX + cornerRadius + caretSize;
      } else if (xAlign === 'right') {
        x2 = ptX + width - cornerRadius - caretSize;
      } else {
        x2 = this.caretX;
      }
      x1 = x2 - caretSize;
      x3 = x2 + caretSize;
      if (yAlign === 'top') {
        y1 = ptY;
        y2 = y1 - caretSize;
      } else {
        y1 = ptY + height;
        y2 = y1 + caretSize;
      }
      y3 = y1;
    }
    return {
      x1,
      x2,
      x3,
      y1,
      y2,
      y3
    };
  }
  drawTitle(pt, ctx) {
    var me = this;
    var options = me.options;
    var title = me.title;
    var length = title.length;
    var titleFontSize, titleSpacing, i;
    if (length) {
      var rtlHelper = getRtlHelper(options.rtl, me.x, me.width);
      pt.x = getAlignedX(me, options.titleAlign);
      ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
      ctx.textBaseline = 'middle';
      titleFontSize = options.titleFontSize;
      titleSpacing = options.titleSpacing;
      ctx.fillStyle = options.titleFontColor;
      ctx.font = helpers.fontString(titleFontSize, options.titleFontStyle, options.titleFontFamily);
      for (i = 0; i < length; ++i) {
        ctx.fillText(title[i], rtlHelper.x(pt.x), pt.y + titleFontSize / 2);
        pt.y += titleFontSize + titleSpacing;
        if (i + 1 === length) {
          pt.y += options.titleMarginBottom - titleSpacing;
        }
      }
    }
  }
  _drawColorBox(ctx, pt, i, rtlHelper) {
    var me = this;
    var options = me.options;
    var labelColors = me.labelColors[i];
    var {
      boxHeight,
      boxWidth,
      bodyFontSize
    } = options;
    var colorX = getAlignedX(me, 'left');
    var rtlColorX = rtlHelper.x(colorX);
    var yOffSet = boxHeight < bodyFontSize ? (bodyFontSize - boxHeight) / 2 : 0;
    var colorY = pt.y + yOffSet;
    ctx.fillStyle = options.multiKeyBackground;
    ctx.fillRect(rtlHelper.leftForLtr(rtlColorX, boxWidth), colorY, boxWidth, boxHeight);
    ctx.lineWidth = 1;
    ctx.strokeStyle = labelColors.borderColor;
    ctx.strokeRect(rtlHelper.leftForLtr(rtlColorX, boxWidth), colorY, boxWidth, boxHeight);
    ctx.fillStyle = labelColors.backgroundColor;
    ctx.fillRect(rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2), colorY + 1, boxWidth - 2, boxHeight - 2);
    ctx.fillStyle = me.labelTextColors[i];
  }
  drawBody(pt, ctx) {
    var me = this;
    var {
      body,
      options
    } = me;
    var {
      bodyFontSize,
      bodySpacing,
      bodyAlign,
      displayColors,
      boxHeight,
      boxWidth
    } = options;
    var bodyLineHeight = bodyFontSize;
    var xLinePadding = 0;
    var rtlHelper = getRtlHelper(options.rtl, me.x, me.width);
    var fillLineOfText = function fillLineOfText(line) {
      ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
      pt.y += bodyLineHeight + bodySpacing;
    };
    var bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
    var bodyItem, textColor, lines, i, j, ilen, jlen;
    ctx.textAlign = bodyAlign;
    ctx.textBaseline = 'middle';
    ctx.font = helpers.fontString(bodyFontSize, options.bodyFontStyle, options.bodyFontFamily);
    pt.x = getAlignedX(me, bodyAlignForCalculation);
    ctx.fillStyle = options.bodyFontColor;
    helpers.each(me.beforeBody, fillLineOfText);
    xLinePadding = displayColors && bodyAlignForCalculation !== 'right' ? bodyAlign === 'center' ? boxWidth / 2 + 1 : boxWidth + 2 : 0;
    for (i = 0, ilen = body.length; i < ilen; ++i) {
      bodyItem = body[i];
      textColor = me.labelTextColors[i];
      ctx.fillStyle = textColor;
      helpers.each(bodyItem.before, fillLineOfText);
      lines = bodyItem.lines;
      if (displayColors && lines.length) {
        me._drawColorBox(ctx, pt, i, rtlHelper);
        bodyLineHeight = Math.max(bodyFontSize, boxHeight);
      }
      for (j = 0, jlen = lines.length; j < jlen; ++j) {
        fillLineOfText(lines[j]);
        bodyLineHeight = bodyFontSize;
      }
      helpers.each(bodyItem.after, fillLineOfText);
    }
    xLinePadding = 0;
    bodyLineHeight = bodyFontSize;
    helpers.each(me.afterBody, fillLineOfText);
    pt.y -= bodySpacing;
  }
  drawFooter(pt, ctx) {
    var me = this;
    var options = me.options;
    var footer = me.footer;
    var length = footer.length;
    var footerFontSize, i;
    if (length) {
      var rtlHelper = getRtlHelper(options.rtl, me.x, me.width);
      pt.x = getAlignedX(me, options.footerAlign);
      pt.y += options.footerMarginTop;
      ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
      ctx.textBaseline = 'middle';
      footerFontSize = options.footerFontSize;
      ctx.fillStyle = options.footerFontColor;
      ctx.font = helpers.fontString(footerFontSize, options.footerFontStyle, options.footerFontFamily);
      for (i = 0; i < length; ++i) {
        ctx.fillText(footer[i], rtlHelper.x(pt.x), pt.y + footerFontSize / 2);
        pt.y += footerFontSize + options.footerSpacing;
      }
    }
  }
  drawBackground(pt, ctx, tooltipSize) {
    var {
      xAlign,
      yAlign,
      options
    } = this;
    var {
      x,
      y
    } = pt;
    var {
      width,
      height
    } = tooltipSize;
    var radius = options.cornerRadius;
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    if (yAlign === 'top') {
      this.drawCaret(pt, ctx, tooltipSize);
    }
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    if (yAlign === 'center' && xAlign === 'right') {
      this.drawCaret(pt, ctx, tooltipSize);
    }
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    if (yAlign === 'bottom') {
      this.drawCaret(pt, ctx, tooltipSize);
    }
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    if (yAlign === 'center' && xAlign === 'left') {
      this.drawCaret(pt, ctx, tooltipSize);
    }
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    if (options.borderWidth > 0) {
      ctx.stroke();
    }
  }
  _updateAnimationTarget() {
    var me = this;
    var chart = me._chart;
    var options = me.options;
    var anims = me.$animations;
    var animX = anims && anims.x;
    var animY = anims && anims.y;
    if (animX || animY) {
      var position = positioners[options.position].call(me, me._active, me._eventPosition);
      if (!position) {
        return;
      }
      var size = me._size = getTooltipSize(me);
      var positionAndSize = _extends({}, position, me._size);
      var alignment = determineAlignment(chart, options, positionAndSize);
      var point = getBackgroundPoint(options, positionAndSize, alignment, chart);
      if (animX._to !== point.x || animY._to !== point.y) {
        me.xAlign = alignment.xAlign;
        me.yAlign = alignment.yAlign;
        me.width = size.width;
        me.height = size.height;
        me.caretX = position.x;
        me.caretY = position.y;
        me._resolveAnimations().update(me, point);
      }
    }
  }
  draw(ctx) {
    var me = this;
    var options = me.options;
    var opacity = me.opacity;
    if (!opacity) {
      return;
    }
    me._updateAnimationTarget();
    var tooltipSize = {
      width: me.width,
      height: me.height
    };
    var pt = {
      x: me.x,
      y: me.y
    };
    opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
    var hasTooltipContent = me.title.length || me.beforeBody.length || me.body.length || me.afterBody.length || me.footer.length;
    if (options.enabled && hasTooltipContent) {
      ctx.save();
      ctx.globalAlpha = opacity;
      me.drawBackground(pt, ctx, tooltipSize);
      helpers.rtl.overrideTextDirection(ctx, options.textDirection);
      pt.y += options.yPadding;
      me.drawTitle(pt, ctx);
      me.drawBody(pt, ctx);
      me.drawFooter(pt, ctx);
      helpers.rtl.restoreTextDirection(ctx, options.textDirection);
      ctx.restore();
    }
  }
  handleEvent(e, replay) {
    var me = this;
    var options = me.options;
    var lastActive = me._active || [];
    var changed = false;
    var active = [];
    if (e.type !== 'mouseout') {
      active = me._chart.getElementsAtEventForMode(e, options.mode, options, replay);
      if (options.reverse) {
        active.reverse();
      }
    }
    changed = replay || !helpers._elementsEqual(active, lastActive);
    if (changed) {
      me._active = active;
      if (options.enabled || options.custom) {
        me._eventPosition = {
          x: e.x,
          y: e.y
        };
        me.update(true);
      }
    }
    return changed;
  }
}
Tooltip.positioners = positioners;
var tooltip = {
  id: 'tooltip',
  _element: Tooltip,
  positioners,
  afterInit(chart) {
    var tooltipOpts = chart.options.tooltips;
    if (tooltipOpts) {
      chart.tooltip = new Tooltip({
        _chart: chart
      });
    }
  },
  beforeUpdate(chart) {
    if (chart.tooltip) {
      chart.tooltip.initialize();
    }
  },
  reset(chart) {
    if (chart.tooltip) {
      chart.tooltip.initialize();
    }
  },
  afterDraw(chart) {
    var tooltip = chart.tooltip;
    var args = {
      tooltip
    };
    if (pluginsCore.notify(chart, 'beforeTooltipDraw', [args]) === false) {
      return;
    }
    tooltip.draw(chart.ctx);
    pluginsCore.notify(chart, 'afterTooltipDraw', [args]);
  },
  afterEvent(chart, e, replay) {
    if (chart.tooltip) {
      var useFinalPosition = replay;
      chart.tooltip.handleEvent(e, useFinalPosition);
    }
  }
};

var plugins = {
  filler,
  legend,
  title,
  tooltip
};

Chart.helpers = helpers;
Chart._adapters = _adapters;
Chart.Animation = Animation;
Chart.Animator = Animator$1;
Chart.animationService = Animations;
Chart.controllers = controllers;
Chart.DatasetController = DatasetController;
Chart.defaults = defaults;
Chart.Element = Element;
Chart.elements = elements;
Chart.Interaction = Interaction;
Chart.layouts = layouts;
Chart.platforms = platforms;
Chart.plugins = pluginsCore;
Chart.Scale = Scale;
Chart.scaleService = scaleService;
Chart.Ticks = Ticks;
Object.keys(scales).forEach(key => Chart.scaleService.registerScale(scales[key]));
for (var k in plugins) {
  if (Object.prototype.hasOwnProperty.call(plugins, k)) {
    Chart.plugins.register(plugins[k]);
  }
}
if (typeof window !== 'undefined') {
  window.Chart = Chart;
}

export default Chart;
