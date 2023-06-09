import React from "react";
import { useSelector } from "react-redux";

import { controller } from "../../../../src/state/StateController";
import ProductEdit from "../../../../components/pages/SellerPage/ManageProducts/ProductEdit/ProductEdit";
import withSellerPrivate from "../../../../components/hocs/withSellerPrivate";

interface Props {}
// const actions = {
//   isSeller: false,
// };
const edit: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <ProductEdit />;
};

export default withSellerPrivate(edit);
