import React, { useEffect, useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

type Props = {};

// Ref.: https://usehooks-ts.com/react-hook/use-local-storage
const todosStoredValue: Todo[] = ((storageKey: string, initValue: Todo[]) => {
  if (typeof window === "undefined") return initValue;

  try {
    const item = window.localStorage.getItem(storageKey);
    return item ? (JSON.parse(item) as Todo[]) : initValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${storageKey}":`, error);
    return initValue;
  }
})("TODOS_LIST", []);

const App: React.FC = (props: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(todosStoredValue);

  useEffect(() => {
    if (todos.length) {
      console.log(todos);
    }
    localStorage.setItem("TODOS_LIST", JSON.stringify(todos));
  }, [todos]);

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
    <div className="App">
      <span className="heading">Tasks</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
