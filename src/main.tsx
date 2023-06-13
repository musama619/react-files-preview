import ReactDOM from "react-dom/client";
import ReactFileView from "./ReactFileView/ReactFileView.tsx";
import "./css/index.css";
import { Provider } from "react-redux";
import store from "../store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<ReactFileView
			files={[]}
			url={null}
			downloadFile={true}
			removeFile={true}
			showFileSize={true}
			showSliderCount={true}
			multiple={true}
			getFiles={(files) => console.log(files)}
			onChange={(e) => console.log(e.target.files)}
			onRemove={(removedFile) => console.log(removedFile)}
			onError={err => console.log(err.message)}
			rounded={false}
		/>
	</Provider>
);
