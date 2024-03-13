const AddFile = ({ creators }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId = e.target.creatorId.value;
    const file = e.target.file.files[0];

    const formData = new FormData();
    formData.append("creatorId", creatorId);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/add-feature", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" border-2 border-white p-6">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col"
      >
        <label htmlFor="creatorId">Select Creator : </label>
        <select
          name="creatorId"
          id="creatorId"
          className=" border border-blue-800 rounded-sm p-2 my-4 hover:bg-blue-400"
        >
          {creators?.map((creator) => (
            <option key={creator._id} value={creator._id}>
              {creator.name}
            </option>
          ))}
        </select>
        <div className="m-4">
          <label htmlFor="file">Select File : </label>
          <input type="file" name="file" id="file" />
        </div>
        <button
          className="text-white bg-blue-800 rounded-md p-2 my-4 hover:bg-blue-400"
          type="submit"
        >
          Add File
        </button>
      </form>
    </div>
  );
};

export default AddFile;
