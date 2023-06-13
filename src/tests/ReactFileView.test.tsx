import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "./test-utils";
import ReactFileView from "../ReactFileView/ReactFileView";
import store from "../../store";
import { storeFileState } from "../redux/fileSlice";

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
				multiple={true}
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
				multiple={true}
			/>
		);

		expect(screen.queryByText(/Browse files/i)).toBeInTheDocument();
	});
	it("renders file preview when fileData is not empty", async () => {
		render(
			<ReactFileView
				files={[files]}
				url={null}
				downloadFile={downloadFile}
				removeFile={removeFile}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);
		expect(screen.queryByText(/Add more/i)).toBeInTheDocument();
		expect(screen.queryByText(/Browse files/i)).not.toBeInTheDocument();
	});

	it("remove button should render called", async () => {
		render(
			<ReactFileView
				files={[files]}
				url={null}
				downloadFile={downloadFile}
				removeFile={true}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);

		const removeButton = await screen.findAllByTestId("remove-file-button");
		waitFor(() => expect(removeButton).toBeInTheDocument());
	});
	it("handleImage functions should be called", async () => {
		const handleImage = vi.spyOn(store, "dispatch");

		render(
			<ReactFileView
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={true}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);

		waitFor(() => fireEvent.change(screen.getByText(/Browse files/i), {
			target: { files: [new File([], "filename")] },
		}));

		expect(handleImage).toBeCalled();
	});

	it("If fileState is zoom, ImageSlider component should render", async () => {
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc: null,
				index: 1,
				isImage: true,
				fileName: "test.txt",
				type: "text/plain",
				size: 500000,
			})
		);

		render(
			<ReactFileView
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={true}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);

		expect(screen.queryByText("test.txt")).toBeInTheDocument();
	});
});
