
import * as React from 'react';
import { useRovingTabIndex } from '../../.';

export const ComplexList: React.FC = () => {
  const listRef = useRovingTabIndex();
  return (
    <div>
      <h3>Complex List</h3>
      <ul ref={listRef}>
        <ListItem
          tabindex={0}
          title="Item 1"
          description="All the things you could ever want to know"
        />
        <ListItem
          title="Item 2"
          description="All the things you could ever want to know"
        />
        <ListItem
          title="Item 3"
          description="All the things you could ever want to know"
        />
        <ListItem
          title="Item 4"
          description="All the things you could ever want to know"
        />
      </ul>
    </div>
  );
};

const ListItem: React.FC<{
  title: string;
  description: string;
  tabindex?: 0 | -1;
}> = ({ title, description, tabindex }) => {
  return (
    <li style={{ display: 'grid', gridAutoFlow: "column", gap: 8, justifyContent: 'space-between', maxWidth: 400 }}>
      <a href="#" tabIndex={tabindex ?? -1}>
        <h4>{title}</h4>
      </a>
        <p>{description}</p>
        <button tabIndex={-1} onClick={() => console.log('subscribe')}>
          Subscribe
        </button>
    </li>
  );
};
