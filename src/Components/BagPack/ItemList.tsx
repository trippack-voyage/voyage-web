import { useState } from "react";
import CreateTodo from "./Create";
import TodoItem from "./TodoItem";

export interface TList {
  id: number;
  text: string;
  completed: boolean;
}

export default function ItemList() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<TList[]>([]);

  // 입력값 변경내용 확인
  const textTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // 입력 확인
  const textInputHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newTodo: TList = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    // 아래처럼도 사용 가능
    // setTodoList(todoList.concat(newTodo));
    // 입력한 값 지우기
    setInputText("");
  };

  // 값 삭제하기
  const textDeleteHandler = (id: number) => {
    setTodoList(todoList.filter((todoItem) => todoItem.id !== id));
  };

  // 값 수정하기
  const updateHandler = (newTodo: TList): void => {
    // newTodo는 새롭게 입력한 값
    const newTodoList = todoList.map((item) => {
      // id값이 같은 것은 새롭게 입력한 값으로 return하고
      if (item.id === newTodo.id) {
        return newTodo;
        // 그 외에는 기존 값을 return
      } else {
        return item;
      }
    });
    setTodoList(newTodoList);
  };

  return (
    <div className="todoListContainer">
      <CreateTodo
        onChange={textTypingHandler}
        onSubmit={textInputHandler}
        inputText={inputText}
      />
      {todoList.map((item) => (
        <TodoItem
          id={item.id}
          text={item.text}
          completed={item.completed}
          onClickDelete={textDeleteHandler}
          onClickUpdate={updateHandler}
        />
      ))}
    </div>
  );
}