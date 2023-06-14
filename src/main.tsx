import ReactDOM from "react-dom/client";
import ReactFilePreview from "./ReactFilePreview/ReactFilePreview.tsx";
import "./css/index.css";
import { Provider } from "react-redux";
import store from "../store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<ReactFilePreview
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
			onClick={file => console.log(file)}
			rounded={false}
		/>
	</Provider>
);
