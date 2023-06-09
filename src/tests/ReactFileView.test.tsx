import { describe, it, expect } from "vitest";
import { render, screen } from "./test-utils";
import ReactFileView from "../ReactFileView/ReactFileView";

describe("Renders main page correctly", async () => {
	it("Should render the page correctly", async () => {
		render(
			<ReactFileView
				files={[]}
				url={null}
				downloadFile={true}
				removeFile={true}
				showFileSize={true}
				showSliderCount={true}
			/>
		);
	});
});
describe("Check file", async () => {
	const files = new File(["test content"], "test.txt", { type: "text/plain" });
	const url =
		"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
	const downloadFile = true;
	const removeFile = true;
	const showFileSize = true;
	const showSliderCount = true;

	it("renders browse files input when fileData is empty", () => {
		render(
			<ReactFileView
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={removeFile}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
			/>
		);

		expect(screen.queryByText(/Browse files/i)).toBeInTheDocument();
		
	});
	it("renders file preview when fileData is not empty", async() => {
		render(
			<ReactFileView
				files={[files]}
				url={null}
				downloadFile={downloadFile}
				removeFile={removeFile}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
			/>
		);
		expect(screen.queryByText(/Add more/i)).toBeInTheDocument();
		expect(screen.queryByText(/Browse files/i)).not.toBeInTheDocument();
	});
});
