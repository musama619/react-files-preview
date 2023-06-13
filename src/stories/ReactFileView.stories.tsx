import { Provider } from "react-redux";
import ReactFileView from "../ReactFileView/ReactFileView";
import { action } from "@storybook/addon-actions";
import type { Meta } from '@storybook/react';

import store from "../../store";

const meta: Meta<typeof ReactFileView> = {
	title: "Example/ReactFileView",
	component: ReactFileView,
	decorators: [
		(Story: any) => (
			<Provider store={store}>
				<Story />
			</Provider>
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
export const CustomHeightAndWidth = {
	args: {
		height: "h-44",
		width: "basis-full",
		files: [],
	},
};
export const MaxFiles = {
	args: {
		maxFiles: 1,
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
		width: "basis-11/12",
		files: [],
	},
};
export const ShowFileSize = {
	args: {
		showFileSize: false,
		width: "basis-11/12",
		files: [],
	},
};
export const RemoveFile = {
	args: {
		removeFile: false,
		width: "basis-11/12",
		files: [],
	},
};
export const ShowSliderCount = {
	args: {
		showSliderCount: true,
		width: "basis-11/12",
		files: [],
	},
};

