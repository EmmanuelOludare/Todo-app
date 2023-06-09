import { useState,useEffect } from 'react';
import moon from '../assets/images/icon-moon.svg';
import sun from '../assets/images/icon-sun.svg';
import check from '../assets/images/icon-check.svg';
import cross from '../assets/images/icon-cross.svg';

const Todo = (props) => {
  const [taskText,setTaskText] = useState('');
  const [tasks,setTasks] = useState([]);
  const [activeTasks,setActiveTasks] = useState([]);
  const [completedTasks,setCompletedTasks] = useState([]);
  const [taskIndex,setTaskIndex] = useState(0);
  const tasksCategory = [tasks,activeTasks,completedTasks];
  const tasksCategoryText = ['No tasks yet!','No active tasks yet!','No complete tasks yet!'];


  const handleTaskText = e => {
    setTaskText(e.target.value);
  };

  /*set tasks to local storage*/
  const addTask = e => {
    e.preventDefault();
    if (e.key === "Enter") {
      const newTask = { text: taskText, completed: false };
        const updatedTasks = [...tasks, newTask];
        const reversedArray = [...updatedTasks].reverse();
        setTasks(reversedArray);
        localStorage.setItem('tasks', JSON.stringify(reversedArray));
        setTaskText('');
    }
  };

  /*get tasks from local storage*/
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`tasks`)  || '[]');
    setTasks(storedTasks);
  },[]);

  /*delete task*/
  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  /*mark as complete*/
  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  /*display all all tasks*/
  const displayAllTasks = () => {
    setTaskIndex(0);
  };

  /*display all active tasks*/
  const displayActiveTasks = () => {
    const newTasks = [...tasks];
    const activeTasksList = newTasks.filter(task => task.completed === false);
    setActiveTasks(activeTasksList);
    setTaskIndex(1);
  };

   /*display all completed tasks*/
   const displayCompletedTasks = () => {
    const newTasks = [...tasks];
    const activeTasksList = newTasks.filter(task => task.completed === true);
    setCompletedTasks(activeTasksList);
    setTaskIndex(2);
  };

  /*clear all completed tasks*/
  const clearCompletedTasks = () => {
    const newTasks = [...tasks];
    const activeTasksList = newTasks.filter(task => task.completed === false);
    setTasks(activeTasksList);
  };

  /*drag and drop*/
  function handleDragStart(event, index) {
    event.dataTransfer.setData('text/plain', index);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event, targetIndex) {
    const sourceIndex = event.dataTransfer.getData('text/plain');
    const rearrangedTasks = [...tasks];
    const [removedItem] = rearrangedTasks.splice(sourceIndex, 1);
    rearrangedTasks.splice(targetIndex, 0, removedItem);
    setTasks(rearrangedTasks);
    localStorage.setItem('tasks', JSON.stringify(rearrangedTasks));
  };

  return (
    <div className=''>
        <div className="bg-mobile-light-mode bg-cover bg-center bg-no-repeat w-screen h-48 px-8 pt-8 dark:bg-mobile-dark-mode md:bg-desktop-light-mode md:h-56 md:dark:bg-mobile-dark-mode md:px-[16vw] lg:px-[25vw] xl:px-[30vw]">
          <div className="flex flex-col gap-3 md:gap-7 max-w-[600px]">
            <div className='flex justify-between w-full'>
                <h3 className="text-very-light-gray text-3xl tracking-[.5rem] font-bold">TODO</h3>
                <img className='w-6 h-6 cursor-pointer' src={props.darkMode ? sun : moon} alt="light-dark-mode" onClick={() => props.handleTheme(!props.darkMode)} />
            </div>
            <div className="flex flex-col w-full">
              <div className='border-dark-grayish-blue border-2 rounded-full w-6 h-6 p-2 absolute mt-3 ml-3.5 opacity-40'></div>
              <input type="text" aria-label='Create a new todo...' placeholder='Create a new todo...' className='outline-none caret-bright-blue indent-12 rounded-lg py-3.5 dark:bg-very-dark-desaturated-blue dark:text-light-grayish-blue(hover)' value={taskText} onChange={handleTaskText} onKeyUp={addTask}/>
            </div> 
          </div>
        </div>
          <div className="max-w-[600px] flex flex-col bg-white shadow-md rounded-lg mx-8 mt-[-30px] dark:bg-very-dark-desaturated-blue md:mx-[16vw] lg:mx-[25vw] xl:mx-[30vw] md:mt-[-45px] ">
            {tasksCategory[taskIndex].length === 0 ? <p className='text-dark-grayish-blue text-center text-xl mt-2'>{tasksCategoryText[taskIndex]}</p> : tasksCategory[taskIndex].map((task, index) => (
                <div 
                  className="group flex justify-between items-center border-b-[.5px] border-dark-grayish-blue p-3 md:px-6 cursor-pointer" 
                  key={index}
                  draggable={true}
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, index)}>
                  <div onClick={() => completeTask(index)} className={`border-dark-grayish-blue border-2 rounded-full w-8 h-8 p-2 ${task.completed ? "bg-gradient-to-r from-from to-to" : "bg-none"}`}><img className={`w-4 h-3 m-auto ${task.completed ? "flex" : "hidden"}`} src={check} alt="Completed"/></div>
                  <p className={`text-md mr-auto ml-3 ${task.completed ? "line-through text-dark-grayish-blue dark:text-dark-grayish-blue" : "no-underline text-black dark:text-light-grayish-blue(hover)"}`}>{task.text}</p>
                  <img className='w-4 h-4 cursor-pointer lg:hidden lg:group-hover:block' src={cross} alt="cancel" onClick={() => deleteTask(index)}/>
                </div>
              ))}
              <div className="flex justify-between py-5 px-3">
                <p className="text-sm text-dark-grayish-blue">{tasksCategory[taskIndex].length} items left</p>
                <div className="max-w-[600px] flex justify-center gap-6 mt-[55px] absolute left-0 right-0 bg-white shadow-md rounded-lg mx-8 py-2 dark:bg-very-dark-desaturated-blue md:mt-0 md:relative md:shadow-none md:rounded-none md:mx-0 md:py-0">
                  <p onClick={displayAllTasks} className={`text-lg font-semibold cursor-pointer hover:text-very-dark-grayish-blue hover:dark:text-light-grayish-blue(hover) ${taskIndex === 0 ? 'text-bright-blue' : 'text-dark-grayish-blue'}`}>All</p>
                  <p onClick={displayActiveTasks} className={`text-lg font-semibold cursor-pointer hover:text-very-dark-grayish-blue hover:dark:text-light-grayish-blue(hover) ${taskIndex === 1 ? 'text-bright-blue' : 'text-dark-grayish-blue'}`}>Active</p>
                  <p onClick={displayCompletedTasks} className={`text-lg font-semibold cursor-pointer hover:text-very-dark-grayish-blue hover:dark:text-light-grayish-blue(hover) ${taskIndex === 2 ? 'text-bright-blue' : 'text-dark-grayish-blue'}`}>Completed</p>
                </div>
                <p onClick={clearCompletedTasks} className="text-sm text-dark-grayish-blue cursor-pointer hover:text-very-dark-grayish-blue hover:dark:text-light-grayish-blue(hover)">Clear Completed</p>
              </div>
          </div>
          <p className="text-dark-grayish-blue text-center mt-[75px] md:mt-[20px] ">Drag and drop to reorder list</p>
      </div>
  )
}

export default Todo