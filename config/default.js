const _ = require('lodash');

// Base config
const defaultConfig = {
  EXPRESS: {
    PORT: 8071,
    BIND_ADDRESS: "localhost"
  },
  PGFAAS: {
    URL_BASE: 'http://103.6.252.7/api/'
  }
};


/**
 * Change this for production configuration
 */
const prodConfig = {
  EXPRESS: {
    PORT: 8071,
    BIND_ADDRESS: "0.0.0.0"
  },
  PGFAAS: {
    URL_BASE: 'http://103.6.252.7/api/'
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports = _.merge(defaultConfig, prodConfig);
} else {
  module.exports = defaultConfig;
}

