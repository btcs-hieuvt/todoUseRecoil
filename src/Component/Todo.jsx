import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import {AiOutlineCheck} from 'react-icons/ai'
import '../App.css';

import {  useRecoilValue} from 'recoil'
import { idTodoEditState} from './todoListState.js'
// import { todoListState} from './todoListState'


function Todo(props) {
    const {todo ,index,deleteTodo ,toggleTodo,doubleClickToEdit,onEditTodo} =props
    const [text ,setText] = useState(todo.title)
    const idTodoEdit = useRecoilValue(idTodoEditState)
    // const setTodoList =useSetRecoilState(todoListState)
    const isEditTodo = idTodoEdit === todo.id

    function editTodo(id){
        if(text.trim()){
            onEditTodo(
                {
                    ...todo,
                    title:text
                },index ,todo.docId)
               
        }
        
        
    }
  return (
    <div>
        <li>
            {!isEditTodo ?(
            <div className='w-[100%] flex items-center justify-between  group bg-[#fff] drop-shadow-md border-b-[1px]' >
                <div className='w-[40px] h-[100%] relative'>
                    <input
                        id='check-box'
                         className='absolute top-[-15px] left-[5px] appearance-none border-[1px] border-[#dcebe8] w-[30px] h-[30px]  rounded-full
                                checked:bg-[#ffffff00]  cursor-pointer z-10 
                                
                         '
                        type="checkbox" 
                        name=""
                        checked={todo.isCompleted} 
                        onChange={()=> toggleTodo(index,todo.docId)}
                        />
                        <AiOutlineCheck 
                            className='check absolute top-[-10px] left-[10px] text-[20px] text-[#7ecfbf] text-opacity-0 transition-all'
                        />

                </div>
                
                <label 
                    className={`py-[15px] px-[15px] grow font-medium text-[20px]  
                                ${todo.isCompleted ? 'text-[#d9d9d9] line-through decoration-[#d9d9d9]' : ''}
                    `}
                    htmlFor=""
                    onDoubleClick={()=>{doubleClickToEdit(todo.id); console.log('isEditTodo :',isEditTodo);}}
                >
                    {todo.title}
                </label>
                <FaTimes 
                        className='hidden group-hover:block w-[40px] text-[#af5b5ea8] hover:text-[#af5b5e] text-[16px] font-thin'
                        onClick={()=> deleteTodo(index,todo.docId)}
                />
            </div>)
                :
             (<div className='w-[100%] bg-[#fff]  drop-shadow-md pl-[40px]'>
                    <input 
                        className='w-[100%] py-[11px] pl-[20px]  pr-[15px] text-[24px] placeholder:italic  shadow-lg
                                rounded-sm border-[1px]  border-[#4d4d4d] font-[600] text-[#4d4d4d] '
                        type='text'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        autoFocus
                        onBlur={editTodo}
                        onKeyPress={(e)=>{
                            if(e.key === 'Enter' && text.trim()){
                                editTodo(todo.docId)
                            }
                           
                        }}
                    />
            </div>)
        }
                
        </li>

    </div>
  )
}

export default Todo