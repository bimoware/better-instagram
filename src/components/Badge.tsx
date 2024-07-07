import { ReactNode } from "react";

export default function Badge({ children, badge }: { children: ReactNode; badge: string }) {
	return (
		<div className="relative *:absolute size-24 *:size-24">
			<div>{children}</div>
			<div className="grid transition hover:translate-y-2">
				<img className="self-end justify-self-end" src={badge} />
			</div>
		</div>
	);
}
