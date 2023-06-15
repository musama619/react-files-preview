export type FilePreviewProps = {
	file: File;
	index: number;
};

export type FileIcon = {
	type: string;
	icon: JSX.Element;
	color: string;
};
export type FileFooterProps = {
	file: File;
	fileSrc: string | null;
};
