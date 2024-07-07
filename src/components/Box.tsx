import { ReactNode } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { useState } from "react";

import { ActivityClass, UserClass } from "../scripts/Classes";
import client from "../scripts/Client";

import Name from "./Name";
import Badge from "./Badge";

import gameIcon from "/icons/game.svg";
import storyIcon from "/icons/stories.svg";

import phoneIcon from "/icons/phone.svg";
import pcIcon from "/icons/pc.svg";
import switchIcon from "/icons/switch.svg";
import starIcon from "/icons/star.svg";
import GroupIcon from "./GroupIcon";
export default function Box({
	className,
	children,
	title,
	icon,
}: {
	children: ReactNode;
	className?: string;
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
				className={`bg-neutral-900
                px-4 py-2 h-fit
                items-center
                overflow-scroll
                rounded-3xl rounded-tl-xl
				${className}`}
			>
				{children}
			</div>
		</div>
	);
}

export function ActivityList() {
	const activities = client.activities;
	return (
		<Box title="Activities" icon={gameIcon} className="flex gap-4 overflow-y-scroll">
			{activities.map((activity) => (
				<>
					<Activity activity={activity} />
				</>
			))}
		</Box>
	);
}
export function ActivityButton({ label, type }: { label: string; type: string }) {
	let isPrimary = type === "Primary";
	return (
		<button
			className={`
				cursor-pointer group
		flex gap-1
		${isPrimary ? "bg-green-700" : "bg-neutral-800"}
		px-2 py-1 rounded-lg`}
		>
			{isPrimary ? <img className="transition group-hover:-rotate-12" src={starIcon} /> : <></>}
			{label}
		</button>
	);
}
export function Activity({ activity }: { activity: ActivityClass }) {
	return (
		<Box key={activity.id} className="bg-neutral-950 flex gap-2 w-fit *:shrink-0">
			<Badge
				badge={
					{
						pc: pcIcon,
						mobile: phoneIcon,
						switch: switchIcon,
					}[activity.device]!
				}
			>
				<img className="rounded-full" src={activity.user.pfp} />
			</Badge>
			<div>
				<div>
					<p>
						{activity.type ? <span>{activity.type}</span> : <></>}{" "}
						<span className="font-semibold">{activity.name}</span>
					</p>
					<p className="opacity-80 text-sm">
						<span>{activity.data.state}</span>
					</p>
				</div>
				{activity.data.with ? (
					<div className="flex items-center">
						<span>Avec</span>
						<div className="ml-1 flex size-4">
							<GroupIcon
								users={activity.data.with.map((id) => client.users.find((u) => u.id === id)!)}
							/>
						</div>
					</div>
				) : (
					<></>
				)}
				<div className="flex gap-1 my-2">
					{activity.data.buttons ? (
						activity.data.buttons.map((btn) => <ActivityButton {...btn} />)
					) : (
						<></>
					)}
				</div>
			</div>
		</Box>
	);
}

export function Story({ user }: { user: UserClass }) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	return (
		<Popover
			key={user.id}
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
