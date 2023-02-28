import React from "react";
import { useSelector } from "react-redux";
import EditMegaMenuCategory from "../../../../components/pages/AdminPage/Dashboard/ManageCategories/MegaMenuCategory/EditMegaMenuCategory";
import { controller } from "../../../../src/state/StateController";

interface Props {}

const edit: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <EditMegaMenuCategory />;
};

export default edit;