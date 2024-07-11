import { ReactNode } from "@tanstack/react-router";
import create from "/icons/create.svg";

interface SnapProps {
	pfp: string;
	self?: boolean;
	close?: boolean;
}
export default function Snap({ pfp, self = false, close = false }: SnapProps) {
	return self ? (
		<Badge badge={create}>
			<ImageSnap {...{pfp, self, close}} />
		</Badge>
	) : (
		<ImageSnap {...{pfp, self, close}} />
	);
}

function ImageSnap({ self, pfp, close }: SnapProps) {
	return (
		<img
			className={`rounded-full p-0.5 bg-gradient-to-br w-16
                ${
                    self
					? "from-blue-600 to-cyan-600"
					: close
						? "from-green-600 to-teal-600"
						: "from-red-600 to-purple-600"
				}`}
			src={pfp}
		/>
	);
}

export function Badge({ children, badge }: { children: ReactNode; badge: string }) {
	return (
		<div className="relative w-fit">
			{children}
			<div className="absolute bottom-0 right-0 rounded-full bg-cyan-600 p-[1px]
            transition hover:translate-y-1 hover:cursor-pointer">
				<img src={badge} />
			</div>
		</div>
	);
}
