import ReactDOM from "react-dom/client";
// import "./css/index.css";
import { Provider } from "react-redux";
import store from "../store.ts";
import { ReactFilesPreview } from "./component/ReactFilesPreview.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<ReactFilesPreview
			files={[]}
		/>
	</Provider>
);
