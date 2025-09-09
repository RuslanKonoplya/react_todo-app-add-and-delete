import React from 'react';
import { ErrorType, Todo } from '../../types/Types';
import classNames from 'classnames';
import { deleteTodo } from '../../api/todos';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
   setError: React.Dispatch<React.SetStateAction<ErrorType>>
};

export const TodoList: React.FC<Props> = ({ todos,setTodos,setError }) => {



  const handleDelete = (id : number) => {

    deleteTodo(id)

      .then(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
      })

    .catch (() => {
      setError(ErrorType.CantDelete)
    })
  }



  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}



      {todos.map(todo => (
        <div
          data-cy="Todo"
          className={classNames({
            'todo completed': todo.completed,
            'todo item-enter-done': !todo.completed,
          })}
          key={todo.id}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
            />
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}



    </section>
  );
};
