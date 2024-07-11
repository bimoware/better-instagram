import { MessageClass } from "../../scripts/Classes";
import { arrangeReactions, isOnlyEmojis, timeToString } from "../../scripts/Util";

import { ArrowContainer, Popover } from "react-tiny-popover";
import { useRef, useState, useEffect } from "react";

import Bubble from "./Bubble";
import MessageMenu from "./MessageMenu";
import ProgressBar from "../ProgressBar";
import Name from "../Name";

import fullscreenExitIcon from "/icons/fullscreen_exit.svg";
import fullscreenIcon from "/icons/fullscreen.svg";
import redHeartIcon from "/emojis/red-heart.png";
import pauseIcon from "/icons/pause.svg";
import replyIcon from "/icons/reply.svg";
import moreIcon from "/icons/more.svg";
import playIcon from "/icons/play.svg";
import pause from "/icons/pause.svg";
import play from "/icons/play.svg";

export function MessageGroup({ messages }: { messages: MessageClass[] }) {
	return (
		<div
			className={`
				ml-4 mr-2 my-2 gap-2 flex items-end ${messages[0].user.isSelf ? "flex-row-reverse" : ""}`}
		>
			{messages[0].user.isSelf ? (
				<></>
			) : (
				<img
					className={`self-start rounded-full w-10 mt-2 transition hover:cursor-pointer select-none`}
					src={messages[0].user.pfp}
				/>
			)}
			<div className="flex flex-col transition">
				{messages[0].user.isSelf ? (
					<></>
				) : (
					<div className={messages[0].user.isSelf ? "text-right" : ""}>
						<Name
							type={0}
							add={messages[0].user.username}
							displayName={messages[0].user.displayName}
						/>
					</div>
				)}
				{messages.filter(Boolean).map((message, key) => (
					<div className="max-w-[30vw]" key={key}>
						<MessageLign message={message} />
					</div>
				))}
			</div>
		</div>
	);
}

export function ImageMessage({ file }: { file: string }) {
	return (
		<img
			className="max-w-64 rounded-3xl
    transition hover:-translate-y-1 hover:-rotate-2 hover:cursor-pointer"
			src={file}
		/>
	);
}
export function VideoPlayer({ file }: { file: string }) {
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

export function VoiceBubble({ file }: { file: string }) {
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

export function ReplyBubble({
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

export function MessageLign({ message }: { message: MessageClass }) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	return (
		<div className="flex flex-col" key={message.id} id={`message-${message.id}`}>
			{message.reply ? (
				<ReplyBubble
					pfp={message.reply.user.pfp}
					content={message.reply.toString()}
					self={message.reply.user.isSelf}
				/>
			) : (
				<></>
			)}
			<div
				className={`group flex gap-2 items-center ${message.user.isSelf ? "flex-row-reverse" : ""}`}
			>
				{/* Message */}
				{message.type === 0 ? (
					isOnlyEmojis(message.data) ? (
						<span className="text-5xl py-2">{message.data}</span>
					) : (
						<Bubble self={message.user.isSelf} replying={Boolean(message.reply)}>
							{message.data}
						</Bubble>
					)
				) : message.type === 1 ? (
					<Bubble self={message.user.isSelf} replying={Boolean(message.reply)}>
						<VoiceBubble file={message.data} />
					</Bubble>
				) : message.type === 2 ? (
					<ImageMessage file={message.data} />
				) : message.type === 3 ? (
					<VideoPlayer file={message.data} />
				) : (
					<>??</>
				)}
				{/* Time */}
				<span
					className="select-all cursor-text opacity-50"
					title={timeToString(message.timestamp, 1)}
				>
					{timeToString(message.timestamp, 2)}
				</span>
				{/* Buttons */}
				<Popover
					isOpen={isPopoverOpen}
					positions={["bottom", "left", "right", "top"]}
					onClickOutside={() => setIsPopoverOpen(false)}
					content={({ position, childRect, popoverRect }) => (
						<ArrowContainer
							position={position}
							childRect={childRect}
							popoverRect={popoverRect}
							arrowColor={"#171717"}
							arrowSize={10}
							className="popover-arrow-container"
							arrowClassName="popover-arrow"
						>
							<MessageMenu message={message} setIsPopoverOpen={setIsPopoverOpen} />
						</ArrowContainer>
					)}
				>
					<img
						onClick={() => setIsPopoverOpen(!isPopoverOpen)}
						className="invisible group-hover:visible select-none opacity-40 hover:opacity-70 cursor-pointer"
						src={moreIcon}
					/>
				</Popover>
			</div>
			{message.reactions.length ? (
				<div className="flex h-6 gap-2 mx-2">
					{arrangeReactions(message.reactions).map((reactionList, i) => {
						return (
							<div
								key={i}
								className="flex bg-neutral-800 rounded-full w-fit h-full items-center
						gap-1 px-2 select-none hover:cursor-pointer
						-translate-y-2"
							>
								<span className="font-extrabold">{reactionList.length}</span>
								<img className="h-4/6" src={redHeartIcon} />
							</div>
						);
					})}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
