import { fireEvent, render, screen } from "./test-utils";
import store from "../../store";
import { describe, it, expect, vi } from "vitest";
import FilePreview from "../ReactFileView/FilePreview";

describe("FilePreview component", () => {

	it("should not render file preview when file data is present", () => {
		render(<FilePreview file={new File(["test content"], "test1.txt")} index={0} />);

		const filePreviewElement = screen.getByTestId("file-preview");
		expect(filePreviewElement).toBeInTheDocument();
	});

	it("should render image preview if file is image", () => {

		render(
			<FilePreview file={new File(["test content"], "test.png", { type: "image/png" })} index={0} />
		);

		const filePreviewElement = screen.queryByTestId("image-preview");
		expect(filePreviewElement).toBeInTheDocument();
	});

	it("should render file icon preview if file not an image", () => {
		render(
			<FilePreview file={new File(["test content"], "test.pdf", { type: "application/pdf" })} index={0} />
		);

		const filePreviewElement = screen.queryByTestId("file-icon-preview");
		expect(filePreviewElement).toBeInTheDocument();
	});

    it("should call the setZoom function when the div is clicked", () => {
		const zoomFileMock = vi.spyOn(store, 'dispatch');

		render(<FilePreview file={new File(["test content"], "test.pdf", { type: "application/pdf" })} index={0} />);

		fireEvent.click(screen.getByTestId("file-preview"));
		expect(zoomFileMock).toHaveBeenCalled();		
	});
});
