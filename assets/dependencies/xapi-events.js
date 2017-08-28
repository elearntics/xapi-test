(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.xapiEvents = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventsConfig = void 0;

xAPIEventsConfig = {
  debug: false
};

exports.default = xAPIEventsConfig;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EventStatus = Object.freeze({
  ON: 'ON',
  OFF: 'OFF',
  DISABLED: 'DISABLED'
});

exports.EventStatus = EventStatus;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xapiEventValidator = undefined;

var _eventStatus = require('./event-status');

var IS_FUNCTION = '[object Function]',
    MUST_HAVE_ID = 'Must have an id',
    MUST_HAVE_UNIQUE_ID = 'Must have a unique id',
    MUST_HAVE_STATUS = 'Must have a status',
    MUST_HAVE_STATEMENT_PROPERTIES = 'Must have a statement with the required statement properties',
    MUST_HAVE_CALLBACK = 'Must have a correct callback function',
    NOT_VALID = 'Not valid event:',
    VALID = 'Valid event';

var xapiEventValidator = void 0;

exports.xapiEventValidator = xapiEventValidator = {
  isValidEvent: function isValidEvent(e) {
    this.log('isValidEvent', { e: e });
    return !_validateEvent.call(this, e).errors.length;
  }
};

exports.xapiEventValidator = xapiEventValidator;

/* Private */

function _validateEvent(e) {
  this.log('validateEvent', { e: e });
  this.errors = [];

  _mustHaveId.call(this, e);
  _mustHaveUniqueId.call(this, e);
  _mustHaveName.call(this, e);
  _mustHaveStatus.call(this, e);
  _mustHaveCallbackFunction.call(this, e);

  this.errors.length ? this.log(NOT_VALID, { e: e, errors: this.errors }) : this.log(VALID);
  return this;
}

function _mustHaveId(e) {
  this.log('_mustHaveId', { e: e });

  if (!e.id) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveUniqueId(e) {
  this.log('_mustHaveUniqueId', { e: e });

  if (!!this.events.length && !!this.events.filter(function (xapiEvent) {
    return xapiEvent.id === e.id;
  }).length) {
    this.errors.push(MUST_HAVE_UNIQUE_ID);
    return false;
  }

  return true;
}

function _mustHaveName(e) {
  this.log('_mustHaveName', { e: e });

  if (!e.name) {
    this.errors.push(MUST_HAVE_ID);
    return false;
  }

  return true;
}

function _mustHaveStatus(e) {
  this.log('_mustHaveStatus', { e: e });

  if (!e.status || !_isValidStatus.call(this, e)) {
    this.errors.push(MUST_HAVE_STATUS);
    return false;
  }

  return true;
}

function _isValidStatus(e) {
  this.log('isValidStatus', { e: e });
  return e.status === _eventStatus.EventStatus.ON || e.status === _eventStatus.EventStatus.OFF || e.status === _eventStatus.EventStatus.DISABLED;
}

function _mustHaveStatementWithStatementProperties(e) {
  this.log('_mustHaveStatementWithStatementProperties', { e: e });

  if (!!e.statementProperties.filter(function (property) {
    return !e.statement[property];
  }).length) {
    this.errors.push(MUST_HAVE_STATEMENT_PROPERTIES);
    return false;
  }

  return true;
}

function _mustHaveCallbackFunction(e) {
  this.log('_mustHaveCallbackFunction', { e: e });

  if (!e && Object.prototype.toString.call(e.callback) !== IS_FUNCTION) {
    this.errors.push(MUST_HAVE_CALLBACK);
    return false;
  }

  return true;
}

},{"./event-status":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xapiEvent = undefined;

var _eventStatus = require('./event-status');

var xapiEvent = void 0;

exports.xapiEvent = xapiEvent = {
  id: undefined,
  callback: undefined,
  name: undefined,
  elementSelectors: [],
  targetElements: [],
  statement: undefined,
  status: _eventStatus.EventStatus.DISABLED,
  isValid: false,
  statementProperties: []
};

exports.xapiEvent = xapiEvent;

},{"./event-status":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xapiHelpers = void 0;

exports.xapiHelpers = xapiHelpers = {
  getSelection: function getSelection() {
    return window.getSelection().toString();
  }
};

exports.xapiHelpers = xapiHelpers;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var logger = void 0;

logger = {
  debug: _config2.default.debug,
  log: function log() {
    if (!_config2.default.debug) {
      return false;
    }
    try {
      var _console;

      (_console = console).log.apply(_console, arguments);
      return true;
    } catch (reason) {
      return false;
    }
  }
};

exports.default = logger;

},{"../config":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventStatementContext = void 0;

xAPIEventStatementContext = {
  registration: undefined,
  instructor: undefined,
  team: undefined,
  contextActivities: undefined,
  revision: undefined,
  platform: undefined,
  language: undefined,
  statement: undefined,
  extensions: undefined
};

exports.default = xAPIEventStatementContext;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var xAPIEventStatement = void 0;

xAPIEventStatement = {
  actor: undefined,
  verb: undefined,
  object: undefined,
  result: undefined,
  context: undefined,
  timestamp: undefined,
  stored: undefined,
  authority: undefined,
  version: undefined,
  attachments: undefined
};

exports.default = xAPIEventStatement;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xapiEvents = undefined;

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _statement = require('./xapi/statement');

var _statement2 = _interopRequireDefault(_statement);

var _statementContext = require('./xapi/statement-context');

var _statementContext2 = _interopRequireDefault(_statementContext);

var _eventStatus = require('./events/event-status');

var _xapiEventValidator = require('./events/xapi-event-validator');

var _xapiEvent = require('./events/xapi-event');

var _xapiHelpers = require('./events/xapi-helpers');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var xapiEvents = exports.xapiEvents = {
  log: _logger2.default.log,
  baseStatement: {},
  events: [],
  errors: [],
  targetElements: [],
  LRS: {},
  helpers: _xapiHelpers.xapiHelpers,

  init: function init(actor, authority) {
    this.log('init');
    return this.setBaseStatement(actor, authority);
  },
  reset: function reset() {
    this.log('reset');
    return this.setBaseStatement(this.baseStatement.author, this.baseStatement.authority);
  },
  getTargetElements: function getTargetElements() {
    var _this = this;

    this.log('getTargetElements');

    this.events.forEach(function (xapiEvent) {
      xapiEvent.elementSelectors.forEach(function (elementSelector) {
        _this.log('elementSelector', elementSelector);
        var elements = document.querySelectorAll(elementSelector);

        if (elements.length) {
          elements.forEach(function (element) {
            _this.log('elements', element);
            _this.targetElements.push(element);
          });
        }
      });
    });
  },
  setBaseStatement: function setBaseStatement(actor, authority) {
    this.log('setBaseStatement');

    return !!actor && !!authority ? _buildBaseStatement.call(this, actor, authority) : false;
  },
  setStatementConfigInfo: function setStatementConfigInfo() {
    this.log('setStatementConfigInfo');

    return this.baseStatement ? _buildBaseStatementConfig.call(this) : false;
  },
  listenEnabledEvents: function listenEnabledEvents() {
    var _this2 = this;

    this.log('listenEnabledEvents');

    this.events.forEach(function (xapiEvent) {
      _this2.log('xapiEvent', xapiEvent);
      if (_isEnabled.call(_this2, xapiEvent)) {
        var targetElements = document.querySelectorAll(xapiEvent.elementSelectors);

        targetElements.forEach(function (targetElement) {
          if (targetElement) {
            _this2.log('targetElement', targetElement);
            targetElement.addEventListener(xapiEvent.name, function (_event) {
              xapiEvent.callback.call(_this2, _event, xapiEvent);
            }, false);
          }
        });
      }
    });
  },
  stopEnabledEvents: function stopEnabledEvents() {
    var _this3 = this;

    this.log('stopEnabledEvents');
    this.events.forEach(function (xapiEvent) {
      if (_isEnabled.call(_this3, xapiEvent)) {
        _this3.targetElements.forEach(function (targetElement) {
          targetElement.removeEventListener(xapiEvent.name);
        });
      }
    });
  },
  addEvent: function addEvent(eventObj) {
    this.log('addEvent', { eventObj: eventObj });

    if (this.isValidEvent(eventObj)) {
      var event = Object.assign({}, _xapiEvent.xapiEvent, eventObj);
      this.events.push(event);
      return true;
    }

    return false;
  },
  addEvents: function addEvents(events) {
    var _this4 = this;

    this.log('addEvents', { events: events });

    events.forEach(function (_event) {
      _this4.addEvent(_event);
    });

    this.getTargetElements();
  },
  removeEventById: function removeEventById(eventId) {
    this.log('removeEventById', { eventId: eventId });
    this.events = this.events.filter(function (xapiEvent) {
      return xapiEvent.id !== eventId;
    });
  },
  removeEventsByElementId: function removeEventsByElementId(elementId) {
    this.log('removeEventsByElementId', { elementId: elementId });
    this.events = this.events.filter(function (xapiEvent) {
      return xapiEvent.elementId !== elementId;
    });
  },
  enableEvent: function enableEvent(_event) {
    this.log('enableEvent', { _event: _event });
    this.events.forEach(function (xapiEvent) {
      if (_event.id === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.ON;
        return;
      }
    });
  },
  enableAllEvents: function enableAllEvents() {
    this.log('enableAllEvents');
    this.events.forEach(function (xapiEvent) {
      xapiEvent.status = _eventStatus.EventStatus.ON;
    });
  },
  enableEventById: function enableEventById(eventId) {
    this.log('enableEventById');
    this.events.forEach(function (xapiEvent) {
      if (eventId === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.ON;
        return;
      }
    });
  },
  enableElementsByElementId: function enableElementsByElementId(elementId) {
    this.log('enableElementsByElementId', { elementId: elementId });
    this.events.forEach(function (xapiEvent) {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = _eventStatus.EventStatus.ON;
      }
    });
  },
  disableEvent: function disableEvent(_event) {
    this.log('disableEvent', { _event: _event });
    this.events.forEach(function (xapiEvent) {
      if (_event.id === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.OFF;
        return;
      }
    });
  },
  disableAllEvents: function disableAllEvents() {
    this.log('disableAllEvents');
    this.events.forEach(function (xapiEvent) {
      xapiEvent.status = _eventStatus.EventStatus.OFF;
    });
  },
  disableEventById: function disableEventById(eventId) {
    this.log('disableEventById', { eventId: eventId });
    this.events.forEach(function (xapiEvent) {
      if (eventId === xapiEvent.id) {
        xapiEvent.status = _eventStatus.EventStatus.OFF;
        return;
      }
    });
  },
  disableElementsByElementId: function disableElementsByElementId(elementId) {
    this.log('disableElementsByElementId', { elementId: elementId });
    this.events.forEach(function (xapiEvent) {
      if (elementId === xapiEvent.elementId) {
        xapiEvent.status = _eventStatus.EventStatus.OFF;
      }
    });
  },
  isValidEvent: function isValidEvent(_event) {
    this.log('isValidEvent', { _event: _event });
    return _xapiEventValidator.xapiEventValidator.isValidEvent.call(this, _event);
  }
};

/* Private */

function _buildBaseStatement(actor, authority) {
  var context = void 0;
  this.log('_buildBaseStatement', { actor: actor, authority: authority });

  context = _buildBaseStatementContext.call(this, actor);
  return Object.assign(this.baseStatement, _statement2.default, { actor: actor, context: context, authority: authority });
}

function _buildBaseStatementConfig() {
  var baseStatement = void 0;
  this.log('_buildBaseStatementConfig');

  baseStatement = this.baseStatement;

  return {
    baseStatement: baseStatement,
    platform: navigator ? navigator.userAgent : null,
    language: navigator ? navigator.language : null
  };
}

function _buildBaseStatementContext(actor) {
  var instructor = void 0;
  this.log('_getStatementConfigStructure', { actor: actor });

  instructor = actor || null;
  return Object.assign(_statementContext2.default, { instructor: instructor });
}

function _isEnabled(xapiEvent) {
  this.log('_isEnabled', xapiEvent.status);
  return xapiEvent.status === _eventStatus.EventStatus.ON;
}

},{"./events/event-status":2,"./events/xapi-event":4,"./events/xapi-event-validator":3,"./events/xapi-helpers":5,"./utils/logger":6,"./xapi/statement":8,"./xapi/statement-context":7}]},{},[9])(9)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29uZmlnLmpzIiwic3JjL2V2ZW50cy9ldmVudC1zdGF0dXMuanMiLCJzcmMvZXZlbnRzL3hhcGktZXZlbnQtdmFsaWRhdG9yLmpzIiwic3JjL2V2ZW50cy94YXBpLWV2ZW50LmpzIiwic3JjL2V2ZW50cy94YXBpLWhlbHBlcnMuanMiLCJzcmMvdXRpbHMvbG9nZ2VyLmpzIiwic3JjL3hhcGkvc3RhdGVtZW50LWNvbnRleHQuanMiLCJzcmMveGFwaS9zdGF0ZW1lbnQuanMiLCJzcmMveGFwaUV2ZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBSSx3QkFBSjs7QUFFQTtTQUFBLEFBQW1CLEFBQ1Y7QUFEVSxBQUNqQjs7a0IsQUFHYTs7Ozs7Ozs7QUNOZixJQUFNLHFCQUFjLEFBQU87TUFBTyxBQUM1QixBQUNKO09BRmdDLEFBRTNCLEFBQ0w7WUFIRixBQUFvQixBQUFjLEFBR3RCO0FBSHNCLEFBQ2hDLENBRGtCOztRLEFBTVgsYyxBQUFBOzs7Ozs7Ozs7O0FDTlQ7O0FBRUEsSUFDRSxjQURGLEFBQ2dCO0lBQ2QsZUFGRixBQUVpQjtJQUNmLHNCQUhGLEFBR3dCO0lBQ3RCLG1CQUpGLEFBSXFCO0lBQ25CLGlDQUxGLEFBS21DO0lBQ2pDLHFCQU5GLEFBTXVCO0lBQ3JCLFlBUEYsQUFPYztJQUNaLFFBUkYsQUFRVTs7QUFFVixJQUFJLDBCQUFKOztBQUVBLFFBQUEsQUFPUztBQVBZLHNDQUFBLEFBQ04sR0FBRyxBQUNkO1NBQUEsQUFBSyxJQUFMLEFBQVMsZ0JBQWdCLEVBQUUsR0FBM0IsQUFBeUIsQUFDekI7V0FBTyxDQUFDLGVBQUEsQUFBZSxLQUFmLEFBQW9CLE1BQXBCLEFBQTBCLEdBQTFCLEFBQTZCLE9BQXJDLEFBQTRDLEFBQzdDO0FBSkgsQUFBcUI7QUFBQSxBQUNuQjs7USxBQU1PLHFCLEFBQUE7O0FBRVQ7O0FBRUEsU0FBQSxB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aEIsQUFBcUIsQUFFckI7OzttQkFBTyxBQUVMO2NBQVUsWUFBWSxVQUFaLEFBQXNCLFlBRjNCLEFBRXVDLEFBQzVDO2NBQVUsWUFBWSxVQUFaLEFBQXNCLFdBSGxDLEFBQU8sQUFHc0MsQUFFOUM7QUFMUSxBQUNMOzs7QUFNSixTQUFBLEFBQVMsMkJBQVQsQUFBb0MsT0FBTyxBQUN6QztNQUFJLGtCQUFKLEFBQ0E7T0FBQSxBQUFLLElBQUwsQUFBUyxnQ0FBZ0MsRUFBRSxPQUEzQyxBQUF5QyxBQUV6Qzs7ZUFBYSxTQUFiLEFBQXNCLEFBQ3RCO1NBQU8sT0FBQSxBQUFPLG1DQUFrQyxFQUFFLFlBQWxELEFBQU8sQUFBeUMsQUFDakQ7OztBQUVELFNBQUEsQUFBUyxXQUFULEFBQW9CLFdBQVcsQUFDN0I7T0FBQSxBQUFLLElBQUwsQUFBUyxjQUFjLFVBQXZCLEFBQWlDLEFBQ2pDO1NBQU8sVUFBQSxBQUFVLFdBQVcseUJBQTVCLEFBQXdDLEFBQ3pDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCB4QVBJRXZlbnRzQ29uZmlnO1xuXG54QVBJRXZlbnRzQ29uZmlnID0ge1xuICBkZWJ1ZzogZmFsc2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHhBUElFdmVudHNDb25maWc7XG4iLCJjb25zdCBFdmVudFN0YXR1cyA9IE9iamVjdC5mcmVlemUoe1xuICBPTjogJ09OJyxcbiAgT0ZGOiAnT0ZGJyxcbiAgRElTQUJMRUQ6ICdESVNBQkxFRCdcbn0pO1xuXG5leHBvcnQgeyBFdmVudFN0YXR1cyB9O1xuIiwiaW1wb3J0IHsgRXZlbnRTdGF0dXMgfSBmcm9tICcuL2V2ZW50LXN0YXR1cyc7XG5cbmNvbnN0XG4gIElTX0ZVTkNUSU9OID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgTVVTVF9IQVZFX0lEID0gJ011c3QgaGF2ZSBhbiBpZCcsXG4gIE1VU1RfSEFWRV9VTklRVUVfSUQgPSAnTXVzdCBoYXZlIGEgdW5pcXVlIGlkJyxcbiAgTVVTVF9IQVZFX1NUQVRVUyA9ICdNdXN0IGhhdmUgYSBzdGF0dXMnLFxuICBNVVNUX0hBVkVfU1RBVEVNRU5UX1BST1BFUlRJRVMgPSAnTXVzdCBoYXZlIGEgc3RhdGVtZW50IHdpdGggdGhlIHJlcXVpcmVkIHN0YXRlbWVudCBwcm9wZXJ0aWVzJyxcbiAgTVVTVF9IQVZFX0NBTExCQUNLID0gJ011c3QgaGF2ZSBhIGNvcnJlY3QgY2FsbGJhY2sgZnVuY3Rpb24nLFxuICBOT1RfVkFMSUQgPSAnTm90IHZhbGlkIGV2ZW50OicsXG4gIFZBTElEID0gJ1ZhbGlkIGV2ZW50JztcblxubGV0IHhhcGlFdmVudFZhbGlkYXRvcjtcblxueGFwaUV2ZW50VmFsaWRhdG9yID0ge1xuICBpc1ZhbGlkRXZlbnQoZSkge1xuICAgIHRoaXMubG9nKCdpc1ZhbGlkRXZlbnQnLCB7IGUgfSk7XG4gICAgcmV0dXJuICFfdmFsaWRhdGVFdmVudC5jYWxsKHRoaXMsIGUpLmVycm9ycy5sZW5ndGg7XG4gIH1cbn07XG5cbmV4cG9ydCB7IHhhcGlFdmVudFZhbGlkYXRvciB9O1xuXG4vKiBQcml2YXRlICovXG5cbmZ1bmN0aW9uIF92YWxpZGF0ZUV2ZW50KGUpIHtcbiAgdGhpcy5sb2coJ3ZhbGlkYXRlRXZlbnQnLCB7IGUgfSk7XG4gIHRoaXMuZXJyb3JzID0gW107XG5cbiAgX211c3RIYXZlSWQuY2FsbCh0aGlzLCBlKTtcbiAgX211c3RIYXZlVW5pcXVlSWQuY2FsbCh0aGlzLCBlKTtcbiAgX211c3RIYXZlTmFtZS5jYWxsKHRoaXMsIGUpO1xuICBfbXVzdEhhdmVTdGF0dXMuY2FsbCh0aGlzLCBlKTtcbiAgX211c3RIYXZlQ2FsbGJhY2tGdW5jdGlvbi5jYWxsKHRoaXMsIGUpO1xuXG4gIHRoaXMuZXJyb3JzLmxlbmd0aCA/IHRoaXMubG9nKE5PVF9WQUxJRCwgeyBlLCBlcnJvcnM6IHRoaXMuZXJyb3JzIH0pIDogdGhpcy5sb2coVkFMSUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gX211c3RIYXZlSWQoZSkge1xuICB0aGlzLmxvZygnX211c3RIYXZlSWQnLCB7IGUgfSk7XG5cbiAgaWYgKCFlLmlkKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChNVVNUX0hBVkVfSUQpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBfbXVzdEhhdmVVbmlxdWVJZChlKSB7XG4gIHRoaXMubG9nKCdfbXVzdEhhdmVVbmlxdWVJZCcsIHsgZSB9KTtcblxuICBpZiAoISF0aGlzLmV2ZW50cy5sZW5ndGggJiYgISF0aGlzLmV2ZW50cy5maWx0ZXIoKHhhcGlFdmVudCkgPT4geGFwaUV2ZW50LmlkID09PSBlLmlkKS5sZW5ndGgpIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9VTklRVUVfSUQpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZU5hbWUoZSkge1xuICB0aGlzLmxvZygnX211c3RIYXZlTmFtZScsIHsgZSB9KTtcblxuICBpZiAoIWUubmFtZSkge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX0lEKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX211c3RIYXZlU3RhdHVzKGUpIHtcbiAgdGhpcy5sb2coJ19tdXN0SGF2ZVN0YXR1cycsIHsgZSB9KTtcblxuICBpZiAoIWUuc3RhdHVzIHx8ICFfaXNWYWxpZFN0YXR1cy5jYWxsKHRoaXMsIGUpKSB7XG4gICAgdGhpcy5lcnJvcnMucHVzaChNVVNUX0hBVkVfU1RBVFVTKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2lzVmFsaWRTdGF0dXMoZSkge1xuICB0aGlzLmxvZygnaXNWYWxpZFN0YXR1cycsIHsgZSB9KTtcbiAgcmV0dXJuIChcbiAgICBlLnN0YXR1cyA9PT0gRXZlbnRTdGF0dXMuT04gfHxcbiAgICBlLnN0YXR1cyA9PT0gRXZlbnRTdGF0dXMuT0ZGIHx8XG4gICAgZS5zdGF0dXMgPT09IEV2ZW50U3RhdHVzLkRJU0FCTEVEXG4gICk7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZVN0YXRlbWVudFdpdGhTdGF0ZW1lbnRQcm9wZXJ0aWVzKGUpIHtcbiAgdGhpcy5sb2coJ19tdXN0SGF2ZVN0YXRlbWVudFdpdGhTdGF0ZW1lbnRQcm9wZXJ0aWVzJywgeyBlIH0pO1xuXG4gIGlmICghIWUuc3RhdGVtZW50UHJvcGVydGllcy5maWx0ZXIoKHByb3BlcnR5KSA9PiAhZS5zdGF0ZW1lbnRbcHJvcGVydHldKS5sZW5ndGgpIHtcbiAgICB0aGlzLmVycm9ycy5wdXNoKE1VU1RfSEFWRV9TVEFURU1FTlRfUFJPUEVSVElFUyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIF9tdXN0SGF2ZUNhbGxiYWNrRnVuY3Rpb24oZSkge1xuICB0aGlzLmxvZygnX211c3RIYXZlQ2FsbGJhY2tGdW5jdGlvbicsIHsgZSB9KTtcblxuICBpZiAoIWUgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUuY2FsbGJhY2spICE9PSBJU19GVU5DVElPTikge1xuICAgIHRoaXMuZXJyb3JzLnB1c2goTVVTVF9IQVZFX0NBTExCQUNLKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB7IEV2ZW50U3RhdHVzIH0gZnJvbSAnLi9ldmVudC1zdGF0dXMnO1xubGV0IHhhcGlFdmVudDtcblxueGFwaUV2ZW50ID0ge1xuICBpZDogdW5kZWZpbmVkLFxuICBjYWxsYmFjazogdW5kZWZpbmVkLFxuICBuYW1lOiB1bmRlZmluZWQsXG4gIGVsZW1lbnRTZWxlY3RvcnM6IFtdLFxuICB0YXJnZXRFbGVtZW50czogW10sXG4gIHN0YXRlbWVudDogdW5kZWZpbmVkLFxuICBzdGF0dXM6IEV2ZW50U3RhdHVzLkRJU0FCTEVELFxuICBpc1ZhbGlkOiBmYWxzZSxcbiAgc3RhdGVtZW50UHJvcGVydGllczogW10sXG59O1xuXG5leHBvcnQgeyB4YXBpRXZlbnQgfTtcbiIsImxldCB4YXBpSGVscGVycztcblxueGFwaUhlbHBlcnMgPSB7XG4gIGdldFNlbGVjdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG4gIH1cbn07XG5cbmV4cG9ydCB7IHhhcGlIZWxwZXJzIH07XG4iLCJpbXBvcnQgeEFQSUV2ZW50c0NvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuXG5sZXQgbG9nZ2VyO1xuXG5sb2dnZXIgPSB7XG4gIGRlYnVnOiB4QVBJRXZlbnRzQ29uZmlnLmRlYnVnLFxuICBsb2coLi4ubWVzc2FnZSkge1xuICAgIGlmICgheEFQSUV2ZW50c0NvbmZpZy5kZWJ1ZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coLi4ubWVzc2FnZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChyZWFzb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiIsImxldCB4QVBJRXZlbnRTdGF0ZW1lbnRDb250ZXh0O1xuXG54QVBJRXZlbnRTdGF0ZW1lbnRDb250ZXh0ID0ge1xuICByZWdpc3RyYXRpb246IHVuZGVmaW5lZCxcbiAgaW5zdHJ1Y3RvcjogdW5kZWZpbmVkLFxuICB0ZWFtOiB1bmRlZmluZWQsXG4gIGNvbnRleHRBY3Rpdml0aWVzOiB1bmRlZmluZWQsXG4gIHJldmlzaW9uOiB1bmRlZmluZWQsXG4gIHBsYXRmb3JtOiB1bmRlZmluZWQsXG4gIGxhbmd1YWdlOiB1bmRlZmluZWQsXG4gIHN0YXRlbWVudDogdW5kZWZpbmVkLFxuICBleHRlbnNpb25zOiB1bmRlZmluZWRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHhBUElFdmVudFN0YXRlbWVudENvbnRleHQ7XG4iLCJsZXQgeEFQSUV2ZW50U3RhdGVtZW50O1xuXG54QVBJRXZlbnRTdGF0ZW1lbnQgPSB7XG4gIGFjdG9yOiB1bmRlZmluZWQsXG4gIHZlcmI6IHVuZGVmaW5lZCxcbiAgb2JqZWN0OiB1bmRlZmluZWQsXG4gIHJlc3VsdDogdW5kZWZpbmVkLFxuICBjb250ZXh0OiB1bmRlZmluZWQsXG4gIHRpbWVzdGFtcDogdW5kZWZpbmVkLFxuICBzdG9yZWQ6IHVuZGVmaW5lZCxcbiAgYXV0aG9yaXR5OiB1bmRlZmluZWQsXG4gIHZlcnNpb246IHVuZGVmaW5lZCxcbiAgYXR0YWNobWVudHM6IHVuZGVmaW5lZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgeEFQSUV2ZW50U3RhdGVtZW50O1xuIiwiaW1wb3J0IGxvZ2dlciBmcm9tICcuL3V0aWxzL2xvZ2dlcic7XG5cbmltcG9ydCB4QVBJRXZlbnRTdGF0ZW1lbnQgZnJvbSAnLi94YXBpL3N0YXRlbWVudCc7XG5pbXBvcnQgeEFQSUV2ZW50U3RhdGVtZW50Q29udGV4dCBmcm9tICcuL3hhcGkvc3RhdGVtZW50LWNvbnRleHQnO1xuXG5pbXBvcnQgeyBFdmVudFN0YXR1cyB9IGZyb20gJy4vZXZlbnRzL2V2ZW50LXN0YXR1cyc7XG5pbXBvcnQgeyB4YXBpRXZlbnRWYWxpZGF0b3IgfSBmcm9tICcuL2V2ZW50cy94YXBpLWV2ZW50LXZhbGlkYXRvcic7XG5pbXBvcnQgeyB4YXBpRXZlbnQgfSBmcm9tICcuL2V2ZW50cy94YXBpLWV2ZW50JztcbmltcG9ydCB7IHhhcGlIZWxwZXJzIH0gZnJvbSAnLi9ldmVudHMveGFwaS1oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IHhhcGlFdmVudHMgPSB7XG4gIGxvZzogbG9nZ2VyLmxvZyxcbiAgYmFzZVN0YXRlbWVudDoge30sXG4gIGV2ZW50czogW10sXG4gIGVycm9yczogW10sXG4gIHRhcmdldEVsZW1lbnRzOiBbXSxcbiAgTFJTOiB7fSxcbiAgaGVscGVyczogeGFwaUhlbHBlcnMsXG5cbiAgaW5pdChhY3RvciwgYXV0aG9yaXR5KSB7XG4gICAgdGhpcy5sb2coJ2luaXQnKTtcbiAgICByZXR1cm4gdGhpcy5zZXRCYXNlU3RhdGVtZW50KGFjdG9yLCBhdXRob3JpdHkpO1xuICB9LFxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMubG9nKCdyZXNldCcpO1xuICAgIHJldHVybiB0aGlzLnNldEJhc2VTdGF0ZW1lbnQodGhpcy5iYXNlU3RhdGVtZW50LmF1dGhvciwgdGhpcy5iYXNlU3RhdGVtZW50LmF1dGhvcml0eSk7XG4gIH0sXG5cbiAgZ2V0VGFyZ2V0RWxlbWVudHMoKSB7XG4gICAgdGhpcy5sb2coJ2dldFRhcmdldEVsZW1lbnRzJyk7XG5cbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIHhhcGlFdmVudC5lbGVtZW50U2VsZWN0b3JzLmZvckVhY2goKGVsZW1lbnRTZWxlY3RvcikgPT4ge1xuICAgICAgICB0aGlzLmxvZygnZWxlbWVudFNlbGVjdG9yJywgZWxlbWVudFNlbGVjdG9yKTtcbiAgICAgICAgbGV0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50U2VsZWN0b3IpO1xuXG4gICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZygnZWxlbWVudHMnLCBlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0RWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgc2V0QmFzZVN0YXRlbWVudChhY3RvciwgYXV0aG9yaXR5KSB7XG4gICAgdGhpcy5sb2coJ3NldEJhc2VTdGF0ZW1lbnQnKTtcblxuICAgIHJldHVybiAhIWFjdG9yICYmICEhYXV0aG9yaXR5ID9cbiAgICAgIF9idWlsZEJhc2VTdGF0ZW1lbnQuY2FsbCh0aGlzLCBhY3RvciwgYXV0aG9yaXR5KSA6XG4gICAgICBmYWxzZTtcbiAgfSxcblxuICBzZXRTdGF0ZW1lbnRDb25maWdJbmZvKCkge1xuICAgIHRoaXMubG9nKCdzZXRTdGF0ZW1lbnRDb25maWdJbmZvJyk7XG5cbiAgICByZXR1cm4gdGhpcy5iYXNlU3RhdGVtZW50ID9cbiAgICAgIF9idWlsZEJhc2VTdGF0ZW1lbnRDb25maWcuY2FsbCh0aGlzKSA6XG4gICAgICBmYWxzZTtcbiAgfSxcblxuICBsaXN0ZW5FbmFibGVkRXZlbnRzKCkge1xuICAgIHRoaXMubG9nKCdsaXN0ZW5FbmFibGVkRXZlbnRzJyk7XG5cbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIHRoaXMubG9nKCd4YXBpRXZlbnQnLCB4YXBpRXZlbnQpO1xuICAgICAgaWYgKF9pc0VuYWJsZWQuY2FsbCh0aGlzLCB4YXBpRXZlbnQpKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh4YXBpRXZlbnQuZWxlbWVudFNlbGVjdG9ycyk7XG5cbiAgICAgICAgdGFyZ2V0RWxlbWVudHMuZm9yRWFjaCgodGFyZ2V0RWxlbWVudCkgPT4ge1xuICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmxvZygndGFyZ2V0RWxlbWVudCcsIHRhcmdldEVsZW1lbnQpO1xuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHhhcGlFdmVudC5uYW1lLCAoX2V2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIHhhcGlFdmVudC5jYWxsYmFjay5jYWxsKHRoaXMsIF9ldmVudCwgeGFwaUV2ZW50KTtcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIHN0b3BFbmFibGVkRXZlbnRzKCkge1xuICAgIHRoaXMubG9nKCdzdG9wRW5hYmxlZEV2ZW50cycpO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgICAgaWYgKF9pc0VuYWJsZWQuY2FsbCh0aGlzLCB4YXBpRXZlbnQpKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0RWxlbWVudHMuZm9yRWFjaCgodGFyZ2V0RWxlbWVudCkgPT4ge1xuICAgICAgICAgIHRhcmdldEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcih4YXBpRXZlbnQubmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGFkZEV2ZW50KGV2ZW50T2JqKSB7XG4gICAgdGhpcy5sb2coJ2FkZEV2ZW50JywgeyBldmVudE9iaiB9KTtcblxuICAgIGlmICh0aGlzLmlzVmFsaWRFdmVudChldmVudE9iaikpIHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gT2JqZWN0LmFzc2lnbih7fSwgeGFwaUV2ZW50LCBldmVudE9iaik7XG4gICAgICB0aGlzLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBhZGRFdmVudHMoZXZlbnRzKSB7XG4gICAgdGhpcy5sb2coJ2FkZEV2ZW50cycsIHsgZXZlbnRzIH0pO1xuXG4gICAgZXZlbnRzLmZvckVhY2goKF9ldmVudCkgPT4ge1xuICAgICAgdGhpcy5hZGRFdmVudChfZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5nZXRUYXJnZXRFbGVtZW50cygpO1xuICB9LFxuXG4gIHJlbW92ZUV2ZW50QnlJZChldmVudElkKSB7XG4gICAgdGhpcy5sb2coJ3JlbW92ZUV2ZW50QnlJZCcsIHsgZXZlbnRJZCB9KTtcbiAgICB0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzLmZpbHRlcigoeGFwaUV2ZW50KSA9PiB4YXBpRXZlbnQuaWQgIT09IGV2ZW50SWQpO1xuICB9LFxuXG4gIHJlbW92ZUV2ZW50c0J5RWxlbWVudElkKGVsZW1lbnRJZCkge1xuICAgIHRoaXMubG9nKCdyZW1vdmVFdmVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICAgIHRoaXMuZXZlbnRzID0gdGhpcy5ldmVudHMuZmlsdGVyKCh4YXBpRXZlbnQpID0+IHhhcGlFdmVudC5lbGVtZW50SWQgIT09IGVsZW1lbnRJZCk7XG4gIH0sXG5cbiAgZW5hYmxlRXZlbnQoX2V2ZW50KSB7XG4gICAgdGhpcy5sb2coJ2VuYWJsZUV2ZW50JywgeyBfZXZlbnQgfSk7XG4gICAgdGhpcy5ldmVudHMuZm9yRWFjaCgoeGFwaUV2ZW50KSA9PiB7XG4gICAgICBpZiAoX2V2ZW50LmlkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZW5hYmxlQWxsRXZlbnRzKCkge1xuICAgIHRoaXMubG9nKCdlbmFibGVBbGxFdmVudHMnKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIHhhcGlFdmVudC5zdGF0dXMgPSBFdmVudFN0YXR1cy5PTjtcbiAgICB9KTtcbiAgfSxcblxuICBlbmFibGVFdmVudEJ5SWQoZXZlbnRJZCkge1xuICAgIHRoaXMubG9nKCdlbmFibGVFdmVudEJ5SWQnKTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudElkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9OO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZChlbGVtZW50SWQpIHtcbiAgICB0aGlzLmxvZygnZW5hYmxlRWxlbWVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnRJZCA9PT0geGFwaUV2ZW50LmVsZW1lbnRJZCkge1xuICAgICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT047XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZGlzYWJsZUV2ZW50KF9ldmVudCkge1xuICAgIHRoaXMubG9nKCdkaXNhYmxlRXZlbnQnLCB7IF9ldmVudCB9KTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIGlmIChfZXZlbnQuaWQgPT09IHhhcGlFdmVudC5pZCkge1xuICAgICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT0ZGO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgZGlzYWJsZUFsbEV2ZW50cygpIHtcbiAgICB0aGlzLmxvZygnZGlzYWJsZUFsbEV2ZW50cycpO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9GRjtcbiAgICB9KTtcbiAgfSxcblxuICBkaXNhYmxlRXZlbnRCeUlkKGV2ZW50SWQpIHtcbiAgICB0aGlzLmxvZygnZGlzYWJsZUV2ZW50QnlJZCcsIHsgZXZlbnRJZCB9KTtcbiAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKCh4YXBpRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudElkID09PSB4YXBpRXZlbnQuaWQpIHtcbiAgICAgICAgeGFwaUV2ZW50LnN0YXR1cyA9IEV2ZW50U3RhdHVzLk9GRjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGRpc2FibGVFbGVtZW50c0J5RWxlbWVudElkKGVsZW1lbnRJZCkge1xuICAgIHRoaXMubG9nKCdkaXNhYmxlRWxlbWVudHNCeUVsZW1lbnRJZCcsIHsgZWxlbWVudElkIH0pO1xuICAgIHRoaXMuZXZlbnRzLmZvckVhY2goKHhhcGlFdmVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnRJZCA9PT0geGFwaUV2ZW50LmVsZW1lbnRJZCkge1xuICAgICAgICB4YXBpRXZlbnQuc3RhdHVzID0gRXZlbnRTdGF0dXMuT0ZGO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGlzVmFsaWRFdmVudChfZXZlbnQpIHtcbiAgICB0aGlzLmxvZygnaXNWYWxpZEV2ZW50JywgeyBfZXZlbnQgfSk7XG4gICAgcmV0dXJuIHhhcGlFdmVudFZhbGlkYXRvci5pc1ZhbGlkRXZlbnQuY2FsbCh0aGlzLCBfZXZlbnQpO1xuICB9XG59O1xuXG5cbi8qIFByaXZhdGUgKi9cblxuZnVuY3Rpb24gX2J1aWxkQmFzZVN0YXRlbWVudChhY3RvciwgYXV0aG9yaXR5KSB7XG4gIGxldCBjb250ZXh0O1xuICB0aGlzLmxvZygnX2J1aWxkQmFzZVN0YXRlbWVudCcsIHsgYWN0b3IsIGF1dGhvcml0eSB9KTtcblxuICBjb250ZXh0ID0gX2J1aWxkQmFzZVN0YXRlbWVudENvbnRleHQuY2FsbCh0aGlzLCBhY3Rvcik7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMuYmFzZVN0YXRlbWVudCwgeEFQSUV2ZW50U3RhdGVtZW50LCB7IGFjdG9yLCBjb250ZXh0LCBhdXRob3JpdHkgfSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEJhc2VTdGF0ZW1lbnRDb25maWcoKSB7XG4gIGxldCBiYXNlU3RhdGVtZW50O1xuICB0aGlzLmxvZygnX2J1aWxkQmFzZVN0YXRlbWVudENvbmZpZycpO1xuXG4gIGJhc2VTdGF0ZW1lbnQgPSB0aGlzLmJhc2VTdGF0ZW1lbnQ7XG5cbiAgcmV0dXJuIHtcbiAgICBiYXNlU3RhdGVtZW50LFxuICAgIHBsYXRmb3JtOiBuYXZpZ2F0b3IgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogbnVsbCxcbiAgICBsYW5ndWFnZTogbmF2aWdhdG9yID8gbmF2aWdhdG9yLmxhbmd1YWdlIDogbnVsbFxuICB9O1xufVxuXG5mdW5jdGlvbiBfYnVpbGRCYXNlU3RhdGVtZW50Q29udGV4dChhY3Rvcikge1xuICBsZXQgaW5zdHJ1Y3RvcjtcbiAgdGhpcy5sb2coJ19nZXRTdGF0ZW1lbnRDb25maWdTdHJ1Y3R1cmUnLCB7IGFjdG9yIH0pO1xuXG4gIGluc3RydWN0b3IgPSBhY3RvciB8fCBudWxsO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih4QVBJRXZlbnRTdGF0ZW1lbnRDb250ZXh0LCB7IGluc3RydWN0b3IgfSk7XG59XG5cbmZ1bmN0aW9uIF9pc0VuYWJsZWQoeGFwaUV2ZW50KSB7XG4gIHRoaXMubG9nKCdfaXNFbmFibGVkJywgeGFwaUV2ZW50LnN0YXR1cyk7XG4gIHJldHVybiB4YXBpRXZlbnQuc3RhdHVzID09PSBFdmVudFN0YXR1cy5PTjtcbn1cbiJdfQ==
