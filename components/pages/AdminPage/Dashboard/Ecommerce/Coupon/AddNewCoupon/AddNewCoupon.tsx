import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineX } from "react-icons/hi";
import { controller } from "../../../../../../../src/state/StateController";
import { EcommerceApi } from "../../../../../../../src/API/EcommerceApi";
import { DayPicker } from "react-day-picker";
import { toast } from "react-hot-toast";

interface Props {
  title: string;
  showModal: boolean;
  setShowModal: any;
  // categoriesData: any;
}

const AddNewCoupon: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const { setShowModal, showModal } = props;
  const [selected, setSelected] = React.useState<Date>();

  const handleAdd = async (e: any) => {
    e.preventDefault();
    controller.setApiLoading(true);

    const couponInfo = {
      name: e.target.name.value,
      code: e.target.code.value,
      items_number: e.target.items_number.value,
      expired_date: e.target.expired_date.value,
      minimum_purchase: e.target.purchase.value,
      discount: {
        value: e.target.price.value,
        role: e.target.role.value,
      },

      status: e.target.status.value,
    };

    const { res, err } = await EcommerceApi.createCoupon(couponInfo);

    if (res) {
      setShowModal(false);
      toast.success("Coupon added Successfully");
      e.target.reset();
    } else
      (err: any) => {
        console.log(err);
      };

    controller.setApiLoading(false);
  };

  return (
    <>
      {showModal ? (
        <div className="relative mb-5">
          <div className="flex justify-center fixed inset-0 z-50 bg-black bg-opacity-10 backdrop-blur-[1px] overflow-y-scroll pb-5">
            <div className="bg-white px-6 py-6 rounded-md mt-10 shadow h-fit min-w-fit md:w-1/3">
              <div className="flex justify-between items-center">
                <h1 className="text-xl  font-bold text-slate-500">
                  {`Create ${props.title}`}
                </h1>
                <button onClick={() => setShowModal(false)}>
                  <HiOutlineX className="w-6 h-6 text-gray-500"></HiOutlineX>
                </button>
              </div>
              <div className="px-2">
                <form onSubmit={(e) => handleAdd(e)}>
                  <div className="mt-4">
                    <div className="my-2">
                      <label
                        className="text-[#34395e] tracking-[.5px] font-semibold mt-4	text-sm"
                        htmlFor="">
                        Name
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      className="w-full p-3 border border-gray-200 bg-[#fdfdff] rounded-md text-sm"
                      type="text"
                      name="name"
                      id=""
                    />
                  </div>
                  <div className="mt-4">
                    <div className="my-2">
                      <label
                        className="text-[#34395e] tracking-[.5px] font-semibold mt-4	text-sm"
                        htmlFor="">
                        Code
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      className="w-full p-3 border border-gray-200 bg-[#fdfdff] rounded-md text-sm"
                      type="text"
                      name="code"
                      id=""
                    />
                  </div>
                  <div className="mt-4">
                    <div className="my-2">
                      <label
                        className="text-[#34395e] tracking-[.5px] font-semibold mt-4	text-sm"
                        htmlFor="">
                        Number of times
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      min={0}
                      className="w-full p-3 border border-gray-200 bg-[#fdfdff] rounded-md text-sm"
                      type="number"
                      name="items_number"
                      id=""
                    />
                  </div>
                  <div className="mt-4">
                    <div className="my-2">
                      <label
                        className="text-[#34395e] tracking-[.5px] font-semibold mt-4	text-sm"
                        htmlFor="">
                        Expired Date
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      className="w-full p-3 border border-gray-200 bg-[#fdfdff] rounded-md text-sm"
                      type="date"
                      name="expired_date"
                      id=""
                    />
                  </div>
                  <div className="mt-4">
                    <div className="my-2">
                      <label
                        className="text-[#34395e] tracking-[.5px] font-semibold mt-4	text-sm"
                        htmlFor="">
                        Minimum Purchase Price
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <input
                      className="w-full p-3 border border-gray-200 bg-[#fdfdff] rounded-md text-sm"
                      type="number"
                      min={0}
                      name="purchase"
                      id=""
                    />
                  </div>
                  <div className="mt-4">
                    <div className="my-2">
                      <label
                        className="text-[#34395e] tracking-[.5px] font-semibold mt-4	text-sm"
                        htmlFor="">
                        Discount
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <div className="flex ">
                      <div className="w-1/4">
                        <select
                          className="w-full border rounded p-3 border-gray-200 bg-[#fdfdff] focus:outline-none"
                          name="role"
                          id="">
                          <option value="percent">Percentage(%)</option>
                          <option value="amount">Amount($)</option>
                        </select>
                      </div>
                      <div className="w-3/4">
                        <input
                          min={0}
                          className="w-full p-3 border border-gray-200 bg-[#fdfdff] rounded-md text-sm"
                          type="number"
                          name="price"
                          id=""
                          placeholder="Discount"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="my-2">
                      <label
                        className="text-[#34395e] tracking-[.5px] font-semibold mt-4	text-sm"
                        htmlFor="">
                        Status
                      </label>
                      <span className="text-red-500 ml-2">*</span>
                    </div>
                    <select
                      className="w-full border rounded p-2 border-gray-200 bg-[#fdfdff] focus:outline-none"
                      name="status"
                      id="">
                      <option value="active">Active</option>
                      <option value="inactive">InActive</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      // onClick={() => setShowModal(false)}
                      className="bg-blue-700 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded">
                      Save
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="ml-2 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded">
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddNewCoupon;
