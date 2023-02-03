import React, { useEffect, useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { getLocalStorage, setLocalStorage } from "./helpers/local-storage";
import { Todo } from "./model";

type Props = {};

const App: React.FC = (props: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(
    getLocalStorage("TODOS_LIST_ACTIVE", [])
  );
  const [completedTodos, setCompletedTodos] = useState<Todo[]>(
    getLocalStorage("TODOS_LIST_COMPLETED", [])
  );

  useEffect(() => {
    setLocalStorage("TODOS_LIST_ACTIVE", todos);
    setLocalStorage("TODOS_LIST_COMPLETED", completedTodos);
  }, [todos, completedTodos]);

  const handleAdd = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (todo) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          todo,
          isDone: false
        }
      ]);

      setTodo("");
    }
  };

  return (
    <div
      className="w-full px-14 py-12 select-none
        flex flex-col justify-center items-center"
    >
      <span className="heading uppercase font-bold tracking-wider text-zinc-100 text-4xl md:text-5xl mt-6 mb-2 z-10">
        Tasks
      </span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
