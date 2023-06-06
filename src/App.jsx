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
        <div>
            <input
                type="file"
                onChange={handleImage}
                multiple={true}
                style={{ color: "transparent" }}
            />
            <div class="flex flex-row flex-wrap gap-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800">
                {fileData.length > 0 ? (
                    fileData.map((file, idx) => {
                        return (
                            <div key={idx}>
                                <div className="ml-9">
                                    <button
                                        onClick={() => removeFile(file)}
                                        className="float-right"
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
                    <></>
                )}
            </div>
        </div>
    );
}

export default App;
