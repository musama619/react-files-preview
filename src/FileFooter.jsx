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

    const nameArray = file.name.split(".")
    let fileName = nameArray[0]
    let extension = nameArray.pop();
    if (fileName.length > 20) {
        fileName = fileName.substring(0, 5) + ".." + fileName.substring(fileName.length - 3, fileName.length);
    }
    const result = fileName + '.' + extension;

    return (
        <div className="relative ">
            <h5 className="text-[12px] mt-1 font-normal break-words">
                {result}
            </h5>
            <h5 className="text-[10px]">{fileSize}</h5>

            <a
                className="float-right absolute top-1 right-0 text-gray-500"
                href={fileSrc}
                target="_blank"
            >
                <MdDownload />
            </a>
        </div>
    );
};

export default FileFooter;
