import { ActivityList, StoryList, PostList } from "../components/Box";

export default function MainPage() {
	return (
		<div className="mx-5 my-10 flex flex-col gap-4">
			<StoryList />
			<ActivityList />
			<PostList/>
		</div>
	);
}
