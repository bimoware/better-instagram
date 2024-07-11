import Badge from "../../components/Badge";
import pfp from "/images/4.png";
import create from "/icons/create.svg";
export default function TestPage() {
	return (
		<Badge badge={create}>
			<img className="rounded-full size-14" src={pfp} />
		</Badge>
	);
}
