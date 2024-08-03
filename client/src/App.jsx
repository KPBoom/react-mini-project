import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getServer(searchText);
  }, [searchText]);

  const getServer = async (text) => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${text}`
      );
      setSearchResult(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText((prevText) => (prevText ? `${prevText}, ${tag}` : tag));
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url)
    alert('Copy to Clipboard Success');
  };

  return (
    <div className="App">
      <h1>เที่ยวไหนดี</h1>
      <p>ค้นหาที่เที่ยว</p>
      <input
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={searchText}
        onChange={handleInputChange}
      />
      <div className="underLine"></div>
      {searchResult.map((result, index) => (
        <div key={index} className="item">
          <div className="main-image">
            <img src={result.photos[0]} alt="image" />
          </div>
          <div className="main-data">
            <a className="head-tarvel" href={result.url} target="_blank">
              {result.title}
            </a>
            <p>{result.description}</p>
            <p>
              <a href={result.url} target="_blank">
                อ่านต่อ
              </a>
            </p>
            <span>หมวด</span>
            {result.tags.map((tag) => (
              <span className="tags" onClick={() => handleTagClick(tag)}>
                {" "}
                "{tag}"
              </span>
            ))}
            <br />
            <img className="sub-image" src={result.photos[1]} alt="image" />
            <img className="sub-image" src={result.photos[2]} alt="image" />
            <img className="sub-image" src={result.photos[3]} alt="image" />
            <button onClick={() => handleCopyLink(result.url)}>
              Copy to Clipboard
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
