import React from "react";
import { useSelector } from "react-redux";
import EditSlider from "../../../components/pages/AdminPage/Dashboard/ManageWebsite/Slider/EditSlider";
import { controller } from "../../../src/state/StateController";

interface Props {}

const edit: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return <EditSlider />;
};

export default edit;
