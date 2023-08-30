import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { TimeInput } from "@mantine/dates";
import { DatePickerInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { Space } from "@mantine/core";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";

export default function BookingEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState("");
    const [content, setContent] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState(null);
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const bookings = JSON.parse(localStorage.getItem("bookings"));
        const booking = bookings
            ? bookings.find((p) => parseInt(p.id) === parseInt(id))
            : null;

        if (booking) {
            setRoom(booking.room);
            setContent(booking.content);
            setStartTime(booking.startTime);
            setEndTime(booking.endTime);
            setDate(new Date(booking.date));
            setBooking(booking);
        }
    }, []);
    const editor = useEditor(
        {
            extensions: [StarterKit, Highlight],
            content: booking.content,
            onUpdate: ({ editor }) => {
                setContent(editor.getHTML());
            },
        },
        [booking]
    );

    const updateBooking = () => {
        const bookings = JSON.parse(localStorage.getItem("bookings"));
        const newBooking = bookings.map((p) => {
            if (parseInt(p.id) === parseInt(id)) {
                p.room = room;
                p.content = content;
                p.startTime = startTime;
                p.endTime = endTime;
                p.date = date;
            }
            return p;
        });
        localStorage.setItem("bookings", JSON.stringify(newBooking));
        navigate("/booking_history");
    };

    return (
        <div className="container mx-auto my-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h1 className="h1">Edit Booking Room</h1>
            </div>
            <div className="card mb-2 p-4">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        updateBooking();
                    }}
                >
                    <div className="mb-3">
                        <label for="booking-title" className="form-label">
                            Room
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="booking-title"
                            value={room}
                            disabled
                            onChange={(event) => setRoom(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="booking-content" className="form-label">
                            Content of the Meeting
                        </label>
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>

                            <RichTextEditor.Content />
                        </RichTextEditor>
                    </div>
                    <div style={{ display: "flex" }}>
                        <TimeInput
                            label="Start time"
                            icon={<IconClock size="1rem" stroke={1.5} />}
                            maw={400}
                            mx="end"
                            id="start-time"
                            value={startTime}
                            onChange={(event) => {
                                setStartTime(event.target.value);
                            }}
                        />
                        <Space w="xl" />
                        <TimeInput
                            label="End time"
                            icon={<IconClock size="1rem" stroke={1.5} />}
                            maw={400}
                            mx="end"
                            id="end-time"
                            value={endTime}
                            onChange={(event) => {
                                setEndTime(event.target.value);
                            }}
                        />
                    </div>
                    <div style={{ display: "flex" }}>
                        <DatePickerInput
                            value={date}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            label="Date"
                            placeholder="Date"
                            maw={400}
                            mx="end"
                            w={115}
                        />
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <div className="text-center">
                <Link to="/main" className="btn btn-link btn-sm">
                    <i className="bi bi-arrow-left"></i> Back to Main
                </Link>
            </div>
        </div>
    );
}
