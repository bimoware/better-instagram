import { ArrowContainer, Popover } from "react-tiny-popover";
import { useState } from "react";

import client from "../scripts/Client";

import homeIcon from "/icons/home.svg";
import homeFilledIcon from "/icons/home_filled.svg";
import inboxIcon from "/icons/inbox.svg";
import inboxFilledIcon from "/icons/inbox_filled.svg";
import compassIcon from "/icons/compass.svg";
import compassFilledIcon from "/icons/compass_filled.svg";
import statsIcon from "/icons/stats.svg";
import settingsIcon from "/icons/settings.svg";
import notificationIcon from "/icons/notification.svg";
import notificationFilledIcon from "/icons/notification_filled.svg";
import installIcon from "/icons/download_pc.svg";
import Name from "./Name";

const linkGroups = [
	[
		{
			icons: {
				filled: homeFilledIcon,
				outline: homeIcon,
			},
			label: "Home",
			href: "/",
		},
		{
			icons: { filled: notificationFilledIcon, outline: notificationIcon },
			label: "Notifications",
			href: "/notifications",
		},
		{ icons: { filled: inboxFilledIcon, outline: inboxIcon }, label: "Inbox", href: "/chat" },
		{
			icons: {
				filled: compassFilledIcon,
				outline: compassIcon,
			},
			label: "Discover",
			href: "/discover",
		},
		{ icons: { filled: installIcon, outline: installIcon }, label: "Install App", href: "/" },
	],
	[
		{ icons: { filled: statsIcon, outline: statsIcon }, label: "My statistics", href: "/stats" },
		{
			icons: { filled: client.user.pfp, outline: client.user.pfp },
			label: <Name displayName={client.user.displayName} add={client.user.username} />,
			href: `user/${client.user.id}`,
			id: "user",
		},
		{
			icons: { filled: settingsIcon, outline: settingsIcon },
			label: "Settings",
			href: "/settings",
		},
	],
];

function IconBox({ link, path }: { link: any; path: string }) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	return (
		<Popover
			isOpen={isPopoverOpen}
			positions={["right"]}
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={"#171717"}
					arrowSize={10}
					className="popover-arrow-container"
					arrowClassName="popover-arrow translate-x-2"
				>
					<div className="px-3 py-2 rounded-xl bg-neutral-900 translate-x-2">{link.label}</div>
				</ArrowContainer>
			)}
		>
			<div
				onMouseEnter={() => setIsPopoverOpen(true)}
				onMouseLeave={() => setIsPopoverOpen(false)}
				className={`transition hover:cursor-pointer
					select-none
hover:bg-neutral-400 hover:bg-opacity-5 rounded-2xl group
${link.id === "user" ? "" : "m-1"}`}
			>
				<img
					className="w-full p-2
					group-hover:scale-110 transition rounded-full"
					src={link.icons[path === link.href ? "filled" : "outline"]}
				/>
			</div>
		</Popover>
	);
}

export default function SideBar() {
	let path = window.location.pathname;
	return (
		<div
			className="h-screen w-14 flex-none
			pt-10 pb-2
        bg-neutral-900
		flex flex-col justify-between"
		>
			{/* linkGroup = [topIcons, bottomIcons] */}
			{linkGroups.map((linkGroup, i) => (
				<div key={i} className="flex flex-col">
					{/* linkGroup = [icon1, icon2, icon3] */}
					{linkGroup.map((link, i) => (
						<div key={i}>
							<a href={link.href}>
								<IconBox link={link} path={path} />
							</a>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
