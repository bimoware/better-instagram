import Box from "../components/Box";
import Snap from "../components/Snap";

import storiesIcon from "/icons/stories.svg";
import pfp4 from "/images/4.png";
import pfp5 from "/images/5.png";

export default function MainPage() {
	return (
		<div className="flex flex-col gap-1">
			<Box icon={storiesIcon} title="Snaps" className="flex gap-3">
				<Snap pfp={pfp4} self={true}/>
				<Snap pfp={pfp5}/>
			</Box>
			<Box title="Posts">...</Box>
		</div>
	);
}
