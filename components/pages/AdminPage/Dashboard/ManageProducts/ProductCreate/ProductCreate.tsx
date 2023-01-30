import React, { useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "./../../../../../../src/state/StateController";
import DashboardBreadcrumb from "./../../../../../shared/SharedDashboardBreadcumb/DashboardBreadcrumb";
import SharedGoBackButton from "./../../../../../shared/SharedGoBackButton/SharedGoBackButton";
import { EcommerceApi } from "../../../../../../src/API/EcommerceApi";

interface Props {}

const ProductCreate: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [isCheckedTop, setIsCheckedTop] = useState(false);
  const [isCheckedNew, setIsCheckedNew] = useState(false);
  const [isCheckedBest, setIsCheckedBest] = useState(false);
  const [isCheckedFeatured, setIsCheckedFeatured] = useState(false);
  const [isCheckedPopular, setIsCheckedPopular] = useState(false);
  // const [imageLink, setImageLink] = useState("");
  const handleProductAdd = async (e: any) => {
    e.preventDefault();
    // console.log(productData);
    const image = e.target.imageURL.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const { res, err } = await EcommerceApi.uploadProductImage(formData);
    if (res.data?.url) {
      let imageUrl;
      imageUrl = [res.data?.url];
      // setImageLink(data?.data?.url);
      if (res.data?.url === undefined) {
        imageUrl = [""];
      }
      const productData = {
        productName: e.target.productName.value,
        price: parseFloat(e.target.productPrice.value),
        offerPrice: parseFloat(e.target.offer_price.value),
        catSlug: e.target.category.value,
        subCatSlug: e.target.sub_category.value,
        brandSlug: e.target.brand.value,
        description: e.target.short_description.value,
        status: e.target.productStatus.value,
        imageURL: imageUrl,
        stock: parseFloat(e.target.stock_quantity.value),
        weight: parseFloat(e.target.weight.value),
        seoTitle: e.target.seo_title.value,
        seoDescription: e.target.seo_description.value,
        isTopProduct: isCheckedTop,
        isNewArrival: isCheckedNew,
        isBestProduct: isCheckedBest,
        isFeatured: isCheckedFeatured,
        isPopular: isCheckedPopular,
        addedBy: "admin",
      };
      EcommerceApi.addProducts(productData);
    }
  };
  return (
    <div className="w-full ">
      <DashboardBreadcrumb
        headline="Create Product"
        link="/product_brands/create"
        slug="Create Product"
      ></DashboardBreadcrumb>
      <div className="m-6">
        <div className="section-body">
          <SharedGoBackButton
            title="Products"
            link="/products"
          ></SharedGoBackButton>
        </div>
      </div>
      <div className="px-[25px] w-full relative">
        <div className="mt-4">
          <div className="mt-6 shadow-md bg-white rounded relative mb-7 border-0">
            <div className="p-5 leading-6 mt-7">
              <form onSubmit={handleProductAdd}>
                <div className="form-group col-12 mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Thumbnail Image Preview
                  </label>
                  <div>
                    <picture>
                      <img
                        id="preview-img"
                        className="admin-img border border-[#ddd] p-0 m-0 max-w-[180px] h-[150px] object-cover"
                        src="https://api.websolutionus.com/shopo/uploads/website-images/preview.png"
                        alt=""
                      />
                    </picture>
                  </div>
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Thumbnail Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="imageURL"
                    type="file"
                    className="form-control-file"
                  />
                </div>
                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="productName"
                  />
                </div>
                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                  >
                    <option value="electronics_slug">Electronics</option>
                    <option value="game_slug">Game</option>
                    <option value="mobile_slug">Mobile</option>
                    <option value="television_slug">Television</option>
                  </select>
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Sub Category
                  </label>
                  <select
                    name="sub_category"
                    id="sub_category"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                  >
                    <option value="electronics_slug">Electronics</option>
                    <option value="game_slug">Game</option>
                    <option value="mobile_slug">Mobile</option>
                    <option value="television_slug">Television</option>
                  </select>
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Brand
                  </label>
                  <select
                    name="brand"
                    id="brand"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                  >
                    <option value="electronics_slug">Electronics</option>
                    <option value="game_slug">Game</option>
                    <option value="mobile_slug">Mobile</option>
                    <option value="television_slug">Television</option>
                  </select>
                </div>
                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    min={0}
                    type="number"
                    id="price"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="productPrice"
                  />
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Offer Price
                  </label>
                  <input
                    min={0}
                    type="number"
                    id="offer_price"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="offer_price"
                  />
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    min={0}
                    type="number"
                    id="stock_quantity"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="stock_quantity"
                  />
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Weight <span className="text-red-500">*</span>
                  </label>
                  <input
                    min={0}
                    type="number"
                    id="weight"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="weight"
                  />
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="short_description"
                    className="form-control h-[100px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="short_description"
                  />
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Highlight
                  </label>
                  <div className="text-[#495057]">
                    <input
                      type="checkbox"
                      name="top_product"
                      id="top_product"
                      onChange={() => setIsCheckedTop(!isCheckedTop)}
                    />
                    <label htmlFor="top_product" className="mr-3">
                      Top Product
                    </label>
                    <input
                      type="checkbox"
                      name="new_arrival"
                      id="new_arrival"
                      onChange={() => setIsCheckedNew(!isCheckedNew)}
                    />
                    <label htmlFor="new_arrival" className="mr-3">
                      New Arrival
                    </label>
                    <input
                      type="checkbox"
                      name="best_product"
                      id="best_product"
                      onChange={() => setIsCheckedBest(!isCheckedBest)}
                    />
                    <label htmlFor="best_product" className="mr-3">
                      Best Product
                    </label>
                    <input
                      type="checkbox"
                      name="is_popular"
                      id="is_popular"
                      onChange={() => setIsCheckedPopular(!isCheckedPopular)}
                    />
                    <label htmlFor="is_popular" className="mr-3">
                      Popular Product
                    </label>
                    <input
                      type="checkbox"
                      name="is_featured"
                      id="is_featured"
                      onChange={() => setIsCheckedFeatured(!isCheckedFeatured)}
                    />
                    <label htmlFor="is_featured" className="mr-3">
                      Featured Product
                    </label>
                  </div>
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full border rounded p-3 border-gray-200 bg-[#fdfdff] focus:outline-none"
                    name="productStatus"
                    id=""
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">InActive</option>
                  </select>
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    SEO Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="seo_title"
                    className="form-control h-[42px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="seo_title"
                  />
                </div>

                <div className="form-group col-12 flex flex-col mb-[25px]">
                  <label className="inline-block text-sm tracking-wide mb-2">
                    SEO Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="seo_description"
                    className="form-control h-[100px] rounded text-[#495057] text-sm py-[10px] px-[15px] bg-[#fdfdff] focus:outline-none focus:border-[#95a0f4] border border-[#e4e6fc]"
                    name="seo_description"
                  />
                </div>

                <div className="col-12">
                  <button className="text-white rounded py-[.3rem] px-[.8rem] shadow-[0_2px_6px_#acb5f6] border border-[#6777ef] bg-[#2046DA]">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
