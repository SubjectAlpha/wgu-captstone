import { NextRouter } from "next/router";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Breadcrumbs, menu } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "@/opencms/utility/fetch";
import { signIn } from "next-auth/react";
import { Users } from "@prisma/client";
import { Session } from "next-auth";

interface Props extends PropsWithChildren {
	className?: string;
	minimumAccessPermission: "admin";
	session: Session | any;
	router: NextRouter;
}

const PanelPage = ({
	minimumAccessPermission,
	session,
	className,
	children,
}: Props) => {
	const path = usePathname();
	const pathFragments = path.split("/").filter((o) => o !== "");
	const [isUnderMinimumPermission, setIsUnderMinimumPermission] = useState(false);

	const [ permissionQuery, userQuery ] = useQueries({
        queries: [
            {
                queryKey: ["permissionQuery"],
                queryFn: async () => {
                    return await get("/api/permissions/" + minimumAccessPermission);
                },
                refetchInterval: -1,
            },
            {
                queryKey: ["findSingleUser"],
                queryFn: async () => {
                    console.log("executing bullshit", session.data.user.id);
                    return await get("/api/users/" + session.data.user.id);
                },
                refetchInterval: -1,
            }
        ]
    });

	useEffect(() => {
        setIsUnderMinimumPermission(userQuery.data?.user.permission < permissionQuery.data?.permission.powerLevel ?? 1);
		if (
			(!userQuery.isLoading || !permissionQuery.isLoading) &&
			(!session ||
				new Date(session.expires) > new Date() ||
				isUnderMinimumPermission)
		) {
            signIn();
		}
	}, [session, isUnderMinimumPermission, userQuery.data?.permission, userQuery.isLoading, permissionQuery.data?.permission, permissionQuery.isLoading, userQuery.data]);

    if((!userQuery.isLoading || !permissionQuery.isLoading) && session.status == "authenticated" && !isUnderMinimumPermission) {
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
