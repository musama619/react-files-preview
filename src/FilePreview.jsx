import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storeFileState } from "./redux/fileSlice";
import FileFooter from "./FileFooter";

const imageFileTypes = ["image/jpeg", "image/jpg", "image/png"];

const FilePreview = ({ file, index }) => {
    const [fileSrc, setFileSrc] = useState([]);
    useEffect(() => {
        const fileUrl = URL.createObjectURL(file);
        setFileSrc(fileUrl);
    }, [file]);

    const dispatcher = useDispatch();

    const setZoom = () => {
        dispatcher(
            storeFileState({
                zoom: true,
                fileSrc: fileSrc,
                index: index,
                isImage: imageFileTypes.includes(file.type),
                fileName: file.name,
            })
        );
    };

    return (
        <>
            <div
                onClick={() => setZoom()}
                className="border border-solid border-slate-400 rounded  "
            >
                {imageFileTypes.includes(file.type) ? (
                    <img src={fileSrc} className="object-fill h-32 w-44"></img>
                ) : (
                    <div className="h-32 w-44">
                        <h6>{file.name}</h6>
                    </div>
                )}
            </div>
            <div className="h-5 w-44">
                <FileFooter file={file} fileSrc={fileSrc} />
            </div>
        </>
    );
};

export default FilePreview;
