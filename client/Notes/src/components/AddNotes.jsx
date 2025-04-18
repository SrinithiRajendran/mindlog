import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddNotes = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    emotional_state: "Normal",
    date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!note.title || !note.description || !note.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/notes", note);
      console.log("Note Added: ", res);
      navigate("/");
    } catch (err) {
      console.log("Error Adding Note: ", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center pt-[18vh] pb-6">
      <form
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold mb-4 font-mono text-[#635167]">
          Add New Note
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Enter a Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              Note
            </label>
            <textarea
              rows="5"
              id="description"
              type="text"
              name="description"
              onChange={handleChange}
              placeholder="Write your notes here..."
              className="w-full px-4 text-[12px] py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]"
            />
          </div>

          <div>
            <label
              htmlFor="emotional_state"
              className="block text-gray-700 font-medium mb-1"
            >
              Emotion
            </label>
            <select
              id="emotional_state"
              name="emotional_state"
              onChange={handleChange}
              value={note.emotional_state}
              className=" text-[12px] w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]"
            >
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Excited">Excited</option>
              <option value="Angry">Angry</option>
              <option value="Normal">None</option>
              <option value="Important">Important</option>
              <option value="Bored">Bored</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-1"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full px-4 cursor-pointer py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]"
            />
          </div>
        </div>
        <div className="flex gap-10 text-xs">
          <button
            type="submit"
            className="w-full mt-6 bg-[#635167] text-[white] py-2 px-4 rounded-sm hover:bg-[#3f3649]"
          >
            Add Note
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 bg-[#f91c03] text-[white] py-2 px-4 rounded-sm hover:bg-[#cd2e0a]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotes;