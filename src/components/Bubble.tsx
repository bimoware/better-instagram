import { ReactNode } from "@tanstack/react-router";

export default function Bubble({ replying=false, self=false, children}: {
    replying?:boolean,
	self?: boolean,
	children: ReactNode
}) {
	const unRoundedCorner = ["r","l"][self ? 0 : 1];
	return (
		<div
			className={`
                m-0.5 max-w-96
				px-3 py-1
				rounded-2xl ${
					replying
					? (unRoundedCorner === "r" ? "rounded-tr-md" : "rounded-tl-md")
					: ""
				}
				bg-neutral-800
				`}
		>
			{children}
		</div>
	);
}
