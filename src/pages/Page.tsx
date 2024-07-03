import client from "../scripts/Client.ts";
import Chats from "./components/Chats";
import { useState } from "react";
import { arrangeMessages } from "../scripts/Util.ts";
import MessageGroup from "./components/MessageGroup.tsx";
import Note from "./components/Note.tsx";
import UserIntro from "./components/UserIntro.tsx";

export default function TestPage() {
	const [currentChatId, setCurrentChatId] = useState(
		Array.from(client.chats.values()).shift()?.id!
	);
	const currentChat = client.chats.find((chat) => chat.id === currentChatId)!;
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
				<div className="w-full overflow-auto panel">
					{currentChat.type === 0 ? <UserIntro user={currentChat.users[0]} /> : <></>}
					{arrangeMessages(currentChat.messages).map((msgs, i) => (
						<div key={i}>
							<MessageGroup messages={msgs} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
