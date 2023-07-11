import React from "react";
import { render, screen } from "@testing-library/react";
import { FileContext } from "../context/FileContext";
import SlideCount from "../components/SlideCount";
import { vi } from "vitest";

describe("SlideCount component", () => {

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


    it("displays the current slide count", () => {

        const mockFileContext = {
            state: {
                fileData: [
                    new File(["test content"], "test1.txt"),
                    new File(["test content"], "test2.txt"),
                    new File(["test content"], "test3.txt"),
                ],
                fileState: mockFileState,
                componentState: mockComponentState,
            },
            dispatch: mockDispatch,
        };

        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <SlideCount />
            </FileContext.Provider>
        );

        const slideCountElement = screen.getByText("1 of 3");
        expect(slideCountElement).toBeInTheDocument();
    });

    it("does not display slide count if fileState index is null", () => {
        const mockFileContext = {
            state: {
                fileData: [
                    new File(["test content"], "test1.txt"),
                    new File(["test content"], "test2.txt"),
                    new File(["test content"], "test3.txt"),
                ],
                fileState: { ...mockFileState, index: 1 },
                componentState: mockComponentState,
            },
            dispatch: mockDispatch,
        };

        render(
            <FileContext.Provider
                value={mockFileContext}
            >
                <SlideCount />
            </FileContext.Provider>
        );

        const slideCountElement = screen.queryByText("3 of 3");
        expect(slideCountElement).not.toBeInTheDocument();
    });
});
