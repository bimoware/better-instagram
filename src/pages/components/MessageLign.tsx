import ReplyBubble from "./ReplyBubble";
import Bubble from "./Bubble";
import VoiceBubble from "./VoiceMessage";
import VideoMessage from "./VideoMessage";
import ImageMessage from "./ImageMessage";

import { MessageClass } from "../../scripts/Classes";
import { isOnlyEmojis, timeToString } from "../../scripts/Util";

import moreIcon from "/icons/more.svg";
import { useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import MessageMenu from "./MessageMenu";

export default function Message({ message }: { message: MessageClass }) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	return (
		<div className="flex flex-col" id={"message-" + message.id}>
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
					<VideoMessage file={message.data} />
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
		</div>
	);
}
