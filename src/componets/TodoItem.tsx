import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isTemp?: boolean;

  handleChangeComplete: (todoId: number) => void;

  editingTodoId: number | null;
  handleEditSubmit: (todoId: number) => void;

  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;

  handleDobelChangeTitle: (todoId: number, title: string) => void;

  removeElement: (todoId: number) => void;

  loadingTodoId: number | null;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isTemp = false,
  handleChangeComplete,
  editingTodoId,
  handleEditSubmit,
  editTitle,
  setEditTitle,
  handleDobelChangeTitle,
  removeElement,
  loadingTodoId,
}) => {
  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleChangeComplete(todo.id)}
          disabled={loadingTodoId === todo.id}
          aria-label="Todo title"
        />
      </label>

      {editingTodoId === todo.id ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleEditSubmit(todo.id);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => handleDobelChangeTitle(todo.id, todo.title)}
        >
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => removeElement(todo.id)}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isTemp || loadingTodoId === todo.id,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
