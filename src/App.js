import { useEffect } from 'react';
import './App.css';
import Footer from './Component/Footer.jsx';
import Header from './Component/Header.jsx';
import TodoLists from './Component/TodoLists.jsx';

import audioMeme from './assets/audio/meme.mp3'
import { useRecoilState,useRecoilValue } from 'recoil';
import { todoListState,statusBtnState,todoListStatsState } from './Component/todoListState';

function App() {

  const [todolist,setTodolist ] =useRecoilState(todoListState)
  const [statusBtn,setStatusBtn] = useRecoilState(statusBtnState)

  // const todoList = useRecoilValue(filteredTodoListState);
  const {numOfTodo, numOfTodoActive,todoActive,} = useRecoilValue(todoListStatsState)

function setStatusFilter (statusBtn){
  setStatusBtn(statusBtn)
}
// save todo in localstorage
// useEffect(()=>{
//   const storageTodo =localStorage.getItem('Todos')
//   if(storageTodo){
//     setTodolist(JSON.parse(storageTodo))
//   }
// },[])
useEffect(()=>{

  localStorage.setItem('Todos',JSON.stringify(todolist))

},[todolist])

// check all todo
function checkAllTodo(){

  const checkAllTodo =  [...todolist].map(todo => {
        if(numOfTodoActive > 0){
            // console.log(todo);
              // todo.isCompleted =true
              return {
                ...todo,
                isCompleted : true
              }
        }else{
          return {
            ...todo,
            isCompleted : false
          }
        }
       
      })
      setTodolist(checkAllTodo)
      
}

useEffect(()=>{
 
  const toggleAll =document.getElementById('toggleAll')
  
  // console.log(toggleAll);
  if(numOfTodo === 0) return;
  if(numOfTodo !== 0 &&numOfTodoActive === 0){
      // toggleAll.classList.remove('text-[#ddd]')
        // toggleAll.classList.add('text-[#000]')
      // toggleAll.classList.toggle('text-[#000]')
      toggleAll.style.color = '#000'
  }else{
    toggleAll.style.color = '#ddd'
  }
  
},[todolist,numOfTodoActive,numOfTodo])
// clear all todo iscompleted
function clearCompleted () {

   setTodolist(todoActive)

 }

  // hoan thanh todo app 
  
  useEffect(()=>{

    if(numOfTodo === 0) return;
    const completedAll = todolist.every(todo => todo.isCompleted === true)
     
      const audio = document.getElementById('Audio')
    
      
      if(completedAll){
          audio.play()
      }
  
      
   },[todolist,numOfTodo])
  
   useEffect(()=>{
    if(numOfTodo === 0) return;
    const completedAll = todolist.every(todo => todo.isCompleted === true)
          const done = document.getElementById('done')
          if(completedAll && todolist.length !== 0){
            
              done.style.display='block'
  
          }else{
            done.style.display='none'
          }
   },[todolist,numOfTodo])

  return (
    <div className='w-[100vw] h-[100vh] bg-[#f5f5f5]'>
      <div className="mx-[auto] w-[550px] ">
        
        <Header 
            checkAllTodo={checkAllTodo}
            
        />
        <TodoLists 
            
        />
          {todolist.length === 0 ? ""  :
               <Footer
                  statusBtn={statusBtn}
                  setStatusFilter={setStatusFilter}
                  clearCompleted={clearCompleted}
                  numOfTodos ={numOfTodo}
                  numOfTodoLeft={numOfTodoActive}
                  
               />
           }
        
      </div>
      <audio  src={audioMeme}  id='Audio'> </audio>
      <p 
        id ='done'
        className='text-[#5cef63] font-bold text-[24px] text-center w-[100%] mt-[20px]'
      >Hết việc để làm rồi</p>
    </div>

  );
}


export default App;
