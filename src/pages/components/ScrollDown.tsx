import downIcon from "/icons/down.svg";
export default function ScrollDown({ scroll }: { scroll: Function }) {
	return (
		<img
			className="self-center
    rounded-full
    border-2 border-neutral-500 opacity-50
    sticky
    bottom-0
    w-10 animate-bounce hover:cursor-pointer select-none
    shadow-neutral-600 shadow-lg"
			src={downIcon}
            onClick={() => scroll()}
		/>
	);
}
