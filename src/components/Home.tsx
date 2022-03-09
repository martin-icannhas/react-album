import React, { useState, useEffect } from "react";
import "../App.css";
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

    // saveData(list);
  }, [count]);

  const loadMore = (event: any) => {
    setCount(() => count + 12);
  };

  // function saveData(resp: any) {
  //   localForage.setItem("image", resp);
  // }

  return (
    <>
      <div>
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
      </div>
      <button onClick={loadMore}>Load More</button>
    </>
  );
}

export default Home;
