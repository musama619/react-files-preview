import { ChangeEventHandler } from "react";

export interface Props {
	files?: File[] | [];
	url?: string | null;
	downloadFile?: boolean;
	removeFile?: boolean;
	showFileSize?: boolean;
	showSliderCount?: boolean;
	multiple?: boolean;
	accept?: string;
	maxFileSize?: number;
	maxFiles?: number;
	width?: string;
	height?: string;
	rounded?: boolean;
	fileHeight?: string;
	fileWidth?: string;
	getFiles?: (files: File[]) => void;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onRemove?: (removedFile: File) => void;
	onError?: (error: Error) => void;
	onClick?: (file: File) => void;
}
