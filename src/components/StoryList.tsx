import { UserClass } from "../scripts/Classes";
import client from "../scripts/Client";
import Name from "./Name";

function Story({ user }: { user: UserClass }) {
	return (
		<img
			src={user.pfp}
			className="my-4 mx-1
            h-14 p-0.5
            transition hover:-translate-y-1 hover:cursor-pointer
        bg-gradient-to-r from-purple-500 to-pink-500
        rounded-full
        "
		/>
	);
}
export default function StoryList() {
	return (
		<>
			<Name type={1} add={"Stories"} />
			<div
				className="bg-neutral-900
    flex px-4
    h-fit
    items-center
    overflow-x-scroll
    rounded-3xl"
			>
				<Story user={client.user} />
			</div>
		</>
	);
}
