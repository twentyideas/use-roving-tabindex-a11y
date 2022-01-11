import React, { useEffect, useRef } from 'react'

// dummy list for testing purposes.
// component will be deleted

const List: React.FC = () => {
  // adding ref to test side effect
  const listRef: any = useRef(null)

  useEffect(() => {
    listRef.current.focus()
    console.log('TESTING FOCUS')
  }, [])
  return (
    <div>
      <p>focus me</p>
      <h1 ref={listRef} data-testid={'simplist'}>
        test
      </h1>
      <ul data-testid={'dummyRef'} ref={listRef}>
        <li>1 </li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  )
}

export default List
