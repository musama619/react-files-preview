import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	appendFileData,
	removeFileData,
	storeFileData,
} from "../redux/fileSlice";
import FilePreview from "./FilePreview";
import { MdCancel } from "react-icons/md";
import { RootState } from '../../store';

function ReactFileView(props: {url: string | null, files: FileList | File | []}) {
	const dispatcher = useDispatch();

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(props.url!);
				const blob = await response.blob();
				const file = new File([blob], "filename", {
					type: blob.type,
				});
				dispatcher(storeFileData({ files: [file] }));
			} catch (err: any) {
				console.log(err.message);
			}
		}
		if(props.url){
			fetchData();
		}
	}, []);

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const files = Array.from(e.target.files || []);
		dispatcher(appendFileData({ files: files }));
	};

	const removeFile = (file: File) => {
		dispatcher(removeFileData(file));
	};

	const fileData = useSelector((state: RootState) => state.file.fileData);

	return (
		<div className="w-full mt-3">
			<div className="flex flex-row">
				<div className="basis-2/3  mx-auto">
					{fileData.length > 0 ? (
						<div className="flex justify-between  bg-gray-200 ">
							<div className="h-10 text-sm pt-2 font-medium"></div>
							<div className="h-10 text-sm pt-2 ml-20 font-medium">{`${fileData.length} files`}</div>
							<button className="h-10 text-sm pt-2 font-medium flex content-end mr-2 text-blue-500 hover:text-blue-800 cursor-pointer">
								<label htmlFor="fileInput" className="mx-auto cursor-pointer">
									+ Add more
									<input
										id="fileInput"
										type="file"
										onChange={handleImage}
										multiple={true}
										style={{ display: "none" }}
									/>
								</label>
							</button>
						</div>
					) : (
						<></>
					)}

					<div className="flex flex-row flex-wrap gap-4 p-6 bg-stone-100 border border-gray-100 rounded-lg shadow dark:bg-gray-800  ">
						{fileData.length > 0 ? (
							fileData.map((file, idx) => {
								return (
									<div
										key={idx}
										className="relative pb-5 group "
									>
										<div className="ml-9">
											<button
												onClick={() => removeFile(file)}
												className="absolute -top-1 right-0 z-10 text-black opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<MdCancel />
											</button>
										</div>
										<div className="clear-right">
											<FilePreview file={file} index={idx} />
										</div>
									</div>
								);
							})
						) : (
							<label htmlFor="fileInput" className="mx-auto cursor-pointer hover:underline ">
								Browse files
								<input
									id="fileInput"
									type="file"
									onChange={handleImage}
									multiple={true}
									style={{ display: "none" }}
								/>
							</label>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ReactFileView;
