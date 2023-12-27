import React from "react";
import DoubleTickImg from "../assets/images/double-tick.png";
import Form from "./Form";

const Header = ({
	newItem,
	setNewItem,
	handleSubmit,
	updateIcon,
	setUpdateIcon,
	CompleteAllTasks,
	UncompletedAllTasks,
}) => {
	return (
		<div>
			<Form
				newItem={newItem}
				setNewItem={setNewItem}
				handleSubmit={handleSubmit}
				updateIcon={updateIcon}
				setUpdateIcon={setUpdateIcon}
			/>

			<ul className="flex justify-between my-4 text-xs text-gray-500">
				<li className="flex space-x-1 cursor-pointer" onClick={CompleteAllTasks}>
					<img className="w-4 h-4" src={DoubleTickImg} alt="Complete" />
					<span>Complete All Tasks</span>
				</li>
				<li className="cursor-pointer" onClick={UncompletedAllTasks}>
					Clear completed
				</li>
			</ul>
		</div>
	);
};

export default Header;
