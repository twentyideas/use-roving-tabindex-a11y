import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import TestSimpleList from '../TestSimpleList'
import List from '../List'
import { useRovingTabIndex } from '../../../dist'
import useCounter from '../useCounter'

// test or it to make a test block
// test component
// find element, using screen to get element
// interact with element
// assert results as 

// const listRef = useRovingTabIndex();


// const mockListWithRef = () => {
//     return (
//         <div>
//           <h3 data-testid={'data'} >Simple List</h3>
//           <ul ref={listRef}>
//             <li tabIndex={0}>1</li>
//           </ul>
//         </div>
//       )
// }
  

// it('should render header', () => {
//   render(<TestSimpleList />)
//   const HeadingElement = screen.getByTestId(/simplist/i)
//   expect(HeadingElement).toBeInTheDocument()
// })

// it('should render the simplelist component', async () => {
//   render(<List />)
//   const listElement = screen.getByText(/1/i)
//   expect(listElement).toBeInTheDocument()
// })

it('should render the simplelist component', async ()=> {
    render(<TestSimpleList />);
    // const listElement = screen.finByText(/All the things you could ever want to know/i)
    // expect(listElement).toBeInTheDocument();
    const headerElement = screen.findByTestId(/simplist/i);
    expect(headerElement).toBeInTheDocument();
})

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})



// it('hopefully works', async () => {
//     const { listRef } = renderHook(()=> useRovingTabIndex())
//     act(()=>{
//         mockListWithRef.useFocusOnMount()
//     })
//     expect(headerElement).toBeInTheDocument();
// })
