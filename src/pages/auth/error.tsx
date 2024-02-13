"use client"; // Error components must be Client Components

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const searchParams = useSearchParams();

	const error = searchParams.get("error");

	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Something went wrong!</h2>
			<h2>{error}</h2>
		</div>
	);
}
