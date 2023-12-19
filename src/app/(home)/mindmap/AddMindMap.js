"use client"
import React, { useState } from 'react'
import { notification } from 'antd';
import clsx from 'clsx';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { postMindMapMiddleware } from '@/store/middlewares/mindMapmiddleware';
import { MoonLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import styles from './mindmap.module.scss';
export default function AddMindMap() {
     const idUser = useSelector(state => state.mindMap.idUser);
     const [isLoading, setisLoading] = useState(false);
     const router = useRouter();
     const dispatch = useDispatch();
     const loadPostMindMap = async (id) => {
          try {
               const result = await dispatch(postMindMapMiddleware({
                    id,
                    name: "Mindmap không có tên",
                    desc: "chưa có mô tả",
                    title: "Mindmap không có tên",
                    descTitle: "",
                    idUser,
                    share: 1,
                    img: "http://f8-mindmap.sanphamkythuat.online:880/_next/static/media/so-do-tu-duy.95dad645.jpg",
                    nodes: [
                         {
                              id: 'node0',
                              type: 'textUpdater',
                              data: { label: 'FullStack' },
                              position: { x: 0, y: 50 },
                              style: {
                                   backgroundColor: "#0093E9",
                                   backgroundImage: "linear-gradient(160deg, #0093E9 0 %, #80D0C7 100 %)",
                                   color: "#fff",
                                   borderRadius: "3px"
                              }
                         }
                    ],
                    edges: [],
                    createDate: moment().format('DD/MM/YYYY HH:mm:ss')
               }));
               unwrapResult(result);
               router.push(`/mindmap/${id}`);
               setisLoading(false);

          } catch (e) {
               notification.error({
                    message: 'server error!!',
                    duration: 1.5,
               }
               )
               setisLoading(false);
          }

     }
     const handleClickMindMap = () => {
          setisLoading(true);
          const id = uuidv4();
          loadPostMindMap(id);
     }
     return (
          <>
               <div className={clsx(styles.addMindmap)}>
                    <button
                         className="btn"
                         onClick={handleClickMindMap}>
                         Thêm
                    </button>
               </div>
               {isLoading && (
                    <div className={clsx(styles.loading)}> <MoonLoader color="#36d7b7" /></div>
               )
               }
          </>
     )
}
