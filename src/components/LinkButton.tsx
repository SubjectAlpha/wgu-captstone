import Link from "next/link";
import { MouseEventHandler } from "react";

type props = {
	children: React.ReactNode;
	href?: string;
	className?: string;
	onClick?: MouseEventHandler;
};

export default function LinkButton(props: props) {
	return (
		<Link
			className={
				`
                w-64
                align-middle
                select-none
                font-sans
                font-bold
                text-center
                uppercase
                transition-all
                text-xs
                text-white
                py-3
                px-6
                rounded-lg
                bg-gray-900
                shadow-md
                shadow-gray-900/10
                disabled:opacity-50
                disabled:shadow-none
                disabled:pointer-events-none
                hover:shadow-lg
                hover:shadow-gray-900/20
                focus:opacity-[0.85]
                focus:shadow-none
                active:opacity-[0.85]
                active:shadow-none ` + props.className
			}
			href={props.href ?? ""}
			onClick={props.onClick}
		>
			{props.children}
		</Link>
	);
}
