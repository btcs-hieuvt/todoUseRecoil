import { atom, selector } from "recoil";


export const todoListState =atom({
   
   
    key: 'todoList',
    default:[],

})
export const textState = atom({
    key:'textState',
    default:''
})
export const idTodoEditState = atom({
    key :'idTodoEditState',
    default:''
})

export const statusBtnState =atom({
    key:'statusBtnState',
    default:'All'
})

export const filterTodoListState = selector({
    key: 'FilteredTodoList',
    get: ({get}) =>{
        const filter = get(statusBtnState);
        const list = get(todoListState);

        switch (filter) {
            case 'Completed':
              return list.filter((item) => item.isCompleted);
            case 'Active':
              return list.filter((item) => !item.isCompleted);
            default:
              return list;
    }
}
})

export const todoListStatsState = selector({
    key: 'TodoListStats',
    get: ({get}) => {
      const todoList = get(todoListState);
      const numOfTodo = todoList.length;
      const numOfTodoActive = todoList.filter((item) => !item.isCompleted).length;
      const todoActive =todoList.filter((item) => !item.isCompleted)

  
      return {
        numOfTodo,
        numOfTodoActive,
        todoActive,
      
      };
    },
});