import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ReviewTable from "./ReviewTable";
import { controller } from "../../../../../src/state/StateController";
import { IReview } from "../../../../../interfaces/models";
import { EcommerceApi } from "../../../../../src/API/EcommerceApi";
import DashboardBreadcrumb from "../../../../shared/SharedDashboardBreadcumb/DashboardBreadcrumb";

interface Props {}
const tableHeaders = ["SN", "Name", "Product", "Rating", "Status", "Action"];
const actions = {
  // isEditable: true,
  isDeletable: true,
  isViewable: true,
  isSeller: true,
};

const ProductReview: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [deleteModalSlug, setDeleteModalSlug] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [searchString, setSearchString] = useState("");
  const [reviewDatas, setReviewDatas] = useState<IReview[]>([]);

  const seller_slug = states.currentUser?.slug;

  const getAllReviews = async () => {
    if (seller_slug) {
      const { res, err } = await EcommerceApi.getAllSellerReviews(
        seller_slug,
        `sortBy=${sortBy}&sortType=${sortType}&search=${searchString}`
      );
      if (res) {
        console.log(res);
        setReviewDatas(res);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllReviews();
  }, [searchString, sortBy, sortType]);

  return (
    <div className="w-full">
      <DashboardBreadcrumb
        headline="Product Reviews"
        slug="Product Reviews"
        link="/product_reviews"
      ></DashboardBreadcrumb>
      <div className="mx-[25px]">
        <div className="section-body">
          <div className="mt-7">
            <ReviewTable
              reviewDatas={reviewDatas}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortType={sortType}
              setSortType={setSortType}
              searchString={searchString}
              setSearchString={setSearchString}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
