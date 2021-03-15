import { useEffect, useState } from "react";
import "./App.css";

function App1() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState({ prev: 0, current: 22 });

  useEffect(() => {
    loadInformation();
    window.addEventListener("scroll", (e) => {
      handleScroll(e);
    });
  }, []);

  useEffect(() => {
    loadInformation();
  }, [count]);

  const handleScroll = () => {
    let lastTr = document.querySelector(".content > tr:last-child");
    let lastTrOffset = lastTr.offsetTop + lastTr.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastTrOffset) {
      loadMore();
    }
  };

  const loadMore = () => {
    setCount({ prev: count.prev + 22, current: count.current + 22 });
  };

  const loadInformation = () => {
    fetch("./Rule.json")
      .then((response) => response.json())
      .then((json) => json.data)
      .then((item) =>
        setData([
          ...data,
          ...item.filter(
            (i, index) => index >= count.prev && index < count.current
          ),
        ])
      );
  };

  function deleteRow(id, i) {
    delete data[i];
    setData(data.filter((item) => item.id !== id));
  }

  function cloneRow(i) {
    data.push(data[i]);
    setData([...data]);
    console.log(data);
  }

  function moveUp(i) {
    const object = data[i - 1];
    data[i - 1] = data[i];
    data[i] = object;
    setData([...data]);
  }

  function moveDown(i) {
    const object = data[i + 1];
    data[i + 1] = data[i];
    data[i] = object;
    setData([...data]);
  }

  return (
    <table className="content">
      <tr className="row">
        <th>Rule Id</th>
        <th>Rule Name</th>
        <th>Delete</th>
        <th>Clone</th>
        <th>Up</th>
        <th>Down</th>
      </tr>
      {data.map((entry, index) => {
        return (
          <tr key={index} className="row">
            <td>{entry.id}</td>
            <td>{entry.ruleName}</td>
            <td>
              <img
                src="./delete.png"
                alt="delete"
                onClick={() => deleteRow(entry.id, index)}
              />
            </td>
            <td>
              <img
                src="./clone.png"
                alt="clone"
                onClick={() => cloneRow(index)}
              />
            </td>
            <td>
              <img
                src="./moveup.png"
                alt="moveup"
                onClick={() => moveUp(index)}
              />
            </td>
            <td>
              <img
                src="./movedown.png"
                alt="movedown"
                onClick={() => moveDown(index)}
              />
            </td>
          </tr>
        );
      })}
    </table>
  );
}

export default App1;
