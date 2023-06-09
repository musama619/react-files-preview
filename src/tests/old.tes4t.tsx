import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";
import ReactFileView from "../ReactFileView/ReactFileView";
import FilePreview from "../ReactFileView/FilePreview";
import matchers from "@testing-library/jest-dom/matchers";
import { describe, it, afterEach, expect, vi } from "vitest";

const downloadFile = true;
const removeFile = true;
const showFileSize = true;
const showSliderCount = true;

expect.extend(matchers);
afterEach(() => {
	cleanup();
});

global.fetch = vi.fn();
global.URL.createObjectURL = vi.fn();

describe("ReactFileView component", () => {
	it("should render file preview component when fileData is present", () => {
		const file = new File(["test content"], "test.txt", { type: "text/plain" });
		const fileData = [file];

		render(
			<Provider store={store}>
				<ReactFileView
					files={fileData}
					downloadFile={downloadFile}
					removeFile={removeFile}
					showFileSize={showFileSize}
					showSliderCount={showSliderCount}
				/>
			</Provider>
		);

		const filePreviewElement = screen.getByTestId("file-preview");
		expect(filePreviewElement).toBeInTheDocument();
	});

	it("should not render file preview component when fileData is empty", () => {
		render(
			<Provider store={store}>
				<ReactFileView
					files={[]}
					downloadFile={downloadFile}
					removeFile={removeFile}
					showFileSize={showFileSize}
					showSliderCount={showSliderCount}
				/>
			</Provider>
		);

		const filePreviewElement = screen.queryByTestId("file-preview");
		expect(filePreviewElement).toBeNull();
	});
});

describe("FilePreview component", () => {
	it("should render file preview when file data is present", () => {
		const file = new File(["test content"], "test.txt", { type: "text/plain" });

		render(
			<Provider store={store}>
				<FilePreview file={file} index={0} />
			</Provider>
		);

		const filePreviewElement = screen.getByTestId("file-preview");
		expect(filePreviewElement).toBeInTheDocument();
	});

	// it("should not render file preview when file data is not present", () => {
	// 	render(
	// 		<Provider store={store}>
	// 			<FilePreview file={null} index={0} />
	// 		</Provider>
	// 	);

	// 	const filePreviewElement = screen.queryByTestId("file-preview");
	// 	expect(filePreviewElement).toBeNull();
	// });

	// it("should call the setZoom function when clicked", () => {
	// 	const setZoomMock = jest.fn();
	// 	const file = new File(["test content"], "test.txt", { type: "text/plain" });

	// 	render(
	// 		<Provider store={store}>
	// 			<FilePreview file={file} index={0} setZoom={setZoomMock} />
	// 		</Provider>
	// 	);

	// 	const filePreviewElement = screen.getByTestId("file-preview");
	// 	fireEvent.click(filePreviewElement);

	// 	expect(setZoomMock).toHaveBeenCalledTimes(1);
	// });
});
