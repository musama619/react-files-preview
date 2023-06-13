import { render, screen } from "./test-utils";
import FileFooter from "../ReactFileView/FileFooter";
import store from "../../store";
import { describe, it, expect } from "vitest";
import { setComponentState } from "../redux/fileSlice";

describe("FileFooter component", () => {
	it("should display the file name with extension", () => {
		const file = new File(["test content"], "test.txt", { type: "text/plain" });

		render(<FileFooter file={file} fileSrc={"file://test.txt"} />);

		const fileNameElement = screen.getByText("test.txt");
		expect(fileNameElement).toBeInTheDocument();
	});
	it("should display the file name in short when text lenth is > 20", () => {
		const nameArray = "test123456789101112134516.txt".split(".");
		let fileName = nameArray[0];
		const extension = nameArray.pop();
		if (fileName.length > 20) {
			fileName =
				fileName.substring(0, 5) + ".." + fileName.substring(fileName.length - 3, fileName.length);
		}
		const result = fileName + "." + extension;

		const file = new File(["test content"], "test123456789101112134516.txt", {
			type: "text/plain",
		});

		render(<FileFooter file={file} fileSrc={"file://test.txt"} />);

		const fileNameElement = screen.getByText(result);
		expect(fileNameElement).toBeInTheDocument();
	});

	it("should display the file size in KB when size is less than 1000000", () => {
		store.dispatch(
			setComponentState({
				downloadFile: true,
				removeFile: true,
				showFileSize: true,
				showSliderCount: true,
				rounded: true,
				fileHeight: "h-32",
				fileWidth: "w-44"
			})
		);
		const file = new File(["test content"], "test.txt", { type: "text/plain" });
		Object.defineProperty(file, "size", { value: 500000 });

		render(<FileFooter file={file} fileSrc={"file://test.txt"} />);

		const fileSizeElement = screen.getByText("500 KB");
		expect(fileSizeElement).toBeInTheDocument();
	});

	it("should display the file size in MB when size is greater than or equal to 1000000", () => {
		store.dispatch(
			setComponentState({
				downloadFile: true,
				removeFile: true,
				showFileSize: true,
				showSliderCount: true,
				rounded: true,
				fileHeight: "h-32",
				fileWidth: "w-44"
			})
		);
		const file = new File(["test content"], "test.txt", { type: "text/plain" });
		Object.defineProperty(file, "size", { value: 1000000 });

		render(<FileFooter file={file} fileSrc={"file://test.txt"} />);

		const fileSizeElement = screen.getByText("1 MB");
		expect(fileSizeElement).toBeInTheDocument();
	});

	it("should not render download link when downloadFile is not enabled", () => {
		const file = new File(["test content"], "test.txt", { type: "text/plain" });

		render(<FileFooter file={file} fileSrc={"file://test.txt"} />);

		const downloadLinkElement = screen.getByRole("link");
		expect(downloadLinkElement).toBeInTheDocument();
		expect(downloadLinkElement).toHaveAttribute("href", "file://test.txt");
		expect(downloadLinkElement).toHaveAttribute("target", "_blank");
		expect(downloadLinkElement).toHaveAttribute("rel", "noreferrer");
	});

	it("should not render download link when downloadFile is disabled", () => {
		const file = new File(["test content"], "test.txt", { type: "text/plain" });

		store.dispatch(
			setComponentState({
				downloadFile: false,
				removeFile: true,
				showFileSize: true,
				showSliderCount: true,
				rounded: true,
				fileHeight: "h-32",
				fileWidth: "w-44"
			})
		);

		render(<FileFooter file={file} fileSrc={"file://test.txt"} />);

		const downloadLinkElement = screen.queryByRole("link");
		expect(downloadLinkElement).toBeNull();
	});
	it("should not show size showFileSize is disabled", () => {
		const file = new File(["test content"], "test.txt", { type: "text/plain" });

		store.dispatch(
			setComponentState({
				downloadFile: true,
				removeFile: true,
				showFileSize: false,
				showSliderCount: true,
				rounded: true,
				fileHeight: "h-32",
				fileWidth: "w-44"
			})
		);

		render(<FileFooter file={file} fileSrc={"file://test.txt"} />);

		const downloadLinkElement = screen.queryByTestId("file-size");
		expect(downloadLinkElement).toBeNull();
	});
});
