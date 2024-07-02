import emojiIcon from "/icons/emoji.svg";
import copyIcon from "/icons/copy.svg";
import replyIcon from "/icons/reply.svg";
import editIcon from "/icons/edit.svg";
import tuneIcon from "/icons/tune.svg";
import { MessageClass } from "../../scripts/Classes";
import { Dispatch } from "react";

export default function MessageMenu({
	message,
	setIsPopoverOpen,
}: {
	message: MessageClass;
	setIsPopoverOpen: Dispatch<boolean>;
}) {
	const menus: { category: string; btns: { name: string; icon: string; onClick?: Function }[] }[] =
		[
			{
				category: "",
				btns: [
					{
						name: "Reply",
						icon: replyIcon,
					},
					{
						name: "React",
						icon: emojiIcon,
					},
					{
						name: "Get ID",
						icon: copyIcon,
					},
				],
			},
		];
	if (message.type === 0) {
		menus.push({
			category: "Text",
			btns: [
				{
					name: "Copy",
					icon: copyIcon,
					onClick: () => {
						navigator.clipboard.writeText(message.data);
						setIsPopoverOpen(false);
					},
				},
			],
		});
		if (message.user.isSelf)
			menus[menus.length - 1].btns.push({
				name: "Edit",
				icon: editIcon,
			});
	}
	if ([1, 2].includes(message.type))
		menus.push({
			category: "Audio",
			btns: [
				{
					name: "Tune",
					icon: tuneIcon,
				},
			],
		});
	return (
		<div
			className="h-fit w-fit gap-1 p-3
        rounded-xl
        flex flex-col bg-neutral-900
		select-none"
		>
			{menus.map((menu) => {
				return (
					<>
						{menu.category ? <span className="opacity-50 pl-2 pt-2">{menu.category}</span> : <></>}
						{menu.btns.map((btn) => (
							<div
								className="flex gap-2 p-2 h-6 rounded-lg
                        items-center
                    select-none transition hover:bg-zinc-800 cursor-pointer"
								onClick={(e) => (btn.onClick || (() => {}))(e)}
							>
								<img className="h-4" src={btn.icon} />
								<span>{btn.name}</span>
							</div>
						))}
					</>
				);
			})}
		</div>
	);
}
