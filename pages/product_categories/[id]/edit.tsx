import React from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../src/state/StateController";
import EditCategories from "../../../components/pages/AdminPage/Dashboard/ManageCategories/Categories/EditCategories";

interface Props {}

const edit: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <EditCategories></EditCategories>;
};

export default edit;
