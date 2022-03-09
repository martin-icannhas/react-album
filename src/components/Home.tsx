import React, { useState, useEffect, useRef } from "react";
import "../Home.css";
import Masonry from "react-masonry-css"; // Can't get react-virtualized masonry to work
import * as localForage from "localforage";
import { Link } from "react-router-dom";

function Home() {
  const [list, setList] = useState<Array<any>>([]);
  const [count, setCount] = useState(4);

  const isInitialMount = useRef(true);

  useEffect(() => {
    async function fetchListJSON() {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=" + count
      );
      const obj = await response.json();
      return obj;
    }

    fetchListJSON().then((data: any) => {
      setList(data);
    });

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localForage
        .setItem("count", count)
        .then((res) => console.log("Set item: " + res))
        .catch((err) => console.log(err));
      console.log("DidUpdate");
    }
  }, [count]);

  useEffect(() => {
    localForage.getItem("count").then((res: any) => {
      if (res) {
        console.log("Get value: " + res);
        setCount(res);
      } else {
        console.log("No Get value");
      }
    });
    console.log("Did Mount");
  }, []);

  const loadMore = () => {
    setCount(() => count + 4);
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
            <div key={item.id}>
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

window.onbeforeunload = () => {
  localForage.clear();
};

export default Home;
