import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import mindMapImage from '../../../public/imgs/minmap-2.jpg';
import FeedBack from '../../Components/FeedBack/FeedBack';
export default function Home() {
     return (
          <>
               <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
                    <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                         <svg
                              className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
                              viewBox="0 0 100 100"
                              fill="currentColor"
                              preserveAspectRatio="none slice"
                         >
                              <path d="M50 0H100L50 100H0L50 0Z" />
                         </svg>
                         <Image
                              width={1260}
                              height={750}
                              className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                              src="http://f8-mindmap.sanphamkythuat.online:880/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fso-do-tu-duy.95dad645.jpg&w=1200&q=75"
                              alt="mindmap"
                         />
                    </div>
                    <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                         <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                              <p className="inline-block px-3 py-px mb-4 text-3xl font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                                   Brand new
                              </p>
                              <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-none">
                                   Học tập hiệu quả
                                   <br className="hidden md:block" />
                                   với bản đồ{' '}
                                   <span className="inline-block text-deep-purple-accent-400">
                                        tư duy
                                   </span>
                              </h2>

                              <p className="pr-5 mb-5 text-base text-gray-700 md:text-2xl">
                                   Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                   accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                   quae. explicabo.
                              </p>
                              <div className="flex items-center">
                                   <Link
                                        href="/"
                                        className="bg-blue-900 inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                   >
                                        Sử dụng Miễn Phí
                                   </Link>

                              </div>
                         </div>
                    </div>
               </div>
               <div id="wrapper" className="grid grid-cols-1 xl:grid-cols-2">
                    <div id="col-1">
                         <Image
                              style={{ objectFit: "cover" }}
                              width={550}
                              height={300}
                              className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                              src={mindMapImage.src}
                              alt="mindmap"
                         />
                    </div>
                    <div id="col-2" className="px-3 md:px-20 xl:py-64 xl:px-12">

                         <div id="cards" className="rounded-lg flex border py-5 px-6 md:py-8 md:px-16 -mt-6 bg-white xl:-ml-24 xl:pl-8 xl:rounded-xl">
                              <div id="circle" className="w-8 h-8 bg-blue-500 md:w-16 md:h-16 rounded-full"></div>
                              <p className="pl-4 md:pl-12 text-base pt-1 font-semibold md:text-2xl md:pt-4">“Phát triển Tư Duy!”</p>
                         </div>

                         <div id="cards" className="rounded-lg flex border py-5 px-6 md:py-8 md:px-16 mt-6 md:mt-12 bg-white xl:pl-8 xl:rounded-xl">
                              <div id="circle" className="w-8 h-8 bg-blue-500 md:w-16 md:h-16 rounded-full"></div>
                              <p className="pl-4 md:pl-12 text-base pt-1 font-semibold md:text-2xl md:pt-4">“Vẽ Mọi Lúc!”</p>
                         </div>

                    </div>
               </div>
               <FeedBack />
          </>


     )
}
