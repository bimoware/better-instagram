import { Dispatch } from "react";
import { ChatClass } from "../scripts/Classes";

import Name from "./Name";
import pinIcon from "/icons/pin.svg";
import groupIcon from "/icons/group.svg";

export function Chat({ chat, isCurrent }: { chat: ChatClass; isCurrent: boolean }) {
	const chatPreview = chat.lastMessage?.toIconPreview();
	return (
		<div
			data-chatid={chat.id}
			key={chat.id}
			className={`select-none
		flex items-center px-2 gap-1 w-full h-[5vw]
		transition ease-in-out
		rounded-3xl p-1 group
		${!chat.seen || isCurrent ? "bg-neutral-900" : "bg-neutral-950"}
		hover:bg-neutral-900 ${isCurrent ? "bg-neutral-900" : ""}
		hover:translate-x-3 ${isCurrent ? "translate-x-3" : ""}
		hover:cursor-pointer ${isCurrent ? "cursor-pointer" : ""}
		`}
		>
			<div className="h-full aspect-square mr-1">
				<img
					className={`rounded-3xl
						group-hover:translate-x-1 h-full
				transition`}
					src={chat.type === 0 ? chat.users[0].pfp : chat.icon || groupIcon}
				/>
			</div>
			<div className="w-4/6 overflow-hidden">
				<Name
					className="text-xl"
					type={chat.type}
					add={chat.type === 0 ? chat.users[0]?.username : undefined}
					displayName={chat.name || chat.users[0].displayName}
				/>
				{chat.lastMessage ? (
					<div
						className={`min-h-6 whitespace-nowrap text-ellipsis
				flex items-center gap-2
				${chat.seen ? "opacity-70" : "font-bold"}`}
					>
						{chatPreview?.[0] ? <img src={chatPreview[0]} /> : <></>}
						{chatPreview?.[1] ? <span>{chatPreview[1]}</span> : <></>}
					</div>
				) : (
					<></>
				)}
			</div>
			{chat.pinned ? (
				<div className="max-w-1/6 self-start mt-1 rotate-12 ml-auto">
					<img src={pinIcon} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
export default function Chats({
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
