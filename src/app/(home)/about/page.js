import React from 'react'
import Image from 'next/image';
import { Fa0, Fa1, Fa2, Fa3, Fa4, Fa5, Fa6 } from "react-icons/fa6";
import Link from 'next/link'
import minMapImage from '../../../../public/imgs/mindmap.jpg';


export default function About() {
     return (
          <section className="relative pt-16 bg-blueGray-50">
               <div className="container mx-auto">
                    <div className="flex flex-wrap items-center">
                         <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
                              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-pink-500">
                                   <Image height={400} width={400} alt="..." src={minMapImage.src} className="w-full align-middle rounded-t-lg" />
                                   <blockquote className="relative p-8 mb-4">
                                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-95-px -top-94-px">
                                             <polygon points="-30,95 583,95 583,65" className="text-pink-500 fill-current"></polygon>
                                        </svg>
                                        <h4 className="text-xl font-bold text-white">
                                             Great for your awesome project
                                        </h4>
                                        <p className="text-md font-light mt-2 text-white leading-10">
                                             Putting together a page has never been easier than matching
                                             together pre-made components. From landing pages presentation
                                             to login areas, you can easily customise and built your pages.
                                        </p>
                                   </blockquote>
                              </div>
                         </div>
                         <div className="w-full md:w-6/12 px-4">
                              <div className="flex flex-wrap">
                                   <div className="w-full md:w-6/12 px-4">
                                        <div className="relative flex flex-col mt-4">
                                             <div className="px-4 py-5 flex-auto">
                                                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                       <Fa0 />
                                                  </div>
                                                  <h6 className="text-xl mb-1 font-semibold">CSS Components</h6>
                                                  <p className="mb-4 text-blueGray-500 leading-10">
                                                       Notus JS comes with a huge number of Fully Coded CSS
                                                       components.
                                                  </p>
                                             </div>
                                        </div>
                                        <div className="relative flex flex-col min-w-0">
                                             <div className="px-4 py-5 flex-auto">
                                                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                       <Fa1 />
                                                  </div>
                                                  <h6 className="text-xl mb-1 font-semibold">
                                                       JavaScript Components
                                                  </h6>
                                                  <p className="mb-4 text-blueGray-500 leading-10">
                                                       We also feature many dynamic components for React, NextJS,
                                                       Vue and Angular.
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                                   <div className="w-full md:w-6/12 px-4">
                                        <div className="relative flex flex-col min-w-0 mt-4">
                                             <div className="px-4 py-5 flex-auto">
                                                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                       <Fa2 />
                                                  </div>
                                                  <h6 className="text-xl mb-1 font-semibold">Pages</h6>
                                                  <p className="mb-4 text-blueGray-500 leading-10">
                                                       This extension also comes with 3 sample pages. They are
                                                       fully coded so you can start working instantly.
                                                  </p>
                                             </div>
                                        </div>
                                        <div className="relative flex flex-col min-w-0">
                                             <div className="px-4 py-5 flex-auto">
                                                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                                       <Fa3 />
                                                  </div>
                                                  <h6 className="text-xl mb-1 font-semibold">Documentation</h6>
                                                  <p className="mb-4 text-blueGray-500 leading-10">
                                                       Built by developers for developers. You will love how easy
                                                       is to to work with Notus JS.
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
               <footer className="relative bg-blueGray-50 pt-8 pb-6 mt-2">
                    <div className="container mx-auto px-4">
                         <div className="flex flex-wrap items-center md:justify-between justify-center">
                              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                   <div className="text-sm text-blueGray-500 font-semibold py-1">
                                        Made with <Link href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</Link> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                                   </div>
                              </div>
                         </div>
                    </div>
               </footer>
          </section>
     )
}
