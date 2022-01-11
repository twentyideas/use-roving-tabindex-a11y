import '@testing-library/jest-dom/extend-expect'
import {
  fireEvent,
  getByRole,
  getByTestId,
  getByText,
  render,
  screen,
} from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import TestSimpleList from '../TestSimpleList'
import List from '../List'
import { useRovingTabIndex } from '../../../dist'
import useCounter from '../useCounter'
import { SimpleList } from '../SimpleList'
import { ComplexList } from '../ComplexList'

// passes test
// it('should render the list in focus', async () => {
//   render(<List/>)
//   const refElement =  await screen.findByTestId('dummyRef')

//   // act(()=> {
//   //    refElement.current.focus();
//   // })
//   expect(refElement).toBeInTheDocument()
// })

// testing just the hook
// result returns an object cant invoke the hook without a list
//
// it('focusses on list item with index of 0', () => {
//   const {result} = renderHook(
//     () => useRovingTabIndex()
//   )
//     expect(ListItem).toBeInTheDocument()
// })

// it('should render the list with use tab index', async ()=> {
//   render(<SimpleList />);
//   //  const result = renderHook(()=> {
//   //    useRovingTabIndex(<List/>)
//   //  })
//   const ref = renderHook(useRovingTabIndex)
//   const simpleRef = await screen.findByTestId('dummyRef')
//   // const firstItem = screen.getByTitle('Item 1')
//   // const listElement = getByText(/simple list/i)
//   // expect(listElement).toBeInTheDocument();
//   // act(()=>{
//   //   if( ref && ref.current){
//   //     fireEvent.focus(ref)
//   //       const listElement = getByText(/simple list/i)

//   //   }
//   // })
//   // const buttonElement = getByTestId('btn')
//   const list = simpleRef.ref;

//   expect(simpleRef).toBeInTheDocument();
//   expect(list)
// })

// finally able to locate the list items! woop woop.
// now to test if theyre in focus
it('should render the simplelist component', async () => {
  render(<TestSimpleList />)
  // const listElement = screen.getByText(/All the things you could ever want to know/i)
  // expect(listElement).toBeInTheDocument();
  const cmpnt = screen.getAllByText(
    'All the things you could ever want to know'
  )
  expect(cmpnt[0]).toBeInTheDocument()
})

// look for anchor tag, not the componenet
// <a href="#" tabindex="0"><h4>Item 2</h4></a>
it('should render the simplelist component', async () => {
  render(<SimpleList />)
  // const listElement = screen.getByText(/All the things you could ever want to know/i)
  // expect(listElement).toBeInTheDocument();
  // const listElement = getByRole()
  const cmpnt = screen.getAllByText(
    'All the things you could ever want to know'
  )
  const listItem1 = cmpnt[0]

  // fireEvent.keyDown(btnCmpt, {keyDown: "Tab",code:"Tab", charCode: 9 })
  fireEvent.keyDown(listItem1, {
    key: 'ArrowDown',
    code: 'ArrowDown',
    charCode: 40,
  })

  // expect(listItem1).toHaveFocus();
})

// locate anchor tags, not headers
// searching for text item finds headers
// find the second tag after hitting arrowdown!
it('should find the anchor tags rendered on the screen', async () => {
  render(<SimpleList />)
  const anchorElements = screen.getAllByRole('link')
  fireEvent.keyDown(anchorElements[0], {
    key: 'ArrowDown',
    code: 'ArrowDown',
    charCode: 40,
  })

  expect(anchorElements[1]).toHaveFocus()
})

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})

// testing for arrowing down to focus the second item on the list
it('should render the complex list and find the second item on the list', () => {
  render(<ComplexList />)
  const anchorElements = screen.getAllByRole('link')
  fireEvent.keyDown(anchorElements[0], {
    key: 'ArrowDown',
    code: 'ArrowDown',
    charCode: 40,
  })
  expect(anchorElements[1]).toHaveFocus()

})

// testing for arrow right to focus on the subscribe button

it('should render the complex list and find the second item on the list', () => {
  render(<ComplexList />)
  const anchorElements = screen.getAllByRole('link');
  const headerElement = screen.getAllByRole('heading');
  fireEvent.keyDown(anchorElements[0], {
    key: 'ArrowDown',
    code: 'ArrowDown',
    charCode: 40,
  })

  fireEvent.keyDown(anchorElements[0], {
    key: 'ArrowRight',
    code: 'ArrowRight',
    charCode: 39,
  })


  const btnElement = screen.getAllByRole('button');

  // expect(anchorElements[1]).toHaveFocus()
  expect(btnElement[1]).toHaveFocus()

})
