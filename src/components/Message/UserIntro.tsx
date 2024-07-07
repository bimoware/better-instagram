import { UserClass } from "../../scripts/Classes";
import GroupIcon from "../GroupIcon";
import Name from "../Name";

export default function UserIntro({ user }: { user: UserClass }) {
	return (
		<div className="flex justify-center flex-col w-full">
			<img src={user.pfp} className="w-1/12 rounded-full self-center" />
			<Name type={0} displayName={user.displayName} className="text-4xl  self-center" />
			<span className="self-center flex-row gap-2 items-center">
				{user.followerIds.length} followers:
			</span>
			<div className="self-center mt-2">
				<GroupIcon users={user.followers} />
			</div>
		</div>
	);
}
