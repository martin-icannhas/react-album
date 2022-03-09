import React from "react";
import { useLocation, Link } from "react-router-dom";

type dataType = {
  state: {
    download_url: string;
    author: string;
  };
};

export default function Detail() {
  const data: dataType = useLocation();

  console.log(data.state);
  return (
    <div>
      <img src={data.state.download_url} alt="" className="detail-img" />
      <h4>Author Name:</h4>
      <p>{data.state.author}</p>
      <Link to={"/"}>
        <button>Go Back</button>
      </Link>
    </div>
  );
}
