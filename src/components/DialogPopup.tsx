import React, {
    EventHandler,
	Fragment,
	MouseEventHandler,
	ReactNode,
	useEffect,
	useState,
} from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";

type Props = {
	show: boolean;
	toggleOpen: any;
	children: ReactNode;
	onConfirm?: MouseEventHandler;
	titleText?: string;
};

export function DialogPopup({
	show,
	toggleOpen,
	titleText,
	children,
	onConfirm,
}: Props) {
	return (
		<Fragment>
			<Dialog open={show} handler={toggleOpen} placeholder={undefined}>
				<DialogHeader placeholder={undefined}>{titleText}</DialogHeader>
				<DialogBody placeholder={undefined}>{children}</DialogBody>
				<DialogFooter placeholder={undefined}>
					<Button
						variant="outlined"
						color="red"
						onClick={toggleOpen}
						className="shadow mr-1 hover:bg-red-700 hover:text-white"
						placeholder={undefined}
					>
						Cancel
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={onConfirm}
						className="shadow hover:scale-110 hover:bg-white hover:text-green"
						placeholder={undefined}
					>
						Confirm
					</Button>
				</DialogFooter>
			</Dialog>
		</Fragment>
	);
}
