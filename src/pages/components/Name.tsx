export default function Name({
	type,
	add,
	displayName,
	className
}: {
	type: number; // 0: user, 1: group
	add?: string;
	displayName?: string;
	className?:string;
}) {
	return (
		<div className={`${className || ""} inline-flex gap-1 items-baseline`}>
			<span className={`cursor-pointer font-semibold select-none`}>{displayName}</span>
			{add ? (
				<span
					className={`text-xs opacity-80
				${type === 1 ? "pl-2" : ""}`}
				>
					{type === 0 ? "@" : ""}
					<span className="select-all cursor-text">{add}</span>
				</span>
			) : (
				<></>
			)}
		</div>
	);
}
