import React, { useState, useEffect } from "react";
import "../Home.css";
import Masonry from "react-masonry-css";
// import * as localForage from "localforage";
import { Link } from "react-router-dom";

function Home() {
  const [list, setList] = useState<Array<any>>([]);
  const [count, setCount] = useState(12);

  useEffect(() => {
    async function fetchListJSON() {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=" + count
      );
      const obj = await response.json();
      return obj;
    }

    fetchListJSON().then((data) => {
      setList(data);
    });
  }, [count]);

  const loadMore = (event: any) => {
    setCount(() => count + 25);
  };

  return (
    <>
      <div className="home">
        <Masonry
          breakpointCols={4}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {list.map((item) => (
            <div>
              <Link to={{ pathname: "/images/" + item.id, state: item }}>
                <img
                  src={item.download_url}
                  key={item.id}
                  alt=""
                  className="home-img"
                />
              </Link>
            </div>
          ))}
        </Masonry>
        <div id="load">
          <button onClick={loadMore}>Load More</button>
        </div>
      </div>
    </>
  );
}

export default Home;
