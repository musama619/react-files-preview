import { ReactFilesPreview } from "../components/ReactFilesPreview";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryFn } from "@storybook/react";
import { FileProvider } from "../context/FileContext";


const meta: Meta<typeof ReactFilesPreview> = {
	title: "Example/ReactFilesPreview",
	component: ReactFilesPreview,
	decorators: [
		(Story: StoryFn) => (
			<FileProvider>
				<div style={{ height: "50vh" }}>
					<Story />
				</div>
			</FileProvider>
		),
	],
	argTypes: {
		files: {
			control: "input",
			description: "Array of File object(s)",
		},
		downloadFile: {
			description: "File download icon",
		},
		removeFile: {
			description: "Remove file icon on file hover",
		},
		showSliderCount: {
			description: "Slider count under image slide",
		},
		width: {
			description: "Pass Tailwind css **flex-basis** class https://tailwindcss.com/docs/flex-basis",
		},
		height: {
			description: "Pass Tailwind css **height** class https://tailwindcss.com/docs/height",
		},
		fileWidth: {
			description: "Pass Tailwind css **width** class https://tailwindcss.com/docs/width",
		},
		fileHeight: {
			description: "Pass Tailwind css **height** class https://tailwindcss.com/docs/height",
		},
	},
	tags: ["autodocs"],
};
export default meta;


export const Default = {
	args: {
		files: [],
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		downloadFile: true,
		removeFile: true,
		showFileSize: true,
		showSliderCount: true,
		multiple: true,
		accept: "image/*",
		maxFileSize: 1024 * 1024 * 5, // 5MB
		maxFiles: 5,
		width: "basis-11/12",
		// height: "basis-11/12",
		fileWidth: "h-32",
		fileHeight: "w-44",
		rounded: true,
		onRemove: action("onRemove"),
		onError: action("onError"),
		getFiles: action("getFiles"),
		onChange: action("onChange"),
	},
};

export const AllowEditing = {
	args: {
		allowEditing: true,
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-11/12",
	},
};

export const CustomHeightAndWidth = {
	args: {
		height: "h-44",
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-full",
		files: [],
	},
};
export const MaxFiles = {
	args: {
		maxFiles: 1,
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-11/12",
		files: [],
	},
};
export const MaxFileSize = {
	args: {
		maxFileSize: 1024 * 1024 * 1, // 1MB
		width: "basis-11/12",
		files: [],
	},
};
export const FileTypes = {
	args: {
		accept: "application/pdf, images/png",
		width: "basis-11/12",
		files: [],
	},
};
export const DownloadFile = {
	args: {
		downloadFile: false,
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-11/12",
		files: [],
	},
};
export const ShowFileSize = {
	args: {
		showFileSize: false,
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-11/12",
		files: [],
	},
};
export const RemoveFile = {
	args: {
		removeFile: false,
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-11/12",
		files: [],
	},
};
export const ShowSliderCount = {
	args: {
		showSliderCount: true,
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-11/12",
	},
};
export const Disabled = {
	args: {
		disabled: true,
		removeFile: false,
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		width: "basis-11/12",
	},
};