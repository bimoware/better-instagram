import Name from "./Name";
import pinIcon from "/icons/pin.svg";
import groupIcon from "/icons/group.svg";
import { ChatClass } from "../../scripts/Classes";

function Chat({ chat, isCurrent }: { chat: ChatClass; isCurrent: boolean }) {
	const chatPreview = chat.lastMessage?.toIconPreview();
	return (
		<div
			data-chatid={chat.id}
			key={chat.id}
			className={`select-none
		flex items-center px-2 gap-3 w-full h-[5vw]
		transition ease-in-out
		rounded-3xl p-1 group
		${!chat.seen || isCurrent ? "bg-neutral-900" : "bg-neutral-950"}
		hover:bg-neutral-900 ${isCurrent ? "bg-neutral-900" : ""}
		hover:translate-x-3 ${isCurrent ? "translate-x-3" : ""}
		hover:cursor-pointer ${isCurrent ? "cursor-pointer" : ""}
		`}
		>
			<div className="h-full aspect-square">
				<img
					className={`rounded-3xl
						group-hover:translate-x-1 h-full
				transition`}
					src={chat.type === 0 ? chat.users[0].pfp : chat.icon || groupIcon}
				/>
			</div>
			<div className="w-full">
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
				<div className="w-1/6 self-start mt-1 rotate-45">
					<img src={pinIcon} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default Chat;
