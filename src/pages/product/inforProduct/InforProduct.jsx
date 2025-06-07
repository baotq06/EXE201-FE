/* eslint-disable */
import React, { useEffect, useState } from 'react'

import './InforProduct.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '@/api/productAPI/product';
import Layout from '@/components/layout/Layout';

const InforProduct = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      console.log("productId", productId);
      const res = await getProductById(productId);
      setProduct(res.product);
    };
    getProduct();
    console.log("product", product);
  }, []);

  const handleClickEdit = () => {
    navigate(`/editProduct/${productId}`);
  };

  return (
    <>
      <Layout>
        <div className="container_editPro">
          <div className="h1_editPro">
            <p className="text_1">
              <span onClick={() => navigate("/listProduct")}>
                Quản lí danh mục hàng hóa
              </span>
              <span>
                <i
                  className="fa-solid fa-chevron-right"
                  style={{ color: "black" }}
                />
              </span>{" "}
              <span>Xem hàng hóa</span>
            </p>
            <button
              type="submit"
              className="buton_h1"
              onClick={handleClickEdit}
            >
              Cập nhật thông tin
            </button>
          </div>
          <div className="h2_editPro">
            <div className="sub1_editPro">
              <p className="text_sub1_editPro">Thông tin hàng hóa</p>
              <i
                className="fa-solid fa-x"
                onClick={() => navigate("/listProduct")}
              ></i>
            </div>
            <div className="sub2_editPro">
              <div className="idpro">
                <label htmlFor="mh">Mã hàng </label>
                <div
                  className="input_editPro"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productCode}
                </div>
              </div>
              <div className="namepro">
                <label htmlFor="th">Tên hàng</label>
                <div
                  className="input_editPro"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productName}
                </div>
              </div>
              <div className="grouppro">
                <label htmlFor="nh">Nhóm hàng</label>
                <div
                  className="input_editPro"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productGroup}
                </div>
              </div>
              <div className="grouppro">
                <label htmlFor="productPrice">Giá</label>
                <div
                  className="input_editPro"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productPrice}
                </div>
              </div>
              <div className="image_prod">
                <label htmlFor="">Hình ảnh</label> <br />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {product.productMedia &&
                    product.productMedia.map((item, index) => (
                      <img
                        className="image_ip"
                        src={item}
                        alt=""
                        key={index}
                        style={{ width: "200px", height: "200px" }}
                      />
                    ))}
                </div>
              </div>

              <div className="unit">
                <label htmlFor="dv">Đơn vị tính</label>
                <br />
                <br />
                <div
                  className="input_editPro"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productDVT}
                </div>
              </div>
              <div className="describe_editPro">
                <label htmlFor="mt">Mô tả hàng hóa</label>
                <br />
                <br />
                <div
                  className="mota_editpro"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {product.productDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default InforProduct;