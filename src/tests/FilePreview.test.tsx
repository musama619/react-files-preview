import { render, screen, waitFor } from "@testing-library/react";
import { FileContext } from "../context/FileContext";
import FilePreview from "../components/FilePreview";
import { vi } from "vitest";

describe("FilePreview component", () => {

    const mockFileState = {
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
            fileState: mockFileState,
            componentState: mockComponentState,
        },
        dispatch: mockDispatch,
    };

    test("displays image preview when file type is an image", async () => {
        const mockFile = new File(["image content"], "image.jpg", { type: "image/jpeg" });

        const mockFileContext = {
            state: {
                fileData: [new File(["image content"], "image.jpg", { type: "image/jpeg" })],
                fileState: { ...mockFileState, isImage: true },
                componentState: mockComponentState,
            },
            dispatch: mockDispatch,
        };
        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <FilePreview file={mockFile} index={0} />
            </FileContext.Provider>
        );

        const imagePreviewElement = screen.queryByTestId("image-preview");
        waitFor(() => expect(imagePreviewElement).toBeInTheDocument());

    });

    test("displays file icon preview when file type is not an image", () => {
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
            <FileContext.Provider
                value={mockFileContext}
            >
                <FilePreview file={mockFile} index={0} />
            </FileContext.Provider>
        );

        const fileIconPreviewElement = screen.getByTestId("file-icon-preview");
        expect(fileIconPreviewElement).toBeInTheDocument();
    });

    test("displays default file icon when file type is not recognized", () => {
        const mockFile = new File(["file content"], "file.unknown", { type: "unknown/type" });
        // };
        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <FilePreview file={mockFile} index={0} />
            </FileContext.Provider>
        );

        const defaultIconElement = screen.getByTestId("default-icon");
        expect(defaultIconElement).toBeInTheDocument();
    });

    test("displays FileFooter component when fileSrc is available", async () => {
        const mockFile = new File(["image content"], "image.jpg", { type: "image/jpeg" });

        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <FilePreview file={mockFile} index={0} />
            </FileContext.Provider>
        );

        const fileFooterElement = screen.queryByTestId("file-footer");
        waitFor(() => expect(fileFooterElement).toBeInTheDocument());
    });

    test("does not display FileFooter component when fileSrc is not available", async () => {
        const mockFile = new File(["image conteeent"], "image.ef.jewpg", { type: "imagrege/uy/jpeg" });

        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <FilePreview file={mockFile} index={0} />
            </FileContext.Provider>
        );

        const fileFooterElement = screen.queryByTestId("file-footer");
        expect(fileFooterElement).not.toBeInTheDocument();
    });
});
