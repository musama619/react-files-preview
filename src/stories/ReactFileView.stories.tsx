import { Provider } from "react-redux";
import ReactFileView from "../ReactFileView/ReactFileView";
import store from "../../store";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
	title: "Example/ReactFileView",
	component: ReactFileView,
	argTypes: {
		downloadFile: {
			description: "Enable file downloading",
			defaultValue: true,
			control: {
				type: "boolean",
			},
		},
		removeFile: {
			description: "Show remove button on file hover",
			defaultValue: true,
			control: {
				type: "boolean",
			},
		},
    showFileSize: {
			description: "When image slider is opened, show slide count under files",
			defaultValue: true,
			control: {
				type: "boolean",
			},
		},
	},
	decorators: [
		(Story: any) => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
	tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
	args: {
		downloadFile: true,
		removeFile: true,
		showFileSize: true,
		showSliderCount: true,
		files: [],
		url: "https://images.pexels.com/photos/13658554/pexels-photo-13658554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
};

// export const Slider = {
//   args: {
//   },
// };

// export const removeFile = {
//   args: {
//     removeFile: true,
//   },
// };
// export const showFileSize = {
//   args: {
//     showFileSize: true,
//   },
// };
// export const showSliderCount = {
//   args: {
//     showSliderCount: true,
//   },
// };
