import React, { FC, HTMLAttributes, ReactChild } from 'react'
import { clampNumber, useUUID } from './utils'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactChild
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export const Thing: FC<Props> = ({ children }) => {
  return <div>{children || `the snozzberries taste like snozzberries`}</div>
}

type ElementAndTable = HTMLUListElement &
  HTMLTableSectionElement &
  HTMLTableRowElement
interface HTMLElementWithSiblings extends HTMLElement {
  nextSibling: HTMLElement | null
  previousSibling: HTMLElement | null
}
interface HTMLElementWithHTMLElementChildNodes extends ElementAndTable {
  childNodes: NodeListOf<HTMLElementWithSiblings>
}

/** Usage Instructions:
 * 1. Place returned ref on any ul, tableBody, or tableHeader (ex. <ul ref={listRef}>...</ul>)
 * 2. Give all focusable elements a tabindex of -1 (ex. <button tabIndex={-1}>...</button>)
 * 3. Give the one element you want to have the first default focus a tabindex of 0
 *      (ex. <ul ref={listRef}>
 *              <li><a tabIndex={0}>first link</a></li>
 *              ...
 *          </ul> )
 */
export const useRovingTabIndex = () => {
  const instructionsId = useUUID()
  const horizontalIndex = React.useRef<number | undefined>()

  const listRef = React.useCallback<
    (...args: (HTMLElementWithHTMLElementChildNodes | null)[]) => void
  >(
    list => {
      const cleanUpFns: (() => void)[] = []
      // add screen reader instructions
      if (list?.parentElement) {
        // build instructions
        const instructions = document.createElement('span')
        instructions.id = instructionsId
        instructions.innerText =
          'Use the up and down arrow keys to navigate the list and use the left and right arrow keys to navigate inside of the item'
        instructions.style.border = 'none'
        instructions.style.clip = 'rect(0 0 0 0)'
        instructions.style.height = '1px'
        instructions.style.margin = '-1px'
        instructions.style.overflow = 'hidden'
        instructions.style.padding = '0'
        instructions.style.position = 'absolute'
        instructions.style.top = '20px'
        instructions.style.width = '1px'
        instructions.setAttribute('data-useRovingTabIndex', 'true')

        // If ref is on a a table section
        if (list.parentElement instanceof HTMLTableElement) {
          const existingCaption = list.parentElement.querySelector('caption')
          if (existingCaption) {
            const existingInstructions = existingCaption.querySelector(
              '[data-useRovingTabIndex]'
            )

            // if instructions exist, don't append. Just use those instead
            if (existingInstructions) {
              instructions.id = existingInstructions.id
            } else {
              existingCaption.append(instructions)
            }
          } else {
            const newCaption = document.createElement('caption')
            newCaption.append(instructions)
            list.parentElement.prepend(newCaption)
          }
        } else {
          list.parentElement.insertBefore(instructions, list)
        }

        list.setAttribute(
          'aria-describedby',
          `${
            list.getAttribute('aria-describedby')
              ? list.getAttribute('aria-describedby') + ' '
              : ''
          }${instructions.id}`
        )
        cleanUpFns.push(() => {
          list.setAttribute(
            'aria-describedby',
            `${list
              .getAttribute('aria-describedby')
              ?.replace(instructions.id, '')} ${instructions.id}`
          )
          instructions.remove()
        })
      }

      // add keyboard arrow listeners
      if (list) {
        const onKeydown = (e: KeyboardEvent) => {
          const listItemWithFocus = Array.from(list.childNodes)
            .map(i => i)
            .find(item => {
              console.log([...list.childNodes])
              console.log(item)
              return item.querySelector<HTMLElement>(
                '[tabindex]:not([tabindex="-1"])'
              )
            })
          const changeFocus = (nextFocusItem?: HTMLElement | null) => {
            if (listItemWithFocus && nextFocusItem) {
              const oldFocusItem = listItemWithFocus.querySelector<HTMLElement>(
                '[tabindex="0"]'
              )
              if (oldFocusItem) oldFocusItem.tabIndex = -1
              nextFocusItem.tabIndex = 0
              nextFocusItem.focus()
            }
          }
          const verticalNav = (sibling?: HTMLElement | null) => {
            e.preventDefault()
            const allFocusItems = sibling?.querySelectorAll<HTMLElement>(
              '[tabindex]'
            )
            const nextFocusRowItemIndex = clampNumber(
              horizontalIndex.current ?? 0,
              0,
              allFocusItems?.length ?? 1
            )
            const nextFocusItem = Array.from(allFocusItems ?? [])[
              nextFocusRowItemIndex
            ]
            changeFocus(nextFocusItem)
          }

          const horizontalNav = (direction: 1 | -1) => {
            e.preventDefault()
            const allFocusItems = Array.from(
              listItemWithFocus?.querySelectorAll<HTMLElement>('[tabindex]') ??
                []
            )
            const focusedIndex = allFocusItems?.findIndex(
              item => item.tabIndex === 0
            )
            const nextFocusIndex = clampNumber(
              focusedIndex + direction,
              0,
              allFocusItems.length - 1
            )
            const nextFocusItem = allFocusItems[nextFocusIndex]
            horizontalIndex.current = nextFocusIndex
            changeFocus(nextFocusItem)
          }

          switch (e.key) {
            case 'ArrowDown': {
              verticalNav(listItemWithFocus?.nextSibling)
              break
            }
            case 'ArrowUp': {
              verticalNav(listItemWithFocus?.previousSibling)
              break
            }
            case 'ArrowRight': {
              horizontalNav(1)
              break
            }
            case 'ArrowLeft': {
              horizontalNav(-1)
              break
            }
          }
        }

        // Update focus from click or screen reader
        const onFocus = (e: FocusEvent) => {
          const element = e.target
          if (element instanceof HTMLElement) {
            const focusedItems = list.querySelectorAll<HTMLElement>(
              '[tabindex]:not([tabindex="-1"])'
            )
            focusedItems.forEach(item => (item.tabIndex = -1))
            element.tabIndex = 0
          }
        }

        list.addEventListener('keydown', onKeydown)
        list.addEventListener('focusin', onFocus)
        cleanUpFns.push(() => {
          list.removeEventListener('keydown', onKeydown)
          list.removeEventListener('focusin', onFocus)
        })
      }
      return () => cleanUpFns.forEach(fn => fn())
    },
    [instructionsId]
  )

  return listRef
}

/**
 * Stolen from: https://github.com/zellwk/zellwk.com/blob/master/src/posts/2020-01-29-getting-focusable-elements.md
 * Gets keyboard-focusable elements within a specified element
 */
function getKeyboardFocusableElements(element: HTMLElement): Array<any> {
  return Array.from(
    element.querySelectorAll(
      'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => !el.hasAttribute('disabled'))
}

export const useFocusOnFirstFocusable = () => {
  type CallbackType = (...args: (HTMLElement | undefined | null)[]) => void
  const parentRef = React.useCallback<CallbackType>(node => {
    if (node) {
      const firstElement = getKeyboardFocusableElements(node)[0]
      firstElement.focus()
    }
  }, [])

  return parentRef
}

/** Used primarily with dialog buttons and mounting of focused buttons in a roving tabIndex */
export const useFocusOnMount = (active?: boolean) => {
  const focusRef = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    if (active && focusRef.current) {
      focusRef.current.focus()
    }
  }, [active])
  return focusRef
}
