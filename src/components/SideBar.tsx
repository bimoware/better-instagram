import { ArrowContainer, Popover } from "react-tiny-popover";
import { JSX, useState } from "react";

import client from "../scripts/Client";

import homeIcon from "/icons/home.svg";
import inboxIcon from "/icons/inbox.svg";
import compassIcon from "/icons/compass.svg";
import statsIcon from "/icons/stats.svg";
import settingsIcon from "/icons/settings.svg";
import notificationIcon from "/icons/notification.svg";

import Name from "./Name";

function IconBox({ link }: { link: any }) {
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
hover:bg-neutral-400 hover:bg-opacity-5 rounded-2xl group
${link.id === "user" ? "" : "m-1"}`}
			>
				<img
					className="w-full p-3
group-hover:scale-110 transition rounded-full"
					src={link.icon}
				/>
			</div>
		</Popover>
	);
}

function NotificationArea(){
	return <span>No notifications</span>
}

export default function SideBar() {
	let linkGroups = [
		[
			{ icon: homeIcon, label: "Home", href: "/" },
			{ icon: notificationIcon, label: "Notifications", href: "/notifications" },
			{ icon: inboxIcon, label: "Inbox", href: "/chat" },
			{ icon: compassIcon, label: "Discover", href: "/discover" },
		],
		[
			{ icon: statsIcon, label: "My statistics", href: "/stats/" },
			{
				icon: client.user.pfp,
				// label: "My profile",
				label: <Name displayName={client.user.displayName} add={client.user.username} />,
				href: `/user/${client.user.id}`,
				id: "user",
			},
			{ icon: settingsIcon, label: "Settings", href: "/settings" },
		],
	];
	return (
		<div
			className="h-screen w-16 pt-10 pb-2
        bg-neutral-900
		flex flex-col justify-between"
		>
			{linkGroups.map((linkGroup, i) => (
				<div key={i} className="flex flex-col">
					{linkGroup.map((link, i) => (
						<div key={i}>
								<a href={link.href}>
									<IconBox link={link} />
								</a>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
