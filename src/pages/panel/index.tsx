import { Card } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import PanelPage from "@/opencms/components/panel/Page";

interface Props {}

export default function AdminPanel(props: Props) {
	const router = useRouter();
	const session = useSession();

	return (
		<PanelPage
			router={router}
			session={session}
			minimumAccessPermission="admin"
		>
			<div className="flex flex-row bg-gray-900 items-stretch">
				<Card
					placeholder={undefined}
					className="w-48 h-48 p-5 text-center m-4"
				>
					<Link href="/panel/users" className="w-full h-full">
						Users
					</Link>
				</Card>
				<Card
					placeholder={undefined}
					className="w-48 h-48 p-5 text-center m-4"
				>
					<Link href="" className="w-full h-full">
						Misc
					</Link>
				</Card>
				<Card
					placeholder={undefined}
					className="w-48 h-48 p-5 text-center m-4"
				>
					<Link href="" className="w-full h-full">
						System Settings
					</Link>
				</Card>
			</div>
		</PanelPage>
	);
}
