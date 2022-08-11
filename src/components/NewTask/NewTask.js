import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: httpItemHandler } = useHttp();
  const applyDataHandler = (taskText, taskdata) => {
    const generatedId = taskdata.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    httpItemHandler(
      {
        url: "https://react-http-b3628-default-rtdb.firebaseio.com/task.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      applyDataHandler.bind(null, taskText)
    );
  };
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

// import Section from "../UI/Section";
// import TaskForm from "./TaskForm";
// import useHttp from "../../hooks/use-http";

// const NewTask = (props) => {
//   const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

//   const createTask = (taskText, taskData) => {
//     const generatedId = taskData.name; // firebase-specific => "name" contains generated id
//     const createdTask = { id: generatedId, text: taskText };

//     props.onAddTask(createdTask);
//   };

//   const enterTaskHandler = async (taskText) => {
//     sendTaskRequest(
//       {
//         url: "https://react-http-b3628-default-rtdb.firebaseio.com/task.json",
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: { text: taskText },
//       },
//       createTask.bind(null, taskText)
//     );
//   };

//   return (
//     <Section>
//       <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
//       {error && <p>{error}</p>}
//     </Section>
//   );
// };

// export default NewTask;
