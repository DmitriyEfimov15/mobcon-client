import { createRoot } from "react-dom/client";
import RouteWrapper from "./Router/RouteWrapper";
import { Provider } from "react-redux";
import { setupStore } from "./store";

const root = document.getElementById("root");

if (!root) {
    throw new Error("root not found!");
}

const contrainer = createRoot(root);
const store = setupStore()

contrainer.render(
    <Provider store={store}>
        <RouteWrapper />
    </Provider>
);
