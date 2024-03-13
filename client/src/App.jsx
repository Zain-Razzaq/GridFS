import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target[0].files[0]);
    fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }


  return (
    <div className=" relative">
      <img
        className=" w-screen h-screen object-cover absolute top-0 left-0 -z-10"
        src="https://marketplace.canva.com/EAEthkBVLfQ/1/0/1600w/canva-blush-wave-desktop-wallpaper-drvq3zaYl2E.jpg"
        alt="abc"
      />
      <div className=" w-auto h-screen flex flex-col justify-center items-center z-10">
        <h1 className=" text-9xl text-orange-400">Zain Razzaq </h1>
        <h3 className=" text-orange-400 text-3xl">BSCS21084</h3>
        <form onSubmit={handelSubmit} >
          <h3>Upload file :</h3>
          <input type="file" />
          <button type="submit">Upload</button>

        </form>
        <div className=" flex flex-col">

          <div className="m-3 bg-slate-50 rounded-lg  w-[900px] h-[300px] overflow-scroll">
            <div className="w-full flex justify-center">
              <h3 className="m-1 text-xl text-orange-400">Creators</h3>
            </div>
            <ul>
              {data.creatorData?.map((creator) => (
                <li
                  className="p-2 m-2 rounded-md bg-orange-200"
                  key={creator._id}
                >
                  <h3>{creator.name}</h3>
                  <p>{creator.email}</p>
                  <p>{creator.age}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className=" m-3 bg-slate-50 rounded-lg w-[900px] h-[300px] overflow-scroll">
            <div className="w-full flex justify-center">
              <h3 className="m-1 text-xl text-orange-400">Features</h3>
            </div>
            <ul>
              {data.featureData?.map((feature) => (
                <li
                  className="p-2 m-2 rounded-md bg-orange-200"
                  key={feature._id}
                >
                  <h3>{feature.bookTitle}</h3>
                  <p>{feature.bookAuthor}</p>
                  <p>{feature.content}</p>
                  <p>{feature.publishedOn}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
