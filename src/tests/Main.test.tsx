import { render, screen } from "@testing-library/react";
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
    const mockProps = {
        files: mockFiles,
        url: null,
        downloadFile: true,
        removeFile: true,
        showFileSize: true,
        showSliderCount: true,
        multiple: true,
    };

    it("renders file previews", () => {
        const mockFileContext = {
            state: {
                fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
                fileState: mockFileState,
                componentState: { ...mockComponentState, removeFile: true },
            },
            dispatch: mockDispatch,
        };
        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <Main {...mockProps} />
            </FileContext.Provider>
        );

        const filePreviews = screen.queryByTestId("file-preview");
        expect(filePreviews).toBeInTheDocument()
    });

    it("adds more files on input change", async () => {
        const mockFileContext = {
            state: {
                fileData: [new File(["test content"], "test.txt", { type: "text/plain" })],
                fileState: mockFileState,
                componentState: { ...mockComponentState, removeFile: true },
            },
            dispatch: mockDispatch,
        };
        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <Main {...mockProps} />
            </FileContext.Provider>
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
            },
            dispatch: mockDispatch,
        };
        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <Main
                    files={mockFiles}
                    url={null}
                    downloadFile={true}
                    removeFile={true}
                    showFileSize={true}
                    showSliderCount={true}
                    multiple={true}
                />
            </FileContext.Provider>
        );

        const removeFileButton = screen.queryByTestId("remove-file-button");
        expect(removeFileButton).toBeInTheDocument()
    });
});
