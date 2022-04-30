import { useEffect ,useContext} from 'react';
import '../../App.css';
import Footer from '../../Component/Footer.jsx';
import Header from '../../Component/Header.jsx';
import TodoLists from '../../Component/TodoLists.jsx';

import audioMeme from '../../assets/audio/meme.mp3'
import { useRecoilState,useRecoilValue } from 'recoil';
import { todoListState,statusBtnState,todoListStatsState } from '../../Component/todoListState';
import { AuthContext } from '../../Context/AuthProvider'
import {db} from '../../firebase/config'
import {collection, getDocs,updateDoc,doc} from 'firebase/firestore'

function TodoPage() {

    const [todolist,setTodolist ] =useRecoilState(todoListState)
    const [statusBtn,setStatusBtn] = useRecoilState(statusBtnState)
  
    const {numOfTodo, numOfTodoActive,todoActive,} = useRecoilValue(todoListStatsState)

  //get todo from firestore
  const { user: {uid}  } = useContext(AuthContext)
  const todoCollectionRef= collection(db,"todos")
 
  useEffect(()=>{

    const getTodos =async ()=>{
        const data =await getDocs(todoCollectionRef)
        const getTodo = data.docs.map((doc)=>({...doc.data(),docId:doc.id}))
        
        setTodolist(getTodo)
        
      }
      return ()=>{
        getTodos()
      }
  },[])
  //
  function setStatusFilter (statusBtn){
    setStatusBtn(statusBtn)
  }
  // save todo in localstorage
  
  useEffect(()=>{
  
    localStorage.setItem('Todos',JSON.stringify(todolist))
  
  },[todolist])
  
  // check all todo
  
  function checkAllTodo(id){
    const todoDoc =doc(db,"todos",id)
    console.log(id);
    const checkAllTodo =  [...todolist].map(todo => {
          if(numOfTodoActive > 0){
            updateDoc(todoDoc,{isCompleted : true})
                return {
                  ...todo,
                  isCompleted : true,
                }
               
          }else{
            updateDoc(todoDoc,{isCompleted : false})
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
            todoCollectionRef={todoCollectionRef}
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
                  todoCollectionRef={todoCollectionRef}
                  
               />
           }
        
      </div>
      <audio  src={audioMeme}  id='Audio'> </audio>
      <p 
        id ='done'
        className='text-[#5cef63] font-bold text-[24px] text-center w-[100%] mt-[20px]'
      >Hết việc để làm rồi</p>
    </div>
  )
}

export default TodoPage