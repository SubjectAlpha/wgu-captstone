import { Button, Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PanelPage from "@/opencms/components/panel/Page";
import { useState } from "react";
import { EmailRegex } from "@/opencms/utility/regex";
import Table from "@/opencms/components/table";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/opencms/utility/fetch";

interface Props {}

export default function AdminPanel(props: Props) {
	const router = useRouter();
	const session = useSession();
    const [errorMessage, setErrorMessage] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [reportTitle, setReportTitle] = useState("");

    const { data } = useQuery({
		queryKey: ["customersQuery"],
		queryFn: async () => {
			return await get("/api/customers");
		},
		refetchInterval: 10,
	});

    console.log(data);

	return (
		<PanelPage
			router={router}
			session={session}
			minimumAccessPermission="admin"
		>
			<div className="bg-gray-200 p-12">
                <div className="flex flex-row w-full">
                    <Input label="Employee Email" value={employeeEmail} crossOrigin={undefined} onChange={(e) => {
                        if(!EmailRegex.test(e.target.value))
                        {

                        }
                        setEmployeeEmail(e.target.value)
                    }}/>
                    <Input label="Report Title" value={reportTitle} crossOrigin={undefined} onChange={(e) => {
                        setReportTitle(e.target.value)
                    }} />
                    <Button placeholder="generate">Generate</Button>
                </div>
                <div className="flex flex-col h-full mt-4">
                    {errorMessage.length > 0 ? (
                        <p className="text-red-500 p-2 pt-0">{errorMessage}</p>
                    ) : (
                        <span />
                    )}
                    <p className="text-black">Report Title: {reportTitle}</p>
                    <p className="text-black">Customers Created This Month: </p>
                    <p className="text-black">Generation Date: </p>

                    <div className="pt-12">
                    {data.customers?.length > 0 && <Table
                        title="Customers"
                        objectList={data.customers}
                        onAddClick={undefined}
                        onRowClick={() => {}}
                    />}

                    </div>

                </div>
			</div>


		</PanelPage>
	);
}
