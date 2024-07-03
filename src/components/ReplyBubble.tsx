import replyIcon from "/icons/reply.svg";
export default function ReplyBubble({
	pfp,
	content,
	self = false,
}: {
	pfp?: string;
	content?: string;
	self?: boolean;
}) {
	const unRoundedCorner = ["r", "l"][self ? 0 : 1];
	return (
		<div
			className={`flex w-fit
		${self ? "self-end flex-row-reverse" : ""}
		px-2
		select-none
		transition cursor-pointer
		-translate-x-1
		translate-y-2 hover:translate-y-1
		-z-1`}
		>
			<img src={replyIcon} />
			<div
				className={`bg-neutral-900
					rounded-2xl rounded-b${unRoundedCorner}
					py-1 pl-1 pr-3 flex gap-2 italic w-fit -z-1`}
			>
				<img src={pfp} className="h-6 rounded-full" />
				<span>{content}</span>
			</div>
		</div>
	);
}
