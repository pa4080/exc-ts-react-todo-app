import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos
}) => {
  return (
    <div className="grid gap-12 grid-cols-1 md:grid-cols-2 w-full transition-height duration-1000 ease-in-out">
      <Droppable droppableId="ACTIVE">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col flex-1
              bg-zinc-700 empty:bg-transparent
              px-6 py-6 rounded-lg w-full
              "
          >
            <span className="text-zinc-200 text-2xl mb-2 text-center">
              Active Tasks
            </span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="COMPLETED">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col flex-1
              bg-zinc-500 empty:bg-transparent
              px-6 py-6 rounded-lg w-full"
          >
            <span className="text-zinc-200 text-2xl mb-2 text-center">
              Completed Tasks
            </span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                key={todo.id}
                todo={todo}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
