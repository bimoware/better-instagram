import { ReactNode, useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";

export default function HoverPopup({
	children,
	element,
}: {
	children: ReactNode;
	element: ReactNode;
}) {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	return (
		<Popover
			isOpen={isPopoverOpen}
			positions={["top", "right", "bottom", "left"]}
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={"#171717"}
					arrowSize={10}
					className="popover-arrow-container rounded-xl"
					arrowClassName="popover-arrow"
				> 
					<div className="bg-neutral-900 px-2 py-1 rounded-xl">{element}</div>
				</ArrowContainer>
			)}
		>
			<div onMouseEnter={() => setIsPopoverOpen(true)} onMouseLeave={() => setIsPopoverOpen(false)}>
				{children}
			</div>
		</Popover>
	);
}
