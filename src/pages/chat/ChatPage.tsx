import Box from "../../components/Box.tsx";
import { MessageGroup } from "../../components/Message/MessageGroup.tsx";
import { ChatClass } from "../../scripts/Classes.ts";
import client from "../../scripts/Client.ts";
import { arrangeMessages } from "../../scripts/Util.ts";
import pinnedIcon from "/icons/pin.svg";

export default function ChatPage() {
	let { chats } = client;
	let currentSelected = chats[0];
	return (
		<div className="flex gap-2">
			<div className="w-60 flex flex-col">
				<Box title="All read 👍" icon="">
					{chats.map((chat) => (
						<Chat key={chat.id} chat={chat} />
					))}
				</Box>
			</div>
			<Box className="overflow-scroll h-full w-full">
				{arrangeMessages(currentSelected.messages).map((messageGroup, i) => (
					<MessageGroup key={i} messages={messageGroup} />
				))}
			</Box>
		</div>
	);
}

export function Chat({ chat }: { chat: ChatClass }) {
	let user = chat.users[0];
	let lastMessage = chat.lastMessage?.toIconPreview();
	return (
		<Box paddingClassName="py-1 px-0">
			<div className="flex gap-2">
				{/* PROFILE PICTURE */}
				<div className="shrink-0 w-12">
					<img className="rounded-full" src={user.pfp} />
				</div>
				{/* DATA */}
				<div className="shrink w-full overflow-hidden">
					{/* NAME */}
					<div className="flex justify-between items-center">
						<span className="font-semibold">{user.displayName}</span>
						{chat.pinned ? (
							<div>
								<img src={pinnedIcon} className="w-3 rotate-45" />
							</div>
						) : (
							<></>
						)}
					</div>
					{/* LAST MESSAGE */}
					{lastMessage ? (
						<div className="flex gap-1">
							{lastMessage[0] ? <img src={lastMessage[0]} /> : <></>}
							<span>{lastMessage[1]}</span>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</Box>
	);
}
