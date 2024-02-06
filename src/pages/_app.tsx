import "@/opencms/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { ThemeProvider } from "@material-tailwind/react";
import Head from "next/head";

const queryClient = new QueryClient();

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<Layout>
						<Head>
							<title>OpenCMS</title>
							<meta
								property="opencms:title"
								content="OpenCMS"
								key="title"
							/>
						</Head>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}
