import { useState } from "react";
import { UserClass } from "../../scripts/Classes";
import { ArrowContainer, Popover } from "react-tiny-popover";
import Name from "./Name";

export default function GroupIcon({ users }: { users: UserClass[] }) {
	return (
		<span className="inline-flex">
				{users.map((user, i) => {
					const [isPopoverOpen, setIsPopoverOpen] = useState(false);
					return (
						<Popover
							onClickOutside={() => setIsPopoverOpen(false)}
							isOpen={isPopoverOpen}
							positions={["bottom", "top"]}
							content={({ position, childRect, popoverRect }) => (
								<ArrowContainer
									position={position}
									childRect={childRect}
									popoverRect={popoverRect}
									arrowColor={"#171717"}
									arrowSize={10}
									className="popover-arrow-container"
									arrowClassName="popover-arrow"
								>
									<Name
										className="flex !items-center rounded-full px-2 bg-neutral-900"
										type={0}
										add={user.username}
										displayName={user.displayName}
									/>
								</ArrowContainer>
							)}
						>
							<img
								key={i}
								className={`
                    w-20 scale-125
                rounded-full
                border border-neutral-950
                transition hover:-translate-x-3
                shadow-neutral-100 shadow-inner`}
								src={user.pfp}
								onMouseEnter={() => setIsPopoverOpen(true)}
								onMouseLeave={() => setIsPopoverOpen(false)}
							/>
						</Popover>
					);
				})}
			</span>
	);
}
