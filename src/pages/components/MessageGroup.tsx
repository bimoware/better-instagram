import MessageLign from "./MessageLign";
import { MessageClass } from "../../scripts/Classes";
import Name from "./Name";

export default function MessageGroup({ messages }: { messages: MessageClass[] }) {
	console.log(messages[0]);
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
