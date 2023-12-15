"use client"
import React from 'react'
import styles from './Header.module.scss';
import { useUser } from '@auth0/nextjs-auth0/client';
import clsx from 'clsx';
import Link from 'next/link';
import { Row, Col, Dropdown, notification } from 'antd';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { usePathname } from 'next/navigation'

export default function Header() {
     const { user, error, isLoading } = useUser();
     const pathname = usePathname()
     if (isLoading) return <div>Loading...</div>;
     if (error) return <div>{error.message}</div>;
     const handleLogout = () => {
          window.location.replace(`/api/auth/logout`);
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
          <header className={clsx(styles.header)}>
               <nav>
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
                              <nav className={clsx(styles.navBar)}>
                                   <ul>
                                        <li>
                                             <Link
                                                  href={"/"}
                                                  className={`link ${pathname === '/' ? 'active' : ''}`}
                                             >Home</Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/about"}
                                                  className={`link ${pathname === '/about' ? 'active' : ''}`}
                                             >
                                                  Giới thiệu
                                             </Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/feature"}
                                                  className={`link ${pathname === '/feature' ? 'active' : ''}`}
                                             >Tính năng</Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/price-service"}
                                                  className={`link ${pathname === '/price-service' ? 'active' : ''}`}
                                             >Bảng giá</Link>
                                        </li>
                                        <li>
                                             <Link
                                                  href={"/contact"}
                                                  className={`link ${pathname === '/contact' ? 'active' : ''}`}
                                             >Liên hệ</Link>
                                        </li>
                                        {
                                             user && <li>
                                                  <Link
                                                       href={'/mindmap'}
                                                       className={`link ${pathname === '/mindmap' ? 'active' : ''}`}
                                                  >Mindmap</Link>
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
                              </nav>

                         </Col>
                    </Row>

               </nav>

          </header>

     );
}
