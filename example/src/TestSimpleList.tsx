import React from 'react'
import { useRovingTabIndex } from '../../dist'
import { SimpleList } from './SimpleList'


const TestSimpleList:React.FC = () => {
    const listRef = useRovingTabIndex()
    return (
        <div>
            <h3 data-testid="simplist">TEST</h3>
            <SimpleList data-testid={'pls work'} />
            {/* <ul ref={listRef} >
                <li tabIndex={-1}>1</li>
                <li tabIndex={0}>2</li>
                <li tabIndex={-1} >3</li>
            </ul> */}
        </div>
    )
}

export default TestSimpleList