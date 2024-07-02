import play from "/icons/play.svg";
import pause from "/icons/pause.svg";
import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
export default function VoiceBubble({ file }: { file: string }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const ref = useRef(null);
	function setManuelProgress(progress: number) {
		let audio = ref.current as unknown as HTMLAudioElement;
		if (!audio) return;
		audio.currentTime = progress * audio.duration;
	}
	return (
		<div>
			<div className="flex gap-2 py-1 items-center justify-center">
				<audio
					ref={ref}
					id="audio"
					onTimeUpdate={(ev) => {
						const audio = ev.currentTarget as HTMLAudioElement;
						const prcent = audio.currentTime / audio.duration;
						setProgress(prcent);
					}}
					onEnded={() => setIsPlaying(false)}
				>
					<source src={file} type="audio/mp3" />
				</audio>
				<img
					src={isPlaying ? pause : play}
					onClick={() => {
						let elem = document.getElementById("audio") as HTMLAudioElement;
						if (isPlaying) elem.pause();
						else elem.play();
						setIsPlaying(!isPlaying);
					}}
					className="select-none hover:cursor-pointer hover:scale-110"
				/>
				<ProgressBar progress={progress} setProgress={setManuelProgress} />
			</div>
		</div>
	);
}
