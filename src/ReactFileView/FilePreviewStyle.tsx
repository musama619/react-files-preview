import { FileIcon } from "./types";
import {
	BsFileEarmarkText,
	BsFilePdfFill,
	BsFiletypeCsv,
	BsFiletypeDoc,
	BsFiletypeDocx,
	BsFiletypeMp3,
	BsFiletypeMp4,
	BsFiletypeXls,
	BsFiletypeXlsx,
} from "react-icons/bs";

export const filePreviewStyle: FileIcon[] = [
	{
		type: "application/pdf",
		icon: <BsFilePdfFill className="text-white text-4xl" />,
		color: "bg-red-500",
	},
	{
		type: "text/csv",
		icon: <BsFiletypeCsv className="text-white text-4xl" />,
		color: "bg-emerald-600",
	},
	{
		type: "text/plain",
		icon: <BsFileEarmarkText className="text-white text-4xl" />,
		color: "bg-slate-500",
	},
	{
		type: "application/msword",
		icon: <BsFiletypeDoc className="text-white text-4xl" />,
		color: "bg-sky-600",
	},
	{
		type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		icon: <BsFiletypeDocx className="text-white text-4xl" />,
		color: "bg-sky-600",
	},
	{
		type: "audio/mpeg",
		icon: <BsFiletypeMp3 className="text-white text-4xl" />,
		color: "bg-cyan-500",
	},
	{
		type: "video/mp4",
		icon: <BsFiletypeMp4 className="text-white text-4xl" />,
		color: "bg-violet-500",
	},
	{
		type: "application/vnd.ms-excel",
		icon: <BsFiletypeXls className="text-white text-4xl" />,
		color: "bg-emerald-600",
	},
	{
		type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		icon: <BsFiletypeXlsx className="text-white text-4xl" />,
		color: "bg-emerald-600",
	},
];