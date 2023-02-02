import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (ev: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  // Unselect the input field when press enter, by blur() it
  // on the form submit event: https://youtu.be/FJDVKeh7RJI
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input text-gray-700"
      onSubmit={(ev) => {
        handleAdd(ev);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a task"
        className={`input__box px-4 pb-4 pt-5 rounded-lg ${
          todo ? "selected" : ""
        }`}
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button
        className="input__submit rounded-r-lg bg-zinc-600 text-gray-200 hover:bg-zinc-500 active:bg-zinc-700"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default InputField;
