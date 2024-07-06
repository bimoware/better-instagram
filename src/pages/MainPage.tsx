import { ActivityList, StoryList } from "../components/Box";

export default function MainPage() {
	return (
		<div className="mx-5 my-10 flex flex-col gap-4">
			<StoryList />
			<ActivityList />
		</div>
	);
}
