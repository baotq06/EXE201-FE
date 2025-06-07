/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { getProducts, searchProduct } from '@/api/productAPI/product';
import './ListProduct.css';
import ConfirmDeleteProduct from '@/components/confirmDeleteProduct/ConfirmDeleteProduct';
import { formatCurrency } from '@/utils/function/slipFuntion';
import Layout from '@/components/layout/Layout';

const ListProduct = () => {
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [isDeleteProduct, setIsDeleteProduct] = useState(false);
  const [type, setType] = useState("deletedProduct");
  const [deletedId, setDeletedId] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getListProducts = async () => {
      const res = await getProducts(page, limit);
      setTotal(res.totalResult);
      setListProducts(res.products);
    };

    getListProducts();
  }, [page, isRefresh]);

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "productCode") {
      setProductCode(value);
    } else {
      setProductName(value);
    }
  };

  const handleSearch = async () => {
    try {
      setPage(1);
      const res = await searchProduct(productCode, productName, page, limit);
      setListProducts(res.products);
      setTotal(res.totalResult);
      setProductCode("");
      setProductName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAdd = () => {
    navigate("/createdProduct");
  };

  const handleClickPen = (productId) => {
    navigate(`/infoProduct/${productId}`);
  };

  const handleClickBin = (productId) => {
    setDeletedId(productId);
    setIsDeleteProduct(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteProduct(false);
  };
  return (
    <>
      <Layout>
        <div className="ListProductkien">
          <div>
            <div>
              <div className="daulist">
                <div className="left-sec">
                  <div className="itemleft">
                    <label className="mhhlistproduct" htmlFor="mhh">
                      Mã hàng hóa
                    </label>
                    <input
                      className="listproductinput"
                      type="text"
                      id="mhh"
                      name="productCode"
                      value={productCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="right-sec">
                  <div className="itemleft">
                    <label className="mhhlistproduct" htmlFor="thh">
                      Tên hàng hóa
                    </label>
                    <input
                      className="listproductinput"
                      type="text"
                      id="thh"
                      name="productName"
                      value={productName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="tklistproduct"
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </button>
              </div>
              <button className="addButtonthem" onClick={handleClickAdd}>
                Thêm hàng hoá
              </button>
              <div className="listTable">
                <table className="Listkien">
                  <tbody>
                    <tr className="listtable1">
                      <th className="listtable2">STT</th>
                      <th className="listtable2">Tên hàng</th>
                      <th className="listtable2">Mã hàng</th>
                      <th className="listtable2">Nhóm hàng</th>
                      <th className="listtable2">Đơn vị tính</th>
                      <th className="listtable2">Đơn giá</th>
                      <th className="center">Thao tác</th>
                    </tr>
                    {listProducts.length > 0 &&
                      listProducts.map((product, index) => {
                        return (
                          <tr key={product._id}>
                            <td className="listtable3">
                              {(page - 1) * limit + index + 1}
                            </td>
                            <td className="listtable3">
                              {product.productName}
                            </td>
                            <td className="listtable3">
                              {product.productCode}
                            </td>
                            <td className="listtable3">
                              {product.productGroup}
                            </td>
                            <td className="listtable3">{product.productDVT}</td>
                            <td className="listtable3">
                              {formatCurrency(product.productPrice)}
                            </td>
                            <td className="purple">
                              <span
                                className="pen-product"
                                onClick={() => handleClickPen(product._id)}
                              >
                                <i className="fa-solid fa-pen"></i>
                              </span>
                              <span
                                className="bin-product"
                                onClick={() => handleClickBin(product._id)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <Pagination
                  total={total}
                  pageSize={limit}
                  current={page}
                  onChange={handleChangePage}
                  style={{
                    position: "absolute",
                    bottom: "7px",
                    right: "100px",
                    position: "fixed",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {isDeleteProduct && (
          <div className="overlay" onClick={handleCancelDelete}>
            <motion.div
              className="itemDelete"
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ConfirmDeleteProduct
                type={type}
                onCancel={handleCancelDelete}
                id={deletedId}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            </motion.div>
          </div>
        )}
      </Layout>
    </>
  );
}

export default ListProduct;