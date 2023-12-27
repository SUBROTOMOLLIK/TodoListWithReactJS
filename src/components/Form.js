import React from "react";
import EditImg from "../assets/images/edit.png";
import NoteImg from "../assets/images/notes.png";
import PlusImg from "../assets/images/plus.png";
const Form = ({ newItem, setNewItem, handleSubmit, updateIcon }) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
		>
			<img src={NoteImg} className="w-6 h-6" alt="Add todo" />
			<input
				type="text"
				placeholder="Type your todo"
				className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
				required
			/>
			{updateIcon ? (
				<button
					type="submit"
					className={`appearance-none w-8 h-8 bg-[url('${PlusImg}')] bg-no-repeat bg-contain`}
				></button>
			) : (
				<button
					type="submit"
					className={`appearance-none w-8 h-8 bg-[url('${EditImg}')] bg-no-repeat bg-contain`}
				></button>
			)}
		</form>
	);
};

export default Form;
