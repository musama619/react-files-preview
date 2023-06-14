import ReactDOM from "react-dom/client";
import ReactFilesPreview from "./ReactFilesPreview/ReactFilesPreview.tsx";
import "./css/index.css";
import { Provider } from "react-redux";
import store from "../store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<ReactFilesPreview
			files={[]}
		/>
	</Provider>
);
