import React, { Suspense, useCallback, useContext, useEffect } from "react";
import FilePreview from "./FilePreview";
import ImageSlider from "./ImageSlider";
import Header from "./Header";
import { Props } from "./interface";
import { FileContext } from "../context/FileContext";

const ReactPhotoEditor = React.lazy(async () => {
	const { ReactPhotoEditor } = await import("react-photo-editor");
	return { default: ReactPhotoEditor };
});

export const Main: React.FC<Props> = ({
	id,
	files,
	url,
	downloadFile,
	removeFile,
	showFileSize,
	sliderIndicatorType,
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
	onDrop,
}) => {
	const fileData = useContext(FileContext).state.fileData;
	const fileState = useContext(FileContext).state.fileState;
	const componentState = useContext(FileContext).state.componentState;
	const imageEditorState = useContext(FileContext).state.imageEditorState;
	const inputId = id ?? `fileInput-${Date.now()}`;

	const { dispatch } = useContext(FileContext);

	const checkErrors = useCallback((files: File[]) => {
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
	}, [fileData.length, maxFileSize, maxFiles, onError]);

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

					const file = new File([blob], "file" + (fileExt ?? ".img"), {
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
	}, [dispatch, onError, url]);

	const filterDuplicateFiles = (newFiles: File[], existingFiles: File[]) => {
		const existingMap = new Map<string, boolean>();
		existingFiles.forEach((file) => {
			existingMap.set(`${file.name}_${file.size}`, true);
		});

		return newFiles.filter((file) => !existingMap.has(`${file.name}_${file.size}`));
	};

	useEffect(() => {
		if (files && files.length > 0) {
			const uniqueFiles = filterDuplicateFiles(files, fileData);

			if (uniqueFiles && !checkErrors(files)) {
				dispatch({ type: "STORE_FILE_DATA", payload: { files: files } });
			}
		}
	}, [checkErrors, dispatch, fileData, files]);

	useEffect(() => {
		dispatch({
			type: "SET_COMPONENT_STATE",
			payload: {
				downloadFile: downloadFile != undefined ? downloadFile : true,
				removeFile: removeFile != undefined ? removeFile : true,
				showFileSize: showFileSize != undefined ? showFileSize : true,
				sliderIndicatorType: sliderIndicatorType != undefined ? sliderIndicatorType : "dots",
				rounded: rounded != undefined ? rounded : true,
				fileHeight: fileHeight ?? "8rem",
				fileWidth: fileWidth ?? "11rem",
				disabled: disabled ?? false,
				allowEditing: allowEditing ?? false,
			},
		});
	}, [downloadFile, removeFile, showFileSize, sliderIndicatorType, fileHeight, fileWidth, rounded, disabled, allowEditing, dispatch]);

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = Array.from(e.target.files || []);
		const newFiles = filterDuplicateFiles(files, fileData);

		if (newFiles.length && !checkErrors(newFiles)) {
			dispatch({ type: "APPEND_FILE_DATA", payload: { files: newFiles } });
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
	}, [fileData, getFiles]);

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
		const newFiles = filterDuplicateFiles(files, fileData);

		if (newFiles.length && !checkErrors(newFiles)) {
			dispatch({ type: "APPEND_FILE_DATA", payload: { files: newFiles } });
			onDrop && onDrop(event);
		}
	};

	const saveEditedImage = (image: File) => {
		if (image && imageEditorState.index != null) {
			const fileList = Array.from(fileData);
			fileList[imageEditorState.index] = image;
			dispatch({
				type: "STORE_FILE_DATA",
				payload: {
					files: fileList,
				},
			});
		}
	};

	const closeImageEditor = () => {
		dispatch({
			type: "SET_IMAGE_EDITOR_DATA",
			payload: {
				isEditing: false,
				file: null,
				index: null,
			},
		});
	};

	if (fileState.zoom) {
		return (
			<div>
				<ImageSlider />
			</div>
		);
	}

	if (imageEditorState.isEditing && imageEditorState.file && !disabled) {
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
		<div
			className={`rfp-w-full ${disabled ? "rfp-cursor-not-allowed" : "hover:rfp-cursor-pointer"}`}
			onDragOver={disabled ? undefined : handleDragOver}
			onDragLeave={disabled ? undefined : handleDragLeave}
			onDrop={disabled ? undefined : handleDrop}
			data-testid="dropzone"
		>
			<div className="rfp-flex rfp-flex-row rfp-max-h-2">
				<div className={`${width ?? `rfp-basis-11/12`} rfp-mx-auto`}>
					{fileData.length > 0 && (
						<Header
							id={inputId}
							fileData={fileData}
							multiple={multiple}
							disabled={disabled}
							accept={accept}
							onChange={onChange}
							handleImage={handleImage}
						/>
					)}

					<div
						className={`${height && `rfp-overflow-auto ${height}`} ${
							fileData.length == 0 &&
							`rfp-border-2 rfp-border-dashed rfp-border-gray-300 ${
								disabled
									? "rfp-cursor-not-allowed"
									: "hover:rfp-bg-stone-200 dark:hover:rfp-bg-zinc-900"
							}`
						} rfp-flex rfp-flex-row rfp-flex-wrap rfp-justify-start rfp-gap-4 rfp-p-6 rfp-bg-stone-100  rfp-shadow dark:rfp-bg-zinc-800 `}
						onClick={(e) => {
							if (!disabled && fileData.length === 0) {
								e.stopPropagation();
								document.getElementById(inputId)?.click();
							}
						}}
					>
						{fileData.length > 0 ? (
							fileData.map((file, idx) => {
								return (
									<div
										key={idx}
										className="rfp-relative rfp-pb-5 rfp-group"
										onClick={(e) => {
											e.stopPropagation();
											handleClick(file);
										}}
									>
										<div className="rfp-ml-9">
											{componentState.removeFile ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													data-testid="remove-file-button"
													onClick={(e) => {
														e.stopPropagation();
														remove(file);
													}}
													className="rfp-absolute -rfp-top-2 rfp-right-0 rfp-z-10 dark:rfp-text-white rfp-text-black dark:hover:rfp-text-slate-200 rfp-opacity-0 group-hover:rfp-opacity-100 rfp-transition-opacity rfp-cursor-pointer rfp-h-5 rfp-w-5"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
												</svg>
											) : (
												<></>
											)}
										</div>
										<div className="rfp-clear-right">
											<FilePreview file={file} index={idx} />
										</div>
									</div>
								);
							})
						) : (
							<label
								htmlFor={inputId}
								className={`rfp-text-black dark:rfp-text-slate-100 ${
									disabled
										? `rfp-mx-auto rfp-cursor-not-allowed rfp-flex rfp-items-center`
										: "rfp-mx-auto rfp-cursor-pointer rfp-flex rfp-items-center"
								}`}
								onClick={(e) => e.stopPropagation()}
							>
								Drop files here, or click to browse files
								<input
									id={inputId}
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
