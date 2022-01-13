import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { SimpleList } from '../SimpleList'
import { ComplexList } from '../ComplexList'
import { Table } from '../Table'

const onFireEvent = (
  start: HTMLElement,
  key: string,
  charCode: number
): void => {
  fireEvent.keyDown(start, {
    key,
    code: key,
    charCode,
  })
}

describe('tests the Simple List component', () => {
  it('should find the anchor tags rendered on the screen', () => {
    render(<SimpleList />)
    const anchorElements = screen.getAllByRole('link')
    onFireEvent(anchorElements[0], 'ArrowDown', 40)
    expect(anchorElements[1]).toHaveFocus()
  })
})

describe('tests the Complex List component', () => {
  it('should render the complex list and find the second item on the list', () => {
    render(<ComplexList />)
    const anchorElements = screen.getAllByRole('link')
    onFireEvent(anchorElements[0], 'ArrowDown', 40)
    expect(anchorElements[1]).toHaveFocus()
  })
  it('should render the complex list and find the second subscribe on the list', () => {
    render(<ComplexList />)
    const anchorElements = screen.getAllByRole('link')
    onFireEvent(anchorElements[0], 'ArrowDown', 40)
    onFireEvent(anchorElements[0], 'ArrowRight', 39)
    const btnElement = screen.getAllByRole('button')
    expect(btnElement[1]).toHaveFocus()
  })
  it('should change focus from one subscribe button to another', () => {
    render(<ComplexList />)
    const anchorElements = screen.getAllByRole('link')
    onFireEvent(anchorElements[0], 'ArrowDown', 40)
    onFireEvent(anchorElements[0], 'ArrowRight', 39)
    onFireEvent(anchorElements[0], 'ArrowDown', 40)
    const btnElement = screen.getAllByRole('button')
    expect(btnElement[2]).toHaveFocus()
  })
  it('should change focus from the subscribe button back to the list item', () => {
    render(<ComplexList />)
    const anchorElements = screen.getAllByRole('link')
    onFireEvent(anchorElements[0], 'ArrowDown', 40)
    onFireEvent(anchorElements[0], 'ArrowRight', 39)
    onFireEvent(anchorElements[0], 'ArrowDown', 40)
    onFireEvent(anchorElements[0], 'ArrowLeft', 37)
    expect(anchorElements[2]).toHaveFocus()
  })
})

describe('tests the Table Component', () => {
  it('should focus on the Name header after pressing the right arrow key', () => {
    render(<Table />)
    const selectedHeader = screen.getByText('Selected')
    const checkBoxElement = screen.getAllByRole(/checkbox/i)
    onFireEvent(selectedHeader, 'ArrowRight', 39)
    expect(checkBoxElement[1]).toHaveFocus()
  })
  it('should change focus from "Janet" to "Other"', () => {
    render(<Table />)
    const linkElements = screen.getAllByRole('link')
    const janetElement = screen.getByText('Janet')
    onFireEvent(janetElement, 'ArrowRight', 39)
    expect(linkElements[1]).toHaveFocus()
  })
  it('should focus from "Janet" to "Paul"', () => {
    render(<Table />)
    const janetElement = screen.getByText('Janet')
    const paulElement = screen.getByText('Paul')
    onFireEvent(janetElement, 'ArrowDown', 40)
    expect(paulElement).toHaveFocus()
  })
})
