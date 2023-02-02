import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import {
  FaRegEdit as Edit,
  FaRegTrashAlt as Delete,
  FaRegCheckSquare as Done
} from "react-icons/fa";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    /**
     * setTodos(
     *   todos.map((todo) => {
     *     if (todo.id === id) todo.isDone = !todo.isDone;
     *     return todo;
     *   })
     * );
     */
    // Little bit shorter than the above
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (ev: React.FormEvent, id: number) => {
    ev.preventDefault();

    if (edit) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: editTodo } : todo
        )
      );
    }

    setEdit((prev) => !prev);
  };

  return (
    <form
      onSubmit={(ev) => handleEdit(ev, todo.id)}
      className="todos__single text-black px-4 pb-4 pt-5 rounded-md bg-zinc-200 hover:bg-orange-300"
    >
      {
        /**
         * w-0: In some cases, you may need to override input widths using
         * 'width: 100%' or 'width: 0',  https://stackoverflow.com/a/42421490
         */
        edit ? (
          <input
            ref={inputRef}
            type="text"
            className="flex-1 w-0 inline focus:outline-none text-left text-lg text-zinc-900 -ml-1 pl-1 rounded-md"
            value={editTodo}
            onChange={(ev) => setEditTodo(ev.target.value)}
          />
        ) : (
          <span
            className={`flex-1 w-0 overflow-hidden focus:outline-none text-left text-lg ${
              todo.isDone ? "line-through text-zinc-500" : "text-zinc-800"
            }`}
          >
            {editTodo}
          </span>
        )
      }

      <span className="icon" onClick={(ev) => handleEdit(ev, todo.id)}>
        <Edit />
      </span>
      <span className="icon" onClick={() => handleDelete(todo.id)}>
        <Delete />
      </span>
      <span className="icon" onClick={() => handleDone(todo.id)}>
        <Done />
      </span>
    </form>
  );
};

export default SingleTodo;
