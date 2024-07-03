import { useRef, useState } from "react";

import client from "../scripts/Client.ts";
import { arrangeMessages } from "../scripts/Util.ts";

import Chats from "../components/Chats.tsx";
import MessageGroup from "../components/MessageGroup.tsx";
import Note from "../components/Note.tsx";
import UserIntro from "../components/UserIntro.tsx";
import MessageInput from "../components/MessageInput.tsx";
import ScrollDown from "../components/ScrollDown.tsx";

import emojiPickerData from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
import { Popover } from "react-tiny-popover";

export default function TestPage() {
	const [isEmojiOpen, setIsEmojiOpen] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [currentChatId, setCurrentChatId] = useState(
		Array.from(client.chats.values()).shift()?.id!
	);
	const [showScrollBtn, setShowScrollBtn] = useState(false);
	const currentChat = client.chats.find((chat) => chat.id === currentChatId)!;
	const ref = useRef<HTMLDivElement>(null);
	return (
		<div className="h-screen">
			<div className="flex h-1/6 panel gap-1">
				{client.notes.map((note) => (
					<Note note={note} />
				))}
			</div>
			<div className="flex h-5/6">
				<div className="w-96 overflow-y-scroll overflow-x-hidden panel">
					<Chats
						setCurrentChat={setCurrentChatId}
						current={currentChatId}
						chats={Array.from(client.chats.values())}
					/>
				</div>
				<div className="w-full">
					<div
						onScroll={(e) => {
							let el = e.currentTarget;
							if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
								setShowScrollBtn(false);
							} else {
								setShowScrollBtn(true);
							}
						}}
						className="overflow-y-scroll h-[75vh] panel scroll-smooth flex flex-col"
						ref={ref}
					>
						{currentChat.type === 0 ? <UserIntro user={currentChat.users[0]} /> : <></>}
						{arrangeMessages(currentChat.messages).map((msgs, i) => (
							<div key={i}>
								<MessageGroup messages={msgs} />
							</div>
						))}
						{showScrollBtn ? (
							<ScrollDown
								scroll={() => {
									if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
								}}
							/>
						) : (
							<></>
						)}
					</div>

					<Popover
						// onClickOutside={() => setIsEmojiOpen(false)}
						isOpen={isEmojiOpen}
						positions={["top", "right", "left", "bottom"]}
						content={() => (
							<EmojiPicker
								position={"absolute"}
								data={emojiPickerData}
								onEmojiSelect={(e: { native: string }) => {
									if (textAreaRef.current) textAreaRef.current.value += e.native;
								}}
							/>
						)}
					>
						<MessageInput
							isEmojiPickerOpen={isEmojiOpen}
							textAreaRef={textAreaRef}
							setIsEmojiPickerOpen={setIsEmojiOpen}
						/>
					</Popover>
				</div>
			</div>
		</div>
	);
}
