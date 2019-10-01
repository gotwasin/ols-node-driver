/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver from 'shared/mixins/node-driver';

// import uiConstants from 'ui/utils/constants'

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed = Ember.computed;
const get = Ember.get;
const set = Ember.set;
const alias = Ember.computed.alias;
const service = Ember.inject.service;

/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/


/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
  driverName: '%%DRIVERNAME%%',
  needAPIToken: true,
  config: alias('model.%%DRIVERNAME%%Config'),
  app: service(),

  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });
    set(this, 'layout', template);

    this._super(...arguments);

  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap: function () {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      serverType: 'cx21', // 4 GB Ram
      serverLocation: 'nbg1', // Nuremberg
      imageId: 1,
      userData: '',
      networks: []
    });

    set(this, 'model.%%DRIVERNAME%%Config', config);
  },

  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();

    if (!this.get('model.%%DRIVERNAME%%Config.networks')) {
      this.set('model.%%DRIVERNAME%%Config.networks', [])
    }

    var errors = get(this, 'errors') || [];
    if (!get(this, 'model.name')) {
      errors.push('Name is required');
    }

    // Set the array of errors for display,
    // and return true if saving should continue.
    if (get(errors, 'length')) {
      set(this, 'errors', errors);
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },
  actions: {
    getData() {
      this.set('gettingData', true);
      let that = this;
      Promise.all([this.apiRequest('/v3/auth/tokens')]).then(function (responses) {
        that.setProperties({
          errors: [],
          needAPIToken: false,
          gettingData: false,
        });
      }).catch(function (err) {
        console.error(err)
          that.setProperties({
            errors: ['Error received from ols Cloud: '],
            gettingData: false
          })
      })
    },
  },
  apiRequest(path) {
    return fetch('https://ENDPOINT:5000' + path, {
      method: "POST",
      mode: 'cors',
      headers: {
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',

        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        Origin: '*'
      },
      body: JSON.stringify({
        "auth": {
          "identity": {
            "methods": ["password"],
            "password": {
              "user": {
                "name": "mail",
                "domain": { "id": "default" },
                "password": "%%%%%"
              }
            }
          }
        }
      })
    }).then(res => {
      console.log(res)
    });
  }
  // Any computed properties or custom logic can go here
});