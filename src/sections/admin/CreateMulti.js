import React, { useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createMultipleTask, createSingleTask } from "../../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

const initialState = {
  name: "",
  question: "",
  images: "",
  answer: "",
  win_quote: "",
  lose_quote: "",
  turns_permitted: 10,
  exp_given: 100,
  next_steps: "",
  reward: 300,
};

const CreateMulti = () => {
  const [formState, setFormState] = useState(initialState);
  const [singleTasks, setSingleTasks] = useState([]);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  const singleTask = [
    {
      name: "name",
      text: "Name",
    },
    {
      name: "images",
      text: "Images",
    },
    {
      name: "question",
      text: "Question",
    },
    {
      name: "turns_permitted",
      text: "Turns Permitted",
    },
    {
      name: "exp_given",
      text: "Exp Given",
    },
    {
      name: "win_quote",
      text: "Win Quote",
    },
    {
      name: "lose_quote",
      text: "Lose Quote",
    },
    {
      name: "reward",
      text: "Reward",
    },
    {
      name: "answer",
      text: "Answer (comma seperated)",
    },
    {
      name: "next_steps",
      text: "Next Steps(comma seperated)",
    },
  ];

  async function addSingleTask() {
    try {
      const singleTask = { ...formState };
      setSingleTasks([...singleTasks, singleTask]);
      singleTask.answer = singleTask.answer.split(",");
      singleTask.next_steps = singleTask.next_steps.split(",");
      setFormState(initialState);
      await API.graphql(
        graphqlOperation(createMultipleTask, { input: singleTask })
      );
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Create Multi</h2>
      {singleTask.map((object, index) => {
        return (
          <input
            key={object.id ? object.id : index}
            onChange={(event) => setInput(object.name, event.target.value)}
            style={styles.input}
            value={formState[object.name]}
            placeholder={object.text}
          />
        );
      })}
      <button style={styles.button} onClick={addSingleTask}>
        Create Todo
      </button>
      {/* {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      } */}
    </div>
  );
};

const styles = {
  container: {
    width: 400,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
};

export default withAuthenticator(CreateMulti);
