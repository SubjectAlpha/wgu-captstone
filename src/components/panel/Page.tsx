import { NextRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { useQueries, useQuery } from "@tanstack/react-query";
import { get } from "@/opencms/utility/fetch";
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

	const { data, isLoading } = useQuery({
        queryKey: ["findSingleUser"],
        queryFn: async () => {
            return await get("/api/users/" + session.data.user.id);
        },
        refetchInterval: 10,
    });

    if(!isLoading && session.status == "authenticated" && data?.user?.permission == minimumAccessPermission) {
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
