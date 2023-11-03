import { ChangeEventHandler } from "react";

/**
 * Props for the ReactFilePreview component.
 */
export interface Props {
	/**
	* An array of files to be displayed and previewed.
	*/
	files?: File[] | [];

	/**
	* The URL of the file to be displayed.
	*/
	url?: string | null;

	/**
	* Enable downloading of the displayed file.
	*/
	downloadFile?: boolean;

	/**
	* Enable removing of the displayed file.
	*/
	removeFile?: boolean;

	/**
	* Show the file size of the displayed file.
	*/
	showFileSize?: boolean;

	/**
	* Show the count of files under image slider.
    */
	showSliderCount?: boolean;

	/**
	* Enable image editing.
    */
	allowEditing?: boolean;

	/**
	* Allow selection of multiple files.
	*/
	multiple?: boolean;

	/**
	* Accepted file types based on MIME types or file extensions.
	*/
	accept?: string;

	/**
    * The maximum allowed file size in bytes.
    */
	maxFileSize?: number;

	/**
	* The maximum number of files that can be selected.
	*/
	maxFiles?: number;

	/**
	* The width of the file previewer component.
	*/
	width?: string;

	/**
	* The height of the file previewer component.
	*/
	height?: string;

	/**
	* Apply rounded corners to the file previewer component.
	*/
	rounded?: boolean;

	/**
    * The height of each individual file thumbnail.
    */
	fileHeight?: string;

	/**
	* The width of each individual file thumbnail.
	*/
	fileWidth?: string;

	/**
	* Disable interactions with the file previewer.
	*/
	disabled?: boolean;

	/**
	* Function to get all displayed files.
	* @param files - An array of all displayed File objects.
    */
	getFiles?: (files: File[]) => void;

	/**
    * Callback function invoked when the value of the file input changes.
    */
	onChange?: ChangeEventHandler<HTMLInputElement>;

	/**
	 * Callback function invoked when a file is dropped.
	*/
	onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;

	/**
	* Callback function invoked when a file is clicked.
	* @param file - The clicked file.
	*/
	onClick?: (file: File) => void;

	/**
	* Callback function invoked when a file is removed.
	* @param removedFile - The file that was removed.
	*/
	onRemove?: (removedFile: File) => void;

	/**
	* Callback function invoked when an error occurs.
	* @param error - The error object.
	*/
	onError?: (error: Error) => void;
}
