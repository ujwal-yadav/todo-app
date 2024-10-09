import React, { useState } from 'react';
import { Todos } from './constants/Todos';
import { TodoForm } from './components/TodoForm';
import { Modal } from './components/Modal';

function App() {
  const [todos, setTodos] = useState(Todos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = (values, { resetForm }) => {
    const newTodo = {
      ...values,
      id: Date.now(),
      isComplete: false,
      subtasks: values.subtasks.map((subtask) => ({
        ...subtask,
        isComplete: false,
      })),
    };
    setTodos([...todos, newTodo]);
    resetForm();
    setIsModalOpen(false);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...updatedTodo,
            id,
            isComplete: todo.isComplete,
            subtasks: updatedTodo.subtasks.map((subtask, index) => ({
              ...subtask,
              isComplete: todo.subtasks[index]
                ? todo.subtasks[index].isComplete
                : false,
            })),
          };
        }
        return todo;
      })
    );
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, isComplete: !todo.isComplete };
          updatedTodo.subtasks = updatedTodo.subtasks.map((subtask) => ({
            ...subtask,
            isComplete: updatedTodo.isComplete,
          }));
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  const toggleSubtaskComplete = (todoId, subtaskIndex) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoId) {
          const updatedSubtasks = todo.subtasks.map((subtask, index) =>
            index === subtaskIndex
              ? { ...subtask, isComplete: !subtask.isComplete }
              : subtask
          );
          const allSubtasksComplete = updatedSubtasks.every(
            (subtask) => subtask.isComplete
          );
          return {
            ...todo,
            subtasks: updatedSubtasks,
            isComplete: allSubtasksComplete,
          };
        }
        return todo;
      })
    );
  };

  const openModal = (todo = null) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="container mx-auto lg:p-6 p-4 lg:w-[800px]">
        <div className="flex justify-between items-center lg:mb-6 mb-4">
          <h1 className="text-3xl font-bold">Todos</h1>
          <button
            onClick={() => openModal()}
            className="p-2 px-4 font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Todo
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTodo(null);
          }}
        >
          <TodoForm
            editingTodo={editingTodo}
            addTodo={addTodo}
            updateTodo={updateTodo}
          />
        </Modal>

        <div className="lg:space-y-6 space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="border border-gray-500 bg-gray-900 lg:p-5 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{todo.title}</h2>

                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => toggleTodoComplete(todo.id)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <p className="text-gray-200 mt-2 mb-4">{todo.description}</p>

              {todo.subtasks.length > 0 && (
                <div className="mt-2 flex justify-between items-end">
                  <div>
                    <h3 className="font-semibold">Sub Tasks</h3>
                    <ul className="list-inside">
                      {todo.subtasks.map((subtask, index) => (
                        <li key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={subtask.isComplete}
                            onChange={() =>
                              toggleSubtaskComplete(todo.id, index)
                            }
                            className="mr-2"
                          />
                          <span
                            className={subtask.isComplete ? 'line-through' : ''}
                          >
                            {subtask.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-2">
                <h3 className="font-bold mt-2 inline-flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  </svg>

                  <span className="text-sm font-normal">{todo.deadline}</span>
                </h3>

                <div className="flex space-x-4">
                  <button
                    onClick={() => openModal(todo)}
                    disabled={todo.isComplete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class={`size-6 ${
                        todo.isComplete ? 'text-gray-600' : 'text-blue-500'
                      } `}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="size-6 text-red-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
