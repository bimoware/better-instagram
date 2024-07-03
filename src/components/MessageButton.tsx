import { useState } from "react";
import check from "/icons/check.svg";
interface Props {
	type: number;
	title: string;
	icon: string;
	onClick: Function
}
export default function MessageButton({ type, title, icon, onClick }: Props) {
	const [enabled, setEnabled] = useState(true)
	return (
		<img
			src={!enabled && type == 0 ? check : icon}
			data-type={type}
			title={title}
			data-enabled={enabled}
			className="invisible group-hover:visible
			select-none h-4
	opacity-50 data-[enabled=true]:opacity-80 hover:opacity-100
	data-[enabled=true]:cursor-pointer
	w-4 transition hover:scale-110"
			onClick={(ev) => onClick(ev,setEnabled)}
		/>
	);
}