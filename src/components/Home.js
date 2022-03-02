import React, { useState, useEffect, useMemo, useRef } from "react";
import ProductService from "../services/product.services";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getListProduct(
        search,
        sort,
        sortBy,
        sortOrder,
        page,
        limit
      );
      setProducts(response.data.data);
      setTotalPage(response.data.last_page);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePage = (e) => {
    setPage(e.target.value);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getProducts();
  };

  const handleDelete = async (id) => {
    try {
      await ProductService.deleteProduct(id);
      await getProducts();
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await ProductService.getProduct(id);
      props.history.push({
        pathname: "/product/edit",
        state: { product: response.data },
      });
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  const handleAdd = () => {
    props.history.push({
      pathname: "/product/create",
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderProducts = useMemo(() => {
    return products.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.description}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => handleEdit(product.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }, [products]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Product List</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Search</label>
                      <input
                        type="text"
                        className="form-control"
                        value={search}
                        onChange={handleSearch}
                      />
                    </div>
                    <div className="form-group">
                      <label>Sort</label>
                      <select
                        className="form-control"
                        value={sort}
                        onChange={handleSort}
                      >
                        <option value="">-- Select --</option>
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="description">Description</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sort By</label>
                      <select
                        className="form-control"
                        value={sortBy}
                        onChange={handleSortBy}
                      >
                        <option value="">-- Select --</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sort Order</label>
                      <select
                        className="form-control"
                        value={sortOrder}
                        onChange={handleSortOrder}
                      >
                        <option value="">-- Select --</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Page</label>
                      <select
                        className="form-control"
                        value={page}
                        onChange={handlePage}
                      >
                        <option value="">-- Select --</option>
                        {Array.from(Array(totalPage).keys()).map(
                          (page, index) => {
                            return (
                              <option key={index} value={page + 1}>
                                {page + 1}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Limit</label>
                      <select
                        className="form-control"
                        value={limit}
                        onChange={handleLimit}
                      >
                        <option value="">-- Select --</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{renderProducts}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
