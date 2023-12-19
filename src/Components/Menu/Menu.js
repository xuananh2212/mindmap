"use client";
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'antd';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import styles from "./Menu.module.scss";
import clsx from 'clsx';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { mindMapSlices } from '@/store/slices/mindMapSlices';
import { usePathname, useRouter } from 'next/navigation';
import { BsArrowUpSquareFill } from "react-icons/bs";
const { idUser } = mindMapSlices.actions;
import { Row, Col } from 'antd';
export default function Menu({ user }) {
     const [navBarSticky, setNavbarSticky] = useState(false);
     const [arrowTop, setArrowTop] = useState(false);
     const pathname = usePathname();
     const route = useRouter();
     const dispatch = useDispatch();
     const handleNavbarStick = () => {
          if (window !== undefined) {
               window.scrollY > 100 ? setNavbarSticky(!navBarSticky) : setNavbarSticky(navBarSticky);
          }
     };
     const handleArrowTop = () => {
          if (window !== undefined) {
               window.scrollY > 100 ? setArrowTop(true) : setArrowTop(false);
          }
     };
     const handleClickArrowTop = () => {
          if (window !== undefined) {
               window.scrollTo(0, 0);
          }
     }
     useEffect(() => {
          if (user) {
               dispatch(idUser(user.sub));
          }
          window.addEventListener('scroll', handleNavbarStick);
          window.addEventListener('scroll', handleArrowTop);
          return () => {
               window.removeEventListener('scroll', handleNavbarStick);
               window.removeEventListener('scroll', handleArrowTop);
          };
     }, []);
     const handleLogout = () => {
          route.push(`/api/auth/logout`);
     }

     const items = [
          {
               label: `Hi! ${user?.nickname}`,
               key: '0',
               style: {
                    fontSize: '1.4rem',
                    padding: '0.8rem',
               },
          },
          {
               label: 'Đăng xuất',
               key: '1',
               icon: <FaSignOutAlt />,
               onClick: handleLogout,
               style: {
                    fontSize: '1.4rem',
                    padding: '0.8rem',
               },
          },
     ];
     return (
          <>
               <div className={navBarSticky ? clsx(styles.navBar, styles.stick) : clsx(styles.navBar)}>
                    <div className='container'>
                         <Row align={"middle"}>
                              <Col xl={4}>
                                   <Link href='/'>
                                        <div className={clsx(styles.logo)}>
                                             <span>
                                                  Mindmap Flow
                                             </span>

                                        </div>
                                   </Link>

                              </Col>
                              <Col xl={20}>
                                   <ul className={clsx(styles.navigate)}>
                                        <li>
                                             <Link
                                                  href={"/"}
                                                  className={`link ${pathname === '/' && 'active'}`}
                                             >
                                                  Home
                                             </Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/about"}
                                                  className={`link ${pathname === '/about' && 'active'}`}
                                             >
                                                  Giới thiệu
                                             </Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/feature"}
                                                  className={`link ${pathname === '/feature' && 'active'}`}
                                             >Tính năng
                                             </Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/price-service"}
                                                  className={`link ${pathname === '/price-service' && 'active'}`}
                                             >Bảng giá
                                             </Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/contact"}
                                                  className={`link ${pathname === '/contact' && 'active'}`}
                                             >Liên hệ
                                             </Link>
                                        </li>
                                        {
                                             user && <li>
                                                  <Link
                                                       href={'/mindmap'}
                                                       className={`link ${pathname === '/mindmap' && 'active'}`}
                                                  >Mindmap
                                                  </Link>
                                             </li>
                                        }
                                        <li>

                                             {
                                                  user ? (


                                                       <Dropdown
                                                            menu={{ items }}
                                                            trigger={['hover']}
                                                            placement={'bottomRight'}
                                                       >
                                                            <button className={clsx(styles.btnHeader)}>
                                                                 <FaUser className={clsx(styles.user)} />
                                                            </button>
                                                       </Dropdown>

                                                  ) : (
                                                       <div className={clsx(styles.btnGroup)}>
                                                            <Link href={"/api/auth/login"}>
                                                                 <button className={clsx(styles.btnLogin)}>
                                                                      Đăng Nhập
                                                                 </button>
                                                            </Link>

                                                            <button className={clsx(styles.btnResgiter)}>
                                                                 Đăng Ký
                                                            </button>
                                                       </div>
                                                  )

                                             }
                                        </li>
                                   </ul>
                              </Col>
                         </Row>
                    </div>
               </div>
               {
                    arrowTop && (
                         <button
                              onClick={handleClickArrowTop}
                              className={clsx(styles.btnArrowTop)}>
                              <BsArrowUpSquareFill className={clsx(styles.icon)} />
                         </button>
                    )
               }
          </>

     )
}
