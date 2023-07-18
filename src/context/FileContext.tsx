import { Dispatch, createContext, useReducer, useState } from "react";

interface FileState {
	zoom: boolean;
	fileSrc: string | null;
	index: number;
	isImage: boolean;
	fileName: string | null;
	type: string | null;
	size: number;
}

interface ComponentState {
	showFileSize: boolean;
	showSliderCount: boolean;
	downloadFile: boolean;
	removeFile: boolean;
	rounded: boolean;
	fileHeight: string;
	fileWidth: string;
	disabled: boolean;
}

export interface InitialState {
	fileData: File[];
	fileState: FileState;
	componentState: ComponentState;
}

export type FileAction =
	| { type: "STORE_FILE_DATA"; payload: { files: File[] } }
	| { type: "SET_COMPONENT_STATE"; payload: ComponentState }
	| { type: "APPEND_FILE_DATA"; payload: { files: File[] } }
	| { type: "STORE_FILE_STATE"; payload: FileState }
	| { type: "REMOVE_FILE_DATA"; payload: File }
	| { type: "GET_NEXT_FILE" }
	| { type: "GET_PREV_FILE" };

const imageFileTypes: string[] = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/gif",
	"image/tiff",
];
export const fileReducer = (state: any, action: any) => {
	const lastIndex = state.fileData.length - 1;

	const updateFileState = (index: number) => {
		const file = state.fileData[index];
		return {
			zoom: true,
			fileSrc: URL.createObjectURL(file),
			index,
			isImage: imageFileTypes.includes(file.type),
			fileName: file.name,
			type: file.type,
			size: file.size,
		};
	};

	const revokeObjectURL = (fileState: FileState) => {
		if (fileState && fileState.fileSrc) {
			if (fileState.fileSrc.startsWith("blob:")) {
				URL.revokeObjectURL(fileState.fileSrc);
			}
		}
	};

	switch (action.type) {
		case "STORE_FILE_DATA":
			return { ...state, fileData: action.payload.files };
		case "SET_COMPONENT_STATE":
			return { ...state, componentState: action.payload };
		case "APPEND_FILE_DATA":
			return { ...state, fileData: [...state.fileData, ...action.payload.files] };
		case "STORE_FILE_STATE":
			return { ...state, fileState: action.payload };
		case "REMOVE_FILE_DATA":
			return {
				...state,
				fileData: state.fileData.filter((i: File) => i.name !== action.payload.name),
			};
		case "GET_NEXT_FILE":
			const nextIndex = state.fileState.index + 1;
			const newIndex = nextIndex > lastIndex ? 0 : nextIndex;
			revokeObjectURL(state.fileState);
			return {
				...state,
				fileState: updateFileState(newIndex),
			};
		case "GET_PREV_FILE":
			const prevIndex = state.fileState.index - 1;
			const newIdx = prevIndex < 0 ? lastIndex : prevIndex;
			revokeObjectURL(state.fileState);
			return {
				...state,
				fileState: updateFileState(newIdx),
			};
		default:
			return state;
	}
};

export interface FileContext {
	state: InitialState;
	dispatch: (action: FileAction) => void;
}

export const FileContext = createContext<FileContext>({
	state: {
		fileData: [],
		fileState: {
			zoom: false,
			fileSrc: null,
			index: 0,
			isImage: false,
			fileName: null,
			type: null,
			size: 0,
		},
		componentState: {
			showFileSize: true,
			showSliderCount: true,
			downloadFile: true,
			removeFile: true,
			rounded: true,
			fileHeight: "h-32",
			fileWidth: "w-44",
			disabled: false
		},
	},
	dispatch: () => { },
});

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(fileReducer, {
		fileData: [],
		fileState: {
			zoom: false,
			fileSrc: null,
			index: 0,
			isImage: false,
			fileName: null,
			type: null,
			size: 0,
		},
		componentState: {
			showFileSize: true,
			showSliderCount: true,
			downloadFile: true,
			removeFile: true,
			rounded: true,
			fileHeight: "h-32",
			fileWidth: "w-44",
		},
	});

	return (
		<FileContext.Provider value={{ state, dispatch }}>{children}</FileContext.Provider>
	);
};
