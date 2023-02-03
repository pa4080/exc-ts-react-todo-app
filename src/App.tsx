import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
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

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId: id } = result;
    // console.log(result);

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let draggedTodo;
    let active = [...todos];
    let completed = [...completedTodos];

    // Find the Todo and remove it from the source list
    if (source.droppableId === "ACTIVE") {
      draggedTodo = active[source.index];
      active.splice(source.index, 1);
    } else {
      draggedTodo = completed[source.index];
      completed.splice(source.index, 1);
    }

    // Change the status
    if (destination.droppableId === "ACTIVE") {
      draggedTodo.isDone = false;
    } else {
      draggedTodo.isDone = true;
    }

    // Add the Todo to the destination list
    if (destination.droppableId === "ACTIVE") {
      active.splice(destination.index, 0, draggedTodo);
    } else {
      completed.splice(destination.index, 0, draggedTodo);
    }

    setTodos([...active]);
    setCompletedTodos([...completed]);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div
        className="w-full px-14 py-12 select-none
        flex flex-col justify-center items-center"
      >
        <span className="heading uppercase font-bold tracking-wider text-zinc-100 text-4xl md:text-5xl mt-6 mb-2 z-10">
          Tasks
        </span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
