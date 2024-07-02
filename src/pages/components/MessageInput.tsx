import smile from "/icons/smile.svg";
import smile2 from "/icons/smile-2.svg";
import send from "/icons/send.svg";

import { useState } from "react";

export default function MessageInput() {
	const [isEmojiHovered, setEmojiHover] = useState(false);
	const [canSend, setCanSend] = useState(false);
	const [text, setText] = useState("");
	const [inputFocused, setInputFocus] = useState(false);

	return (
		<div
			className={`hover:cursor-not-allowed
				p-2 rounded-full gap-3 border-2
			${inputFocused ? "border-neutral-900" : "border-transparent"}
		w-full h-10 flex`}
		>
			<img
				src={isEmojiHovered ? smile2 : smile}
				className="hover:cursor-not-allowed
				w-1/12 transition cursor-pointer
        hover:scale-110 hover:-translate-y-1 hover:-rotate-6"
				onMouseEnter={() => setEmojiHover(true)}
				onMouseLeave={() => setEmojiHover(false)}
			/>
			<input
				disabled
				value={text}
				onBlur={() => setInputFocus(false)}
				onFocus={() => setInputFocus(true)}
				onChange={(ev) => {
					if (ev.currentTarget.value === "") setCanSend(false);
					setText(ev.currentTarget.value);
				}}
				className="text-xl text-nowrap leading-4
                align-items w-full
				hover:cursor-not-allowed
            focus:outline-none resize-none bg-inherit "
			/>
			<img
				src={send}
				data-enabled={canSend}
				className="w-1/12 transition opacity-
        hover:translate-x-1
		hover:cursor-not-allowed
		hover:-rotate-[45deg]
        text-blue-100
        -data-[enabled]:cursor-pointer
		data-[enabled]:opacity-100"
			/>
		</div>
	);
}
