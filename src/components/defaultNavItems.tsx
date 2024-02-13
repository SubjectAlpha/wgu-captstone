import React from "react";
import {
	CogIcon,
	FolderIcon,
	HomeIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
// define a NavItem prop
export type NavItem = {
	label: string;
	href: string;
	icon: React.ReactNode;
};
export const defaultNavItems: NavItem[] = [
	{
		label: "Dashboard",
		href: "/",
		icon: <HomeIcon className="w-6 h-6" />,
	},
	{
		label: "Customers",
		href: "/customers",
		icon: <UserGroupIcon className="w-6 h-6" />,
	},
	{
		label: "Projects",
		href: "/projects",
		icon: <FolderIcon className="w-6 h-6" />,
	},
	{
		label: "Application Settings",
		href: "/panel",
		icon: <CogIcon className="w-6 h-6" />,
	},
];
