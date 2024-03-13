const CreatorBox = ({ name, email, age, profession, features }) => {
  return (
    <div className="p-2 m-2 w-[410px] rounded-md  bg-slate-200 text-black">
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{age}</p>
      <p>{profession}</p>
      <div>
        <h3>Features</h3>
        <ul>
          {features?.map((feature) => (
            <li
              key={feature._id}
              className=" bg-white  m-1 p-1 rounded-md hover:bg-blue-800 hover:text-white"
            >
              <a
                href={`http://localhost:3000/file/${feature.fileId}`}
                target="_blank"
                rel="noreferrer"
              >
                File : {feature.fileName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreatorBox;
