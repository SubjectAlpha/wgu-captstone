import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PanelPage from "@/opencms/components/panel/Page";
import { useState } from "react";
import { EmailRegex } from "@/opencms/utility/regex";
import Table from "@/opencms/components/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get } from "@/opencms/utility/fetch";
import { Users } from "@prisma/client";

interface Props {}

export default function AdminPanel(props: Props) {
	const router = useRouter();
	const session = useSession();
    const [errorMessage, setErrorMessage] = useState("");
    const [reportTitle, setReportTitle] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const [displayTitle, setDisplayTitle] = useState("");
    const [generationDate, setGenerationDate] = useState("")
    const [customerCount, setCustomerCount] = useState("")

    const { data } = useQuery({
        queryKey: ["getAllUsers"],
        queryFn: async () => {
            return await get("/api/users");
        }
    })

    const getCustomersMutation = useMutation({
		mutationKey: ["customersQuery"],
		mutationFn: async (creatorId: string) => {
            const res = await get("/api/customers/reports/" + creatorId);
            setCustomerCount(res?.customers?.length ?? 0)
			return res;
		}
	});

	return (
		<PanelPage
			router={router}
			session={session}
			minimumAccessPermission="admin"
		>
			<div className="bg-gray-200 p-12">
                <div className="flex flex-row w-full">
                    <Select
							placeholder={undefined}
							onChange={(v) => {
                                setSelectedUser(v ?? "");
                            }}
							value={selectedUser}
						>
							{data?.users ? (
								data?.users.map((u: Users) => {
									return (
										<Option
											key={u.id}
											value={u.id}
										>
											{u.name}
										</Option>
									);
								})
							) : (
								<Option value="-1">Permission</Option>
							)}
						</Select>
                    <Input className="w-1/2" label="Report Title" value={reportTitle} crossOrigin={undefined} onChange={(e) => {
                        setReportTitle(e.target.value)
                    }} />
                    <Button placeholder="generate" onClick={() => {
                        if(reportTitle.length > 0)
                        {
                            setDisplayTitle(reportTitle);
                            setGenerationDate(new Date().toLocaleString())
                            setErrorMessage("");
                            getCustomersMutation.mutate(selectedUser);
                        } else {
                            setErrorMessage("You must enter a report title")
                        }

                    }}>Generate</Button>
                </div>
                <div className="flex flex-col h-full mt-4">
                    {errorMessage.length > 0 ? (
                        <p className="text-red-500 p-2 pt-0">{errorMessage}</p>
                    ) : (
                        <span />
                    )}
                    <p className="text-black">Report Title: {displayTitle}</p>
                    <p className="text-black">Customers Created This Month: {customerCount}</p>
                    <p className="text-black">Generation Date: {generationDate}</p>
                    <p className="text-black">Viewing clients for: {selectedUser}</p>

                    <div className="pt-12">
                    {getCustomersMutation?.data?.customers?.length > 0 && <Table
                        title="Customers"
                        objectList={getCustomersMutation?.data?.customers}
                        onAddClick={undefined}
                        onRowClick={undefined}
                        showDefaults={["createdAt", "updatedAt"]}
                    />}

                    </div>

                </div>
			</div>


		</PanelPage>
	);
}
