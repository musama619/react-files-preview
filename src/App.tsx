import { ReactFilesPreview } from "./components/ReactFilesPreview";

function App() {
	return (
		<div className="App">
			<ReactFilesPreview
				allowEditing={true}
				onChange={(f) => console.log("onChange", f.target.files)}
				onDrop={(f) => console.log("onDrop", f.dataTransfer.files)}
				getFiles={(f) => console.log("getFiles", f)}
				// disabled={true}
			/>
		</div>
	);
}

export default App;
