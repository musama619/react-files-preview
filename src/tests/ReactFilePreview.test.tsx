import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "./test-utils";
import { ReactFilesPreview } from "../components/ReactFilesPreview";
import store from "../../store";
import { setComponentState, storeFileState } from "../redux/fileSlice";

describe("Renders main page correctly", async () => {
	it("Should render the page correctly", async () => {
		render(
			<ReactFilesPreview
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
	const downloadFile = true;
	const removeFile = true;
	const showFileSize = true;
	const showSliderCount = true;

	it("renders browse files input when fileData is empty", () => {
		render(
			<ReactFilesPreview
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
			<ReactFilesPreview
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

	it("remove button should render", async () => {
		render(
			<ReactFilesPreview
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
			<ReactFilesPreview
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={true}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);

		waitFor(() =>
			fireEvent.change(screen.getByText(/Browse files/i), {
				target: { files: [new File([], "filename")] },
			})
		);

		expect(handleImage).toBeCalled();
	});

	it("onChange functions should be called when browse file", async () => {
		const onChange = vi.spyOn(store, "dispatch");

		render(
			<ReactFilesPreview
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={true}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);

		waitFor(() =>
			fireEvent.change(screen.getByText(/Browse files/i), {
				target: { files: [new File([], "filename")] },
			})
		);

		expect(onChange).toBeCalled();
	});
	it("remove functions should be called when remove button is clicked", async () => {
		const remove = vi.spyOn(store, "dispatch");

		render(
			<ReactFilesPreview
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={true}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);

		waitFor(() => fireEvent.click(screen.getByTestId("remove-file-button")));

		expect(remove).toBeCalled();
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
			<ReactFilesPreview
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
	it("shoudl not render remove button if removeFile is false", async () => {
		store.dispatch(
			setComponentState({
				downloadFile: true,
				removeFile: true,
				showFileSize: true,
				showSliderCount: false,
				rounded: true,
				fileHeight: "h-32",
				fileWidth: "w-44",
			})
		);

		render(
			<ReactFilesPreview
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={false}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
			/>
		);

		expect(screen.queryByTestId("remove-file-button")).toBeNull();
	});
	it("Expect getFiles to be called if passed", async () => {
		const getFiles = vi.fn();
		render(
			<ReactFilesPreview
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={false}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
				getFiles={getFiles}
			/>
		);

		expect(getFiles).toHaveBeenCalled();
	});

	it("Expect getFiles to be called if passed", async () => {
		const getFiles = vi.fn();
		render(
			<ReactFilesPreview
				files={[]}
				url={null}
				downloadFile={downloadFile}
				removeFile={false}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
				getFiles={getFiles}
			/>
		);

		expect(getFiles).toHaveBeenCalled();
	});

	test("calls remove and onRemove when remove button is clicked", async () => {
		const remove = vi.fn();
		const onRemove = vi.fn();

		store.dispatch(
			setComponentState({
				downloadFile: true,
				removeFile: true,
				showFileSize: true,
				showSliderCount: false,
				rounded: true,
				fileHeight: "h-32",
				fileWidth: "w-44",
			})
		);

		render(
			<ReactFilesPreview
				files={[files]}
				url={null}
				downloadFile={downloadFile}
				removeFile={true}
				showFileSize={showFileSize}
				showSliderCount={showSliderCount}
				multiple={true}
				onRemove={onRemove}
			/>
		);

		waitFor(() => fireEvent.click(screen.getByTestId("remove-file-button")));

		await Promise.all([remove(), onRemove()]);

		expect(remove.mock.calls.length).toBe(1);
		expect(onRemove.mock.calls.length).toBe(1);
	});
});
