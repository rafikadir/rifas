import Image from "next/image";

type Props = {
	alt: string;
	buttonClassName: string;
	iconWidth: number;
	iconHeight: number;
	iconClassName?: string;
	handler: () => void;
};

export default function DeleteIcon({
	handler,
	buttonClassName,
	iconClassName,
	iconHeight,
	iconWidth,
	alt,
}: Props) {
	return (
		<button
			type="button"
			onClick={handler}
			className={`${buttonClassName} p-1 rounded-full hover:bg-red-200`}
		>
			<Image
				src="/assets/icons/cancel.svg"
				width={iconWidth}
				height={iconHeight}
				className={iconClassName}
				alt={alt}
			/>
		</button>
	);
}
