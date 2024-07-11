import personIcon from "/icons/person.svg";
import shareIcon from "/icons/share.svg";
import privacyIcon from "/icons/lock.svg";
import notificationIcon from "/icons/notification_filled.svg";
import shieldIcon from "/icons/shield.svg";
import helpIcon from "/icons/help.svg";
export default function SettingsPage() {
	const settings = [
		{
			label: "Profile",
			icon: personIcon,
		},
		{
			label: "Connexions",
			icon: shareIcon,
		},
		{
			label: "Privacy",
			icon: privacyIcon,
		},
		{
			label: "Notifications",
			icon: notificationIcon,
		},
		{
			label: "Security",
			icon: shieldIcon,
		},
		{
			label: "Help & Support",
			icon: helpIcon,
		},
	];
	return (
		<div
			className="bg-neutral-900 rounded-xl m-4
        flex flex-col gap-1
        select-none"
		>
			{settings.map((setting) => (
				<div className="flex rounded-md py-1 px-2 gap-1
                transition hover:translate-x-2 hover:cursor-pointer">
					<img src={setting.icon} />
					<span>{setting.label}</span>
				</div>
			))}
		</div>
	);
}
