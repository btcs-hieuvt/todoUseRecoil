import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useRecoilState, useSetRecoilState,useRecoilValue} from 'recoil'
import Todo from './Todo.jsx'
import { todoListState,filterTodoListState ,idTodoEditState} from './todoListState.js'
import {db} from '../firebase/config'


function TodoLists(props) {
    // const { onTodoClick,getIdEditTodo,idTodoEdit,onEditTodo,markCompleted} = props
    const [todolist,setTodoList] =useRecoilState(todoListState)
    const todolistFilter = useRecoilValue(filterTodoListState)
    const setIdTodoEdit = useSetRecoilState(idTodoEditState)

   
    //xoa todo
    const deleteTodo =(index,id)=>{
          setTodoList((oldTodoList)=>{
            const newTodoList =oldTodoList.filter((todo,i)=>{
                return i !== index
            })
            return newTodoList
          })
          const todoDoc =doc(db,'todos',id)
          deleteDoc(todoDoc)
    }
    //  check todo
    const toggleTodo =(index,id)=>{
      const tgTodo =(oldTodoList)=>{
        const newTodoList =oldTodoList.map((todo,i)=>{
            if(i === index){
              const todoDoc =doc(db,"todos",id)
              console.log(id);
              updateDoc(todoDoc,{isCompleted : !todo.isCompleted})
               return {
                 ...todo,
                 isCompleted : !todo.isCompleted
               }
            }else{
              return todo
            }
        })
        return newTodoList
    }
        setTodoList(tgTodo)
        // const todoDoc =doc(db,"todos",id)
        // console.log(id);
        // updateDoc(todoDoc,{
        //   isCompleted : !todolist.isCompleted})
    }
  // double click to edit

  const doubleClickToEdit = (id)=>{
        console.log('id todo edit la :' ,id);
        setIdTodoEdit(id)
  }
  const onEditTodo =(todo={},index = -1,id)=>{
    if(index >=0){
      const newTodoList = [...todolist]
      newTodoList.splice(index,1,todo)
      setTodoList(newTodoList)
      doubleClickToEdit('')
      const todoDoc =doc(db,"todos",id)
      console.log(id);
      updateDoc(todoDoc,{title:todo.title})
      
    }
  }
  return (
    <div>
        
        <ul>
            {
                todolistFilter.map((todo,index) => (
                        <Todo 
                          key={todo.id} {...{todo}}
                           deleteTodo={deleteTodo} 
                           toggleTodo={toggleTodo}
                           doubleClickToEdit={doubleClickToEdit}
                           index={index}
                           onEditTodo={onEditTodo}

                           />
                           
                ))
            }
            
        
        </ul>
        
    </div>
  )
}

export default TodoLists