"use client";
import React, { useEffect } from 'react'
import { Dropdown } from 'antd';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import styles from "./Auth.module.scss";
import clsx from 'clsx';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { mindMapSlices } from '@/store/slices/mindMapSlices';
import { useRouter } from 'next/navigation';
const { idUser } = mindMapSlices.actions;
export default function Auth({ user }) {
     console.log(user);
     const route = useRouter();
     const dispatch = useDispatch();
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
          <div>
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
          </div>
     )
}
