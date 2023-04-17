import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../../../src/state/StateController";
import Table from "../../../../../shared/SharedTable/Table";
import DashboardBreadcrumb from "../../../../../shared/SharedDashboardBreadcumb/DashboardBreadcrumb";
import { IOrder } from "../../../../../../interfaces/models";
import { EcommerceApi } from "../../../../../../src/API/EcommerceApi";

interface Props {}

const PendingOrders: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  const [pendingOrdersData, setPendingOrdersData] = useState<IOrder[]>([]);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [searchString, setSearchString] = useState("");
  const [deleteModalSlug, setDeleteModalSlug] = useState<any | string>("");
  const [showUpdateModal, setShowUpdateModal] = useState<any | string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const handleDelete = async () => {
    controller.setApiLoading(true);

    const { res, err } = await EcommerceApi.deleteByModal(
      deleteModalSlug,
      "orders"
    );
    if (res) {
      setDeleteModalSlug("");
      const remaining = pendingOrdersData.filter(
        (order) => order.slug !== deleteModalSlug
      );
      setPendingOrdersData(remaining);
    }

    controller.setApiLoading(false);
  };

  useEffect(() => {
    const findPendingOrdersAdmin = async () => {
      const { res, err } = await EcommerceApi.allOrdersAdmin(
        `sortBy=${sortBy}&sortType=${sortType}&search=${searchString}&page=${page}&limit=${limit}&order_status=pending`
      );
      if (err) {
        console.log(err);
      } else {
        setPendingOrdersData(res.filteredOrdersData);
        setCount(res.filteredOrdersCount);
        console.log(res);
      }
    };
    findPendingOrdersAdmin();
  }, [searchString, sortBy, sortType, showUpdateModal]);

  // console.log({ searchString, sortBy, sortType });
  // console.log("pendingOrdersData-", pendingOrdersData.length);

  const tableHeaders = {
    SN: "sn",
    Customer: "userData.fullName",
    "Order Id": "slug",
    Date: "createdAt",
    Quantity: "quantity",
    Amount: "subTotal",
    "Order Status": "order_status",
    Payment: "payment_status",
    Action: "action",
  };

  return (
    <div>
      <DashboardBreadcrumb
        headline="Pending Orders"
        slug="Pending Orders"
        link="/pending_orders"
      />

      <Table
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        handleDelete={handleDelete}
        deleteModalSlug={deleteModalSlug}
        setDeleteModalSlug={setDeleteModalSlug}
        sortBy={sortBy}
        sortType={sortType}
        setSortBy={setSortBy}
        setSortType={setSortType}
        setSearchString={setSearchString}
        ordersData={pendingOrdersData}
        tableHeaders={tableHeaders}
        count={count}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default PendingOrders;
