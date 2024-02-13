import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();
	return <p>UUID: {router.query.id}</p>;
}
