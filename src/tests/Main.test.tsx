import { fireEvent, render, screen } from "@testing-library/react";
import { FileContext } from "../context/FileContext";
import { Main } from "../components/Main";
import { describe, it, vi } from "vitest";

describe("Main Component", () => {
	const mockFiles = [
		new File(["file1"], "file1.txt", { type: "text/plain" }),
		new File(["file2"], "file2.txt", { type: "text/plain" }),
	];

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
		disabled: false,
		allowEditing: false,
	};
	const mockImageEditorState = {
		isEditing: false,
		file: null,
		index: null,
	};

	const mockDispatch = vi.fn();

	const mockFileContext = {
		state: {
			fileData: [],
			fileState: mockFileState,
			componentState: mockComponentState,
			imageEditorState: mockImageEditorState,
		},
		dispatch: mockDispatch,
	};
	const mockProps = {
		files: mockFiles,
		url: null,
		downloadFile: true,
		removeFile: true,
		showFileSize: true,
		showSliderCount: true,
		multiple: true,
		disabled: true,
	};

	it("renders file previews", () => {
		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main {...mockProps} />
			</FileContext.Provider>,
		);

		const filePreviews = screen.queryByTestId("file-preview");
		expect(filePreviews).toBeInTheDocument();
	});

	it("adds more files on input change", async () => {
		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main {...mockProps} />
			</FileContext.Provider>,
		);

		const addMoreLabel = screen.getByText(/Add more/i);
		expect(addMoreLabel).toBeInTheDocument();
	});

	it("removes a file", async () => {
		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={mockFiles}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
				/>
			</FileContext.Provider>,
		);

		const removeFileButton = screen.queryByTestId("remove-file-button");
		expect(removeFileButton).toBeInTheDocument();
	});

	it("renders browse files input when fileData is empty", () => {
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
				/>
			</FileContext.Provider>,
		);

		expect(screen.queryByText(/Drop files here, or click to browse files/i)).toBeInTheDocument();
	});

	it("shoudl not render remove button if removeFile is false", async () => {
		const mockFileContext = {
			state: {
				fileData: mockFiles,
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: false },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main {...mockProps} />
			</FileContext.Provider>,
		);

		expect(screen.queryByTestId("remove-file-button")).toBeNull();
	});

	it("handleImage functions should be called", async () => {
		const mockDispatch = vi.fn();

		const mockFileContext = {
			state: {
				fileData: [],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: false, zoom: false },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};

		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
					maxFileSize={1000000000}
					maxFiles={50}
				/>
			</FileContext.Provider>,
		);

		fireEvent.change(screen.getByLabelText(/Drop files here, or click to browse files/i), {
			target: { files: [new File([], "filename")] },
		});
		expect(mockDispatch).toHaveBeenCalledWith({
			type: "APPEND_FILE_DATA",
			payload: { files: [new File([], "filename")] },
		});
	});
	it("onChange should be called if passed as props", async () => {
		const onChange = vi.fn();

		const mockFileContext = {
			state: {
				fileData: [],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: false, zoom: false },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};

		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
					maxFileSize={1000000000}
					maxFiles={50}
					onChange={onChange}
				/>
			</FileContext.Provider>,
		);

		fireEvent.change(screen.getByLabelText(/Drop files here, or click to browse files/i), {
			target: { files: [new File([], "filename")] },
		});
		expect(onChange).toBeCalled();
	});

	it("onChange should be called if passed as props and when fileData exists", async () => {
		const onChange = vi.fn();

		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
					maxFileSize={1000000000}
					maxFiles={50}
					onChange={onChange}
				/>
			</FileContext.Provider>,
		);

		fireEvent.change(screen.getByLabelText(/Add more/i), {
			target: { files: [new File([], "filename")] },
		});
		expect(onChange).toBeCalled();
	});

	it("If fileState is zoom, ImageSlider component should render", async () => {
		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: { ...mockFileState, zoom: true, fileName: "test.txt" },
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: vi.fn(),
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[new File(["test content"], "test.txt", { type: "text/plain" })]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
					maxFileSize={1000000000}
					maxFiles={50}
				/>
			</FileContext.Provider>,
		);

		expect(screen.getByText(/test.txt/i)).toBeInTheDocument();
	});

	it("renders browse files input when fileData is empty", () => {
		const getFiles = vi.fn();
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
					getFiles={getFiles}
				/>
			</FileContext.Provider>,
		);

		expect(getFiles).toBeCalled();
	});

	it("handleDragOver should set dropEffect to 'copy'", async () => {
		const mockFileContext = {
			state: {
				fileData: [],
				fileState: { ...mockFileState, zoom: false, fileName: "test.txt" },
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: vi.fn(),
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
				/>
			</FileContext.Provider>,
		);
		const divElement = screen.getByTestId("dropzone");
		const dragEventMock = {
			preventDefault: vi.fn(),
			dataTransfer: {
				dropEffect: "",
				files: [
					new File(["test file content"], "test-file.txt", {
						type: "text/plain",
					}),
				],
			},
		};

		fireEvent.dragOver(divElement, dragEventMock);
		expect(dragEventMock.dataTransfer.dropEffect).toBe("copy");
	});

	it("handleDragLeave should set dropEffect to ''", async () => {
		const mockFileContext = {
			state: {
				fileData: [],
				fileState: { ...mockFileState, zoom: false, fileName: "test.txt" },
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: vi.fn(),
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
				/>
			</FileContext.Provider>,
		);
		const divElement = screen.getByTestId("dropzone");
		const dragEventMock = {
			preventDefault: vi.fn(),
			dataTransfer: {
				dropEffect: "",
				files: [
					new File(["test file content"], "test-file.txt", {
						type: "text/plain",
					}),
				],
			},
		};

		fireEvent.dragLeave(divElement, dragEventMock);
		expect(dragEventMock.dataTransfer.dropEffect).toBe("");
	});

	it("throw error and call onError when maxfiles limit exceeds", () => {
		const files = [
			new File(["file1"], "file1.txt"),
			new File(["file2"], "file2.txt"),
			new File(["file3"], "file3.txt"),
		];
		const mockOnError = vi.fn();

		const mockFileContext = {
			state: {
				fileData: files,
				fileState: { ...mockFileState, zoom: false, fileName: "test.txt" },
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: vi.fn(),
		};
		const renderMainComponent = () => {
			return render(
				<FileContext.Provider value={mockFileContext}>
					<Main files={files} onError={mockOnError} maxFiles={2} />
				</FileContext.Provider>,
			);
		};

		expect(() => {
			renderMainComponent();
		}).toThrow("Max 2 files are allowed to be selected");
		expect(mockOnError).toHaveBeenCalledWith(new Error("Max 2 files are allowed to be selected"));
	});

	it("throw error and call onError when a maxfileSize exceeds", () => {
		const file1 = new File(["file1"], "file1.txt");
		Object.defineProperty(file1, "size", { value: 100 });

		const file2 = new File(["file2"], "file2.txt");
		Object.defineProperty(file2, "size", { value: 5000000 });
		const mockOnError = vi.fn();

		const mockFileContext = {
			state: {
				fileData: [file1, file2],
				fileState: { ...mockFileState, zoom: false, fileName: "test.txt" },
				componentState: { ...mockComponentState, removeFile: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: vi.fn(),
		};
		const renderMainComponent = () => {
			return render(
				<FileContext.Provider value={mockFileContext}>
					<Main files={[file1, file2]} onError={mockOnError} maxFileSize={1000} />
				</FileContext.Provider>,
			);
		};

		expect(() => {
			renderMainComponent();
		}).toThrow("File size limit exceeded: file2.txt");
		expect(mockOnError).toHaveBeenCalledWith(new Error("File size limit exceeded: file2.txt"));
	});

	it("should have disabled cursor class if disabled is true", () => {
		const { container } = render(
			<FileContext.Provider value={mockFileContext}>
				<Main
					files={[]}
					url={null}
					downloadFile={true}
					removeFile={true}
					showFileSize={true}
					showSliderCount={true}
					multiple={true}
					disabled={true}
				/>
			</FileContext.Provider>,
		);
		expect(container.getElementsByClassName("rfp-cursor-not-allowed").length).toBe(3);
	});

	it("should have disabled cursor class if files not empty and disabled is true", async () => {
		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: true, disabled: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		const { container } = render(
			<FileContext.Provider value={mockFileContext}>
				<Main {...mockProps} />
			</FileContext.Provider>,
		);

		expect(container.getElementsByClassName("rfp-cursor-not-allowed").length).toBe(2);
	});
	it("should class onClick function", async () => {
		const onClick = vi.fn();
		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: true, disabled: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		const { container } = render(
			<FileContext.Provider value={mockFileContext}>
				<Main {...mockProps} onClick={onClick} />
			</FileContext.Provider>,
		);

		fireEvent.click(container.getElementsByClassName("rfp-relative")[0]);

		expect(onClick).toHaveBeenCalledTimes(1);
	});
	it("should class onRemove function if click on remove button", async () => {
		const remove = vi.fn();
		const mockFileContext = {
			state: {
				fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
				fileState: mockFileState,
				componentState: { ...mockComponentState, removeFile: true, disabled: true },
				imageEditorState: mockImageEditorState,
			},
			dispatch: mockDispatch,
		};
		render(
			<FileContext.Provider value={mockFileContext}>
				<Main {...mockProps} onRemove={remove} />
			</FileContext.Provider>,
		);

		fireEvent.click(screen.getByTestId("remove-file-button"));

		expect(remove).toHaveBeenCalledTimes(1);
	});
});
