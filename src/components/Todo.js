import React from "react";
import Api from "../api/posts";
import CancelImg from "../assets/images/cancel.png";
import EditImg from "../assets/images/edit.png";

const Todo = ({ items, setItem, handleDelete, handleEdit, handleChecked }) => {
	// Set Green Color
	const handelColorGreen = async (id, checked, item) => {
		const updateColorItem = {
			id: id,
			checked: checked,
			item: item,
			color: "green",
		};

		try {
			await Api.put(`/items/${id}`, updateColorItem);

			const getData = await Api.get("/items");

			if (getData.status === 200) {
				setItem(getData.data);
			} else {
				console.log("Error: data  is not updated");
			}
		} catch (error) {
			console.log(`Error:${Response.message}`);
		}
	};

	// Set Yellow Color
	const handelColorYellow = async (id, checked, item) => {
		const updateColorItem = {
			id: id,
			checked: checked,
			item: item,
			color: "yellow",
		};

		try {
			await Api.put(`/items/${id}`, updateColorItem);

			const getData = await Api.get("/items");

			if (getData.status === 200) {
				setItem(getData.data);
			} else {
				console.log("Error: data  is not updated");
			}
		} catch (error) {
			console.log(`Error:${Response.message}`);
		}
	};

	// Set Red Color
	const handelColorRed = async (id, checked, item) => {
		const updateColorItem = {
			id: id,
			checked: checked,
			item: item,
			color: "red",
		};

		try {
			await Api.put(`/items/${id}`, updateColorItem);

			const getData = await Api.get("/items");

			if (getData.status === 200) {
				setItem(getData.data);
			} else {
				console.log("Error: data  is not updated");
			}
		} catch (error) {
			console.log(`Error:${Response.message}`);
		}
	};

	return (
		<>
			{items &&
				items.map((item) => {
					return (
						<div
							key={item.id}
							className="flex justify-start items-center p-2  hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0"
						>
							<div
								onClick={() => handleChecked(item.id)}
								className={`" ${
									item.checked ? "border-green-500 " : ""
								} rounded-full bg-white border-2  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 cursor-pointer"`}
							>
								<input
									type="checkbox"
									className="opacity-0 absolute rounded-full"
								/>
								<svg
									className={`" ${
										item.checked ? "" : "hidden"
									}  fill-current w-3 h-3 text-green-500 pointer-events-none"`}
									viewBox="0 0 20 20"
								>
									<path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
								</svg>
							</div>

							<div className="select-none flex-1">{item.item}</div>

							<div
								onClick={() =>
									handelColorGreen(item.id, item.checked, item.item)
								}
								className={`"flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-green-500 ${
									item.color === "green" ? "bg-green-500" : ""
								} hover:bg-green-500  "`}
							></div>

							<div
								onClick={() =>
									handelColorYellow(item.id, item.checked, item.item)
								}
								className={`"flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-yellow-500 ${
									item.color === "yellow" ? "bg-yellow-500" : ""
								} hover:bg-yellow-500"`}
							></div>

							<div
								onClick={() => handelColorRed(item.id, item.checked, item.item)}
								className={`"flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer border-red-500 ${
									item.color === "red" ? "bg-red-500" : ""
								} hover:bg-red-500"`}
							></div>

							<img
								onClick={() => handleEdit(item.id)}
								src={EditImg}
								className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
								alt="Cancel"
							/>

							<img
								onClick={() => handleDelete(item.id)}
								src={CancelImg}
								className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
								alt="Cancel"
							/>
						</div>
					);
				})}
		</>
	);
};

export default Todo;
