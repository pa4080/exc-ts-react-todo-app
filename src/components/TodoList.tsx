import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="grid gap-12 grid-cols-1 md:grid-cols-2 w-full">
      <div
        className="grid grid-flow-row grid-cols-1 gap-4
          bg-zinc-700 empty:bg-transparent
          px-6 py-6 rounded-lg w-full"
      >
        <span className="text-zinc-200 text-2xl mb-2 text-center">
          Active Tasks
        </span>
        {todos.map((todo) => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div
        className="grid grid-flow-row grid-cols-1 gap-4
          bg-zinc-500 empty:bg-transparent
          px-6 py-6 rounded-lg w-full"
      >
        <span className="text-zinc-200 text-2xl mb-2 text-center">
          Completed Tasks
        </span>
        {todos.map((todo) => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
