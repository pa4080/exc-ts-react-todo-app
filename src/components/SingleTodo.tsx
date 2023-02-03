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
      className={`transition-all duration-150 flex text-zinc-800 px-4 pb-4 pt-5 rounded-md  ${
        edit
          ? "bg-orange-500 hover:bg-orange-600"
          : "bg-zinc-200 hover:bg-orange-300"
      }`}
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
            className="flex-1 w-0 focus:outline-none text-left text-lg text-zinc-900 -ml-1 pl-1 rounded-md"
            value={editTodo}
            onChange={(ev) => setEditTodo(ev.target.value)}
          />
        ) : (
          <span
            className={`flex-1 w-0 overflow-hidden  text-left text-lg ${
              todo.isDone ? "line-through text-zinc-500" : "text-zinc-800"
            }`}
          >
            {editTodo}
          </span>
        )
      }

      <div
        className="text-2xl active:text-orange-400 hover:text-orange-800 cursor-pointer ml-2"
        onClick={(ev) => handleEdit(ev, todo.id)}
      >
        <Edit />
      </div>
      <div
        className="text-2xl active:text-orange-400 hover:text-orange-800 cursor-pointer ml-1"
        onClick={() => handleDelete(todo.id)}
      >
        <Delete />
      </div>
      <div
        className="text-2xl active:text-orange-400 hover:text-orange-800 cursor-pointer ml-1"
        onClick={() => handleDone(todo.id)}
      >
        <Done />
      </div>
    </form>
  );
};

export default SingleTodo;
