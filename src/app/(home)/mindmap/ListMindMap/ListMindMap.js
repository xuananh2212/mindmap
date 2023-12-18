"use client"
import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteAllMindMapMiddleware, deleteMindMapMiddleware, getMindMapMiddleware } from '@/store/middlewares/mindMapmiddleware';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import styles from './ListMindMap.module.scss';
import clsx from 'clsx';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { message, Popconfirm, Modal } from 'antd';
import Link from 'next/link';
export default function ListMindMap() {
     const idUser = useSelector((state) => state.mindMap.idUser);
     const [selectedItems, setSelectedItems] = useState([]);
     const dispatch = useDispatch();
     const [open, setOpen] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);

     const mindmaps = useSelector(state => state.mindMap.listMindMaps);
     const loadMindmaps = async () => {
          try {
               const result = await dispatch(getMindMapMiddleware(idUser));
               unwrapResult(result);

          } catch (e) {
               notification.error({
                    message: 'server error!!',
                    duration: 1.0,
               });
          }
     }
     const loadDeleteMindMaps = async (id) => {
          try {
               const result = await dispatch(deleteMindMapMiddleware(id));
               unwrapResult(result);
               message.success('xoá Thành công');
          } catch (e) {
               notification({
                    message: "server error",
                    duration: 1.0

               })
          }

     }
     const loadDeleteAllMindMaps = async () => {
          setConfirmLoading(true);
          try {
               if (mindmaps.length > 0) {
                    console.log(selectedItems);
                    const result = await dispatch(deleteAllMindMapMiddleware(mindmaps.filter(({ id }) => selectedItems.includes(id))));
                    unwrapResult(result);
                    message.success('xoá tất cả mindmap Thành công');
               }
               setSelectedItems([]);
               setConfirmLoading(false);
               setOpen(false);
          } catch (e) {
               notification({
                    message: "server error",
                    duration: 1.5

               })
               setOpen(false);
          }

     }
     function checkboxHandler(e) {
          let isSelected = e.target.checked;
          if (isSelected) {
               setSelectedItems([...selectedItems, e.target.value])
          } else {
               setSelectedItems((prevData) => {
                    return prevData.filter((id) => {
                         return id !== e.target.value;
                    })
               })
          }
     }
     function checkAllHandler(e) {
          if (e.target.checked) {
               console.log(mindmaps?.map(({ id }) => id));
               setSelectedItems(mindmaps?.map(({ id }) => id));

          } else {
               setSelectedItems([]);
          }

     }
     const handleRemoveAllMindMap = () => {
          setOpen(true);

     }

     const handleRemoveMindMapById = (id) => {
          loadDeleteMindMaps(id);
     }
     const handleOk = () => {
          loadDeleteAllMindMaps();
     };

     const handleCancel = () => {
          console.log('Clicked cancel button');
          setOpen(false);
     };
     const cancel = (e) => {

     };
     useEffect(() => {
          loadMindmaps();
     }, [idUser])
     return (
          <table className={clsx(styles.tableMindMap)}>
               <thead>
                    <tr>
                         <th style={{ width: "10%", textAlign: "center" }}>
                              <div className={clsx(styles.checkAllMindMap)}>
                                   <input
                                        type="checkbox"
                                        checked={mindmaps.length > 0 && (mindmaps?.length === selectedItems.length ? true : false)}
                                        onChange={checkAllHandler} />
                                   {

                                        mindmaps.length > 0 && selectedItems.length > 0 &&
                                        (

                                             <>
                                                  <button
                                                       className={clsx(styles.btnCheckAll)}
                                                       onClick={handleRemoveAllMindMap}>
                                                       <FaTrashAlt className={clsx(styles.icon, styles.iconRemove)} />
                                                  </button>
                                                  <Modal
                                                       title="Bạn muốn xóa Tất cả mindmap này?"
                                                       open={open}
                                                       onOk={handleOk}
                                                       confirmLoading={confirmLoading}
                                                       onCancel={handleCancel}
                                                  >
                                                       <p>Nếu xóa bạn không thể phục hồi dữ liệu!</p>
                                                  </Modal>
                                             </>


                                        )

                                   }
                              </div>
                         </th>
                         <th style={{ width: "30%" }} >
                              <h3>Tên</h3>
                         </th>
                         <th style={{ width: "20%" }} >
                              <h3>Trạng thái</h3>
                         </th>
                         <th style={{ width: "30%" }}>
                              <h3>Tạo lúc</h3>
                         </th>
                         <th style={{ width: "10%" }}>
                              <h3>Hành Động</h3>
                         </th>
                    </tr>
               </thead>
               <tbody>
                    {mindmaps.length > 0
                         &&
                         (
                              mindmaps.map(({ id, title, desc, createDate, share }) => (
                                   <tr key={id}>
                                        <td style={{ textAlign: "center" }}>
                                             <input type="checkbox" value={id} checked={selectedItems.includes(id)} onChange={checkboxHandler} />

                                        </td>
                                        <td>
                                             <div className={clsx(styles.name)}>
                                                  <h4>{title}</h4>
                                                  <p className={clsx(styles.desc)}>
                                                       {desc}
                                                  </p>

                                             </div>

                                        </td>
                                        <td>
                                             <span className={clsx(styles.status)}>
                                                  {share === 1 ? "Chỉ mình Tôi" : "Công khai"}
                                             </span>

                                        </td>

                                        <td>
                                             <span className={clsx(styles.date)}>
                                                  {createDate}
                                             </span>

                                        </td>
                                        <td>
                                             <div className={clsx(styles.action)}>

                                                  <Link href={`/mindmap/${id}`}>
                                                       <FaEdit className={clsx(styles.icon)} />
                                                  </Link>
                                                  <Popconfirm
                                                       placement="top"
                                                       title="Bạn muốn xóa mindmap này?"
                                                       description="Nếu xóa bạn không thể phục hồi dữ liệu!"
                                                       onConfirm={() => handleRemoveMindMapById(id)}
                                                       onCancel={cancel}
                                                       okText="Yes"
                                                       cancelText="No"
                                                  >
                                                       <button>
                                                            <FaTrashAlt className={clsx(styles.icon, styles.iconRemove)} />
                                                       </button>
                                                  </Popconfirm>
                                             </div>

                                        </td>

                                   </tr>


                              ))
                         )
                    }

               </tbody>
          </table>
     )
}
