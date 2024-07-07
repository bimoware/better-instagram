import { NoteClass } from "../../scripts/Classes";
import Bubble from "./Bubble";

export default function Note({ note }: { note: NoteClass }) {
	return (
		<div className="mx-2 flex items-center gap-3 max-w-[30%]" data-noteid={note.id} key={note.id}>
			<img className="rounded-full w-20" src={note.user.pfp} />
			<div className="font-semibold">
				{/*  Bubbles  */}
				{["w-5 h-5 -translate-x-2 -translate-y-2", "w-3 h-3 -translate-x-5 -translate-y-2"].map(
					(className) => (
						<div className={`${className} absolute w-10 h-10 rounded-full bg-neutral-800`}></div>
					)
				)}
				<Bubble>
					{note.text} <span className="opacity-50">2m</span>
				</Bubble>
			</div>
		</div>
	);
}
