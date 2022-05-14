import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { Auth } from "@aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "../../aws-exports";
import { ReactComponent as Completed } from "../../assets/navbar_icons/check.svg";
Amplify.configure(awsExports);

const ListTasks = () => {
  const [singleTasks, setSingleTasks] = useState([]);
  const [multiTasks, setMultiTasks] = useState([]);
  const [riddleTasks, setRiddleTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchProblems();
  }, []);

  async function fetchProblems() {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      const email = await authUser.attributes.email;

      const userData = await API.graphql({
        query: queries.getAccount,
        variables: { id: email },
      });
      const oldAccountData = userData.data.getAccount;
      const finishedTasks = oldAccountData.completed_tasks;

      const singleTaskData = await API.graphql(
        graphqlOperation(queries.listSingleTasks)
      );
      const singleTasks = singleTaskData.data.listSingleTasks.items;

      const multiTaskData = await API.graphql(
        graphqlOperation(queries.listMultipleTasks)
      );
      const multiTasks = multiTaskData.data.listMultipleTasks.items;

      const riddleTaskData = await API.graphql(
        graphqlOperation(queries.listRiddleTasks)
      );
      const riddleTasks = riddleTaskData.data.listRiddleTasks.items;

      setFinishedTasks(finishedTasks);
      setSingleTasks(singleTasks);
      setMultiTasks(multiTasks);
      setRiddleTasks(riddleTasks);
    } catch (err) {
      console.log(err);
    }
  }

  function toSingle(id) {
    history.push({
      pathname: "/task/id=" + id,
    });
  }

  function toMulti(id) {
    history.push({
      pathname: "/multi_task/id=" + id,
    });
  }

  function toRiddle(id) {
    history.push({
      pathname: "/riddle_task/id=" + id,
    });
  }
  return (
    <div className="center-div" style={{ marginBottom: "20px" }}>
      <div className="tasks_title_div">
        <h1>Tasks</h1>
      </div>
      <h3>Tip: You can still do a task even if you have finished it!</h3>
      <h1>Single Step Tasks</h1>
      <h3 className="task_descriptions">
        Tasks where the solution is a specific type
      </h3>
      <div className="battle_list">
        {singleTasks.map((task, index) => (
          <div
            className="battle_item center-div"
            onClick={() => toSingle(task.id)}
            key={task.id ? task.id : index}
          >
            {finishedTasks.includes(task.id) ? (
              <Completed className="battle_item_completed" />
            ) : (
              <></>
            )}
            <h3>{task.name}</h3>
            {/* <Completed className="battle_item_completed_padding"/> */}
            <p className="battle_item_text">{task.question}</p>
            <img
              style={{ height: "100px", width: "150px", objectFit: "cover" }}
              alt={task.name}
              src={"/assets/single_tasks/" + task.images + ".jpg"}
            />
            <p>Exp Given: {task.exp_given}</p>
          </div>
        ))}
      </div>
      <h1>Multi Step Tasks</h1>
      <h3 className="task_descriptions">
        Tasks where the solution is a multiple type done in steps
      </h3>
      <div className="battle_list">
        {multiTasks.map((task, index) => (
          <div
            className="battle_item center-div"
            onClick={() => toMulti(task.id)}
            key={task.id ? task.id : index}
          >
            {finishedTasks.includes(task.id) ? (
              <Completed className="battle_item_completed" />
            ) : (
              <></>
            )}
            <h3>{task.name}</h3>
            <p className="battle_item_text">{task.question}</p>
            <img
              style={{ height: "100px", width: "150px", objectFit: "cover" }}
              alt={task.name}
              src={"/assets/multi_tasks/" + task.images + "0.jpg"}
            />
            <p>Exp Given: {task.exp_given}</p>
          </div>
        ))}
      </div>
      <h1>Riddle Tasks</h1>
      <h3 className="task_descriptions">
        Tasks where the solution is a specific type (like a riddle)
      </h3>
      <div className="battle_list">
        {riddleTasks.map((task, index) => (
          <div
            className="battle_item center-div"
            onClick={() => toRiddle(task.id)}
            key={task.id ? task.id : index}
          >
            {finishedTasks.includes(task.id) ? (
              <Completed className="battle_item_completed" />
            ) : (
              <></>
            )}
            <h3>{task.name}</h3>
            <p className="battle_item_text">{task.question}</p>
            <img
              style={{ height: "100px", width: "150px", objectFit: "cover" }}
              alt={task.name}
              src={"/assets/riddle_tasks/" + task.images + ".jpg"}
            />
            <p>Exp Given: {task.exp_given}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuthenticator(ListTasks);
