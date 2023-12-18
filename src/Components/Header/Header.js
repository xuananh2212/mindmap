import styles from './Header.module.scss';
import clsx from 'clsx';
import { getSession } from "@auth0/nextjs-auth0";
import Link from 'next/link';
import { Row, Col } from 'antd';
import { headers } from "next/headers";
import Auth from '../Auth/Auth';
export default async function Header() {
     let user = null;
     const session = await getSession();
     if (session) {
          user = session.user;
     }
     console.log(user);
     const headersList = headers();
     const pathname = headersList.get('x-pathname');
     console.log(pathname);

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
                                             <Auth user={user} />

                                        </li>
                                   </ul>
                              </nav>

                         </Col>
                    </Row>

               </nav>

          </header>

     );
}
