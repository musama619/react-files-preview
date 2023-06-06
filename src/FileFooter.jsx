import { MdDownload } from "react-icons/md";
import { useEffect, useState } from "react";

const FileFooter = ({ file, fileSrc }) => {
    const [fileSize, setFileSize] = useState(null);

    useEffect(() => {
        if (file.size < 1000000) {
            var size = Math.floor(file.size / 1000) + " KB";
            setFileSize(size);
        } else {
            var size = Math.floor(file.size / 1000000) + " MB";
            setFileSize(size);
        }
    }, []);
    return (
        <div className="relative ">
            <h5 className="text-sm font-bold">
                {file.name.length > 15
                    ? `${file.name.substring(0, 15)}...`
                    : file.name}
            </h5>
            <h5 className="text-xs">{fileSize}</h5>

            <a
                className="float-right absolute top-1 right-0"
                href={fileSrc}
                target="_blank"
            >
                <MdDownload />
            </a>
        </div>
    );
};

export default FileFooter;
