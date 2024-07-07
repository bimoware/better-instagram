import { Dispatch, RefObject } from "react";
import emojiIcon from "/icons/emoji.svg";
import arrowUpIcon from "/icons/up.svg";
export default function MessageInput({
	textAreaRef,
	isEmojiPickerOpen,
	setIsEmojiPickerOpen,
}: {
	textAreaRef: RefObject<HTMLTextAreaElement>;
	isEmojiPickerOpen: boolean;
	setIsEmojiPickerOpen: Dispatch<boolean>;
}) {
	return (
		<div
			className="bg-neutral-950 w-full rounded-3xl
        p-1 flex gap-1
        items-start h-fit
        border-4
        border-neutral-900
        focus-within:border-neutral-300"
		>
			<img
				onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
				src={emojiIcon}
				className="h-5/6 m-2 transition hover:scale-90 hover:cursor-pointer select-none"
			/>
			<textarea
				onClick={() => setIsEmojiPickerOpen(false)}
				ref={textAreaRef}
				className="focus:outline-none
                self-center
            bg-neutral-950
            w-full
            rounded-md
            resize-none"
				contentEditable
			/>
			<img
				onClick={() => setIsEmojiPickerOpen(false)}
				src={arrowUpIcon}
				className="h-5/6 m-2 transition hover:-translate-y-1 hover:cursor-pointer select-none"
			/>
		</div>
	);
}
