import { Dispatch } from "react";

export default function ProgressBar({
	progress,
	setProgress
}: {
	progress: number;
	setProgress: Dispatch<number>
}) {
	return (
		<div
		onClick={e =>{
			let offset = e.nativeEvent.offsetX / e.currentTarget.clientWidth
			if(offset <= 0.05) offset = 0;
			return setProgress(offset)
		}}
		className={`overflow-hidden rounded-full w-40 h-3 bg-neutral-900`}>
			<div
				style={{ width: `${Math.round(progress * 100)}%` }}
				className={`rounded-full h-full bg-white`}
			/>
		</div>
	);
}
