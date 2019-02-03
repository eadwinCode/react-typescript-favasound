import * as React from 'react';
import  ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import * as stores from './stores';

import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import SC from 'soundcloud';
import './index.scss';

SC.initialize({ client_id: "", redirect_uri: "" });

ReactDOM.render(
  <Provider { ...stores }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

