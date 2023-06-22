import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FileContext } from "../context/FileContext";
import FilePreview from "../components/FilePreview";
import { vi, it, describe } from "vitest";

describe("FilePreview component", () => {
	const mockFileState = {
		zoom: false,
		fileSrc: "image.jpg",
		index: 0,
		isImage: true,
		fileName: "image.jpg",
		type: "image/jpeg",
		size: 1000,
	};

	const mockComponentState = {
		showFileSize: true,
		showSliderCount: true,
		downloadFile: true,
		removeFile: true,
		rounded: true,
		fileHeight: "h-32",
		fileWidth: "w-44",
		disabled: false
	};

	const mockDispatch = vi.fn();

	const mockFileContext = {
		state: {
			fileData: [],
			fileState: mockFileState,
			componentState: mockComponentState,
		},
		dispatch: mockDispatch,
	};
	it("displays file icon preview when file type is not an image", () => {
		const mockFile = new File(["file content"], "document.pdf", { type: "application/pdf" });
		const mockFileContext = {
			state: {
				fileData: [],
				fileState: { ...mockFileState, isImage: false },
				componentState: mockComponentState,
			},
			dispatch: mockDispatch,
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<FilePreview file={mockFile} index={0} />
			</FileContext.Provider>
		);

		const fileIconPreviewElement = screen.getByTestId("file-icon-preview");
		expect(fileIconPreviewElement).toBeInTheDocument();
	});

	it("displays default file icon when file type is not recognized", () => {
		const mockFile = new File(["file content"], "file.unknown", { type: "unknown/type" });
		// };
		render(
			<FileContext.Provider value={mockFileContext}>
				<FilePreview file={mockFile} index={0} />
			</FileContext.Provider>
		);

		const defaultIconElement = screen.getByTestId("default-icon");
		expect(defaultIconElement).toBeInTheDocument();
	});

	it("displays FileFooter component when fileSrc is available", async () => {
		const mockFile = new File(["image content"], "image.jpg", { type: "image/jpeg" });

		render(
			<FileContext.Provider value={mockFileContext}>
				<FilePreview file={mockFile} index={0} />
			</FileContext.Provider>
		);

		const fileFooterElement = screen.queryByTestId("file-footer");
		waitFor(() => expect(fileFooterElement).toBeInTheDocument());
	});

	it("does not display FileFooter component when fileSrc is not available", async () => {
		const mockFile = new File(["image conteeent"], "image.ef.jewpg", { type: "imagrege/uy/jpeg" });

		render(
			<FileContext.Provider value={mockFileContext}>
				<FilePreview file={mockFile} index={0} />
			</FileContext.Provider>
		);

		const fileFooterElement = screen.queryByTestId("file-footer");
		expect(fileFooterElement).not.toBeInTheDocument();
	});

	it("call setZoom function onClick", async () => {
		const mockDispatch = vi.fn();

		const mockFileContext = {
			state: {
				fileData: [],
				fileState: { ...mockFileState, isImage: false },
				componentState: mockComponentState,
			},
			dispatch: mockDispatch,
		};

		const mockFile = new File(["image conteeent"], "image.jpg", { type: "image/jpeg" });

		render(
			<FileContext.Provider value={mockFileContext}>
				<FilePreview file={mockFile} index={0} />
			</FileContext.Provider>
		);

		fireEvent.click(screen.getByTestId("file-preview"));
		expect(mockDispatch).toHaveBeenCalledWith({
			type: "STORE_FILE_STATE",
			payload: {
				zoom: true,
				fileSrc: undefined,
				index: 0,
				isImage: true,
				fileName: "image.jpg",
				type: "image/jpeg",
				size: 15,
			},
		});
	});
});
