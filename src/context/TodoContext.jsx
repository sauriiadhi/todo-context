import { useContext,createContext } from "react"

export const TodoContext = createContext({
    todos: [
        {
            id:1,
            todoText:"i am todo",
            competed:false
        }
    ],
    addTodo : (todos) => {},
    updateTodo: (id,todotext) => {},
    deleteTodo: (id) => {},
    completeTodo: (id) => {}
})

export const TodoProvider = TodoContext.Provider

export default function useTodo() {
    return useContext(TodoContext)
}
