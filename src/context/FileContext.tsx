import { createContext, useReducer } from "react";

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
	sliderIndicatorType: "dots" | "count" | "none";
	downloadFile: boolean;
	removeFile: boolean;
	rounded: boolean;
	fileHeight: string;
	fileWidth: string;
	disabled: boolean;
	allowEditing: boolean;
}

interface ImageEditorState {
	isEditing: boolean;
	index: number | null;
	file: File | null;
}

export interface InitialState {
	fileData: File[];
	fileState: FileState;
	componentState: ComponentState;
	imageEditorState: ImageEditorState;
}

export type FileAction =
	| { type: "STORE_FILE_DATA"; payload: { files: File[] } }
	| { type: "SET_COMPONENT_STATE"; payload: ComponentState }
	| { type: "APPEND_FILE_DATA"; payload: { files: File[] } }
	| { type: "STORE_FILE_STATE"; payload: FileState }
	| { type: "SET_IMAGE_EDITOR_DATA"; payload: ImageEditorState }
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
export const fileReducer = (state: InitialState, action: FileAction) => {
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
		case "SET_IMAGE_EDITOR_DATA":
			return { ...state, imageEditorState: action.payload };
		case "REMOVE_FILE_DATA":
			return {
				...state,
				fileData: state.fileData.filter((i: File) => i.name !== action.payload.name),
			};
		case "GET_NEXT_FILE": {
			const nextIndex = state.fileState.index + 1;
			const newIndex = nextIndex > lastIndex ? 0 : nextIndex;
			revokeObjectURL(state.fileState);
			return {
				...state,
				fileState: updateFileState(newIndex),
			};
		}
		case "GET_PREV_FILE": {
			const prevIndex = state.fileState.index - 1;
			const newIdx = prevIndex < 0 ? lastIndex : prevIndex;
			revokeObjectURL(state.fileState);
			return {
				...state,
				fileState: updateFileState(newIdx),
			};
		}
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
			sliderIndicatorType: "dots",
			downloadFile: true,
			removeFile: true,
			rounded: true,
			fileHeight: "8rem",
			fileWidth: "11rem",
			disabled: false,
			allowEditing: false,
		},
		imageEditorState: {
			isEditing: false,
			index: null,
			file: null,
		},
	},
	dispatch: () => {},
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
			sliderIndicatorType: "dots",
			downloadFile: true,
			removeFile: true,
			rounded: true,
			fileHeight: "8rem",
			fileWidth: "11rem",
			disabled: false,
			allowEditing: false,
		},
		imageEditorState: {
			isEditing: false,
			index: null,
			file: null,
		},
	});

	return <FileContext.Provider value={{ state, dispatch }}>{children}</FileContext.Provider>;
};
