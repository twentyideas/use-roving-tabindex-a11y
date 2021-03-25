import * as React from 'react';
// import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { ComplexList } from './src/ComplexList';
import { SimpleList } from './src/SimpleList';
import { Table } from './src/Table';

const App = () => {
  return (
    <div>
      <h1>Use Roving Tab Index example page</h1>
      <p>
        Use the up and down arrow keys to navigate each list or table, and use the left and
        right arrow keys to navigate inside of the item
      </p>
      <hr />
      <SimpleList />
      <hr />
      <ComplexList />
      <hr />
      <Table />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));
