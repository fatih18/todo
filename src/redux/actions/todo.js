import {GeneratorUtils} from '../../utils';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODOS = 'UPDATE_TODOS';
export const REMOVE_TODO = 'REMOVE_TODO';

const addTodoAction = (newTodo) => ({
  type: ADD_TODO,
  newTodo,
});

export const updateTodos = (newTodos) => ({
  type: UPDATE_TODOS,
  newTodos: [...newTodos],
});

// removeTodo(todo);
export const removeTodo = ({id}) => ({
  type: REMOVE_TODO,
  todoId: id,
});

export const toggleStatus = ({id}, status) => {
  return (dispatch, getState) => {
    const {todos} = getState().todoReducer;

    const todoItem = todos.find((it) => it.id === id);
    todoItem.status = status;

    dispatch(updateTodos(todos));
  };
};

export const updateTodo = (todo) => {
  return (dispatch, getState) => {
    const {todos} = getState().todoReducer;
    const todoItemIndex = todos.findIndex((it) => it.id === todo.id);

    todos[todoItemIndex] = todo;

    console.log(todo);
    dispatch(updateTodos(todos));
  };
};

export const addTodo = (params) => {
  return (dispatch, getState) => {
    const {id} = getState().userReducer.activeUser;
    dispatch(
      addTodoAction({
        ...params,
        userId: id,
        id: GeneratorUtils.uuidv4(),
        createdDate: new Date().getTime(),
      })
    );
  };
};
