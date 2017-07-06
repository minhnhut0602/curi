import config from '../../rollup.config.js';

export default Object.assign({}, config, {
  moduleName: 'CuriReactLink',
  external: [
    'react',
    'prop-types'
  ],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  }
});
