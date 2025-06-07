/* eslint-disable*/
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import './EditProduct.css';
import { getProductById, updatedProduct } from '@/api/productAPI/product';
import { toast } from 'react-toastify';
import Layout from '@/components/layout/Layout';

const EditProduct = () => {
  const [product, setProduct] = useState({
    productCode: "",
    productName: "",
    productGroup: "",
    productMedia: [],
    productDVT: "",
    productDescription: "",
    productPrice: 0,
  });
  const { productId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      const res = await getProductById(productId);
      setProduct({
        productCode: res.product.productCode,
        productName: res.product.productName,
        productGroup: res.product.productGroup,
        productMedia: res.product.productMedia,
        productDVT: res.product.productDVT,
        productDescription: res.product.productDescription,
        productPrice: res.product.productPrice,
      });
    };
    getProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDeleteMedia = (index) => {
    const newMedia = product.productMedia.filter((item, idx) => idx !== index);
    setProduct({ ...product, productMedia: newMedia });
  };

  const handleSubmit = async () => {
    try {
      await updatedProduct(product, productId);
      toast.success("Cập nhật thông tin hàng hóa thành công");
      navigate('/listProduct');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate('/listProduct');
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
                ></i>
              </span>
              <span>Cập nhật thông tin hàng hóa</span>
            </p>
          </div>
          <div className="h2_editPro">
            <div className="sub1_editPro">
              <p className="text_sub1_editPro">Cập nhật thông tin hàng hóa</p>
            </div>
            <div className="sub2_editPro">
              <div className="idpro">
                <label htmlFor="mh">Mã hàng</label>
                <input
                  className="input_editPro"
                  type="text"
                  name="productCode"
                  id="mh"
                  value={product.productCode}
                  readOnly
                />
              </div>
              <div className="namepro">
                <label htmlFor="th">Tên hàng</label>
                <input
                  className="input_editPro"
                  type="text"
                  name="productName"
                  id="th"
                  value={product.productName}
                  onChange={handleChange}
                />
              </div>
              <div className="grouppro">
                <label htmlFor="nh">Nhóm hàng</label>
                <input
                  className="input_editPro"
                  type="text"
                  name="productGroup"
                  id="nh"
                  value={product.productGroup}
                  onChange={handleChange}
                />
              </div>
              <div className="grouppro">
                <label htmlFor="nh">Giá</label>
                <input
                  className="input_editPro"
                  type="number"
                  name="productPrice"
                  id="nh"
                  value={product.productPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="image_prod">
                <label htmlFor="">Hình ảnh</label> <br />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {product.productMedia &&
                    product.productMedia.map((item, index) => (
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <img
                          src={item}
                          alt="anh"
                          style={{ width: "100%", height: "100%" }}
                        />
                        <i
                          className="fa-sharp fa-solid fa-xmark"
                          onClick={() => handleDeleteMedia(index)}
                          style={{ position: "absolute" }}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className="unit">
                <label htmlFor="dv">Đơn vị</label>
                <br />
                <br />
                <input
                  className="input_editPro"
                  type="text"
                  name="productDVT"
                  id="dv"
                  value={product.productDVT}
                  onChange={handleChange}
                />
              </div>
              <div className="describe_editPro">
                <label htmlFor="mt">Mô tả hàng hóa</label>
                <br />
                <br />
                <textarea
                  className="mota_editpro"
                  name="productDescription"
                  value={product.productDescription}
                  onChange={handleChange}
                />
              </div>
              <div className="button_h3">
                <button className="b1_inf" type="submit" onClick={handleSubmit}>
                  Lưu
                </button>
                <button className="b2_inf" type="submit" onClick={handleCancel}>
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default EditProduct;