import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useMemo } from "react";
import "./index.scss";
import { addOrders } from "../actions";

export const CoffeeOrder = () => {
  const coffeeList = useSelector((state) => state);
  const [newOrder, setNewOrder] = useState(false);
  const [formState, setFormState] = useState({});
  const [previewImg, setPreviewImg] = useState();
  const fileRef = useRef();
  const [sort, setSort] = useState("asc");
  const [sortField, setSortField] = useState("status");

  const dispatch = useDispatch();

  const handleNewOrder = () => {
    setNewOrder(!newOrder);
  };

  const handleChange = (e) => {
    const [file] = fileRef.current.files;
    const fileInMemo = file ? URL.createObjectURL(file) : null;
    let { type, name, value } = e.target;

    if (type === "file") {
      setPreviewImg(fileInMemo);

      setFormState({
        ...formState,
        [name]: fileInMemo,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    const [file] = fileRef.current.files;
    const fileInMemo = file ? URL.createObjectURL(file) : null;

    const formData = new FormData();
    e.preventDefault();

    Object.entries(formState).forEach((item) => {
      const [name, value] = item;
      formData.append(name, value);
    });

    formData.append("img", fileInMemo);
    dispatch(addOrders(formState));
  };

  const handleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  useMemo(() => {
    let computed = coffeeList.data;

    if (sortField) {
      computed = computed.sort((a, b) => {
        const isReversed = sort === "asc" ? 1 : -1;
        const stringCompareResult = a[sortField].localeCompare(b[sortField]);
        return stringCompareResult * isReversed;
      });
    }
    return [computed];
  }, [sortField, sort]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mb-5">
        <h1>Coffee Shop</h1>
        <button className="btn btn-primary" onClick={handleNewOrder}>
          New Order
        </button>
      </div>
      {newOrder && (
        <form method="get" className="mb-5" onSubmit={handleSubmit}>
          <div className="row align-items-end">
            <div className="form-group d-flex align-items-end justify-content-between col-4">
              <div className="photo-box">
                {fileRef && <img src={previewImg} />}
              </div>
              <div className="box">
                <label htmlFor="image">Photo:</label>
                <input
                  ref={fileRef}
                  type="file"
                  id="image"
                  name="img"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group col-4">
              <label htmlFor="name">Coffee:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="note">Note:</label>
              <input
                type="text"
                id="note"
                name="note"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="count">Count:</label>
              <input
                type="number"
                id="count"
                min="1"
                name="count"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-4">
              <label htmlFor="table">Table:</label>
              <input
                type="number"
                id="table"
                min="1"
                name="table"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="form-group col-4">
              <label htmlFor="status">Status:</label>
              <select
                name="status"
                className="form-control"
                onChange={handleChange}
              >
                <option>Select </option>
                <option>Created</option>
                <option>In-progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary">Create Order</button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Order Name:</th>
            <th>Note</th>
            <th>Table</th>
            <th>Count</th>
            <th id="status" onClick={handleSort}>
              Status
              <img src={`${process.env.PUBLIC_URL}/tap.svg`} />
            </th>
          </tr>
        </thead>
        <tbody>
          {coffeeList.data.map((c) => (
            <tr key={c.id}>
              <td>
                <img src={c.img} alt="Coffee" />
              </td>
              <td>{c.name}</td>
              <td>{c.note}</td>
              <td>{c.table}</td>
              <td>{c.count}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
    </div>
  );
};
