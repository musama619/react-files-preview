import { ChangeEventHandler } from "react";

const Header = (props: {
	id: string;
	fileData: File[];
	disabled: boolean | undefined;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	handleImage: ChangeEventHandler<HTMLInputElement>;
	multiple: boolean | undefined;
	accept: string | undefined;
}) => {
	return (
		<>
			<div>
				<div className="rfp-flex rfp-justify-between  rfp-bg-gray-200 dark:rfp-bg-zinc-900 ">
					<div className="rfp-h-10 rfp-text-sm rfp-pt-2 rfp-ml-2 rfp-font-medium">
						<span className="rfp-bg-gray-100 rfp-text-gray-800 rfp-text-sm rfp-font-medium rfp-mr-2 rfp-px-2.5 rfp-py-0.5 rfp-rounded dark:rfp-bg-gray-800 dark:rfp-text-gray-100">
							{`Files: ${props.fileData.length}`}
						</span>
					</div>
					<label
						htmlFor={props.id}
						className={`${
							props.disabled
								? `rfp-cursor-not-allowed rfp-opacity-50  rfp-py-1 rfp-px-2 rfp-mt-1 rfp-mr-2 rfp-mb-1 rfp-text-sm rfp-font-medium rfp-text-gray-900 focus:rfp-outline-none rfp-bg-white rfp-rounded-full rfp-border rfp-border-gray-200 focus:rfp-z-10 focus:rfp-ring-4 focus:rfp-ring-gray-200 dark:focus:rfp-ring-gray-700 dark:rfp-bg-gray-800 dark:rfp-text-gray-400 dark:rfp-border-gray-600 dark:hover:rfp-text-white dark:hover:rfp-bg-gray-700`
								: "rfp-cursor-pointer rfp-py-1 rfp-px-2 rfp-mt-1 rfp-mr-2 rfp-mb-1 rfp-text-sm rfp-font-medium rfp-text-gray-900 focus:rfp-outline-none rfp-bg-white rfp-rounded-full rfp-border rfp-border-gray-200 hover:rfp-bg-gray-100 hover:rfp-text-blue-700 focus:rfp-z-10 focus:rfp-ring-4 focus:rfp-ring-gray-200 dark:focus:rfp-ring-gray-700 dark:rfp-bg-gray-800 dark:rfp-text-gray-100 dark:rfp-border-gray-600 dark:hover:rfp-text-white dark:hover:rfp-bg-gray-700"
						} `}
					>
						+ Add more
						<input
							id={props.id}
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
};

export default Header;
