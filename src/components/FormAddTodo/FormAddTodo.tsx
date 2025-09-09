import { useEffect, useRef, useState } from "react";
import { ErrorType, Todo } from "../../types/Types";
import { postTodo } from "../../api/todos";


type Props = {
  setError: React.Dispatch<React.SetStateAction<ErrorType>>
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setTempTodo: any;

}


export const FormAddTodo: React.FC<Props> = ({setError,setTodos,setTempTodo}) => {

  const [todoTitle, setTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  useEffect(() => {
  if (!loading) {
    inputRef.current?.focus();
  }
  }, [loading]);



   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const titleTrimmed = todoTitle.trim();
  if (!titleTrimmed) {
    setError(ErrorType.TitleEmpty);
    inputRef.current?.focus();
    timerRef.current = setTimeout(() => setError(ErrorType.None), 3000);
    return;
  }


  const temp = { id: 0, userId: 3461, title: titleTrimmed, completed: false };
  setTempTodo(temp);
  setLoading(true);

  postTodo({ title: titleTrimmed })
    .then(newTodo => {
      setTodos(prev => [...prev, newTodo]);
      setTodoTitle('');
    })
    .catch(() => {
      setError(ErrorType.CantAdd);
    })
    .finally(() => {
      setTempTodo(null);     
      setLoading(false);
      inputRef.current?.focus();
    });
};


  return (



    <form onSubmit={handleSubmit}>
              <input
                 ref={inputRef}
                data-cy="NewTodoField"
                type="text"
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                disabled={loading}
              />
            </form>

  )

}
