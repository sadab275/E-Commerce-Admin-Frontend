import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import CreateAdmin from "../../../components/pages/AdminPage/Dashboard/AdminList/CreateAdmin";
import withAdminPrivate from "../../../components/hocs/withAdminPrivate";

interface Props {}

const create: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <CreateAdmin />;
};

// export default create;

export default withAdminPrivate(create);
