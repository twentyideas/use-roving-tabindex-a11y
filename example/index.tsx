import * as React from 'react'
// import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom'
import { ComplexList } from './src/ComplexList'
import List from './src/List'
import { SimpleList } from './src/SimpleList'
import { Table } from './src/Table'
import TestSimpleList from './src/TestSimpleList'

const App = () => {
  return (
    <div>
      <h1>Use Roving Tab Index example page</h1>
      <p>
        Use the up and down arrow keys to navigate each list or table, and use
        the left and right arrow keys to navigate inside of the item
      </p>
      {/* <TestSimpleList/> */}
      {/* <List/> */}
      <hr />
      <SimpleList />
      <hr />
      <ComplexList />
      <hr />
      <Table />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
