import React from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { useRecoilState } from 'recoil'
import { todoListState,textState } from './todoListState'

function Header(props) {
    const {checkAllTodo } =props
    const [text, setText] = useRecoilState(textState)
    const   [todolist, setTodoList ] =useRecoilState(todoListState)

    const onChange =(e)=>{
        setText(e.target.value)
    }
    function onAddTodo(e) {
        // console.log(e.key)

        if (e.key === 'Enter' && text.trim()) {
            const todoListNew =(oldTodolist)=>{
                const newTodoList= [ ...oldTodolist,
                       {
                           id: new Date().valueOf(),
                           title: text,
                           isCompleted: false
                       }
                   ]
                   
                   return newTodoList
               }
            setTodoList(todoListNew)
            
            setText('')
        }
    }
    return (
        <div>
            <h1
                className='text-center text-[100px] text-[#af2f2f26]'
            >
                Todos
            </h1>
            <div className='border-b-[1px] border-[#c6c6c66b] relative' >
                
                <input
                    type="text"
                    className='
                       w-[100%] py-[16px] pl-[60px] pr-[16px] text-[24px] placeholder:italic  shadow-lg
                        rounded-sm focus:outline-none font-[600] text-[#4d4d4d] 
                    '
                    placeholder='What needs to be done ?'
                    value={text}
                    onChange={onChange}
                    onKeyPress={(e) => onAddTodo(e)}
                />
                {todolist.length === 0?
                    '' :
                            <AiOutlineDown
                                onClick={checkAllTodo}
                                id='toggleAll'
                                 className={`absolute bottom-[20px] left-[10px] text-[22px]
                                          cursor-pointer text-[#ddd]  transition-all
                                 `}
                            />

                }

            </div>


        </div>
    )
}

export default Header