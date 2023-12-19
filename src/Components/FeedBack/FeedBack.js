"use client"
import { Carousel, Rate } from 'antd';
import clsx from 'clsx';
import styles from './Feedback.module.scss';
import imgUser1 from '../../../public/imgs/user-1.jpg'
import Image from 'next/image';
export default function FeedBack() {
     return (
          <section className={clsx(styles.feedBack)}>
               <h2 className={clsx(styles.headingLv2)}>Đánh giá và Phản Hồi</h2>
               <Carousel
                    className={clsx(styles.carouselFeedBack, 'dark')}
                    autoplay
                    pauseOnDotsHover
                    pauseOnHover
                    draggable
                    autoplaySpeed={1800}
                    initialSlide={2}
                    slidesToShow={3}
                    slidesToScroll={1}
                    responsive={[
                         {
                              breakpoint: 991,
                              settings: {
                                   slidesToShow: 2,
                                   slidesToScroll: 1,
                                   initialSlide: 0,
                                   arrows: false,
                                   draggable: true,
                              },
                         },
                         {
                              breakpoint: 576,
                              settings: {
                                   slidesToShow: 1,
                                   slidesToScroll: 1,
                                   initialSlide: 0,
                                   arrows: false,
                                   draggable: true,
                              },
                         },
                    ]}
               >
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>Học Viện Kĩ Thuật Mật Mã</span>
                              <p className={clsx(styles.descFeddBack)}>
                                   Trang web Hay, vẽ dễ!
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <Image width={30} height={30} src={imgUser1.src} alt="user" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn A</span>
                                        <Rate disabled allowHalf defaultValue={3.5} />
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>Đại Học Bách Khoa Hà Nội</span>
                              <p className={clsx(styles.descFeddBack)}>
                                   Trang web  rất phong phú, đa dạng, giao diện đẹp.
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <Image width={30} height={30} src={imgUser1.src} alt="user" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn B</span>
                                        <Rate disabled allowHalf defaultValue={4.5} />
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>Đại Học FPT</span>
                              <p className={clsx(styles.descFeddBack)}>
                                   Từ khi có Trang web này tôi cảm thấy mình sắp xếp công việc thông minh hơn....
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <Image width={30} height={30} src={imgUser1.src} alt="user" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn C</span>
                                        <Rate disabled allowHalf defaultValue={3.5} />
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>Đại Học Công Nghiệp Hà Nội</span>
                              <p className={clsx(styles.descFeddBack)}>
                                   trang Web hay , vẽ dễ
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <Image width={30} height={30} src={imgUser1.src} alt="user" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn D</span>
                                        <Rate disabled allowHalf defaultValue={4.5} />
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>
                                   Học Viện Bưu Chính Viễn Thông
                              </span>
                              <p className={clsx(styles.descFeddBack)}>
                                   Trang web có kho đề rất phong phú...
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <Image width={30} height={30} src={imgUser1.src} alt="user" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn E</span>
                                        <Rate disabled allowHalf defaultValue={5} />
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className={clsx(styles.feedBackItem)}>
                         <div className={clsx(styles.feedBackItemInner)}>
                              <span className={clsx(styles.nameSchool)}>Đại Học Công Nghệ</span>
                              <p className={clsx(styles.descFeddBack)}>
                                   10đ , giao diện đẹp , vẽ dễ
                              </p>
                              <div className={clsx(styles.info)}>
                                   <div className={clsx(styles.imgWrap)}>
                                        <Image width={30} height={30} src={imgUser1.src} alt="user" />
                                   </div>
                                   <div className={clsx(styles.contentInfo)}>
                                        <span className={clsx(styles.nameUser)}>Nguyễn Văn F</span>
                                        <Rate disabled allowHalf defaultValue={5} />
                                   </div>
                              </div>
                         </div>
                    </div>
               </Carousel>
          </section>
     );
}
