const fs = require('fs');
const path = require('path');
const dbFilePath = path.join(__dirname, 'db.txt');

// Helper function to read todos from the file
const readTodosSync = () => {
  if (!fs.existsSync(dbFilePath)) {
    return [];
  }

  const data = fs.readFileSync(dbFilePath, 'utf-8');
  return data.split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
};

// Helper function to write todos to the file
const writeTodosSync = (todos) => {
  const data = todos.map(todo => JSON.stringify(todo, null, 2)).join('\n');
  fs.writeFileSync(dbFilePath, data);
};

// 1. createTodoSync
const createTodoSync = (title) => {
  const todos = readTodosSync();
  const newTodo = {
    id: Date.now(),
    title: title,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  writeTodosSync(todos);
  return newTodo;
};

// 2. getTodosSync
const getTodosSync = () => {
  return readTodosSync();
};

// 3. getTodoSync
const getTodoSync = (id) => {
  const todos = readTodosSync();
  const todo = todos.find(todo => todo.id === id);
  return todo ? JSON.stringify(todo, null, 2) : null;
};

// 4. updateTodoSync
const updateTodoSync = (id, updates) => {
  const todos = readTodosSync();
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return null;
  }

  const updatedTodo = {
    ...todos[todoIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  todos[todoIndex] = updatedTodo;
  writeTodosSync(todos);
  return updatedTodo;
};

// 5. deleteTodoSync
const deleteTodoSync = (id) => {
  let todos = readTodosSync();
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return null;
  }

  todos = todos.filter(todo => todo.id !== id);
  writeTodosSync(todos);
  return true;
};

module.exports = {
  createTodoSync,
  getTodosSync,
  getTodoSync,
  updateTodoSync,
  deleteTodoSync
};
