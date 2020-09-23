import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {MyStore} from './src/redux/store';
import Test from './src/component/Test';
import Nav from './src/nav';

class App extends Component {
  render() {
    return (
      <Provider store={MyStore}>
        <Nav />
      </Provider>
    );
  }
}

export default App;
