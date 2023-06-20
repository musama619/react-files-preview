import { render, fireEvent, screen } from "@testing-library/react";
import { FileContext } from "../context/FileContext";
import ImageSlider from "../components/ImageSlider";
import { vi, expect, describe, it } from "vitest";

describe("ImageSlider", () => {
	const mockFile = {
		zoom: true,
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
	};

	const mockDispatch = vi.fn();

	const mockFileContext = {
		state: {
			fileData: [],
			fileState: mockFile,
			componentState: mockComponentState,
		},
		dispatch: mockDispatch,
	};

	it("renders ImageSlider when zoom is true", () => {
		render(
			<FileContext.Provider value={mockFileContext}>
				<ImageSlider />
			</FileContext.Provider>
		);

		const imageSlider = screen.getByTestId("image-slider");
		expect(imageSlider).toBeInTheDocument();
	});

	it("does not render ImageSlider when zoom is false", () => {
		const mockFileContextNoZoom = {
			state: {
				fileData: [],
				fileState: { ...mockFile, zoom: false },
				componentState: mockComponentState,
			},
			dispatch: mockDispatch,
		};

		const { queryByTestId } = render(
			<FileContext.Provider value={mockFileContextNoZoom}>
				<ImageSlider />
			</FileContext.Provider>
		);

		const imageSlider = queryByTestId("image-slider");
		expect(imageSlider).toBeNull();
	});

	it("calls dispatch with the correct action type when hideZoom is called", () => {
		const { getByText } = render(
			<FileContext.Provider value={mockFileContext}>
				<ImageSlider />
			</FileContext.Provider>
		);

		const closeButton = getByText("Close");
		fireEvent.click(closeButton);

		expect(mockDispatch).toHaveBeenCalledWith({
			type: "STORE_FILE_STATE",
			payload: {
				zoom: false,
				fileSrc: null,
				index: 0,
				isImage: false,
				fileName: null,
				type: null,
				size: 0,
			},
		});
	});

	it("calls dispatch with the correct action type when nextFile is called", () => {
		const { getByTestId } = render(
			<FileContext.Provider value={mockFileContext}>
				<ImageSlider />
			</FileContext.Provider>
		);

		const nextButton = getByTestId("next-file");
		fireEvent.click(nextButton);

		expect(mockDispatch).toHaveBeenCalledWith({ type: "GET_NEXT_FILE" });
	});

	it("calls dispatch with the correct action type when prevFile is called", () => {
		const { getByTestId } = render(
			<FileContext.Provider value={mockFileContext}>
				<ImageSlider />
			</FileContext.Provider>
		);

		const prevButton = getByTestId("prev-file");
		fireEvent.click(prevButton);

		expect(mockDispatch).toHaveBeenCalledWith({ type: "GET_PREV_FILE" });
	});

	it("should render default preview icon", async () => {
		const mockFileContextNoZoom = {
			state: {
				fileData: [],
				fileState: {
					...mockFile,
					fileSrc:
						"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
					isImage: false,
				},
				componentState: { ...mockComponentState, zoom: false },
			},
			dispatch: mockDispatch,
		};

		render(
			<FileContext.Provider value={mockFileContextNoZoom}>
				<ImageSlider />
			</FileContext.Provider>
		);

		const previewIcon = screen.getByTestId("default-icon");
		expect(previewIcon).toBeInTheDocument();
	});

	test('toggleFullScreen when clicked', () => {
		render(
			<FileContext.Provider value={mockFileContext}>
				<ImageSlider />
			</FileContext.Provider>
		);

		const fullscreenButton = screen.getByRole('button', { name: 'toggle-fullscreen' });
		fireEvent.click(fullscreenButton);

		expect(document.fullscreenElement).not.toBeNull();

		fireEvent.click(fullscreenButton);
		expect(document.fullscreenElement).toBeUndefined();
	});

});
