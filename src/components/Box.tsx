import { ReactNode } from "react";
export default function Box({
	paddingClassName,
	className,
	children,
	title,
	icon,
}: {
	paddingClassName?: string;
	children?: ReactNode;
	className?: string;
	title?: string;
	icon?: string;
}) {
	return (
		<>
			{title ? (
				<div
					className="flex gap-1 opacity-80 mx-2
            transition hover:translate-x-1"
				>
					{icon ? <img className="w-3" src={icon} /> : <></>}
					<span className="font-thin text-xs">{title}</span>
				</div>
			) : (
				<></>
			)}
			{children ? (
				<div
					className={`bg-neutral-900 h-fit
                ${paddingClassName ?? "pl-3 pr-1 py-2"}
                items-center
                overflow-scroll
                rounded-2xl rounded-tl-xl
				${className}
				`}
				>
					{children}
				</div>
			) : (
				<></>
			)}
		</>
	);
}
