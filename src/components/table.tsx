import {
	UserPlusIcon,
	MagnifyingGlassIcon,
	ChevronUpDownIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import {
	Card,
	CardHeader,
	Typography,
	Button,
	CardBody,
	CardFooter,
	Input,
} from "@material-tailwind/react";
import { ChangeEventHandler, useEffect, useState } from "react";

interface Props {
	title: string;
	objectList: any[];
	onRowClick: Function | undefined;
	onAddClick: Function | undefined;
	showDefaults?: string[];
}

function Table({
	title,
	objectList,
	showDefaults,
	onRowClick,
	onAddClick,
}: Props) {
	const defaultHiddenProperties = [
		"id",
		"createdBy",
		"updatedBy",
		"createdAt",
		"updatedAt",
		"isDeleted",
	];
	// If we want to show a default value we want to create a new array from the hidden properties without the value we wish to show, else just load the defaults.
	const [hiddenProperties, setHiddenProperties] = useState(
		showDefaults && showDefaults.length > 0
			? defaultHiddenProperties.filter(
					(item) => showDefaults.indexOf(item) < 0
			  )
			: defaultHiddenProperties
	);
	const [bodyKeys, setBodyKeys] = useState( objectList.length > 0 ?
		Object.keys(objectList[0]).filter((o) => !hiddenProperties?.includes(o)) : [""]
	);
	const [displayList, setDisplayList] = useState(objectList);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		if (showDefaults) {
			setHiddenProperties(
				defaultHiddenProperties.filter(
					(item) => showDefaults.indexOf(item) < 0
				)
			);
		} else {
			setHiddenProperties(defaultHiddenProperties);
		}
	}, [showDefaults]);

	const searchFunction: ChangeEventHandler<HTMLInputElement> = (e) => {
		const val = e.target.value;
		const retList: any[] = [];

		objectList.forEach((o) => {
			bodyKeys.forEach((k) => {
                if(typeof(o[k]) == "string" && (o[k]).includes(val) && !retList.includes(o)){
                    retList.push(o);
                }

			});
		});
		setDisplayList(retList);
	};

	return (
		<Card className="h-full w-full p-2" placeholder={undefined}>
			<CardHeader
				floated={false}
				shadow={false}
				className="rounded-none"
				placeholder={undefined}
			>
				<div className="mb-8 flex items-center justify-between gap-8">
					<Typography
						variant="h5"
						color="blue-gray"
						placeholder={undefined}
					>
						{title}
					</Typography>
					<div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						{onAddClick != undefined && <Button
							className="flex items-center gap-3"
							size="sm"
							placeholder={undefined}
							onClick={() => {
								onAddClick();
							}}
						>
							<PlusIcon strokeWidth={2} className="h-4 w-4" />
						</Button>}
					</div>
				</div>
				<div className="flex flex-col items-center md:flex-row">
					<div className="w-full md:w-72">
						<Input
							label="Search"
							icon={<MagnifyingGlassIcon className="h-5 w-5" />}
							crossOrigin={undefined}
							onChange={searchFunction}
						/>
					</div>
				</div>
			</CardHeader>
			<CardBody className="overflow-scroll px-0" placeholder={undefined}>
				<table className="mt-4 w-full h-100 min-w-max table-auto text-left">
					<thead>
						<tr>
							{bodyKeys.map((head, index) => (
								<th
									key={head.toLocaleUpperCase()}
									className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
										placeholder={undefined}
									>
										{head.toLocaleUpperCase()}{" "}
										<ChevronUpDownIcon
											strokeWidth={2}
											className="h-4 w-4"
										/>
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{displayList.map((o, index) => {
							const isLast = index === objectList.length - 1;
							const classes = isLast
								? "p-4"
								: "p-4 border-b border-blue-gray-50";

							return (
								<tr
									key={o.id + "-row"}
									className="hover:bg-gray-200"
									onClick={(e) => {
                                        if(onRowClick != undefined){
                                            onRowClick(o.id, e);
                                        }
									}}
								>
									{bodyKeys.map((x, c) => {
										return (
											<td
												key={o + x + "-cell"}
												className={classes}
											>
												<Typography
													variant="small"
													color="blue-gray"
													className="font-normal"
													placeholder={undefined}
												>
													{o[x]}
												</Typography>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</CardBody>
		</Card>
	);
}

export default Table;
