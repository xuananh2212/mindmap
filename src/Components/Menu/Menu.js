"use client";
import React, { useEffect } from 'react'
import { Dropdown } from 'antd';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import styles from "./Menu.module.scss";
import clsx from 'clsx';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { mindMapSlices } from '@/store/slices/mindMapSlices';
import { usePathname, useRouter } from 'next/navigation';
const { idUser } = mindMapSlices.actions;
export default function Menu({ user }) {
     const pathname = usePathname();
     const route = useRouter();
     const dispatch = useDispatch();
     console.log(pathname);
     useEffect(() => {
          if (user) {
               dispatch(idUser(user.sub));
          }

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
     )
}
