import ReactDOM from "react-dom";
import { App } from "./components/App";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";
import "focus-visible";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
