'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch(e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideComepletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideComepletedMatch
    })

    let incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if(filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        todoEl.appendChild(messageEl)
    }
}

// Toggle todo checkbox
const toggleTodo = (id) => {
    const checkedTodo = todos.find((todo) => todo.id === id)
    
    if(checkedTodo) {
        checkedTodo.completed = !checkedTodo.completed
    }
}

// Remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup the todo checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup the todo text
    todoText.textContent = todo.title
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Set up remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    const todosLeft = incompleteTodos.length === 1 ? 'todo' : 'todos'
    summary.textContent = `You have ${incompleteTodos.length} ${todosLeft} left`
    return summary
}