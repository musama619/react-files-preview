import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    appendFileData,
    removeFileData,
    storeFileData,
} from "./redux/fileSlice";
import FilePreview from "./FilePreview";
import axios from "axios";
import { MdCancel } from "react-icons/md";

function App() {
    const dispatcher = useDispatch();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "URL",
                    { responseType: "blob" }
                );
                const file = new File([response.data], "filename", {
                    type: response.data.type,
                });
                dispatcher(storeFileData({ files: [file] }));
            } catch (err) {
                console.log(err.message);
            }
        }
        // fetchData();
    }, []);
    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        dispatcher(appendFileData({ files: files }));
    };

    const removeFile = (file) => {
        dispatcher(removeFileData(file));
    };

    const fileData = useSelector((state) => state.file.fileData);

    return (
        <div className="w-full mt-3">
            <div className="flex flex-row">

                <div className="basis-2/3  mx-auto">
                    {fileData.length > 0 ? <div className="flex justify-between  bg-gray-200 ">
                        <div className="h-10 text-sm pt-2 font-medium"></div>
                        <div className="h-10 text-sm pt-2 ml-20 font-medium">{`${fileData.length} files`}</div>
                        <button className="h-10 text-sm pt-2 font-medium flex content-end mr-2 text-blue-500">
                            <label htmlFor="fileInput" className="mx-auto">
                                + Add more
                                <input
                                    id="fileInput"
                                    type="file"
                                    onChange={handleImage}
                                    multiple={true}
                                    style={{ display: "none" }}
                                />
                            </label></button>
                    </div> : <></>}

                    <div class="flex flex-row flex-wrap gap-4 p-6 bg-stone-100 border border-gray-100 rounded-lg shadow dark:bg-gray-800  ">
                        {fileData.length > 0 ? (
                            fileData.map((file, idx) => {
                                return (
                                    <div key={idx} className="transition ease-in-out delay-150 pb-5 hover:grayscale" data-tooltip-target="tooltip-default">
                                        <div className="ml-9">
                                            <button
                                                onClick={() => removeFile(file)}
                                                className="float-right text-gray-500"
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

export default App;
