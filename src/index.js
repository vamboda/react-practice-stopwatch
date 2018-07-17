import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
//connect, provider
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const update = (
  model = {
    isRunning: false,
    time: 0
  },
  action
) => {
  const updates = {
    TICK: model => {
      return Object.assign(
        {},
        model,
        model.isRunning
          ? {
              time: model.time + 1
            }
          : {}
      );
    },
    START: model => {
      return Object.assign({}, model, { isRunning: true });
    },
    STOP: model => {
      return Object.assign({}, model, { isRunning: false });
    }
  };
  return (updates[action.type] || (() => model))(model);
};

let stateContainer = createStore(update);

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    onStart: () => {
      dispatch({ type: "START" });
    },
    onStop: () => {
      dispatch({ type: "STOP" });
    }
  };
}

let StopWatch = connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  return (
    <div>
      {props.time}
      <br />
      <br />
      <br />
      <button onClick={props.isRunning ? props.onStop : props.onStart}>
        {" "}
        {props.isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
});

ReactDOM.render(
  <Provider store={stateContainer}>
    <StopWatch />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

setInterval(function() {
  stateContainer.dispatch({ type: "TICK" });
}, 1000);
