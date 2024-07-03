import playIcon from "/icons/play.svg";
import pauseIcon from "/icons/pause.svg";
import fullscreenIcon from "/icons/fullscreen.svg";
import fullscreenExitIcon from "/icons/fullscreen_exit.svg";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "./ProgressBar";

export default function VideoPlayer({ file }: { file: string }) {
	const [isPlaying, setPlaying] = useState(false);
	const [isFullscreen, setFullscreen] = useState(false);
	const [progress, setProgress] = useState(0);
	const ref = useRef(null);
	function setManuelProgress(value: number) {
		let video = ref.current as unknown as HTMLVideoElement;
		setProgress(value);
		video.currentTime = value * video.duration;
	}
	useEffect(() => {
		let video = ref.current as unknown as HTMLVideoElement;
		if (!video) return;
		if (isPlaying && video.paused) video.play();
		else if (!isPlaying && !video.paused) video.pause();
	}, [isPlaying]);

	return (
		<div
			className={`${
				isFullscreen
					? "absolute z-10 top-[15vh] left-[10vw] w-[80vw] h-[70vh] shadow-2xl shadow-black"
					: ""
			}
		transition group mt-2 w-[30vw] flex flex-col g-2 justify-center items-center`}
		>
			<video
				onEnded={() => setPlaying(false)}
				onDoubleClick={() => setFullscreen(!isFullscreen)}
				onClick={() => setPlaying(!isPlaying)}
				ref={ref}
				className="w-fit rounded-2xl"
				src={file}
				onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / e.currentTarget.duration)}
			/>
			<div
				className="invisible group-hover:visible
				-mb-4 transition
				flex items-center
				gap-2 px-3 py-1
    bg-neutral-800
	w-fit rounded-full -translate-y-4"
			>
				<img
					src={isPlaying ? pauseIcon : playIcon}
					className="w-5 m-1 icon-btn"
					onClick={() => setPlaying(!isPlaying)}
				/>
				<ProgressBar progress={progress} setProgress={setManuelProgress} />
				<img
					src={isFullscreen ? fullscreenExitIcon : fullscreenIcon}
					className="w-5 m-1 icon-btn"
					onClick={() => setFullscreen(!isFullscreen)}
				/>
			</div>
		</div>
	);
}
