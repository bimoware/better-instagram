import Badge from "../../components/Badge";
import pfp from "/images/1.png";
import badge from "/icons/phone.svg";
export default function TestPage() {
	return (
		<Badge badge={badge}>
			<img className="rounded-full" src={pfp} />
		</Badge>
	);
}
