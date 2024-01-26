import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import Sidebar from "@/opencrm/components/Sidebar";

// this should satisfy the inheritance requirement
interface Props extends PropsWithChildren {
	pageTitle?: string;
}

const Layout = (props: Props) => {
	const [collapsed, setSidebarCollapsed] = useState(true);
	const [showSidebar, setShowSidebar] = useState(true);
	return (
		<div
			className={classNames({
				"grid min-h-screen": true,
				"grid-cols-sidebar": !collapsed,
				"grid-cols-sidebar-collapsed": collapsed,
				"transition-[grid-template-columns] duration-300 ease-in-out":
					true,
			})}
		>
			<Sidebar
				collapsed={collapsed}
				setCollapsed={setSidebarCollapsed}
				shown={showSidebar}
			/>
			{props.children}
		</div>
	);
};

export default Layout;
