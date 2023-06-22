import { render, screen } from "@testing-library/react";
import FileFooter from "../components/FileFooter";
import { vi } from "vitest";
import { FileContext } from "../context/FileContext";

describe("FileFooter component", () => {

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

    const mockFileState = {
        zoom: true,
        fileSrc: "image.jpg",
        index: 0,
        isImage: true,
        fileName: "image.jpg",
        type: "image/jpeg",
        size: 1000,
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


    const mockFile = new File(["test content"], "test.txt", { type: "text/plain" });
    Object.defineProperty(mockFile, "size", { value: 5000000 });

    const mockFileSrc = "https://example.com/test.txt";

    test("renders file name correctly", () => {

        render(
            <FileContext.Provider value={mockFileContext}>
                <FileFooter file={mockFile} fileSrc={mockFileSrc} />
            </FileContext.Provider>
        );
        const fileNameElement = screen.getByText("test.txt");
        expect(fileNameElement).toBeInTheDocument();
    });

    test("displays file size in KB if less than 1 MB", () => {

        const mockFile = new File(["test content"], "test.txt", { type: "text/plain" });
        Object.defineProperty(mockFile, "size", { value: 500000 });

        render(
            <FileContext.Provider value={mockFileContext}>
                <FileFooter file={mockFile} fileSrc={mockFileSrc} />
            </FileContext.Provider>
        );
        const fileSizeElement = screen.getByTestId("file-size");
        expect(fileSizeElement).toHaveTextContent("500 KB");
    });

    test("displays file size in MB if 1 MB or greater", () => {

        const mockFile = new File(["test content"], "test.txt", { type: "text/plain" });
        Object.defineProperty(mockFile, "size", { value: 15000000 });

        render(
            <FileContext.Provider value={mockFileContext}>
                <FileFooter file={mockFile} fileSrc={mockFileSrc} />
            </FileContext.Provider>
        );
        const fileSizeElement = screen.getByTestId("file-size");
        expect(fileSizeElement).toHaveTextContent("15 MB");
    });

    test("truncates long file names", () => {

        const nameArray = "test123456789101112134516.txt".split(".");
		let fileName = nameArray[0];
		const extension = nameArray.pop();
		if (fileName.length > 20) {
			fileName =
				fileName.substring(0, 5) + ".." + fileName.substring(fileName.length - 3, fileName.length);
		}
		const result = fileName + "." + extension;


        const mockFile = new File(["test content"], "test123456789101112134516.txt", { type: "text/plain" });
        Object.defineProperty(mockFile, "size", { value: 5000000 });

        render(
            <FileContext.Provider value={mockFileContext}>
                <FileFooter file={mockFile} fileSrc={mockFileSrc} />
            </FileContext.Provider>
        );
        const fileNameElement = screen.getByText(result);
        expect(fileNameElement).toBeInTheDocument();
    });

    test("displays download link when downloadFile is true", () => {

        const mockIsDownloadTrue = {
            state: {
                fileData: [],
                fileState: mockFileState,
                componentState: { ...mockComponentState, downloadFile: true },
            },
            dispatch: mockDispatch,
        };

        render(
            <FileContext.Provider value={mockIsDownloadTrue}>
                <FileFooter file={mockFile} fileSrc={mockFileSrc} />
            </FileContext.Provider>
        );
        const downloadLinkElement = screen.getByRole("link");
		expect(downloadLinkElement).toBeInTheDocument();
		expect(downloadLinkElement).toHaveAttribute("target", "_blank");
		expect(downloadLinkElement).toHaveAttribute("rel", "noreferrer");
    });

    test("does not display download link when downloadFile is false", () => {

        const mockIsDownloadFalse = {
            state: {
                fileData: [],
                fileState: mockFileState,
                componentState: { ...mockComponentState, downloadFile: false },
            },
            dispatch: mockDispatch,
        };
        render(
            <FileContext.Provider value={mockIsDownloadFalse}>
                <FileFooter file={mockFile} fileSrc={mockFileSrc} />
            </FileContext.Provider>
        );
        const downloadLinkElement = screen.queryByText("Download");
        expect(downloadLinkElement).not.toBeInTheDocument();
    });
});
