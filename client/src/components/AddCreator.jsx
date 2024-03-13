import { useState } from "react";

const AddCreator = () => {
  const [creator, setCreator] = useState({
    name: "",
    email: "",
    age: "",
    profession: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/add-creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creator),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setCreator({
      name: "",
      email: "",
      age: "",
      profession: "",
    });
  };

  return (
    <div className=" text-black border-2 border-white p-6 m-2 ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={creator.name}
            onChange={(e) => setCreator({ ...creator, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={creator.email}
            onChange={(e) => setCreator({ ...creator, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            value={creator.age}
            onChange={(e) => setCreator({ ...creator, age: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="profession">Profession</label>
          <input
            type="text"
            id="profession"
            value={creator.profession}
            onChange={(e) =>
              setCreator({ ...creator, profession: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className=" text-white bg-blue-800 rounded-md p-2 my-4 hover:bg-blue-400"
        >
          Add Creator
        </button>
      </form>
    </div>
  );
};

export default AddCreator;
