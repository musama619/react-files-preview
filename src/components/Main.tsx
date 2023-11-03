import React, { Suspense, useContext, useEffect } from "react";
import FilePreview from "./FilePreview";
import ImageSlider from "./ImageSlider";
import Header from "./Header";
import { Props } from "./interface";
import { FileContext } from "../context/FileContext";

const ReactPhotoEditor = React.lazy(async () => {
	const { ReactPhotoEditor } = await import("react-photo-editor");
	await import('react-photo-editor/dist/style.css')
	return { default: ReactPhotoEditor };
});

export const Main: React.FC<Props> = ({
	files,
	url,
	downloadFile,
	removeFile,
	showFileSize,
	showSliderCount,
	allowEditing,
	multiple,
	accept,
	maxFileSize,
	maxFiles,
	width,
	rounded,
	height,
	fileHeight,
	fileWidth,
	disabled,
	onChange,
	onRemove,
	onError,
	getFiles,
	onClick,
	onDrop
}) => {
	const fileData = useContext(FileContext).state.fileData;
	const fileState = useContext(FileContext).state.fileState;
	const componentState = useContext(FileContext).state.componentState;
	const imageEditorState = useContext(FileContext).state.imageEditorState;

	const { dispatch } = useContext(FileContext);

	const checkErrors = (files: File[]) => {
		let hasError = false;
		if (maxFiles && (fileData.length + files.length > maxFiles || files.length > maxFiles)) {
			hasError = true;
			if (onError) {
				onError(new Error(`Max ${maxFiles} files are allowed to be selected`));
			}
			throw new Error(`Max ${maxFiles} files are allowed to be selected`);
		}

		if (maxFileSize) {
			files.forEach((file: File) => {
				if (file.size > maxFileSize) {
					hasError = true;
					if (onError) {
						onError(new Error(`File size limit exceeded: ${file.name}`));
					}
					throw new Error(`File size limit exceeded: ${file.name}`);
				}
			});
		}

		return hasError;
	};

	useEffect(() => {
		async function fetchData() {
			try {
				if (url) {
					const imageFileTypes = [
						{ type: "image/jpeg", ext: ".jpg" },
						{ type: "image/jpg", ext: ".jpg" },
						{ type: "image/png", ext: ".png" },
						{ type: "image/gif", ext: "gif" },
						{ type: "image/tiff", ext: ".tiff" },
					];

					const response = await fetch(url);
					const blob = await response.blob();

					let fileExt = null;
					const filteredName = imageFileTypes.filter((fileType) => fileType.type === blob.type);
					if (filteredName.length > 0) {
						fileExt = filteredName[0].ext;
					}

					const file = new File([blob], "file" + fileExt ?? ".img", {
						type: blob.type,
					});

					dispatch({ type: "STORE_FILE_DATA", payload: { files: [file] } });
				}
			} catch (err) {
				if (err instanceof Error) {
					if (onError) {
						onError(err);
					}
					throw err;
				}
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (files && files.length > 0) {
			if (!checkErrors(files)) {
				dispatch({ type: "STORE_FILE_DATA", payload: { files: files } });
			}
		}
	}, [files]);

	useEffect(() => {
		dispatch({
			type: "SET_COMPONENT_STATE",
			payload: {
				downloadFile: downloadFile != undefined ? downloadFile : true,
				removeFile: removeFile != undefined ? removeFile : true,
				showFileSize: showFileSize != undefined ? showFileSize : true,
				showSliderCount: showSliderCount != undefined ? showSliderCount : true,
				rounded: rounded != undefined ? rounded : true,
				fileHeight: fileHeight ?? "h-32",
				fileWidth: fileWidth ?? "w-44",
				disabled: disabled ?? false,
				allowEditing: allowEditing ?? false,
			},
		});
	}, [
		downloadFile,
		removeFile,
		showFileSize,
		showSliderCount,
		fileHeight,
		fileWidth,
		rounded,
		disabled,
		allowEditing
	]);

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = Array.from(e.target.files || []);

		if (!checkErrors(files)) {
			dispatch({ type: "APPEND_FILE_DATA", payload: { files: files } });
		}
	};

	const remove = (file: File) => {
		dispatch({ type: "REMOVE_FILE_DATA", payload: file });
		if (onRemove) {
			onRemove(file);
		}
	};

	const handleClick = (file: File) => {
		if (onClick) {
			onClick(file);
		}
	};

	useEffect(() => {
		if (getFiles) {
			getFiles(fileData);
		}
	}, [fileData]);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "copy";
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const files = Array.from(event.dataTransfer.files);

		if (files && files.length > 0) {
			if (!checkErrors(files)) {
				dispatch({ type: "APPEND_FILE_DATA", payload: { files: files } });
				onDrop && onDrop(event);
			}
		}
	};

	const saveEditedImage = (image: File) => {
		if (image && imageEditorState.index != null) {
			const fileList = Array.from(fileData);
			fileList[imageEditorState.index] = image;
			dispatch({
				type: "STORE_FILE_DATA",
				payload: {
					files: fileList
				},
			});
		}
	}

	const closeImageEditor = () => {
		dispatch({
			type: "SET_IMAGE_EDITOR_DATA",
			payload: {
				isEditing: false,
				file: null,
				index: null
			},
		});
	}

	if (fileState.zoom) {
		return (
			<div>
				<ImageSlider />
			</div>
		);
	}


	if (imageEditorState.isEditing && imageEditorState.file) {
		return (
			<Suspense fallback={<></>}>
				<ReactPhotoEditor
					open={imageEditorState.isEditing}
					file={imageEditorState.file}
					onSaveImage={saveEditedImage}
					onClose={closeImageEditor}
					downloadOnSave={false}
				/>
			</Suspense>
		);
	}

	return (
		<div className="w-full">
			<div className="flex flex-row max-h-2">
				<div className={`${width ?? `basis-11/12`} mx-auto`}>
					{fileData.length > 0 && (
						<Header
							fileData={fileData}
							multiple={multiple}
							disabled={disabled}
							accept={accept}
							onChange={onChange}
							handleImage={handleImage}
						/>
					)}

					<div
						className={`${height && `overflow-auto ${height}`} ${fileData.length == 0 &&
							`border-2 border-dashed border-gray-300 ${disabled ? "" : `hover:bg-stone-200`} `
							} flex flex-row flex-wrap gap-4 p-6 bg-stone-100  shadow dark:bg-gray-800 `}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						data-testid="dropzone"
					>
						{fileData.length > 0 ? (
							fileData.map((file, idx) => {
								return (
									<div key={idx} className="relative pb-5 group" onClick={() => handleClick(file)}>
										<div className="ml-9">
											{componentState.removeFile ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													data-testid="remove-file-button"
													onClick={() => remove(file)}
													className="absolute -top-2 right-0 z-10 text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer h-5 w-5"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
												</svg>
											) : (
												<></>
											)}
										</div>
										<div className="clear-right">
											<FilePreview file={file} index={idx} />
										</div>
									</div>
								);
							})
						) : (
							<label
								htmlFor="fileInput"
								className={`text-black dark:text-slate-100 ${disabled
									? `mx-auto cursor-not-allowed  flex items-center`
									: "mx-auto cursor-pointer  flex items-center"
									}`}
							>
								Drop files here, or click to browse files
								<input
									id="fileInput"
									disabled={disabled}
									type="file"
									onChange={(e) => {
										handleImage(e);
										if (onChange) {
											onChange(e);
										}
									}}
									multiple={multiple ?? true}
									accept={accept ?? ""}
									style={{ display: "none" }}
								/>
							</label>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
