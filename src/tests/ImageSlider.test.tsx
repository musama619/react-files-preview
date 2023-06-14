import { fireEvent, render, screen } from "./test-utils";
import store from "../../store";
import { describe, it, expect, vi } from "vitest";
import {
	getNextFile,
	getPrevFile,
	setComponentState,
	storeFileData,
	storeFileState,
} from "../redux/fileSlice";
import ImageSlider from "../ReactFileView/ImageSlider";

describe("ImageSlider component", () => {
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

	store.dispatch(
		storeFileData({
			files: [
				new File(["test content"], "test1.txt"),
				new File(["test content"], "test2.txt"),
				new File(["test content"], "test3.txt"),
			],
		})
	);

	it("should render the image slider with zoomed image", () => {
		render(<ImageSlider />);

		const zoomedImgElement = screen.getByAltText("Zoomed Image");
		expect(zoomedImgElement).toBeInTheDocument();
	});

	it("should render the image slider without zoomed image", () => {
		store.dispatch(
			storeFileState({
				zoom: false,
				fileSrc: null,
				index: 1,
				isImage: true,
				fileName: "test.txt",
				type: "text/plain",
				size: 500000,
			})
		);

		render(<ImageSlider />);

		const zoomedImgElement = screen.queryByAltText("Zoomed Image");
		expect(zoomedImgElement).toBeNull();
	});

	it("should call the hideZoom function when the close button is clicked", async () => {
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc:
					"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				index: 1,
				isImage: true,
				fileName: "test.txt",
				type: "text/plain",
				size: 50000,
			})
		);

		render(<ImageSlider />);

		fireEvent.click(screen.getByText("Close"));

		const imageSlider = screen.queryByTestId("image-slider");
		expect(imageSlider).not.toBeInTheDocument();
	});
	it("SlideCount component should render when showSliderCount is set to true", async () => {
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc:
					"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				index: 1,
				isImage: true,
				fileName: "test.txt",
				type: "text/plain",
				size: 50000,
			})
		);
		store.dispatch(
			setComponentState({
				downloadFile: true,
				removeFile: true,
				showFileSize: true,
				showSliderCount: true,
				rounded: true,
				fileHeight: "h-32",
				fileWidth: "w-44",
			})
		);

		render(<ImageSlider />);

		const slideCountElement = screen.getByText("2 of 3");
		expect(slideCountElement).toBeInTheDocument();
	});
	it("SlideCount component should not render when showSliderCount is set to false", async () => {
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc:
					"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				index: 1,
				isImage: true,
				fileName: "test.txt",
				type: "text/plain",
				size: 50000,
			})
		);
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

		render(<ImageSlider />);

		const slideCountElement = screen.queryByText(/of/i);
		expect(slideCountElement).not.toBeInTheDocument();
	});

	it("should call the nextFile function when the next button is clicked", () => {
		const nextFileMock = vi.spyOn(store, "dispatch");
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc:
					"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				index: 1,
				isImage: true,
				fileName: "test.txt",
				type: "text/plain",
				size: 50000,
			})
		);
		render(<ImageSlider />);

		fireEvent.click(screen.getByTestId("next-file"));
		expect(nextFileMock).toHaveBeenCalledWith(getNextFile());
	});
	it("should call the prevFile function when the previous button is clicked", () => {
		const nextFileMock = vi.spyOn(store, "dispatch");
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc:
					"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				index: 1,
				isImage: true,
				fileName: "test.txt",
				type: "text/plain",
				size: 50000,
			})
		);
		render(<ImageSlider />);

		fireEvent.click(screen.getByTestId("prev-file"));
		expect(nextFileMock).toHaveBeenCalledWith(getPrevFile());
	});

	it("should have the correct Tailwind CSS class", () => {
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc:
					"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				index: 1,
				isImage: false,
				fileName: "test.txt",
				type: "text/plain",
				size: 50000,
			})
		);
		render(<ImageSlider />);

		const previewIcon = screen.getByTestId("preview-icon");
		expect(previewIcon).toHaveClass("text-4xl");
	});
	it("should render default preview icon", async() => {
		store.dispatch(
			storeFileState({
				zoom: true,
				fileSrc:
					"https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				index: 1,
				isImage: false,
				fileName: "test.txt",
				type: "text/xml",
				size: 50000,
			})
		);
		render(<ImageSlider />);

		const previewIcon = screen.getByTestId("default-icon");
		expect(previewIcon).toBeInTheDocument();
	});
});
