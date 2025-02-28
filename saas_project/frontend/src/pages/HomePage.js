import styles from "../styles/homePage.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../util/checkAuthLoader";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const url =  process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get(`${url}/todos`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  const addTodo = (event) => {
    event.preventDefault();
    if (title.trim() !== "") {
      axios
        .post(
          `${url}/todos`,
          { title },
          {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          }
        )
        .then((response) => {
          fetchTodos();
          setTitle("");
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    }
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${url}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((response) => {
        fetchTodos();
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo._id === id);
    if (todoToEdit) {
      setEditId(id);
      setEditTitle(todoToEdit.itemName);
    }
  };

  const updateTodo = (event) => {
    event.preventDefault();
    if (editTitle.trim() !== "") {
      axios
        .put(
          `${url}/todos/${editId}`,
          {
            title: editTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          }
        )
        .then((response) => {
          fetchTodos();
          setEditId(null);
          setEditTitle("");
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>T O D O</h1>
          <div className={styles.person}>
            <h3>{localStorage.getItem("username")}</h3>
            <svg
              className={styles.logoutBtn}
              onClick={logout}
              width="23px"
              height="23px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15 16.5V19C15 20.1046 14.1046 21 13 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H13C14.1046 3 15 3.89543 15 5V8.0625M11 12H21M21 12L18.5 9.5M21 12L18.5 14.5"
                  stroke="#ff0000"
                  strokeWidth="0.72"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <form
          className={styles.addItem}
          onSubmit={editId ? updateTodo : addTodo}
        >
          <input
            type="text"
            className={styles.todoInput}
            placeholder="Add new todo..."
            value={editId ? editTitle : title}
            onChange={(e) =>
              editId ? setEditTitle(e.target.value) : setTitle(e.target.value)
            }
          />
          <button className={styles.addBtn} type="submit">
            {editId ? "Update" : "Add"} Todo
          </button>
        </form>
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo._id} className={styles.todoItem}>
              <h4>
                {editId === todo._id ? (
                  <input
                    className={styles.todoInput}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  todo.itemName
                )}
              </h4>
              <div className={styles.actions}>
                {editId === todo._id ? (
                  <button className={styles.saveBtn} onClick={updateTodo}>
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.editBtn}
                    onClick={() => editTodo(todo._id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
