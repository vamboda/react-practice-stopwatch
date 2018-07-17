import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

let model = {
  isRunning: false,
  time: 0
};

const update = (model, intent) => {
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
  return updates[intent](model);
};

let view = m => {
  let clickHandler = event => {
    model = update(m, m.isRunning ? "STOP" : "START");
  };

  return (
    <div>
      {model.time}
      <br />
      <br />
      <br />
      <button onClick={clickHandler}>
        {" "}
        {model.isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

const render = () => {
  ReactDOM.render(view(model), document.getElementById("root"));
};
render();
registerServiceWorker();

setInterval(function() {
  model = update(model, "TICK");
  render();
}, 1000);
