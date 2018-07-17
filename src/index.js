import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const update = (model={
    isRunning: false,
    time: 0
  }, action) => {
  const updates = {
    TICK: model => {
      return Object.assign(
        model,
        model.isRunning
          ? {
              time: model.time + 1
            }
          : {}
      );
    },
    START: model => {
      return Object.assign(model, { isRunning: true });
    },
    STOP: model => {
      return Object.assign(model, { isRunning: false });
    }
  };
  return (updates[action.type] || (() => model))(model);
};

let stateContainer = createStore(update)

let view = m => {
  let clickHandler = event => {
    stateContainer.dispatch(m.isRunning ? { type: "STOP" } : { type: "START" });
  };

  return (
    <div>
      {m.time}
      <br />
      <br />
      <br />
      <button onClick={clickHandler}>
        {" "}
        {m.isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const render = () => {
  ReactDOM.render(view(stateContainer.getState()), document.getElementById("root"));
};

render();
registerServiceWorker();
stateContainer.subscribe(render);

setInterval(function() {
  stateContainer.dispatch({type: 'TICK'})
}, 1000);
