import { useState } from 'react';
import Todo from './components/Todo';

function App() {
  const [darkMode,setDarkMode] = useState(false);
  const handleTheme = (value) => {
    setDarkMode(value)
  }
  
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className='transition-all font-josefinSans bg-very-light-gray h-screen dark:bg-very-dark-blue'>
        <Todo handleTheme={handleTheme} darkMode={darkMode}/>
      </div>
    </div>
  )
}

export default App
