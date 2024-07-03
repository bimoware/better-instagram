import emojiIcon from "/icons/emoji.svg";
import arrowUpIcon from "/icons/up.svg";
export default function MessageInput() {
	return (
		<div className="bg-neutral-950 w-full rounded-3xl
        p-1 flex gap-1
        items-start min-h-8 h-fit
        focus-within:border-4
        focus-within:border-neutral-900">
			<img
				src={emojiIcon}
				className="h-5/6 m-2 transition hover:scale-90 hover:cursor-pointer select-none"
			/>
			<div
				className="focus:outline-none
                self-center
            w-full
            min-h-full
            rounded-md
            resize-none"
				contentEditable
			/>
			<img
				src={arrowUpIcon}
				className="h-5/6 m-2 transition hover:-translate-y-1 hover:cursor-pointer select-none"
			/>
		</div>
	);
}
