import { render, screen } from "./test-utils";
import store from "../../store";
import { describe, it, expect } from "vitest";
import { storeFileData, storeFileState } from "../redux/fileSlice";
import SlideCount from "../ReactFileView/SlideCount";

describe("SlideCount component", () => {
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

	it("should display the current slide index and total number of slides", () => {
		render(<SlideCount />);

		const slideCountElement = screen.getByText("2 of 3");
		expect(slideCountElement).toBeInTheDocument();
	});

	it("should not render the slide count if the current index is null", () => {
		store.dispatch({ type: "SET_FILE_STATE", payload: { index: null } });

		render(<SlideCount />);

		const slideCountElement = screen.queryByText("1 of 3");
		expect(slideCountElement).toBeNull();
	});

	it("should not render the slide count if the file data is empty", () => {
		store.dispatch({ type: "SET_FILE_DATA", payload: [] });

		render(<SlideCount />);

		const slideCountElement = screen.queryByText("1 of 3");
		expect(slideCountElement).toBeNull();
	});
});
