import { NextRouter } from "next/router";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Breadcrumbs, menu } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/opencms/utility/fetch";
import { signIn } from "next-auth/react";

interface Props extends PropsWithChildren {
	className?: string;
	minimumAccessPermission: "admin";
	session: any;
	router: NextRouter;
}

const PanelPage = ({
	minimumAccessPermission,
	session,
	router,
	className,
	children,
}: Props) => {
	const path = usePathname();
	const pathFragments = path.split("/").filter((o) => o !== "");
	const [user, setUser] = useState(session?.data?.user ?? { permission: 0 });
    const [isUnderMinimumPermission, setIsUnderMinimumPermission] = useState(false);

	const { data: minimumPermission, isLoading } = useQuery({
		queryKey: ["permissionQuery"],
		queryFn: async () => {
			return await get("/api/permissions/" + minimumAccessPermission);
		},
		refetchInterval: -1,
	});

	useEffect(() => {
        console.info({
            status: session.status,
            "session data": session.data,
            "isUnderMinimumPermission": isUnderMinimumPermission,
            "user perm": user.permission,
            "minimum power level": minimumPermission?.permission.powerLevel ?? 1,
            "minimum permission obj": minimumPermission?.permission
        });

        setIsUnderMinimumPermission(user.permission < minimumPermission?.permission.powerLevel ?? 1);
		if (
			!isLoading &&
			(!session ||
				new Date(session.expires) > new Date() ||
				isUnderMinimumPermission)
		) {
            signIn();
		}
	}, [session, minimumPermission, user.permission, isLoading, isUnderMinimumPermission]);

    if(!user.permission || !minimumPermission?.permission.powerLevel){
        return <span />
    }

    if(!isLoading && session.status == "authenticated" && !isUnderMinimumPermission) {
        let fullPathFragment: string = "";
        return (
            <div
                className={
                    "flex flex-col mx-2 h-full w-full p-4 shadow" + className
                }
            >
                <Head>
                    <title>Admin Panel</title>
                    <meta
                        property="opencms:title"
                        key="title"
                        content="Admin Panel"
                    />
                </Head>
                <Breadcrumbs className="my-2" placeholder="breadcrumbs">
                    <Link href="/">opencms</Link>
                    {pathFragments.map((o, i) => {
                        fullPathFragment += "/" + o;
                        return (
                            <Link key={i + "-breadcrumb"} href={fullPathFragment}>
                                {o}
                            </Link>
                        );
                    })}
                </Breadcrumbs>

                <div className="flex flex-col w-full pr-4 h-full rounded box-shadow">
                    {children}
                </div>
            </div>
        );
    }

    return <span/>

};

export default PanelPage;
