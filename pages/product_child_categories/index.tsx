import React from 'react'
import { useSelector } from 'react-redux'
import ProductChildCategory from '../../components/pages/AdminPage/Dashboard/ManageCategories/ProductChildCategory/ProductChildCategory';
import { controller } from './../../src/state/StateController';

interface Props {
}

const index: React.FC<Props> = (props) => {

  const states = useSelector(() => controller.states)
  
  return (
    <ProductChildCategory />
  )
}

export default index