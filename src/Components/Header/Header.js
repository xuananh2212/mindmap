"use client"
import React from 'react'
import styles from './Header.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import clsx from 'clsx';
import Link from 'next/link';
import { Row, Col, Dropdown, notification } from 'antd';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { redirect } from 'next/navigation';

export default function Header() {
     const { user, error, isLoading } = useUser();
     if (isLoading) return <div>Loading...</div>;
     if (error) return <div>{error.message}</div>;
     const handleLogout = () => {
          console.log("hello");
          redirect('/api/auth/logout');
     }
     const items = [
          {
               label: 'Đăng xuất',
               key: '3',
               icon: <FaSignOutAlt />,
               onClick: handleLogout,
               style: {
                    fontSize: '1.4rem',
                    fontFamily: 'var(--font-family)',
                    padding: '0.8rem',
               },
          },
     ];


     return (
          <header>
               <nav>
                    <Row>
                         <Col>
                              <div className={clsx(styles.logo)}>
                                   <span>
                                        Mindmap Flow
                                   </span>

                              </div>

                         </Col>

                         <Col>
                              <nav>
                                   <ul>
                                        <li>
                                             <Link href={"/"}>Home</Link>
                                        </li>
                                        <li>
                                             <Link href={"/about"}>Giới Thiệu</Link>
                                        </li>
                                        <li>
                                             <Link href={"/feature"}>Tính Năng</Link>
                                        </li>
                                        <li>
                                             <Link href={"/price-service"}>Bảng giá</Link>
                                        </li>
                                        <li>
                                             <Link href={"/contact"}>Liên Hệ</Link>
                                        </li>
                                        {
                                             user && <li>
                                                  <Link href={'/mindmap'}>Mindmap</Link>
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
                                                       <div>
                                                            <button>
                                                                 <Link href={"/api/auth/login"}>Đăng Nhập</Link>
                                                            </button>
                                                            <button>
                                                                 Đăng Ký
                                                            </button>
                                                       </div>
                                                  )

                                             }
                                        </li>
                                   </ul>
                              </nav>

                         </Col>
                    </Row>

               </nav>

          </header>

     );
}
