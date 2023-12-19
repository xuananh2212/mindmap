import styles from './Header.module.scss';
import clsx from 'clsx';
import { getSession } from "@auth0/nextjs-auth0";
import Link from 'next/link';
import { Row, Col } from 'antd';
import Menu from '@/Components/Menu/Menu'
export default async function Header() {
     let user = null;
     const session = await getSession();
     if (session) {
          user = session.user;
     }
     return (
          <header className={clsx(styles.header, "bg-gray-50")}>
               <div className='container'>
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
                                   <Menu user={user} />
                              </Col>
                         </Row>
                    </nav>
               </div>

          </header>

     );
}
