import React, {
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';

interface Todo {
    id: number;
    done: boolean;
    text: string;
}

type ActionType =
    | { type: 'ADD'; text: string }
    | { type: 'REMOVE'; id: number };

function App() {
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    useEffect(() => {
        if (alertMessage !== '') {
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);
        }
    }, [alertMessage]);

    const [todos, dispatch] = useReducer(
        (state: Todo[], action: ActionType) => {
            switch (action.type) {
                case 'ADD':
                    setAlertMessage('Todo added');
                    setIsAlertVisible(true);

                    return [
                        ...state,
                        {
                            id: state.length,
                            text: action.text,
                            done: false,
                        },
                    ];
                case 'REMOVE':
                    setAlertMessage(`Todo ${action.id} removed`);
                    setIsAlertVisible(true);

                    return state.filter(({ id }) => id !== action.id);
                default:
                    throw new Error();
            }
        },
        []
    );

    const newTodoRef = useRef<HTMLInputElement>(null);

    const onAddTodo = useCallback(() => {
        if (newTodoRef.current) {
            dispatch({
                type: 'ADD',
                text: newTodoRef.current.value,
            });
            newTodoRef.current.value = '';
        }
    }, []);

    return (
        <main
            className='mx-auto mt-12 flex flex-col  items-center justify-center'
            data-theme='luxury'
        >
            {isAlertVisible ? (
                <div className='alert my-8 max-w-lg alert-success shadow-lg'>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='stroke-current flex-shrink-0 h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span>{alertMessage}</span>
                    </div>
                </div>
            ) : (
                <div className='alert bg-transparent my-8 max-w-lg shadow-lg'>
                    <div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='flex-shrink-0 h-6 w-6 stroke-transparent'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span></span>
                    </div>
                </div>
            )}

            <div className='flex gap-x-12'>
                <div className='flex flex-col gap-y-3'>
                    <input
                        type='text'
                        autoFocus={true}
                        placeholder='Type todo here'
                        ref={newTodoRef}
                        className='input input-bordered w-full max-w-xs'
                    />
                    <button className='btn btn-outline' onClick={onAddTodo}>
                        Add Todo
                    </button>
                </div>

                <div className='divider divider-horizontal'></div>

                <div className='flex flex-col gap-y-3'>
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className='flex justify-between gap-x-8 items-center'
                        >
                            <span className='text-2xl  items-center flex gap-x-2'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-4 h-4'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>

                                {todo.text}
                            </span>

                            <button
                                className='btn btn-sm btn-outline btn-error'
                                onClick={() =>
                                    dispatch({
                                        type: 'REMOVE',
                                        id: todo.id,
                                    })
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default App;
