import { j as jsxRuntimeExports, R as React2, r as reactExports, L as Link, a as ue } from "./index-C9bX-I14.js";
import { P as ProtectedRoute, L as Layout, u as useStudents, a as useSeedSampleData, S as Skeleton, b as ShieldAlert, R as RiskBadge } from "./useStudents-BhSw-i5u.js";
import { c as createLucideIcon, a as cn, b as clsx, B as Button, U as Users } from "./users-CS3ehMd_.js";
import { u as useAdvisorStats, a as useRiskDistribution, b as useRiskTrend, C as CircleCheck } from "./useInterventions-DLyFWOj3.js";
import { T as TriangleAlert } from "./triangle-alert-DibjU-hk.js";
import { A as Activity } from "./activity-DuPBZFwR.js";
import { g as getAngledRectangleWidth, i as isNumber, G as Global, a as getStringSize, m as mathSign, b as isFunction, T as Text, s as shallowEqual, f as filterProps, c as get, L as Layer, d as adaptEventsOfChild, e as Label, D as Dot, h as findAllByType, E as ErrorBar, C as Curve, A as Animate, j as interpolateNumber, k as isEqual, l as isNil, n as hasClipDot, o as LabelList, p as getValueByDataKey, u as uniqueId, q as getCateCoordinateOfLine, r as useChartWidth, t as useChartHeight, v as useXAxisOrThrow, w as getTicksOfAxis, x as useYAxisOrThrow, y as generateCategoricalChart, z as formatAxisMap, B as TrendingUp, R as ResponsiveContainer, P as PieChart, F as Pie, H as Cell, I as Tooltip, J as Legend } from "./PieChart-BOPYqiHL.js";
import { A as ArrowRight } from "./arrow-right-XCfI0GDO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode);
const variantStyles = {
  default: {
    icon: "text-primary bg-primary/10",
    badge: "text-muted-foreground bg-muted"
  },
  critical: {
    icon: "text-red-400 bg-red-500/10",
    badge: "text-red-400 bg-red-500/10"
  },
  warning: {
    icon: "text-orange-400 bg-orange-500/10",
    badge: "text-orange-400 bg-orange-500/10"
  },
  success: {
    icon: "text-green-400 bg-green-500/10",
    badge: "text-green-400 bg-green-500/10"
  },
  info: {
    icon: "text-primary bg-primary/10",
    badge: "text-primary bg-primary/10"
  }
};
function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
  "data-ocid": dataOcid
}) {
  const styles = variantStyles[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": dataOcid,
      className: cn(
        "relative bg-card border border-border rounded-lg p-5 flex flex-col gap-3 overflow-hidden",
        "hover:border-border/80 transition-smooth",
        className
      ),
      children: [
        variant !== "default" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none",
              {
                "bg-red-500": variant === "critical",
                "bg-orange-500": variant === "warning",
                "bg-green-500": variant === "success",
                "bg-primary": variant === "info"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-md", styles.icon), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-display text-foreground leading-none", children: value }),
          trend && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                styles.badge
              ),
              children: [
                trend.value > 0 ? "+" : "",
                trend.value,
                "% ",
                trend.label
              ]
            }
          )
        ] }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subtitle })
      ]
    }
  );
}
function getEveryNthWithCondition(array, n, isValid) {
  if (n < 1) {
    return [];
  }
  if (n === 1 && isValid === void 0) {
    return array;
  }
  var result = [];
  for (var i = 0; i < array.length; i += n) {
    {
      result.push(array[i]);
    }
  }
  return result;
}
function getAngledTickWidth(contentSize, unitSize, angle) {
  var size = {
    width: contentSize.width + unitSize.width,
    height: contentSize.height + unitSize.height
  };
  return getAngledRectangleWidth(size, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
  var isWidth = sizeKey === "width";
  var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
  if (sign === 1) {
    return {
      start: isWidth ? x : y,
      end: isWidth ? x + width : y + height
    };
  }
  return {
    start: isWidth ? x + width : y + height,
    end: isWidth ? x : y
  };
}
function isVisible(sign, tickPosition, getSize, start, end) {
  if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) {
    return false;
  }
  var size = getSize();
  return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
  return getEveryNthWithCondition(ticks, interval + 1);
}
function getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
  var result = (ticks || []).slice();
  var initialStart = boundaries.start, end = boundaries.end;
  var index = 0;
  var stepsize = 1;
  var start = initialStart;
  var _loop = function _loop2() {
    var entry = ticks === null || ticks === void 0 ? void 0 : ticks[index];
    if (entry === void 0) {
      return {
        v: getEveryNthWithCondition(ticks, stepsize)
      };
    }
    var i = index;
    var size;
    var getSize = function getSize2() {
      if (size === void 0) {
        size = getTickSize(entry, i);
      }
      return size;
    };
    var tickCoord = entry.coordinate;
    var isShow = index === 0 || isVisible(sign, tickCoord, getSize, start, end);
    if (!isShow) {
      index = 0;
      start = initialStart;
      stepsize += 1;
    }
    if (isShow) {
      start = tickCoord + sign * (getSize() / 2 + minTickGap);
      index += stepsize;
    }
  }, _ret;
  while (stepsize <= result.length) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
  return [];
}
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == _typeof$4(i) ? i : i + "";
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap) {
  var result = (ticks || []).slice();
  var len = result.length;
  var start = boundaries.start;
  var end = boundaries.end;
  var _loop = function _loop2(i2) {
    var entry = result[i2];
    var size;
    var getSize = function getSize2() {
      if (size === void 0) {
        size = getTickSize(entry, i2);
      }
      return size;
    };
    if (i2 === len - 1) {
      var gap = sign * (entry.coordinate + sign * getSize() / 2 - end);
      result[i2] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, {
        tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = isVisible(sign, entry.tickCoord, getSize, start, end);
    if (isShow) {
      end = entry.tickCoord - sign * (getSize() / 2 + minTickGap);
      result[i2] = _objectSpread$2(_objectSpread$2({}, entry), {}, {
        isShow: true
      });
    }
  };
  for (var i = len - 1; i >= 0; i--) {
    _loop(i);
  }
  return result;
}
function getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, preserveEnd) {
  var result = (ticks || []).slice();
  var len = result.length;
  var start = boundaries.start, end = boundaries.end;
  if (preserveEnd) {
    var tail = ticks[len - 1];
    var tailSize = getTickSize(tail, len - 1);
    var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
    result[len - 1] = tail = _objectSpread$2(_objectSpread$2({}, tail), {}, {
      tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate
    });
    var isTailShow = isVisible(sign, tail.tickCoord, function() {
      return tailSize;
    }, start, end);
    if (isTailShow) {
      end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
      result[len - 1] = _objectSpread$2(_objectSpread$2({}, tail), {}, {
        isShow: true
      });
    }
  }
  var count = preserveEnd ? len - 1 : len;
  var _loop2 = function _loop22(i2) {
    var entry = result[i2];
    var size;
    var getSize = function getSize2() {
      if (size === void 0) {
        size = getTickSize(entry, i2);
      }
      return size;
    };
    if (i2 === 0) {
      var gap = sign * (entry.coordinate - sign * getSize() / 2 - start);
      result[i2] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, {
        tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$2(_objectSpread$2({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = isVisible(sign, entry.tickCoord, getSize, start, end);
    if (isShow) {
      start = entry.tickCoord + sign * (getSize() / 2 + minTickGap);
      result[i2] = _objectSpread$2(_objectSpread$2({}, entry), {}, {
        isShow: true
      });
    }
  };
  for (var i = 0; i < count; i++) {
    _loop2(i);
  }
  return result;
}
function getTicks(props, fontSize, letterSpacing) {
  var tick = props.tick, ticks = props.ticks, viewBox = props.viewBox, minTickGap = props.minTickGap, orientation = props.orientation, interval = props.interval, tickFormatter = props.tickFormatter, unit = props.unit, angle = props.angle;
  if (!ticks || !ticks.length || !tick) {
    return [];
  }
  if (isNumber(interval) || Global.isSsr) {
    return getNumberIntervalTicks(ticks, typeof interval === "number" && isNumber(interval) ? interval : 0);
  }
  var candidates = [];
  var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
  var unitSize = unit && sizeKey === "width" ? getStringSize(unit, {
    fontSize,
    letterSpacing
  }) : {
    width: 0,
    height: 0
  };
  var getTickSize = function getTickSize2(content, index) {
    var value = isFunction(tickFormatter) ? tickFormatter(content.value, index) : content.value;
    return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
      fontSize,
      letterSpacing
    }), unitSize, angle) : getStringSize(value, {
      fontSize,
      letterSpacing
    })[sizeKey];
  };
  var sign = ticks.length >= 2 ? mathSign(ticks[1].coordinate - ticks[0].coordinate) : 1;
  var boundaries = getTickBoundaries(viewBox, sign, sizeKey);
  if (interval === "equidistantPreserveStart") {
    return getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap);
  }
  if (interval === "preserveStart" || interval === "preserveStartEnd") {
    candidates = getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, interval === "preserveStartEnd");
  } else {
    candidates = getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap);
  }
  return candidates.filter(function(entry) {
    return entry.isShow;
  });
}
var _excluded$1 = ["viewBox"], _excluded2$1 = ["viewBox"], _excluded3 = ["ticks"];
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$3.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$3(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$3(descriptor.key), descriptor);
  }
}
function _createClass$3(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$3(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$3(t, o, e) {
  return o = _getPrototypeOf$3(o), _possibleConstructorReturn$3(t, _isNativeReflectConstruct$3() ? Reflect.construct(o, e || [], _getPrototypeOf$3(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$3(self, call) {
  if (call && (_typeof$3(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$3(self);
}
function _assertThisInitialized$3(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$3() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$3 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$3(o) {
  _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$3(o);
}
function _inherits$3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$3(subClass, superClass);
}
function _setPrototypeOf$3(o, p) {
  _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$3(o, p);
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var CartesianAxis = /* @__PURE__ */ function(_Component) {
  function CartesianAxis2(props) {
    var _this;
    _classCallCheck$3(this, CartesianAxis2);
    _this = _callSuper$3(this, CartesianAxis2, [props]);
    _this.state = {
      fontSize: "",
      letterSpacing: ""
    };
    return _this;
  }
  _inherits$3(CartesianAxis2, _Component);
  return _createClass$3(CartesianAxis2, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(_ref, nextState) {
      var viewBox = _ref.viewBox, restProps = _objectWithoutProperties$1(_ref, _excluded$1);
      var _this$props = this.props, viewBoxOld = _this$props.viewBox, restPropsOld = _objectWithoutProperties$1(_this$props, _excluded2$1);
      return !shallowEqual(viewBox, viewBoxOld) || !shallowEqual(restProps, restPropsOld) || !shallowEqual(nextState, this.state);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var htmlLayer = this.layerReference;
      if (!htmlLayer) return;
      var tick = htmlLayer.getElementsByClassName("recharts-cartesian-axis-tick-value")[0];
      if (tick) {
        this.setState({
          fontSize: window.getComputedStyle(tick).fontSize,
          letterSpacing: window.getComputedStyle(tick).letterSpacing
        });
      }
    }
    /**
     * Calculate the coordinates of endpoints in ticks
     * @param  {Object} data The data of a simple tick
     * @return {Object} (x1, y1): The coordinate of endpoint close to tick text
     *  (x2, y2): The coordinate of endpoint close to axis
     */
  }, {
    key: "getTickLineCoord",
    value: function getTickLineCoord(data) {
      var _this$props2 = this.props, x = _this$props2.x, y = _this$props2.y, width = _this$props2.width, height = _this$props2.height, orientation = _this$props2.orientation, tickSize = _this$props2.tickSize, mirror = _this$props2.mirror, tickMargin = _this$props2.tickMargin;
      var x1, x2, y1, y2, tx, ty;
      var sign = mirror ? -1 : 1;
      var finalTickSize = data.tickSize || tickSize;
      var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
      switch (orientation) {
        case "top":
          x1 = x2 = data.coordinate;
          y2 = y + +!mirror * height;
          y1 = y2 - sign * finalTickSize;
          ty = y1 - sign * tickMargin;
          tx = tickCoord;
          break;
        case "left":
          y1 = y2 = data.coordinate;
          x2 = x + +!mirror * width;
          x1 = x2 - sign * finalTickSize;
          tx = x1 - sign * tickMargin;
          ty = tickCoord;
          break;
        case "right":
          y1 = y2 = data.coordinate;
          x2 = x + +mirror * width;
          x1 = x2 + sign * finalTickSize;
          tx = x1 + sign * tickMargin;
          ty = tickCoord;
          break;
        default:
          x1 = x2 = data.coordinate;
          y2 = y + +mirror * height;
          y1 = y2 + sign * finalTickSize;
          ty = y1 + sign * tickMargin;
          tx = tickCoord;
          break;
      }
      return {
        line: {
          x1,
          y1,
          x2,
          y2
        },
        tick: {
          x: tx,
          y: ty
        }
      };
    }
  }, {
    key: "getTickTextAnchor",
    value: function getTickTextAnchor() {
      var _this$props3 = this.props, orientation = _this$props3.orientation, mirror = _this$props3.mirror;
      var textAnchor;
      switch (orientation) {
        case "left":
          textAnchor = mirror ? "start" : "end";
          break;
        case "right":
          textAnchor = mirror ? "end" : "start";
          break;
        default:
          textAnchor = "middle";
          break;
      }
      return textAnchor;
    }
  }, {
    key: "getTickVerticalAnchor",
    value: function getTickVerticalAnchor() {
      var _this$props4 = this.props, orientation = _this$props4.orientation, mirror = _this$props4.mirror;
      var verticalAnchor = "end";
      switch (orientation) {
        case "left":
        case "right":
          verticalAnchor = "middle";
          break;
        case "top":
          verticalAnchor = mirror ? "start" : "end";
          break;
        default:
          verticalAnchor = mirror ? "end" : "start";
          break;
      }
      return verticalAnchor;
    }
  }, {
    key: "renderAxisLine",
    value: function renderAxisLine() {
      var _this$props5 = this.props, x = _this$props5.x, y = _this$props5.y, width = _this$props5.width, height = _this$props5.height, orientation = _this$props5.orientation, mirror = _this$props5.mirror, axisLine = _this$props5.axisLine;
      var props = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, filterProps(this.props, false)), filterProps(axisLine, false)), {}, {
        fill: "none"
      });
      if (orientation === "top" || orientation === "bottom") {
        var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
        props = _objectSpread$1(_objectSpread$1({}, props), {}, {
          x1: x,
          y1: y + needHeight * height,
          x2: x + width,
          y2: y + needHeight * height
        });
      } else {
        var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
        props = _objectSpread$1(_objectSpread$1({}, props), {}, {
          x1: x + needWidth * width,
          y1: y,
          x2: x + needWidth * width,
          y2: y + height
        });
      }
      return /* @__PURE__ */ React2.createElement("line", _extends$3({}, props, {
        className: clsx("recharts-cartesian-axis-line", get(axisLine, "className"))
      }));
    }
  }, {
    key: "renderTicks",
    value: (
      /**
       * render the ticks
       * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
       * @param {string} fontSize Fontsize to consider for tick spacing
       * @param {string} letterSpacing Letterspacing to consider for tick spacing
       * @return {ReactComponent} renderedTicks
       */
      function renderTicks(ticks, fontSize, letterSpacing) {
        var _this2 = this;
        var _this$props6 = this.props, tickLine = _this$props6.tickLine, stroke = _this$props6.stroke, tick = _this$props6.tick, tickFormatter = _this$props6.tickFormatter, unit = _this$props6.unit;
        var finalTicks = getTicks(_objectSpread$1(_objectSpread$1({}, this.props), {}, {
          ticks
        }), fontSize, letterSpacing);
        var textAnchor = this.getTickTextAnchor();
        var verticalAnchor = this.getTickVerticalAnchor();
        var axisProps = filterProps(this.props, false);
        var customTickProps = filterProps(tick, false);
        var tickLineProps = _objectSpread$1(_objectSpread$1({}, axisProps), {}, {
          fill: "none"
        }, filterProps(tickLine, false));
        var items = finalTicks.map(function(entry, i) {
          var _this2$getTickLineCoo = _this2.getTickLineCoord(entry), lineCoord = _this2$getTickLineCoo.line, tickCoord = _this2$getTickLineCoo.tick;
          var tickProps = _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({
            textAnchor,
            verticalAnchor
          }, axisProps), {}, {
            stroke: "none",
            fill: stroke
          }, customTickProps), tickCoord), {}, {
            index: i,
            payload: entry,
            visibleTicksCount: finalTicks.length,
            tickFormatter
          });
          return /* @__PURE__ */ React2.createElement(Layer, _extends$3({
            className: "recharts-cartesian-axis-tick",
            key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
          }, adaptEventsOfChild(_this2.props, entry, i)), tickLine && /* @__PURE__ */ React2.createElement("line", _extends$3({}, tickLineProps, lineCoord, {
            className: clsx("recharts-cartesian-axis-tick-line", get(tickLine, "className"))
          })), tick && CartesianAxis2.renderTickItem(tick, tickProps, "".concat(isFunction(tickFormatter) ? tickFormatter(entry.value, i) : entry.value).concat(unit || "")));
        });
        return /* @__PURE__ */ React2.createElement("g", {
          className: "recharts-cartesian-axis-ticks"
        }, items);
      }
    )
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props7 = this.props, axisLine = _this$props7.axisLine, width = _this$props7.width, height = _this$props7.height, ticksGenerator = _this$props7.ticksGenerator, className = _this$props7.className, hide = _this$props7.hide;
      if (hide) {
        return null;
      }
      var _this$props8 = this.props, ticks = _this$props8.ticks, noTicksProps = _objectWithoutProperties$1(_this$props8, _excluded3);
      var finalTicks = ticks;
      if (isFunction(ticksGenerator)) {
        finalTicks = ticks && ticks.length > 0 ? ticksGenerator(this.props) : ticksGenerator(noTicksProps);
      }
      if (width <= 0 || height <= 0 || !finalTicks || !finalTicks.length) {
        return null;
      }
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: clsx("recharts-cartesian-axis", className),
        ref: function ref(_ref2) {
          _this3.layerReference = _ref2;
        }
      }, axisLine && this.renderAxisLine(), this.renderTicks(finalTicks, this.state.fontSize, this.state.letterSpacing), Label.renderCallByParent(this.props));
    }
  }], [{
    key: "renderTickItem",
    value: function renderTickItem(option, props, value) {
      var tickItem;
      var combinedClassName = clsx(props.className, "recharts-cartesian-axis-tick-value");
      if (/* @__PURE__ */ React2.isValidElement(option)) {
        tickItem = /* @__PURE__ */ React2.cloneElement(option, _objectSpread$1(_objectSpread$1({}, props), {}, {
          className: combinedClassName
        }));
      } else if (isFunction(option)) {
        tickItem = option(_objectSpread$1(_objectSpread$1({}, props), {}, {
          className: combinedClassName
        }));
      } else {
        tickItem = /* @__PURE__ */ React2.createElement(Text, _extends$3({}, props, {
          className: "recharts-cartesian-axis-tick-value"
        }), value);
      }
      return tickItem;
    }
  }]);
}(reactExports.Component);
_defineProperty$3(CartesianAxis, "displayName", "CartesianAxis");
_defineProperty$3(CartesianAxis, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var _excluded = ["type", "layout", "connectNulls", "ref"], _excluded2 = ["key"];
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$2.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$2(t, o, e) {
  return o = _getPrototypeOf$2(o), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o, e || [], _getPrototypeOf$2(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$2() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$2(o);
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$2(o, p);
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Line = /* @__PURE__ */ function(_PureComponent) {
  function Line2() {
    var _this;
    _classCallCheck$2(this, Line2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$2(this, Line2, [].concat(args));
    _defineProperty$2(_this, "state", {
      isAnimationFinished: true,
      totalLength: 0
    });
    _defineProperty$2(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
      return "".concat(length, "px ").concat(totalLength - length, "px");
    });
    _defineProperty$2(_this, "getStrokeDasharray", function(length, totalLength, lines) {
      var lineLength = lines.reduce(function(pre, next) {
        return pre + next;
      });
      if (!lineLength) {
        return _this.generateSimpleStrokeDasharray(totalLength, length);
      }
      var count = Math.floor(length / lineLength);
      var remainLength = length % lineLength;
      var restLength = totalLength - length;
      var remainLines = [];
      for (var i = 0, sum = 0; i < lines.length; sum += lines[i], ++i) {
        if (sum + lines[i] > remainLength) {
          remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
          break;
        }
      }
      var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
      return [].concat(_toConsumableArray(Line2.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function(line) {
        return "".concat(line, "px");
      }).join(", ");
    });
    _defineProperty$2(_this, "id", uniqueId("recharts-line-"));
    _defineProperty$2(_this, "pathRef", function(node) {
      _this.mainCurve = node;
    });
    _defineProperty$2(_this, "handleAnimationEnd", function() {
      _this.setState({
        isAnimationFinished: true
      });
      if (_this.props.onAnimationEnd) {
        _this.props.onAnimationEnd();
      }
    });
    _defineProperty$2(_this, "handleAnimationStart", function() {
      _this.setState({
        isAnimationFinished: false
      });
      if (_this.props.onAnimationStart) {
        _this.props.onAnimationStart();
      }
    });
    return _this;
  }
  _inherits$2(Line2, _PureComponent);
  return _createClass$2(Line2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      this.setState({
        totalLength
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      if (totalLength !== this.state.totalLength) {
        this.setState({
          totalLength
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function getTotalLength() {
      var curveDom = this.mainCurve;
      try {
        return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
      } catch (err) {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar(needClip, clipPathId) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, points = _this$props.points, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, layout = _this$props.layout, children = _this$props.children;
      var errorBarItems = findAllByType(children, ErrorBar);
      if (!errorBarItems) {
        return null;
      }
      var dataPointFormatter = function dataPointFormatter2(dataPoint, dataKey) {
        return {
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          errorVal: getValueByDataKey(dataPoint.payload, dataKey)
        };
      };
      var errorBarProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React2.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
        return /* @__PURE__ */ React2.cloneElement(item, {
          key: "bar-".concat(item.props.dataKey),
          data: points,
          xAxis,
          yAxis,
          layout,
          dataPointFormatter
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props2 = this.props, dot = _this$props2.dot, points = _this$props2.points, dataKey = _this$props2.dataKey;
      var lineProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, lineProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          value: entry.value,
          dataKey,
          payload: entry.payload,
          points
        });
        return Line2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React2.createElement(Layer, _extends$2({
        className: "recharts-line-dots",
        key: "dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderCurveStatically",
    value: function renderCurveStatically(points, needClip, clipPathId, props) {
      var _this$props3 = this.props, type = _this$props3.type, layout = _this$props3.layout, connectNulls = _this$props3.connectNulls;
      _this$props3.ref;
      var others = _objectWithoutProperties(_this$props3, _excluded);
      var curveProps = _objectSpread(_objectSpread(_objectSpread({}, filterProps(others, true)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
        points
      }, props), {}, {
        type,
        layout,
        connectNulls
      });
      return /* @__PURE__ */ React2.createElement(Curve, _extends$2({}, curveProps, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function renderCurveWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props4 = this.props, points = _this$props4.points, strokeDasharray = _this$props4.strokeDasharray, isAnimationActive = _this$props4.isAnimationActive, animationBegin = _this$props4.animationBegin, animationDuration = _this$props4.animationDuration, animationEasing = _this$props4.animationEasing, animationId = _this$props4.animationId, animateNewValues = _this$props4.animateNewValues, width = _this$props4.width, height = _this$props4.height;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, totalLength = _this$state.totalLength;
      return /* @__PURE__ */ React2.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepData = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            if (animateNewValues) {
              var _interpolatorX = interpolateNumber(width * 2, entry.x);
              var _interpolatorY = interpolateNumber(height / 2, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: _interpolatorX(t),
                y: _interpolatorY(t)
              });
            }
            return _objectSpread(_objectSpread({}, entry), {}, {
              x: entry.x,
              y: entry.y
            });
          });
          return _this2.renderCurveStatically(stepData, needClip, clipPathId);
        }
        var interpolator = interpolateNumber(0, totalLength);
        var curLength = interpolator(t);
        var currentStrokeDasharray;
        if (strokeDasharray) {
          var lines = "".concat(strokeDasharray).split(/[,\s]+/gim).map(function(num) {
            return parseFloat(num);
          });
          currentStrokeDasharray = _this2.getStrokeDasharray(curLength, totalLength, lines);
        } else {
          currentStrokeDasharray = _this2.generateSimpleStrokeDasharray(totalLength, curLength);
        }
        return _this2.renderCurveStatically(points, needClip, clipPathId, {
          strokeDasharray: currentStrokeDasharray
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function renderCurve(needClip, clipPathId) {
      var _this$props5 = this.props, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points))) {
        return this.renderCurveWithAnimation(needClip, clipPathId);
      }
      return this.renderCurveStatically(points, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props6 = this.props, hide = _this$props6.hide, dot = _this$props6.dot, points = _this$props6.points, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, top = _this$props6.top, left = _this$props6.left, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, id = _this$props6.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-line", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React2.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React2.createElement("defs", null, /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React2.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React2.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(needClip, clipPathId), (hasSinglePoint || dot) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "repeat",
    value: function repeat(lines, count) {
      var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
      var result = [];
      for (var i = 0; i < count; ++i) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
      }
      return result;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;
      if (/* @__PURE__ */ React2.isValidElement(option)) {
        dotItem = /* @__PURE__ */ React2.cloneElement(option, props);
      } else if (isFunction(option)) {
        dotItem = option(props);
      } else {
        var key = props.key, dotProps = _objectWithoutProperties(props, _excluded2);
        var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
        dotItem = /* @__PURE__ */ React2.createElement(Dot, _extends$2({
          key
        }, dotProps, {
          className
        }));
      }
      return dotItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$2(Line, "displayName", "Line");
_defineProperty$2(Line, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !Global.isSsr,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: false,
  label: false
});
_defineProperty$2(Line, "getComposedData", function(_ref4) {
  var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var points = displayedData.map(function(entry, index) {
    var value = getValueByDataKey(entry, dataKey);
    if (layout === "horizontal") {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isNil(value) ? null : yAxis.scale(value),
        value,
        payload: entry
      };
    }
    return {
      x: isNil(value) ? null : xAxis.scale(value),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  return _objectSpread({
    points,
    layout
  }, offset);
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$1(t, o, e) {
  return o = _getPrototypeOf$1(o), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o, e || [], _getPrototypeOf$1(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf$1(o);
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf$1(o, p);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
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
  return _extends$1.apply(this, arguments);
}
function XAxisImpl(_ref) {
  var xAxisId = _ref.xAxisId;
  var width = useChartWidth();
  var height = useChartHeight();
  var axisOptions = useXAxisOrThrow(xAxisId);
  if (axisOptions == null) {
    return null;
  }
  return (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends$1({}, axisOptions, {
      className: clsx("recharts-".concat(axisOptions.axisType, " ").concat(axisOptions.axisType), axisOptions.className),
      viewBox: {
        x: 0,
        y: 0,
        width,
        height
      },
      ticksGenerator: function ticksGenerator(axis) {
        return getTicksOfAxis(axis, true);
      }
    }))
  );
}
var XAxis = /* @__PURE__ */ function(_React$Component) {
  function XAxis2() {
    _classCallCheck$1(this, XAxis2);
    return _callSuper$1(this, XAxis2, arguments);
  }
  _inherits$1(XAxis2, _React$Component);
  return _createClass$1(XAxis2, [{
    key: "render",
    value: function render() {
      return /* @__PURE__ */ reactExports.createElement(XAxisImpl, this.props);
    }
  }]);
}(reactExports.Component);
_defineProperty$1(XAxis, "displayName", "XAxis");
_defineProperty$1(XAxis, "defaultProps", {
  allowDecimals: true,
  hide: false,
  orientation: "bottom",
  width: 0,
  height: 30,
  mirror: false,
  xAxisId: 0,
  tickCount: 5,
  type: "category",
  padding: {
    left: 0,
    right: 0
  },
  allowDataOverflow: false,
  scale: "auto",
  reversed: false,
  allowDuplicatedCategory: true
});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
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
var YAxisImpl = function YAxisImpl2(_ref) {
  var yAxisId = _ref.yAxisId;
  var width = useChartWidth();
  var height = useChartHeight();
  var axisOptions = useYAxisOrThrow(yAxisId);
  if (axisOptions == null) {
    return null;
  }
  return (
    // @ts-expect-error the axisOptions type is not exactly what CartesianAxis is expecting.
    /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends({}, axisOptions, {
      className: clsx("recharts-".concat(axisOptions.axisType, " ").concat(axisOptions.axisType), axisOptions.className),
      viewBox: {
        x: 0,
        y: 0,
        width,
        height
      },
      ticksGenerator: function ticksGenerator(axis) {
        return getTicksOfAxis(axis, true);
      }
    }))
  );
};
var YAxis = /* @__PURE__ */ function(_React$Component) {
  function YAxis2() {
    _classCallCheck(this, YAxis2);
    return _callSuper(this, YAxis2, arguments);
  }
  _inherits(YAxis2, _React$Component);
  return _createClass(YAxis2, [{
    key: "render",
    value: function render() {
      return /* @__PURE__ */ reactExports.createElement(YAxisImpl, this.props);
    }
  }]);
}(reactExports.Component);
_defineProperty(YAxis, "displayName", "YAxis");
_defineProperty(YAxis, "defaultProps", {
  allowDuplicatedCategory: true,
  allowDecimals: true,
  hide: false,
  orientation: "left",
  width: 60,
  height: 0,
  mirror: false,
  yAxisId: 0,
  tickCount: 5,
  type: "number",
  padding: {
    top: 0,
    bottom: 0
  },
  allowDataOverflow: false,
  scale: "auto",
  reversed: false
});
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
const RISK_COLORS = {
  critical: "oklch(0.55 0.22 25)",
  high: "oklch(0.65 0.18 55)",
  medium: "oklch(0.68 0.15 85)",
  low: "oklch(0.62 0.16 145)"
};
const CHART_BG = "oklch(0.19 0.012 260)";
const CHART_BORDER = "1px solid oklch(0.28 0.02 260)";
const CHART_TEXT = "oklch(0.55 0.01 260)";
const CHART_GRID = "oklch(0.28 0.02 260)";
const tooltipStyle = {
  background: CHART_BG,
  border: CHART_BORDER,
  borderRadius: "8px",
  color: "oklch(0.92 0.01 260)",
  fontSize: "12px",
  boxShadow: "0 8px 24px oklch(0 0 0 / 0.4)"
};
function DashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardContent, {}) }) });
}
function DashboardContent() {
  const { data: stats, isLoading: statsLoading } = useAdvisorStats();
  const { data: distribution, isLoading: distLoading } = useRiskDistribution();
  const { data: trend, isLoading: trendLoading } = useRiskTrend();
  const { data: students, isLoading: studentsLoading } = useStudents();
  const seedMutation = useSeedSampleData();
  const handleSeed = async () => {
    try {
      await seedMutation.mutateAsync();
      ue.success("Sample data loaded", {
        description: "40+ students added to the system."
      });
    } catch {
      ue.error("Failed to seed data");
    }
  };
  const pieData = distribution ? [
    {
      name: "Critical",
      value: distribution.critical,
      color: RISK_COLORS.critical
    },
    { name: "High", value: distribution.high, color: RISK_COLORS.high },
    {
      name: "Medium",
      value: distribution.medium,
      color: RISK_COLORS.medium
    },
    { name: "Low", value: distribution.low, color: RISK_COLORS.low }
  ].filter((d) => d.value > 0) : [];
  const atRiskStudents = (students == null ? void 0 : students.filter((s) => s.riskLevel === "critical" || s.riskLevel === "high").sort((a, b) => b.riskScore - a.riskScore).slice(0, 8)) ?? [];
  const isEmpty = !studentsLoading && (!students || students.length === 0);
  const totalDistribution = distribution ? distribution.critical + distribution.high + distribution.medium + distribution.low : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground tracking-tight", children: "Academic Risk Monitor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Student dropout prediction & intervention tracking" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          "data-ocid": "dashboard.seed_data.button",
          onClick: handleSeed,
          disabled: seedMutation.isPending,
          variant: "outline",
          size: "sm",
          className: "gap-2 border-primary/40 text-primary hover:bg-primary/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
            seedMutation.isPending ? "Loading…" : "Load Sample Data"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/students", "data-ocid": "dashboard.view_all_header.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2 border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
            "View All Students"
          ]
        }
      ) }) })
    ] }),
    isEmpty && !seedMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "dashboard.empty_state",
        className: "bg-card border border-border rounded-xl p-16 text-center space-y-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-10 h-10 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: "No student data yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed", children: "Load the sample dataset to explore the full system with 40+ pre-configured students across all risk levels." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              "data-ocid": "dashboard.empty_seed.button",
              onClick: handleSeed,
              className: "gap-2 bg-primary text-primary-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-4 h-4" }),
                "Load 40+ Sample Students"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 xl:grid-cols-4 gap-4", children: statsLoading ? Array.from({ length: 4 }).map((_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" }, i)
    )) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          "data-ocid": "dashboard.total_students.card",
          title: "Total Students",
          value: (stats == null ? void 0 : stats.totalStudents) ?? 0,
          icon: Users,
          variant: "default",
          subtitle: "Enrolled & monitored"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          "data-ocid": "dashboard.at_risk.card",
          title: "At-Risk Students",
          value: (stats == null ? void 0 : stats.atRiskStudents) ?? 0,
          icon: TriangleAlert,
          variant: "warning",
          subtitle: "Require attention",
          trend: (stats == null ? void 0 : stats.totalStudents) ? {
            value: Math.round(
              stats.atRiskStudents / stats.totalStudents * 100
            ),
            label: "of total"
          } : void 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          "data-ocid": "dashboard.active_interventions.card",
          title: "Active Interventions",
          value: (stats == null ? void 0 : stats.activeInterventions) ?? 0,
          icon: Activity,
          variant: "info",
          subtitle: `${(stats == null ? void 0 : stats.resolvedInterventions) ?? 0} resolved`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          "data-ocid": "dashboard.critical.card",
          title: "Critical Cases",
          value: (stats == null ? void 0 : stats.criticalStudents) ?? 0,
          icon: ShieldAlert,
          variant: "critical",
          subtitle: "Immediate action needed"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:col-span-2 bg-card border border-border rounded-xl p-5",
          "data-ocid": "dashboard.risk_distribution.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Risk Distribution" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Current semester breakdown" }),
            distLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-lg" }) : pieData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: pieData,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 58,
                    outerRadius: 85,
                    paddingAngle: 3,
                    dataKey: "value",
                    strokeWidth: 0,
                    children: pieData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, entry.name))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    contentStyle: tooltipStyle,
                    formatter: (value, name) => [
                      `${value} students (${totalDistribution ? Math.round(value / totalDistribution * 100) : 0}%)`,
                      name
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Legend,
                  {
                    iconType: "circle",
                    iconSize: 8,
                    wrapperStyle: { fontSize: "11px", color: CHART_TEXT }
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 mt-2", children: [
                {
                  label: "Critical",
                  count: (distribution == null ? void 0 : distribution.critical) ?? 0,
                  color: "text-red-400",
                  bg: "bg-red-500/10"
                },
                {
                  label: "High",
                  count: (distribution == null ? void 0 : distribution.high) ?? 0,
                  color: "text-orange-400",
                  bg: "bg-orange-500/10"
                },
                {
                  label: "Medium",
                  count: (distribution == null ? void 0 : distribution.medium) ?? 0,
                  color: "text-yellow-400",
                  bg: "bg-yellow-500/10"
                },
                {
                  label: "Low",
                  count: (distribution == null ? void 0 : distribution.low) ?? 0,
                  color: "text-green-400",
                  bg: "bg-green-500/10"
                }
              ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center justify-between px-2.5 py-1.5 rounded-md ${item.bg}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${item.color}`, children: item.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${item.color}`, children: item.count })
                  ]
                },
                item.label
              )) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 flex items-center justify-center text-sm text-muted-foreground", children: "No data available" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "lg:col-span-3 bg-card border border-border rounded-xl p-5",
          "data-ocid": "dashboard.risk_trend.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Risk Trend" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-muted-foreground" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "6-month rolling overview by risk level" }),
            trendLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full rounded-lg" }) : trend && trend.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              LineChart,
              {
                data: trend,
                margin: { top: 5, right: 10, bottom: 5, left: -10 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      dataKey: "periodLabel",
                      tick: { fontSize: 10, fill: CHART_TEXT },
                      axisLine: { stroke: CHART_GRID },
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tick: { fontSize: 10, fill: CHART_TEXT },
                      axisLine: false,
                      tickLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Legend,
                    {
                      iconType: "circle",
                      iconSize: 8,
                      wrapperStyle: { fontSize: "11px", color: CHART_TEXT }
                    }
                  ),
                  ["critical", "high", "medium", "low"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Line,
                    {
                      type: "monotone",
                      dataKey: key,
                      stroke: RISK_COLORS[key],
                      strokeWidth: 2,
                      dot: false,
                      activeDot: { r: 5, strokeWidth: 0 }
                    },
                    key
                  ))
                ]
              }
            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 flex items-center justify-center text-sm text-muted-foreground", children: "No trend data available" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-xl overflow-hidden",
        "data-ocid": "dashboard.at_risk_students.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Recent At-Risk Students" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Top ",
                atRiskStudents.length,
                " students by risk score requiring intervention"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/students", "data-ocid": "dashboard.view_all_students.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "gap-1.5 text-xs h-7 text-primary hover:bg-primary/10",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-[1fr_1.2fr_auto_auto_1fr_auto] gap-4 px-5 py-2.5 bg-muted/30 border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Program" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Year" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Risk Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Risk Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "divide-y divide-border",
              "data-ocid": "dashboard.at_risk_students.list",
              children: studentsLoading ? Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3.5 flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-36" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
                ] }, i)
              )) : atRiskStudents.length > 0 ? atRiskStudents.map((student, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/students/$id",
                  params: { id: String(student.id) },
                  "data-ocid": `dashboard.at_risk_students.item.${idx + 1}`,
                  className: "flex md:grid md:grid-cols-[1fr_1.2fr_auto_auto_1fr_auto] items-center gap-4 px-5 py-3.5 hover:bg-muted/30 transition-smooth group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground", children: student.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: student.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate md:hidden", children: student.program })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden md:block text-sm text-muted-foreground truncate", children: student.program }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden md:block text-sm text-muted-foreground text-center", children: [
                      "Yr ",
                      student.year
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-sm font-bold tabular-nums ${student.riskLevel === "critical" ? "text-red-400" : student.riskLevel === "high" ? "text-orange-400" : student.riskLevel === "medium" ? "text-yellow-400" : "text-green-400"}`,
                        children: [
                          student.riskScore,
                          "%"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { level: student.riskLevel, size: "sm" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${student.status === "atRisk" ? "bg-orange-400" : student.status === "active" ? "bg-green-400" : "bg-red-400"}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground capitalize", children: student.status === "atRisk" ? "At Risk" : student.status })
                    ] })
                  ]
                },
                student.id
              )) : !studentsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "dashboard.at_risk_students.empty_state",
                  className: "px-5 py-12 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-green-500 mx-auto mb-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No high-risk students detected" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All students are currently within safe risk thresholds." })
                  ]
                }
              )
            }
          )
        ]
      }
    )
  ] });
}
export {
  DashboardPage as default
};
