import SessionPage from "@/opencms/components/SessionPage";
import Table from "@/opencms/components/table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

const Index = () => {
	const session = useSession();
	const router = useRouter();

	const customers = [];

	for (let i = 0; i < 15; i++) {
		customers.push({
			name: "first last",
			company: "ACME",
			email: "first.lastlast@email.com",
			phone: "999-999-9999",
		});
	}

    const onAddClick = (e: MouseEventHandler) => {

    }

    const onRowClick = (uuid: string, e: MouseEventHandler) => {
        console.log(e);
    }

	return (
		<SessionPage router={router} session={session} className="h-full">
			<Table
				title="Customers"
				objectList={customers}
				onRowClick={onRowClick}
                onAddClick={onAddClick}
			/>
		</SessionPage>
	);
};

export default Index;
