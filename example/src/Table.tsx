import * as React from 'react'
import { useRovingTabIndex } from '../../dist'

export const Table: React.FC = () => {
  const bodyRef = useRovingTabIndex()
  const headerRef = useRovingTabIndex()
  return (
    <table style={{ borderCollapse: 'collapse', borderSpacing: 0 }}>
      <thead ref={headerRef}>
        <tr>
          <Header tabIndex={0} name="Selected" />
          <Header name="Name" />
          <Header name="Age" />
          <Header name="Favorite Color" />
          <Header name="Link" />
        </tr>
      </thead>
      <tbody ref={bodyRef}>
        <Row tabIndex={0} name="Janet" age={10} color="red" />
        <Row name="Paul" age={15} color="green" />
        <Row name="Judy" age={18} color="blue" />
        <Row name="Peter" age={30} color="pink" />
      </tbody>
    </table>
  )
}

const rowStyles = { border: '1px solid black', padding: 4 }

const Header: React.FC<{ name: string; tabIndex?: 0 | -1 }> = ({
  name,
  tabIndex,
}) => {
  return (
    <th style={rowStyles}>
      <input tabIndex={tabIndex ?? -1} type="checkbox" /> {name}
    </th>
  )
}

interface RowProps {
  name: string
  age: number
  color: string
  tabIndex?: 0 | -1
}

const Row: React.FC<RowProps> = ({ name, age, color, tabIndex }) => {
  return (
    <tr style={rowStyles}>
      <TD>
        <input tabIndex={-1} type="checkbox" />
      </TD>
      <TD>
        <a tabIndex={tabIndex ?? -1} href="#">
          {name}
        </a>
      </TD>
      <TD>{age}</TD>
      <TD>{color}</TD>
      <TD>
        <a tabIndex={-1} href="#">
          Other
        </a>
      </TD>
    </tr>
  )
}

const TD: React.FC = ({ children }) => <td style={rowStyles}>{children}</td>
