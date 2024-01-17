import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { defaultNavItems, NavItem } from "./defaultNavItems";
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import LinkButton from "./LinkButton";

type Props = {
	collapsed: boolean;
	navItems?: NavItem[];
	setCollapsed(collapsed: boolean): void;
	shown: boolean;
};
const Sidebar = ({
	collapsed,
	navItems = defaultNavItems,
	shown,
	setCollapsed,
}: Props) => {
	const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
	const { status: sessionStatus, data: token } = useSession();
	return (
		<div
			className={classNames({
				"bg-slate-700 text-zinc-50 fixed md:static md:translate-x-0 z-999 border-r border-r-slate-800":
					true,
				"transition-all duration-300 ease-in-out": true,
				"w-[300px]": !collapsed,
				"w-16": collapsed,
				"-translate-x-full": !shown,
			})}
		>
			<div
				className={classNames({
					"flex flex-col justify-between h-screen sticky inset-0 w-full":
						true,
				})}
			>
				{/* logo and collapse button */}
				<div
					className={classNames({
						"flex items-center transition-none": true,
						"p-4 justify-between": !collapsed,
						"py-4 justify-center": collapsed,
					})}
				>
					{!collapsed && (
						<span className="whitespace-nowrap">Open CRM</span>
					)}
					<button
						className="grid place-content-center hover:bg-gray-900 w-10 h-10 rounded-full opacity-0 md:opacity-100"
						onClick={() => setCollapsed(!collapsed)}
					>
						<Icon className="w-5 h-5" />
					</button>
				</div>
				<nav className="flex-grow">
					<ul
						className={classNames({
							"my-2 flex flex-col gap-2 items-stretch": true,
						})}
					>
						{navItems.map((item, index) => {
							return (
								<li
									key={index}
									className={classNames({
										"text-white hover:bg-gray-900 flex":
											true, //colors
										"transition-colors duration-300": true, //animation
										"rounded-md p-2 mx-3 gap-4 ":
											!collapsed,
										"rounded-full p-2 mx-3 w-10 h-10":
											collapsed,
									})}
								>
									<Link
										href={item.href}
										className="flex gap-2"
									>
										{item.icon}{" "}
										<span>{!collapsed && item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
				<div
					className={classNames({
						"grid place-content-stretch p-2 ": true,
					})}
				>
					<div className="overflow-hidden">
						{!collapsed && sessionStatus == "authenticated" && (
							<div className="flex flex-col items-center rounded bg-gray-900/50 uppercase box-shadow">
								<Link
									className="text-white my-3 hover:text-2xl hover:text-indigo-300"
									href={"/user/" + token?.user?.id}
								>
									{token?.user?.name}
								</Link>
								<LinkButton
									className="mb-6"
									onClick={() => signOut()}
								>
									Sign Out
								</LinkButton>
							</div>
						)}
						{!collapsed && sessionStatus != "authenticated" && (
							<div className="flex flex-col items-center rounded bg-gray-900/50 box-shadow">
								<LinkButton
									className="my-3"
									href={"/auth/signIn"}
								>
									Sign In
								</LinkButton>
								<LinkButton
									className="mb-3 !bg-gray-600"
									href={"/auth/register"}
								>
									Sign Up
								</LinkButton>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Sidebar;
