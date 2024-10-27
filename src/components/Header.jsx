import React from "react";
import { useAppStore } from "../store";


const Header = () => {
  const {userInfo} = useAppStore();
  return (
    <>
      <div className="bg-white  h-[100px] w-[100%] p-2">
        <div className="flex align-top justify-end pe-10 pt-2">
          <ul className="flex text-sm align-top text-left">
            <li className="ps-4">Help</li>
            <li className="ps-4">Orders & Returns</li>
            <li className="ms-3 ps-4">Hi, <span className="font-semibold"> {userInfo && userInfo.name} </span> </li>
          </ul>
        </div>
        <div className="flex justify-between ps-10 pe-10 items-center">
          <h1 className="text-3xl font-bold cursor-pointer">ECOMMERCE</h1>
          <div className="flex">
            <ul className="flex">
              <li className="ms-3 me-3 font-medium cursor-pointer">
                Categories
              </li>
              <li className="ms-3 me-3 font-medium cursor-pointer">Sale</li>
              <li className="ms-3 me-3 font-medium cursor-pointer">
                Clearance
              </li>
              <li className="ms-3 me-3 font-medium cursor-pointer">
                New Stock
              </li>
              <li className="ms-3 me-3 font-medium cursor-pointer">Trending</li>
            </ul>
          </div>
          <div className="">
            <div className="flex text-left justify-end">
              <i className=" cursor-pointer ms-3 me-3 fa-solid fa-magnifying-glass" />
              <i className=" cursor-pointer ms-3 fa-solid fa-cart-shopping" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 h-[36px] w-[100%] flex justify-center items-center ">
        <div className="ms-10">
          <i className="fa-solid fa-less-than pe-8 cursor-pointer"></i>
          Get 10% off on business sign up
          <i className="ps-8 fa-solid fa-greater-than cursor-pointer"></i>
        </div>
      </div>
    </>
  );
};

export default Header;
