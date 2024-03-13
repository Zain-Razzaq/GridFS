import { useState, useEffect } from "react";

import CreatorBox from "./components/CreatorBox";
import AddCreator from "./components/AddCreator";
import AddFile from "./components/AddFile";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="  flex flex-col justify-center items-center mt-20">
      <img
        className=" w-screen h-screen object-cover absolute top-0 left-0 -z-10"
        src="http://localhost:3000/file/65f1dc24eb028c1f7e5d3f79"
        alt="abc"
      />
      <h1 className="text-6xl text-white font-extrabold ">Zain Razzaq</h1>
      <h3 className="text-3xl text-white font-extrabold">BSCS21084</h3>
      <div className=" w-10/12 flex flex-1 justify-center items-center">
        <div className=" bg-slate-200 rounded-lg p-6">
          <AddCreator />
          <AddFile creators={data} />
        </div>
        <div className=" flex flex-wrap w-[900px] h-[650px] bg-white m-4 p-4 rounded-lg overflow-scroll">
          {data?.map((creator) => (
            <CreatorBox key={creator._id} {...creator} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
