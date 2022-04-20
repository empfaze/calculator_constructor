import ReactDOM from "react-dom";
import { App } from "./components/App";
import { Provider } from "react-redux";
import GlobalStyles from "global"
import store from "./store";
import {FocusVisible} from "./components/UI/FocusVisible";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <FocusVisible>
      <App />
    </FocusVisible>
  </Provider>,
  document.getElementById("root")
);
