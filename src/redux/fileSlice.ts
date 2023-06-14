import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

interface InitialState {
	fileData: File[];
	fileState: FileState;
	componentState: ComponentState;
}

const imageFileTypes: string[] = ["image/jpeg", "image/jpg", "image/png"];

const file = createSlice({
	name: "file",
	initialState: {
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
			showFileSize: false,
			showSliderCount: true,
			downloadFile: true,
			removeFile: true,
			rounded: true,
			fileHeight: "h-32",
			fileWidth: "w-44",
		},
	} as InitialState,
	reducers: {
		storeFileData(state, action: PayloadAction<{ files: File[] }>) {
			const { files } = action.payload;
			state.fileData = files;
		},
		setComponentState(state, action: PayloadAction<ComponentState>) {
			state.componentState = action.payload;
		},
		appendFileData(state, action: PayloadAction<{ files: File[] }>) {
			state.fileData = [...state.fileData, ...action.payload.files];
		},
		storeFileState(state, action: PayloadAction<FileState>) {
			state.fileState = action.payload;
		},
		removeFileData(state, action: PayloadAction<File>) {
			const file = action.payload;
			state.fileData = state.fileData.filter((i) => i.name !== file.name);
		},
		getNextFile(state) {
			const nextIndex = state.fileState.index + 1;
			const lastIndex = state.fileData.length - 1;

			let newIndex = nextIndex;

			if (nextIndex > lastIndex) {
				newIndex = 0;
			}
			state.fileState = {
				zoom: true,
				fileSrc: URL.createObjectURL(state.fileData[newIndex]),
				index: newIndex,
				isImage: imageFileTypes.includes(state.fileData[newIndex].type),
				fileName: state.fileData[newIndex].name,
				type: state.fileData[newIndex].type,
				size: state.fileData[newIndex].size,
			};
		},
		getPrevFile(state) {
			const prevIndex = state.fileState.index - 1;
			const lastIndex = state.fileData.length - 1;

			let newIndex = prevIndex;

			if (prevIndex < 0) {
				newIndex = lastIndex;
			}

			state.fileState = {
				zoom: true,
				fileSrc: URL.createObjectURL(state.fileData[newIndex]),
				index: newIndex,
				isImage: imageFileTypes.includes(state.fileData[newIndex].type),
				fileName: state.fileData[newIndex].name,
				type: state.fileData[newIndex].type,
				size: state.fileData[newIndex].size,
			};
		},
	},
});

export const {
	storeFileState,
	storeFileData,
	removeFileData,
	getNextFile,
	getPrevFile,
	appendFileData,
	setComponentState,
} = file.actions;

export default file.reducer;
