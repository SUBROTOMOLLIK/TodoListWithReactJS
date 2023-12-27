import React from "react";
import Todo from "./Todo";

const TodoList = ({
	items,
	setItem,
	handleEdit,
	handleDelete,
	handleChecked,
}) => {
	return (
		<div className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto">
			<Todo
				items={items}
				setItem={setItem}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
				handleChecked={handleChecked}
			/>
		</div>
	);
};

export default TodoList;
