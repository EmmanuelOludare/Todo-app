import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' }
  ]);

  

  return (
    <div className="App">
      <h1>Drag and Drop Example</h1>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}
            >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
