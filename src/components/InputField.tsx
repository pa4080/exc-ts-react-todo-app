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
      className="text-gray-700 my-12 w-full relative flex items-center"
      onSubmit={(ev) => {
        handleAdd(ev);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a task"
        className={`input-field
          px-4 pb-4 pt-5 rounded-lg w-full text-xl transition-all duration-150 bg-zinc-50
          ${todo ? "selected" : ""}`}
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button
        className="button-add
          rounded-r-lg bg-zinc-600 text-zinc-200 hover:bg-zinc-500 active:bg-zinc-700
          absolute h-full px-7 right-0 border-none
          text-2xl font-medium transition-all duration-150"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default InputField;
