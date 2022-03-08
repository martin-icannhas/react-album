import React, { useState, useEffect } from "react";
import "./App.css";
import Masonry from "react-masonry-css";

function App() {
  const [list, setList] = useState<Array<any>>([]);
  const [count, setCount] = useState(20);

  async function fetchListJSON() {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=" + count
    );
    const obj = await response.json();
    return obj;
  }

  useEffect(() => {
    fetchListJSON().then((data) => {
      setList(data);
    });
  }, [count]);

  const loadMore = (event: any) => {
    setCount(() => count + 20);
  };

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
              <img src={item.download_url} key={item.id} />
            </div>
          ))}
        </Masonry>
      </div>
      <button onClick={loadMore}>Load More</button>
    </>
  );
}

export default App;
