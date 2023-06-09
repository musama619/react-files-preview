import {  ChangeEventHandler  } from "react";

export interface Props {
	files: File[] | [];
	url?: string | null;
	downloadFile: boolean;
	removeFile: boolean;
	showFileSize: boolean;
	showSliderCount: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onRemove?: (removedFile: File) => void;
}
