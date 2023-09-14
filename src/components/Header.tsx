import { ChangeEventHandler } from "react";

const Header = (
    props: {
        fileData: File[],
        disabled: boolean | undefined,
        onChange?: ChangeEventHandler<HTMLInputElement>,
        handleImage: ChangeEventHandler<HTMLInputElement>,
        multiple: boolean | undefined,
        accept: string | undefined
    }
) => {
    return (
        <>
            <div>
                <div className="flex justify-between  bg-gray-200 dark:bg-gray-600 ">
                    <div className="h-10 text-sm pt-2 ml-2 font-medium">
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            {`Files: ${props.fileData.length}`}
                        </span>
                    </div>
                    <label
                        htmlFor="fileInput"
                        className={`${props.disabled
                            ? `cursor-not-allowed opacity-50  py-1 px-2 mt-1 mr-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`
                            : "cursor-pointer py-1 px-2 mt-1 mr-2 mb-1 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            } `}
                    >
                        + Add more
                        <input
                            id="fileInput"
                            disabled={props.disabled}
                            type="file"
                            onChange={(e) => {
                                props.handleImage(e);
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                            }}
                            style={{ display: "none" }}
                            multiple={props.multiple ?? true}
                            accept={props.accept ?? ""}
                        />
                    </label>
                </div>
            </div>
        </>
    );
}

export default Header;