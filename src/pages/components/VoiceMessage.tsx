import play from "/icons/play.svg";
import pause from "/icons/pause.svg";
import subtitles from "/icons/subtitles.svg";
import { useRef, useState } from "react";
import ProgressBar from "./ProgressBar";
export default function VoiceBubble({ file }: { file: string }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [subtitlesVisible, setSubtitlesVisible] = useState(false);
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
				<img
					src={subtitles}
					className="select-none hover:cursor-pointer hover:scale-110"
					onClick={() => setSubtitlesVisible(!subtitlesVisible)}
				/>
			</div>
			{subtitlesVisible ? (
				<p className="font-code rounded-2xl py-1 px-4 bg-neutral-900 text-wrap">
					Sinon tu peux m'envoyer le mail euuh, tu peux envoyer le sujet par mail parceque j'vais
					travailler sur PC s'il te plait merci
				</p>
			) : (
				<></>
			)}
		</div>
	);
}
