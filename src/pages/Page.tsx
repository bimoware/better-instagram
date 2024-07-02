import client from "../scripts/Client.ts";
import Chats from "./components/Chats";
import { useState } from "react";
import { messagesToMessageGroups } from "../scripts/Util.ts";
import MessageGroup from "./components/MessageGroup.tsx";
import Note from "./components/Note.tsx";

export default function TestPage() {
	const [currentChat, setCurrentChat] = useState(Array.from(client.chats.values()).shift()?.id!);
	return (
		<div className="h-screen">
			<div className="flex h-1/6 panel gap-2">
			{client.notes.map(note => <Note note={note}/>)}
			</div>
			<div className="flex h-5/6">
				<div className="w-96 overflow-y-scroll overflow-x-hidden panel">
					<Chats
						setCurrentChat={setCurrentChat}
						current={currentChat}
						chats={Array.from(client.chats.values())}
					/>
				</div>
				<div className="w-full overflow-auto panel">
					{messagesToMessageGroups(client.chats.find(chat => chat.id === currentChat)!?.messages).map((msgs, i) => (
						<div key={i}>
							<MessageGroup messages={msgs} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
