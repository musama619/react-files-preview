import { useState } from "react";
import { ReactFilesPreview } from "./components/ReactFilesPreview";

function App() {
	const [files, setFiles] = useState<File[]>([]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(event.target.files || []);
		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		console.log("Selected files:", newFiles);
		console.log("All files:", [...files, ...newFiles]);
	};

	const handleFileRemove = (removedFile: File) => {
		setFiles((prevFiles) => prevFiles.filter((file) => file !== removedFile));
		console.log("Removed file:", removedFile);
	};

	return (
		<div className="App">
			<ReactFilesPreview
				allowEditing={true}
				onChange={handleFileChange}
				onRemove={handleFileRemove}
				getFiles={(f) => console.log("getFiles", f)}
				sliderIndicatorType="dots"
				// disabled={true}
			/>
		</div>
	);
}

export default App;
