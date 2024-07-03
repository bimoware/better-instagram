export default function ReactionPicker({ react }: { react: Function }) {
	const emojis = ["❤️", "😹", "👍", "💀", "❌"];
	return (
		<div className="absolute h-8 flex gap-1 bg-neutral-900 p-2 items-center w-fit rounded-full">
			{emojis.map((emoji) => {
				return (
					<div
						onClick={() => react(emoji)}
						className="hover:scale-105 select-none hover:cursor-pointer"
					>
						{emoji}
					</div>
				);
			})}
		</div>
	);
}
