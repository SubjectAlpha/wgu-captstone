import Image from "next/image";
import { Inter } from "next/font/google";
import { Typography } from "@material-tailwind/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<h1 className="text-5xl block font-semibold leading-tight text-black">OpenCMS</h1>

            OpenCMS is your premier Customer Management System. To get started, please log in using the buttons in the sidebar.
		</main>
	);
}
