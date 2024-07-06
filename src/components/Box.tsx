import { ReactNode } from "@tanstack/react-router";

import { UserClass } from "../scripts/Classes";
import client from "../scripts/Client";
import Name from "./Name";

import gameIcon from "/icons/game.svg";
import storyIcon from "/icons/stories.svg";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { useState } from "react";

export default function Box({
	children,
	title,
	icon,
}: {
	children: ReactNode;
	title?: string;
	icon?: string;
}) {
	return (
		<div className="flex flex-col gap-1">
			<div
				className="flex w-3 gap-1 opacity-80 mx-2
            transition hover:translate-x-1"
			>
				<img src={icon} />
				<span className="font-thin text-xs">{title}</span>
			</div>
			<div
				className="bg-neutral-900
                flex px-4 py-2 h-fit
                items-center
                overflow-scroll
                rounded-3xl rounded-tl-xl"
			>
				{children}
			</div>
		</div>
	);
}

export function ActivityList() {
	return (
		<Box title="Activities" icon={gameIcon}>
			<Activity user={client.user} />
		</Box>
	);
}
export function Activity({ user }: { user: UserClass }) {
	return <>{user.username}</>;
}

export function Story({ user }: { user: UserClass }) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	return (
		<Popover
			isOpen={isPopoverOpen}
			positions={["bottom", "right"]}
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={"#171717"}
					arrowSize={10}
					className="popover-arrow-container rounded-xl"
					arrowClassName="popover-arrow"
				>
					<div className="bg-neutral-900 px-2 py-1 rounded-xl">
						<Name type={0} displayName={user.displayName} add={user.username} />
					</div>
				</ArrowContainer>
			)}
		>
			<img
				src={user.pfp}
				className="size-14 p-0.5
            transition hover:rotate-3 hover:cursor-pointer
        bg-gradient-to-br from-purple-500 to-pink-500
        rounded-full
        "
				onMouseEnter={() => setIsPopoverOpen(true)}
				onMouseLeave={() => setIsPopoverOpen(false)}
			/>
		</Popover>
	);
}
export function StoryList() {
	return (
		<Box title="Stories" icon={storyIcon}>
			<div className="flex *:shrink-0 gap-4 overflow-x-scroll">
				{client.users.map((user) => (
					<Story user={user} />
				))}
			</div>
		</Box>
	);
}
