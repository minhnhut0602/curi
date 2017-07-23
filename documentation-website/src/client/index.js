import React from 'react';
import ReactDOM from 'react-dom';
import { Browser } from 'hickory';
import createConfig from 'curi';
import { Navigator } from 'curi-react';
import createTitleSideEffect from 'curi-side-effect-title';
import createScrollSideEffect from 'curi-side-effect-scroll';
import createActiveAddon from 'curi-addon-active';
import routes from './routes';
import renderFunction from './render';

const setTitle = createTitleSideEffect({ suffix: '| Curi Documentation' });
const scrollTo = createScrollSideEffect();

const history = Browser();

const config = createConfig(history, routes, {
  addons: [createActiveAddon],
  sideEffects: [setTitle, scrollTo]
});

config.ready().then(() => { 
  ReactDOM.render((
    <Navigator config={config} children={renderFunction} />
  ), document.getElementById('root'));
});