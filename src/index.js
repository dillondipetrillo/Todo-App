import { renderTodos } from "./views"
import {  setFilters } from './filters'
import { createTodo, loadTodos } from "./todos"

renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = e.target.elements.newTodo.value.trim()
    if(inputValue.length > 0) {
        createTodo(inputValue)
        renderTodos()
        e.target.elements.newTodo.value = ''
    } else {
        return
    }
})

document.querySelector('#hide-todos').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

window.addEventListener('storage', (e) => {
    if(e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
}) 