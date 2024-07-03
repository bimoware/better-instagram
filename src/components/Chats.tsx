import { Dispatch } from "react";
import Chat from "./Chat";
import { ChatClass } from "../scripts/Classes";
function Chats({
	chats,
	current,
	setCurrentChat,
}: {
	setCurrentChat: Dispatch<string>;
	current?: string;
	chats: ChatClass[];
}) {
	let messageNonLus = chats.filter((chat) => !chat.seen).length;
	return (
		<div className="flex flex-col">
			<span className="opacity-50 self-center m-2">
				{messageNonLus ? messageNonLus + " unread messages" : "Messages"}
			</span>
			{chats.map((chat, i) => (
				<div onClick={() => setCurrentChat(chat.id!)} key={i}>
					<Chat chat={chat} isCurrent={Boolean(current && current === chat.id)} />
				</div>
			))}
		</div>
	);
}

export default Chats;
