import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { todoFormValidation } from '../validations/TodoForm';

export const TodoForm = ({ editingTodo, addTodo, updateTodo }) => {
  const handleFormSubmit = (values, { resetForm }) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, values);
    } else {
      addTodo(values, { resetForm });
    }
  };

  return (
    <Formik
      initialValues={
        editingTodo || {
          title: '',
          description: '',
          deadline: '',
          subtasks: [],
          newSubtask: '',
        }
      }
      validationSchema={todoFormValidation}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, setFieldTouched }) => (
        <Form className="space-y-4">
          <div>
            <Field
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="description"
              as="textarea"
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <Field
              name="deadline"
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
              name="deadline"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <FieldArray name="subtasks">
            {({ push, remove }) => (
              <div>
                {values.subtasks.map((_, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <Field
                      name={`subtasks.${index}.title`}
                      type="text"
                      placeholder="Subtask title"
                      className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <ErrorMessage
                  name="subtasks"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <div className="flex mt-2">
                  <Field
                    name="newSubtask"
                    type="text"
                    placeholder="New subtask title"
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFieldTouched('newSubtask', true);
                      const newSubtaskTitle = values.newSubtask?.trim();
                      if (
                        newSubtaskTitle &&
                        newSubtaskTitle.length >= 3 &&
                        newSubtaskTitle.length <= 50
                      ) {
                        push({ title: newSubtaskTitle });
                        setFieldValue('newSubtask', '');
                        setFieldTouched('newSubtask', false);
                      }
                    }}
                    className="p-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600"
                  >
                    Add Subtask
                  </button>
                </div>
                <ErrorMessage
                  name="newSubtask"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            )}
          </FieldArray>

          <button
            type="submit"
            className="font-semibold w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {editingTodo ? 'Update Todo' : 'Add Todo'}
          </button>
        </Form>
      )}
    </Formik>
  );
};
