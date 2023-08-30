import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mantine/core";

export default function Task() {
    const { id } = useParams();
    const [input, setInput] = useState("");
    const [list, setList] = useState([]);

    const posts = JSON.parse(localStorage.getItem("posts"));
    let post = null;
    if (posts) {
        post = posts.find((p) => parseInt(p.id) === parseInt(id));
    }

    if (!post) return "Room no found";

    const { title = "", content = "", status } = post;

    return (
        <div className="container mx-auto my-5">
            <div className="card rounded shadow-sm m-5">
                <div className="card-body">
                    <Button
                        component={Link}
                        to={`/booking/${post.id}`}
                        className="btn btn-link btn-sm"
                    >
                        <i className="bi bi-arrow-left"></i> Booking Room
                    </Button>
                    <h3 className="card-title mb-3">{title}</h3>
                    <p>Meeting Room ID: {id}</p>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    <ul className="list-group">
                        {list.map((item, index) => (
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center"
                                key={index}
                            >
                                <div>
                                    <button
                                        onClick={() => {
                                            const newDone = list.map((done) => {
                                                if (done.id === item.id) {
                                                    const doneTodos = {
                                                        ...done,
                                                    };
                                                    if (
                                                        done.isCompleted ===
                                                        true
                                                    ) {
                                                        doneTodos.isCompleted = false;
                                                    } else if (
                                                        done.isCompleted ===
                                                        false
                                                    ) {
                                                        doneTodos.isCompleted = true;
                                                    }
                                                    return doneTodos;
                                                } else {
                                                    return done;
                                                }
                                            });
                                            setList(newDone);
                                        }}
                                        className={`btn btn-sm ${
                                            item.isCompleted
                                                ? "btn-success"
                                                : "btn-light"
                                        }`}
                                    >
                                        <i
                                            className={`bi ${
                                                item.isCompleted
                                                    ? "bi-check-square"
                                                    : "bi-square"
                                            }`}
                                        ></i>
                                    </button>
                                    {item.isCompleted ? (
                                        <span className="ms-2 text-decoration-line-through">
                                            {item.text}
                                        </span>
                                    ) : (
                                        <span className="ms-2">
                                            {item.text}
                                        </span>
                                    )}
                                </div>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        const newInput = list.filter(
                                            (num) => num.id !== item.id
                                        );
                                        setList(newInput);
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                        <div className="mt-4">
                            <form
                                className="d-flex justify-content-between align-items-center"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    const newList = [...list];
                                    newList.push({
                                        id: Math.random(),
                                        text: input,
                                        isCompleted: false,
                                    });
                                    setList(newList);
                                    setInput("");
                                }}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add new content..."
                                    value={input}
                                    onChange={(event) => {
                                        setInput(event.target.value);
                                    }}
                                />
                                <button className="btn btn-primary btn-sm rounded ms-2">
                                    Add
                                </button>
                            </form>
                        </div>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-3">
                <Link to="/" className="btn btn-link btn-sm">
                    <i className="bi bi-arrow-left"></i> Back
                </Link>
            </div>
        </div>
    );
}
