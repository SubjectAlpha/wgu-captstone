import { NextRouter } from "next/router";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	className?: string;
	session: any;
	router: NextRouter;
}

const SessionPage = ({ session, router, className, children }: Props) => {
	if (!session || (session && session.status === "unauthenticated")) {
		router.push("/auth/signIn");
	}

	if (session && session.status !== "loading") {
		return (
			<div className={"container mx-auto w-full" + className}>
				<div className="flex flex-col items-center rounded box-shadow p-5">
					{children}
				</div>
			</div>
		);
	}
};

export default SessionPage;
