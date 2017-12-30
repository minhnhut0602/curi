import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import curi from '@curi/core'
import { CuriBase } from '@curi/react';
import { parse, stringify } from 'qs';

import routes from './routes';
import renderFunction from './renderFunction';

const history = Browser({
  query: { parse, stringify }
});
const router = curi(history, routes);
const root = document.getElementById('root');

router.respond((response) => {
  ReactDOM.render((
    <CuriBase
      response={response}
      router={router}
      render={renderFunction}
    />
  ), root);
});
