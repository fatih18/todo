import {ADD_TODO, REMOVE_TODO, UPDATE_TODOS} from '../actions/todo';
/**
 *
 * Todo item reducer
 *
 * To handle basic crud operations
 *
 * todoItem: {
 *    id: {string},
 *    userId: {string}, id of the user this todoItem belongs to
 *    title: {string},
 *    body: {string},
 *    createdDate: {Date},
 *    dueDate: {Date},
 *    shouldRemind: {Boolean},
 * }
 *
 */

const INITIAL_STATE = {
  todos: [],
};

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.newTodo],
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.todoId),
      };

    case UPDATE_TODOS:
      return {
        ...state,
        todos: action.newTodos,
      };

    default:
      return state;
  }
};
export default todoReducer;

// state.todo.map((todo, i) => (i === 1 ? {...todo, todo: action.payload} : todo)),
