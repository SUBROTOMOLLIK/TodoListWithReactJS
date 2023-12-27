import { useEffect, useState } from "react";
// import "./App.css";
import Api from "./api/posts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
// import "./index.css";

function App() {
  const [items, setItem] = useState([]);
  const [newItem, setNewItem] = useState("");
  // for update item id
  const [updateItem, setUpdateItem] = useState("");
  // for update icon checked
  const [updateCheckedItem, setUpdateCheckedItem] = useState("");
  // for update item color
  const [updateColorItem, setUpdateColorItem] = useState("");
  const [updateIcon, setUpdateIcon] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("/items");
        setItem(response.data);
      } catch (error) {
        console.log(error.data);
        console.log(error.status);
        console.log(error.statusText);
        console.log(error.headers);
        console.log(error.config);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateIcon) {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const newitem = { id, checked: false, item: newItem, color: "green" };

      try {
        const response = await Api.post("/items", newitem);
        const allItem = [...items, response.data];
        console.log(allItem);
        setItem(allItem);
        setNewItem("");
      } catch (error) {
        console.log(`Error:${Response.message}`);
      }
    } else {
      // get id
      const id = updateItem;
      //get item title
      const checkedValue = updateCheckedItem;
      const editTitle = newItem;
      const colorValue = updateColorItem;
      // updated new item value
      const editItem = {
        id: id,
        checked: checkedValue,
        item: editTitle,
        color: colorValue,
      };

      try {
        await Api.put(`/items/${id}`, editItem);

        const getData = await Api.get("/items");

        if (getData.status === 200) {
          setItem(getData.data);
        } else {
          console.log("Error: data  is not updated");
        }

        //change icon
        setUpdateIcon(true);
        // set title in input
        setNewItem("");
        setUpdateItem("");
      } catch (error) {
        console.log(`Error : ${error.message}`);
      }
    }
  };

  const handleEdit = (id) => {
    const editItem = items.find((item) => {
      return item.id === id;
    });
    //change icon
    setUpdateIcon(false);
    // set title in input
    setNewItem(editItem.item);
    // set item id
    setUpdateItem(id);
    // set color value
    setUpdateColorItem(editItem.color);
    // set item checked value
    setUpdateCheckedItem(editItem.checked);
  };

  // delete items
  const handleDelete = async (id) => {
    try {
      await Api.delete(`/items/${id}`);
      const itemList = items.filter((item) => item.id !== id);
      setItem(itemList);
    } catch (error) {
      console.log(`Error:${Response.message}`);
    }
  };

  // checked unchecked items
  const handleChecked = async (id) => {
    const editItem = items.find((item) => {
      return item.id === id;
    });

    const updateCheckedItem = {
      id: id,
      checked: !editItem.checked,
      item: editItem.item,
      color: editItem.color,
    };

    try {
      await Api.patch(`/items/${id}`, updateCheckedItem);

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

  // all task complete

  const CompleteAllTasks = async () => {
    const newData = items.map((item) => ({ ...item, checked: true }));

    newData.map(async (setNew) => {
      const data = setNew.id;
      const checked = setNew.checked;
      const itemData = setNew.item;
      const colorData = setNew.color;

      const editItem = {
        id: data,
        checked: checked,
        item: itemData,
        color: colorData,
      };
      try {
        await Api.put(`/items/${data}`, editItem);
      } catch (error) {
        console.log(`Error:${Response.message}`);
      }
    });

    const getData = await Api.get("/items");

    if (getData.status === 200) {
      setItem(getData.data);
    } else {
      console.log("Error: data  is not updated");
    }
  };
  // all task Uncompleted
  const UncompletedAllTasks = async () => {
    const newData = items.map((item) => ({ ...item, checked: false }));
    newData.map(async (setNew) => {
      const id = setNew.id;
      const checked = setNew.checked;
      const itemData = setNew.item;
      const colorData = setNew.color;
      const editItem = {
        id: id,
        checked: checked,
        item: itemData,
        color: colorData,
      };
      try {
        await Api.put(`/items/${id}`, editItem);
      } catch (error) {
        console.log(`Error:${Response.message}`);
      }
    });

    const getData = await Api.get("/items");
    if (getData.status === 200) {
      setItem(getData.data);
    } else {
      console.log("Error: data  is not updated");
    }
  };

  return (
    <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
      <Navbar />

      <div className="w-full max-w-3xl shadow-lg rounded-lg p-6 bg-white">
        <Header
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
          updateIcon={updateIcon}
          setUpdateIcon={setUpdateIcon}
          CompleteAllTasks={CompleteAllTasks}
          UncompletedAllTasks={UncompletedAllTasks}
        />

        <hr className="mt-4" />

        <TodoList
          items={items}
          setItem={setItem}
          newItem={newItem}
          setNewItem={setNewItem}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleChecked={handleChecked}
        />

        <hr className="mt-4" />

        <Footer
          items={items}
          setItem={setItem}
          updateColorItem={updateColorItem}
        />
      </div>
    </div>
  );
}

export default App;
