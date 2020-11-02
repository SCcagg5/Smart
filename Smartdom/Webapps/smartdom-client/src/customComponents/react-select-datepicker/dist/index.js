'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var moment = _interopDefault(require('moment'));
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

/**
 * Determine id provided date is a valid date and falls between date range
 * @param {string} day
 * @param {string} month
 * @param {string} year
 * @param {object} props
 */
var isValidDate = function isValidDate(day, month, year, props) {
  var userDate = buildDateFromInput(day, month, year);

  // Must be a valid date
  if (!userDate.isValid()) {
    return props.invalidMessage || 'Not a valid date';
  }

  // Must be same or before max date
  if (props.maxDate) {
    var maxDate = buildDateFromDate(props.maxDate);
    if (!userDate.isSameOrBefore(maxDate)) {
      return props.maxDateMessage || 'Date must be less than ' + maxDate.add(1, 'day').format('MMMM Do, YYYY');
    }
  }

  // Must be same or after min date
  if (props.minDate) {
    var minDate = buildDateFromDate(props.minDate);
    if (!userDate.isSameOrAfter(minDate)) {
      return props.minDateMessage || 'Date must be greater than ' + minDate.subtract(1, 'day').format('MMMM Do, YYYY');
    }
  }

  return '';
};

/**
 * Build a moment date from input
 * @param {string} day
 * @param {string} month
 * @param {string} year
 */
var buildDateFromInput = function buildDateFromInput(day, month, year) {
  var date = moment(day + '/' + month + '/' + year, 'D/M/YYYY', true);
  return date;
};

/**
 * Build a moment date from date object
 * @param {Date} date
 */
var buildDateFromDate = function buildDateFromDate(date) {
  var newDate = moment(date);
  return newDate;
};

var MONTHMAP = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

var getDays = function getDays(showLabel) {
  var days = [];

  days.push(React__default.createElement(
    'option',
    { value: '', disabled: true },
    showLabel ? 'Day' : ''
  ));

  for (var i = 1; i <= 31; i++) {
    days.push(React__default.createElement(
      'option',
      { value: '' + i },
      i
    ));
  }

  return days;
};

var getMonths = function getMonths(showLabel) {
  var months = [];

  months.push(React__default.createElement(
    'option',
    { value: '', disabled: true },
    showLabel ? 'Month' : ''
  ));

  for (var i = 1; i <= 12; i++) {
    months.push(React__default.createElement(
      'option',
      { value: '' + i },
      MONTHMAP[i]
    ));
  }

  return months;
};

var getYears = function getYears(max, min, showLabel, value) {
  var years = [];
  var maxYear = void 0;
  var minYear = void 0;

  if (!!max && !!min) {
    // Max and min year
    maxYear = moment(max).year();
    minYear = moment(min).year();
  } else if (!!max && !min) {
    // Only max year
    maxYear = moment(max).year();
    minYear = 1900;
  } else if (!max && !!min) {
    // Only min year
    maxYear = moment().year();
    minYear = moment(min).year();
  } else {
    // No max or min
    maxYear = moment(max).year();
    minYear = 1900;
  }

  if (value) {
    if (value > maxYear) {
      maxYear = value;
    }

    if (value < minYear) {
      minYear = value;
    }
  }

  years.push(React__default.createElement(
    'option',
    { value: '', disabled: true },
    showLabel ? 'Year' : ''
  ));

  for (var i = maxYear; i >= minYear; i--) {
    years.push(React__default.createElement(
      'option',
      { value: '' + i },
      i
    ));
  }

  return years;
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles_flexRow__3lnwY {\n  display: flex;\n  flex-direction: row;\n}\n\n.styles_flexColumn__25_Q1 {\n  display: flex;\n  flex-direction: column;\n}";
var styles = { "flexRow": "styles_flexRow__3lnwY", "flexColumn": "styles_flexColumn__25_Q1" };
styleInject(css);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
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

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var SelectDatepicker = function (_Component) {
  inherits(SelectDatepicker, _Component);

  function SelectDatepicker(props) {
    classCallCheck(this, SelectDatepicker);

    var _this = possibleConstructorReturn(this, (SelectDatepicker.__proto__ || Object.getPrototypeOf(SelectDatepicker)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = _extends({
      value: null,
      error: null,
      hasError: false
    }, _this.getDateStateFromProps(props));
    return _this;
  }

  /**
   * Update state when props change
   */


  /**
   * Parse date object into day, month, year state
   */


  /**
   * Handle input hange event
   */


  /**
   * Validate inputs. Varify that they are set and contain a valid date.
   */


  /**
   * Set error state
   */


  /**
   * Convert inputs to date object and call onDateChange function
   */


  /**
   * Set date object in state and return new date
   */


  /**
   * Return requested date container
   */


  /**
   * Renders a date container element
   */


  createClass(SelectDatepicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var orderArray = this.props.format.split('/');

      return React__default.createElement(
        'div',
        { className: 'rid ' + this.props.className },
        React__default.createElement(
          'div',
          { className: 'rid_date-container ' + styles.flexRow },
          orderArray.map(function (value, i) {
            return React__default.createElement(
              React__default.Fragment,
              { key: i },
              _this2.getDateFormat(value)
            );
          })
        ),
        this.props.showErrors && React__default.createElement(
          'div',
          { className: 'error-message' },
          this.state.error
        )
      );
    }
  }]);
  return SelectDatepicker;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.componentDidMount = function () {
    _this3.validate();
  };

  this.componentWillReceiveProps = function (props) {
    if (props.value !== _this3.state.value) {
      _this3.setState(_extends({
        value: props.value
      }, _this3.getDateStateFromProps(props)));
    }

    return null;
  };

  this.getDateStateFromProps = function (props) {
    return {
      day: props.value ? props.value.getDate() : '',
      month: props.value ? props.value.getMonth() + 1 : '',
      year: props.value ? props.value.getFullYear() : ''
    };
  };

  this.onInputChange = function (e) {
    _this3.setState(defineProperty({
      error: '',
      hasError: false
    }, e.target.name, e.target.value), function () {
      _this3.validate();
    });
  };

  this.validate = function () {
    var _state = _this3.state,
        day = _state.day,
        month = _state.month,
        year = _state.year;

    // Must contain values

    if (!day || !month || !year) {
      _this3.onDateChange(null);
      return;
    }

    // Validate date input
    var error = isValidDate(day, month, year, _this3.props);
    if (error !== '') {
      _this3.renderError(error, true);
      return;
    }

    _this3.validDateChange();
  };

  this.renderError = function (error, hasError) {
    _this3.setState({
      error: error,
      hasError: hasError
    });

    _this3.onDateChange(null);
  };

  this.validDateChange = function () {
    var date = buildDateFromInput(_this3.state.day, _this3.state.month, _this3.state.year);

    _this3.onDateChange(date.toDate());
  };

  this.onDateChange = function (date) {
    _this3.setState({
      value: date
    }, function () {
      _this3.props.onDateChange(date);
    });
  };

  this.getDateFormat = function (value) {
    var format = {
      day: _this3.renderDateContainer('rid_day-container', 'day', 'Day', _this3.state.day, getDays(_this3.props.showLabels)),
      month: _this3.renderDateContainer('rid_month-container', 'month', 'Month', _this3.state.month, getMonths(_this3.props.showLabels)),
      year: _this3.renderDateContainer('rid_year-container', 'year', 'Year', _this3.state.year, getYears(_this3.props.maxDate, _this3.props.minDate, _this3.props.showLabels, _this3.state.year))
    };

    return format[value];
  };

  this.renderDateContainer = function (className, id, label, value, options) {
    return React__default.createElement(
      'div',
      { className: className + ' ' + styles.flexColumn },
      _this3.props.showLabels ? React__default.createElement(
        'label',
        { htmlFor: id },
        label
      ) : null,
      React__default.createElement(
        'select',
        {
          className: '' + (_this3.state.hasError ? 'has-error' : ''),
          id: id,
          name: id,
          value: value,
          onChange: _this3.onInputChange
        },
        options.map(function (value, i) {
          return React__default.createElement(
            React__default.Fragment,
            { key: i },
            value
          );
        })
      )
    );
  };
};


SelectDatepicker.defaultProps = {
  value: null,
  showLabels: true,
  showErrors: true,
  format: 'month/day/year',
  className: ''
};

SelectDatepicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  // eslint-disable-next-line react/no-unused-prop-types
  minDate: PropTypes.instanceOf(Date),
  // eslint-disable-next-line react/no-unused-prop-types
  maxDate: PropTypes.instanceOf(Date),
  // eslint-disable-next-line react/no-unused-prop-types
  maxDateMessage: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  minDateMessage: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  invalidMessage: PropTypes.string,
  showLabels: PropTypes.bool,
  showErrors: PropTypes.bool,
  onDateChange: PropTypes.func,
  className: PropTypes.string,
  format: PropTypes.oneOf(['day/month/year', 'day/year/month', 'month/day/year', 'month/year/day', 'year/month/day', 'year/day/month'])
};

module.exports = SelectDatepicker;
//# sourceMappingURL=index.js.map
