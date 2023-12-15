"use client"
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { postMindMapMiddleware } from '@/store/middlewares/mindMapmiddleware';
import { useDispatch } from 'react-redux';
import styles from './mindmap.module.scss';
import clsx from 'clsx';
import ListMindMap from './ListMindMap/ListMindMap';
import { notification } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
export default function Mindmap() {
     const router = useRouter();
     const dispatch = useDispatch();
     const loadPostMindMap = async (id) => {
          try {
               const result = await dispatch(postMindMapMiddleware({
                    id,
                    title: "Mindmap không có tên",
                    desc: "chưa có mô tả",
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

          } catch (e) {

               notification.error({
                    message: 'server error!!',
                    duration: 1.5,
               }
               )
          }

     }
     const handleClickMindMap = () => {
          const id = uuidv4();
          loadPostMindMap(id);

     }
     return (
          <div className={clsx(styles.mindmap)}>
               <h2 className={clsx(styles.headingLv2)}>MindMap của tôi</h2>
               <div className={clsx(styles.addMindmap)}>
                    <button
                         className="btn"
                         onClick={handleClickMindMap}>
                         Thêm
                    </button>
               </div>
               <ListMindMap />
          </div>
     )
}
