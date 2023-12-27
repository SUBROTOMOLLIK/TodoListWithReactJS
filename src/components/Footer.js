import React, { useEffect, useState } from "react";
import Api from "../api/posts";

const Footer = ({items, setItem , updateColorItem }) => {
	const [leftTask, setLeftTask] = useState("");
	const [colorGreen, setColorGreen] = useState("");
	const [colorRed, setColorRed] = useState("");
	const [colorYellow, setColorYellow] = useState("");

	// handle all item
	const handleAllItem = async () => {
		try {
			const response = await Api.get("/items");
			if (response.status === 200) {
				setItem(response.data);
			} else {
				console.log("Error: data  is not updated");
			}
		} catch (error) {
			console.log(`Error:${error.message}`);
		}
	};

	const handleAllUncheckedItem = async () => {
		const response = await Api.get("/items");
		const itemList = response.data.filter((item) => item.checked !== true);
		setItem(itemList);
	};

	const handleAllCheckedItem = async () => {
		const response = await Api.get("/items");
		const itemList = response.data.filter((item) => item.checked !== false);
		setItem(itemList);
	};

	// handle incomplete item
	const total = async () => {
		const response = await Api.get("/items");
		const itemList = response.data.filter((item) => item.checked !== true);
		setLeftTask(itemList.length);
	};
	total();

	// sorting According to colors
	// sort green color
	const checkSortGreenColor = () => {
		const valueData = colorGreen === "green" ? " " : "green";
		setColorGreen(valueData);
	};
	// sort green color
	const checkSortRedColor = () => {
		const valueData = colorRed === "red" ? " " : "red";
		setColorRed(valueData);
	};
	// sort green color
	const checkSortYellowColor = () => {
		const valueData = colorYellow === "yellow" ? " " : "yellow";
		setColorYellow(valueData);
	};

	// set color value in array variable
	const colorData = [
		colorGreen,
		colorYellow,
		colorRed,
	];


	const sortColorData = async () => {
		try {
			const response = await Api.get("/items");
			const filteredItems = response.data.filter((item) =>
				colorData.includes(item.color)
			);
			
			if (filteredItems.length === 0) {

				setItem(response.data);

			}else{

				setItem(filteredItems);
			}
			
		} catch (error) {
			console.error("Error fetching or filtering items:", error);
		}
	};

	useEffect(() => {
		sortColorData();
	}, [updateColorItem,colorGreen, colorRed, colorYellow]);



	return (
		<div className="mt-4 flex justify-between text-xs text-gray-500">
			<p>
				<strong>{leftTask}</strong> tasks left
			</p>
			<ul className="flex space-x-1 items-center  text-xs">
				<li
					className="cursor-pointer md:hover:text-red-600 font-bold"
					onClick={handleAllItem}
				>
					All
				</li>
				<li>|</li>
				<li
					className="cursor-pointer md:hover:text-red-600"
					onClick={handleAllUncheckedItem}
				>
					Incomplete
				</li>
				<li>|</li>
				<li
					className="cursor-pointer md:hover:text-red-600"
					onClick={handleAllCheckedItem}
				>
					Complete
				</li>
				<li></li>
				<li></li>
				<li
					onClick={checkSortGreenColor}
					className={`h-3 w-3 border-2 border-green-500 md:hover:bg-green-500 rounded-full cursor-pointer ${
						colorGreen === "green" ? "bg-green-500" : ""
					}`}
				></li>
				<li
					onClick={checkSortYellowColor}
					className={`h-3 w-3 border-2 border-yellow-500 md:hover:bg-yellow-500 rounded-full cursor-pointer ${
						colorYellow === "yellow" ? "bg-yellow-500" : ""
					}`}
				></li>
				<li
					onClick={checkSortRedColor}
					className={`h-3 w-3 border-2 border-red-500 md:hover:bg-red-500 rounded-full cursor-pointer ${
						colorRed === "red" ? "bg-red-500" : ""
					}`}
				></li>
			</ul>
		</div>
	);
};

export default Footer;
