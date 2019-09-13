"use strict";

define("nodes/components/driver-upcloud/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjdW5sZXNzIGlzQXV0aGVudGljYXRlZCB9fQogICAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgICAgPGRpdiBjbGFzcz0ib3Zlci1ociBtYi0yMCI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbD5Vc2VyPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdmFsdWU9Y29uZmlnLnVzZXIgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIn19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWw+UGFzc3dvcmQ8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJwYXNzd29yZCIgdmFsdWU9Y29uZmlnLnBhc3N3ZCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wifX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxidXR0b24ge3thY3Rpb24gImF1dGhlbnRpY2F0ZSJ9fSBjbGFzcz0iYnRuIGJnLXByaW1hcnkiPkF1dGhlbnRpY2F0ZTwvYnV0dG9uPgogICAge3svYWNjb3JkaW9uLWxpc3R9fQoKICB7e2Vsc2V9fQogICAgPGZvcm0+CiAgICAgIHt7I2FjY29yZGlvbi1saXN0IGNsYXNzPSJtdC0yMCIgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAgICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgICAgICAgIHRpdGxlPSJJbnN0YW5jZSBjb25maWd1cmF0aW9uIgogICAgICAgICAgZGV0YWlsPSJTZXQgdXAgdGhlIGJhc2ljIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBpbnN0YW5jZSIKICAgICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICAgICAgPGxhYmVsPgogICAgICAgICAgICAgIFVzZSBhIGN1c3RvbSBjb25maWd1cmF0aW9uCiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IgogICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt7Y29uZmlnLmNvcmVOdW1iZXJ9fQogICAgICAgICAgICAgICAgICAgICB2YWx1ZT17e29yIGNvbmZpZy51c2VDdXN0b21Db25maWcgY29uZmlnLmNvcmVOdW1iZXJ9fQogICAgICAgICAgICAgICAgICAgICBvbmNoYW5nZT17e2FjdGlvbiAobXV0IGNvbmZpZy51c2VDdXN0b21Db25maWcpIHZhbHVlPSd0YXJnZXQuY2hlY2tlZCd9fT4KICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ibXQtMTUiPgogICAgICAgICAgICAgIHt7I3VubGVzcyBjb25maWcuY29yZU51bWJlcn19CiAgICAgICAgICAgICAgICA8bGFiZWw+UHJlZGVmaW5lZCBwbGFuczwvbGFiZWw+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPSJjb2wgc3Bhbi02IGZvcm0tY29udHJvbCIgb25jaGFuZ2U9e3thY3Rpb24gKG11dCBjb25maWcucGxhbikKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPSJ0YXJnZXQudmFsdWUiIH19PgogICAgICAgICAgICAgICAgICAgIHt7I2VhY2ggcGxhbnMgYXMgfHBsYW58fX0KICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9e3twbGFuLnZhbHVlfX0gc2VsZWN0ZWQ9e3tlcSBjb25maWcucGxhbiBwbGFuLnZhbHVlfX0+e3twbGFuLm5hbWV9fTwvb3B0aW9uPgogICAgICAgICAgICAgICAgICAgIHt7L2VhY2h9fQogICAgICAgICAgICAgICAgICA8L3NlbGVjdD4KICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgIHt7ZWxzZX19CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iY29sIHNwYW4tMiI+Q1BVczoge3tjb25maWcuY29yZU51bWJlcn19PC9sYWJlbD4KICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyBtdC01Ij4KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGlucHV0LWdyb3VwIj4KICAgICAgICAgICAgICAgICAgICAgIHt7aW5wdXQtc2xpZGVyIHZhbHVlPWNvbmZpZy5jb3JlTnVtYmVyIHZhbHVlTWluPTEgdmFsdWVNYXg9MzJ9fQogICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0icm93IG10LTUiPgogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9ImNvbCBzcGFuLTIiPk1lbW9yeSBBbW91bnQ8L2xhYmVsPgogICAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICAgICAgICAgICAge3tpbnB1dC1pbnRlZ2VyIG1pbj0xIG1heD0xMjggdmFsdWU9Y29uZmlnLm1lbW9yeUFtb3VudCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wifX0KICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPkdCPC9kaXY+CiAgICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3cgbXQtMTUiPgogICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz0iY29sIHNwYW4tMiI+U3RvcmFnZSBTaXplPC9sYWJlbD4KICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InJvdyBtdC01Ij4KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0zIj4KICAgICAgICAgICAgICAgICAgICAgIHt7aW5wdXQtc2xpZGVyIHZhbHVlPWNvbmZpZy5zdG9yYWdlU2l6ZSB2YWx1ZU1pbj0xMCB2YWx1ZU1heD0yMDQ4fX0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi0yIGlucHV0LWdyb3VwIj4KICAgICAgICAgICAgICAgICAgICAgIHt7aW5wdXQtaW50ZWdlciBtaW49MTAgbWF4PTIwNDggdmFsdWU9Y29uZmlnLnN0b3JhZ2VTaXplIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCJ9fQogICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R0I8L2Rpdj4KICAgICAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgICAgICB7ey91bmxlc3N9fQogICAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQogICAgICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgICAgICAgIHRpdGxlPSJab25lIHNlbGVjdGlvbiIKICAgICAgICAgIGRldGFpbD0iU2VsZWN0IHRoZSB6b25lIGZvciB0aGUgaW5zdGFuY2UgdG8gcnVuIGluIgogICAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgICAgIH19CiAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICA8aDQ+Wm9uZXM8L2g0PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgICAgICAgIHt7I2VhY2ggem9uZXMgYXMgfHpvbmV8IH19CiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9InpvbmVDYXJkIGNvbCBzcGFuLTMiPgogICAgICAgICAgICAgICAgICB7e3JhZGlvLWJ1dHRvbiBuYW1lPSJ6b25lcyIgc2VsZWN0aW9uPWNvbmZpZy56b25lIHZhbHVlPXpvbmUuaWR9fQogICAgICAgICAgICAgICAgICA8aW1nIHNyYz0iaHR0cHM6Ly9odWIudXBjbG91ZC5jb20vc3RhdGljL2ZsYWdzL3t7em9uZS5mbGFnfX0ucG5nIgogICAgICAgICAgICAgICAgICAgICAgIHNyY3NldD0iaHR0cHM6Ly9odWIudXBjbG91ZC5jb20vc3RhdGljL2ZsYWdzL3t7em9uZS5mbGFnfX0ucG5nIDF4LCBodHRwczovL2h1Yi51cGNsb3VkLmNvbS9zdGF0aWMvZmxhZ3Mve3t6b25lLmZsYWd9fS0yeC5wbmcgMngiCiAgICAgICAgICAgICAgICAgICAgICAgYWx0PSJGbGFnIG9mIHt7em9uZS5mbGFnfX0iCiAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9Im1heC13aWR0aDogMjBweDsiLz4KICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ibGFiZWxzIj4KICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIHN0eWxlPSJ0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyI+e3t6b25lLmlkfX08L3N0cm9uZz4KICAgICAgICAgICAgICAgICAgICB7e3pvbmUubmFtZX19CiAgICAgICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgICAgICB7ey9lYWNofX0KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtCiAgICAgICAgICB0aXRsZT0iQWR2YW5jZWQgY29uZmlndXJhdGlvbnMiCiAgICAgICAgICBkZXRhaWw9IkFkdmFuY2VkIHNldHVwIGZvciBuZXR3b3JraW5nIgogICAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgICAgICBleHBhbmRPbkluaXQ9ZmFsc2UKICAgICAgICB9fQogICAgICAgICAgPGRpdiBjbGFzPSJyb3ciPgogICAgICAgICAgICA8bGFiZWw+CiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9ImNoZWNrYm94IgogICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt7bW9kZWwudXBjbG91ZENvbmZpZy51c2VQcml2YXRlTmV0d29ya09ubHl9fQogICAgICAgICAgICAgICAgICAgICB2YWx1ZT17e3VzZVByaXZhdGVOZXR3b3JrT25seX19CiAgICAgICAgICAgICAgICAgICAgIG9uY2hhbmdlPXt7YWN0aW9uIChtdXQgbW9kZWwudXBjbG91ZENvbmZpZy51c2VQcml2YXRlTmV0d29ya09ubHkpIHZhbHVlPSd0YXJnZXQuY2hlY2tlZCd9fT4KICAgICAgICAgICAgICBVc2UgcHJpdmF0ZSBuZXR3b3JrIG9ubHkuPGJyPgogICAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgICA8cCBjbGFzcz0iaGVscC1ibG9jayI+CiAgICAgICAgICAgICAgVXBDbG91ZCB3aWxsIGFzc2lnbiBhIHB1YmxpYyBJUCBieSBkZWZhdWx0IHVubGVzcyB0b2xkIG90aGVyd2lzZS48YnI+CiAgICAgICAgICAgICAgKFJlY29tbWVuZGVkIGZvciBub2RlcyB0aGF0IHNob3VsZCBub3QgYmUgZXhwb3NlZCB0byB0aGUgaW50ZXJuZXQpLgogICAgICAgICAgICA8L3A+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KICAgICAge3svYWNjb3JkaW9uLWxpc3R9fQogICAgPC9mb3JtPgogICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPjxzcGFuPnt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KICAgIHt7Zm9ybS1uYW1lLWRlc2NyaXB0aW9uCiAgICAgIG1vZGVsPW1vZGVsCiAgICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICB9fQoKICAgIHt7Zm9ybS11c2VyLWxhYmVscwogICAgICBpbml0aWFsTGFiZWxzPWxhYmVsUmVzb3VyY2UubGFiZWxzCiAgICAgIHNldExhYmVscz0oYWN0aW9uICdzZXRMYWJlbHMnKQogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgfX0KCiAgICB7e2Zvcm0tZW5naW5lLW9wdHMKICAgICAgbWFjaGluZT1tb2RlbAogICAgICBzaG93RW5naW5lVXJsPXNob3dFbmdpbmVVcmwKICAgIH19CgogIHt7L3VubGVzc319CiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAge3tzYXZlLWNhbmNlbCBzYXZlPSJzYXZlIiBjYW5jZWw9ImNhbmNlbCJ9fQo8L3NlY3Rpb24+";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var observe = Ember.observer;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var defaultRadix = 10;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'upcloud',
    config: alias('model.upcloudConfig'),
    app: service(),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-upcloud/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },
    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'upcloudConfig',
        plan: '',
        user: '',
        passwd: '',
        isAuthenticated: false,
        zone: 'de-fra1',
        coreNumber: 0,
        memoryAmount: 0,
        storageSize: 25,
        useCustomConfig: false,
        usePrivateNetworkOnly: false
      });
      set(this, 'model.upcloudConfig', config);
    },
    validate: function validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      var useCustomConfig = get(this, 'config.useCustomConfig');

      if (useCustomConfig) {
        set(this, 'config.plan', '');
        var coreNumber = parseInt(get(this, 'config.coreNumber'), defaultRadix);

        if (coreNumber < 1) {
          errors.push('CPU count has to be at least 1');
        } else if (coreNumber > 20) {
          errors.push('CPU count has to be smaller or equal than 20');
        }

        var memoryAmount = parseInt(get(this, 'config.memoryAmount'), defaultRadix);

        if (memoryAmount < 1) {
          errors.push('Memory Size must be at least 1 GB');
        } else if (memoryAmount > 128) {
          errors.push('CPU count has to be smaller or equal than 128GB');
        }

        var storageSize = parseInt(get(this, 'config.storageSize'), defaultRadix);

        if (storageSize < 10) {
          errors.push('Storage size has to be at least 10GB');
        } else if (storageSize > 2048) {
          errors.push('Storage size has to smaller or equal than 2048GB');
        }
      } else {
        set(this, 'config.coreNumber', 0);
        set(this, 'config.memoryAmount', 0);
      }

      if (get(this, 'config.user').length === 0) {
        errors.push('UpCloud user is required');
      }

      if (get(this, 'config.passwd').length === 0) {
        errors.push('UpCloud user\'s password is required');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },
    customConfigObserver: observe('config.useCustomConfig', function () {
      var useCustomConfig = get(this, 'config.useCustomConfig');

      if (!useCustomConfig) {
        set(this, 'config.coreNumber', 0);
        set(this, 'config.memoryAmount', 0);
      } else {
        set(this, 'config.coreNumber', 1);
        set(this, 'config.memoryAmount', 4);
      }
    }),
    actions: {
      authenticate: function authenticate() {
        var _this = this;

        this.dummyAPIRequest('/1.2/account').then(function () {
          _this.set('isAuthenticated', true);

          _this.set('gettingData', true);

          return Promise.all([_this.getPlans(), _this.getZones()]);
        }).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              plans = _ref2[0],
              zones = _ref2[1];

          _this.set('plans', plans);

          _this.set('zones', zones);

          _this.set('gettingData', false);
        }).catch(function (_ref3) {
          var error = _ref3.error;

          if (error.error_code === 'AUTHENTICATION_REQUIRED') {
            var errorMessage = "".concat(error.error_code, ": ").concat(error.error_message);

            _this.set('errors', [errorMessage]);
          }
        });
      }
    },
    getPlans: function getPlans() {
      return this.dummyAPIRequest('/1.2/plan').then(function (_ref4) {
        var plans = _ref4.plans.plan;
        return plans.map(function (plan) {
          return {
            name: "".concat(plan.name, " - Storage: ").concat(plan.storage_size, "GB"),
            value: plan.name
          };
        });
      });
    },
    getZones: function getZones() {
      return this.dummyAPIRequest('/1.2/zone').then(function (_ref5) {
        var zones = _ref5.zones.zone;
        return zones.map(function (zone) {
          return {
            id: zone.id,
            name: zone.description.replace(/ #\d+/, ''),
            flag: zone.id.substring(0, 2)
          };
        });
      });
    },
    dummyAPIRequest: function dummyAPIRequest(endpoint) {
      var response = {};

      switch (endpoint) {
        case '/1.2/zone':
          response = {
            "zones": {
              "zone": [{
                "description": "Frankfurt #1",
                "id": "de-fra1"
              }, {
                "description": "Helsinki #1",
                "id": "fi-hel1"
              }, {
                "description": "Helsinki #2",
                "id": "fi-hel2"
              }, {
                "description": "Amsterdam #1",
                "id": "nl-ams1"
              }, {
                "description": "Singapore #1",
                "id": "sg-sin1"
              }, {
                "description": "London #1",
                "id": "uk-lon1"
              }, {
                "description": "Chicago #1",
                "id": "us-chi1"
              }, {
                "description": "San Jose #1",
                "id": "us-sjo1"
              }]
            }
          };
          break;

        case '/1.2/plan':
          response = {
            "plans": {
              "plan": [{
                "core_number": 1,
                "memory_amount": 1024,
                "name": "1xCPU-1GB",
                "public_traffic_out": 1024,
                "storage_size": 25,
                "storage_tier": "maxiops"
              }, {
                "core_number": 1,
                "memory_amount": 2048,
                "name": "1xCPU-2GB",
                "public_traffic_out": 2048,
                "storage_size": 50,
                "storage_tier": "maxiops"
              }, {
                "core_number": 2,
                "memory_amount": 4096,
                "name": "2xCPU-4GB",
                "public_traffic_out": 4096,
                "storage_size": 80,
                "storage_tier": "maxiops"
              }, {
                "core_number": 4,
                "memory_amount": 8192,
                "name": "4xCPU-8GB",
                "public_traffic_out": 5120,
                "storage_size": 160,
                "storage_tier": "maxiops"
              }, {
                "core_number": 6,
                "memory_amount": 16384,
                "name": "6xCPU-16GB",
                "public_traffic_out": 6144,
                "storage_size": 320,
                "storage_tier": "maxiops"
              }, {
                "core_number": 8,
                "memory_amount": 32768,
                "name": "8xCPU-32GB",
                "public_traffic_out": 7168,
                "storage_size": 640,
                "storage_tier": "maxiops"
              }, {
                "core_number": 12,
                "memory_amount": 49152,
                "name": "12xCPU-48GB",
                "public_traffic_out": 9216,
                "storage_size": 960,
                "storage_tier": "maxiops"
              }, {
                "core_number": 16,
                "memory_amount": 65536,
                "name": "16xCPU-64GB",
                "public_traffic_out": 10240,
                "storage_size": 1280,
                "storage_tier": "maxiops"
              }, {
                "core_number": 20,
                "memory_amount": 131072,
                "name": "20xCPU-128GB",
                "public_traffic_out": 24576,
                "storage_size": 2048,
                "storage_tier": "maxiops"
              }, {
                "core_number": 20,
                "memory_amount": 98304,
                "name": "20xCPU-96GB",
                "public_traffic_out": 12288,
                "storage_size": 1920,
                "storage_tier": "maxiops"
              }]
            }
          };
          break;

        case '/1.2/account':
          response = {
            "account": {
              "credits": 9999.9999,
              "username": this.get('model.upcloudConfig.user')
            }
          };
          break;

        default:
          break;
      }

      return Promise.resolve(response);
    },
    apiRequest: function apiRequest(path) {
      var user = this.get('model.upcloudConfig.user');
      var passwd = this.get('model.upcloudConfig.passwd');
      var token = btoa("".concat(user, ":").concat(passwd));
      return fetch('https://api.upcloud.com' + path, {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + token,
          'Content-Type': 'application/json'
        }
      });
    }
  });
});;
"use strict";

define("ui/components/driver-upcloud/component", ["exports", "nodes/components/driver-upcloud/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});