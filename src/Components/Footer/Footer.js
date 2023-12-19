import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
export default function Footer() {
     return (
          <footer className="footer bg-gray-50 p-10 bg-neutral text-neutral-content">
               <div className="container">

                    <div className="h-1/2 w-full flex md:flex-row flex-col justify-between items-start">
                         <div className="p-12 ">
                              <ul>
                                   <p className="text-gray-800 font-bold text-3xl pb-6">
                                        Mind<span className="text-blue-600">map</span>
                                   </p>
                                   <div className="flex gap-6 pb-5">
                                        <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
                                        <FaTwitter className="text-2xl cursor-pointer hover:text-blue-600" />
                                        <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
                                        <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
                                   </div>
                              </ul>
                         </div>
                         <div className="p-12">
                              <ul>
                                   <p className="text-gray-800 font-bold text-2xl pb-4">Product</p>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Stocks
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Futures & Options
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Mutual Funds
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Fixed deposits
                                   </li>
                              </ul>
                         </div>
                         <div className="p-12">
                              <ul>
                                   <p className="text-gray-800 font-bold text-2xl pb-4">Company</p>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        About
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Products
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Pricing
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Careers
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Press & Media
                                   </li>
                              </ul>
                         </div>
                         <div className="p-12">
                              <ul>
                                   <p className="text-gray-800 font-bold text-2xl pb-4">Support</p>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Contact
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Support Portals
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        List Of Charges
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Downloads & Resources
                                   </li>
                                   <li className=" text-md pb-10  hover:text-blue-600 cursor-pointer">
                                        Videos
                                   </li>
                              </ul>
                         </div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center  p-5 bg-gray-50">
                         <h1 className=" text-gray-800 ">
                              © 2021-2022 All rights reserved | Build with ❤ by{" "}
                              <span className="hover:text-blue-600  cursor-pointer">
                                   streamline{" "}
                              </span>
                         </h1>
                    </div>
               </div>
          </footer>
     )
}
