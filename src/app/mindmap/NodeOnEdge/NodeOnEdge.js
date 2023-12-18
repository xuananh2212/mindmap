"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
     useNodesState,
     useEdgesState,
     addEdge,
     useReactFlow,
     MiniMap,
     Background,
     Controls,
     Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useSWR from 'swr';
import { FaShare } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { MdOutlineClear } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import styles from './NodeOnEdge.module.scss';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { notification, Radio, Form, Input, Button, Modal } from 'antd';
import { updateMindMapMiddleware } from '@/store/middlewares/mindMapmiddleware';
import { useUser } from '@auth0/nextjs-auth0/client';
import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import CustomNode from '../Flow/CustomNode';
import CustomEdge from '../Flow/CustomEdge';
const nodeTypes = { textUpdater: CustomNode };
const edgeTypes = {
     'custom-edge': CustomEdge,
};
export const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function NodeOnEdgeDrop({ id: paramsId }) {
     const { user } = useUser();
     const route = useRouter();
     const dispatch = useDispatch();
     const [value, setValue] = useState(1);
     const [form] = Form.useForm();
     const urlRef = useRef("");
     const [open, setOpen] = useState(false);
     const [loading, setLoading] = useState(false);
     const [variant, setVariant] = useState('cross');
     const [id, setId] = useState(null);
     const lastIdRef = useRef(1);
     const [titleMindMap, setTitleMindMap] = useState("");
     const [descMindMap, setDescMindMap] = useState("");
     const reactFlowWrapper = useRef(null);
     const connectingNodeId = useRef(null);
     const [nodes, setNodes, onNodesChange] = useNodesState([]);
     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
     const { screenToFlowPosition } = useReactFlow();
     const { data } = useSWR(`https://gsv9fx-8080.csb.app/mindmap/${paramsId}`, fetcher);
     useEffect(() => {
          window.addEventListener("keyup", handleDeleteNodeAndEdges);
          return () => {
               window.removeEventListener('keyup', handleDeleteNodeAndEdges);
          };
     }, [id]);
     useEffect(() => {
          if (data) {
               setNodes(data.nodes);
               setEdges(data.edges);
               setTitleMindMap(data.name);
               setDescMindMap(data.desc);
               lastIdRef.current = +data.nodes[data.nodes?.length - 1]?.id?.match(/[0-9]+/)[0];
               setValue(data.share);
               form.setFieldsValue({
                    urlShare: urlRef.current,
                    title: data.title,
                    descTitle: data.descTitle,
                    image: data.img
               })
          }
     }, [data, user]);
     useEffect(() => {
          if (typeof window !== 'undefined') {
               urlRef.current = window.location.href;
          }
     }, [])


     const onConnect = useCallback(
          (params) => {
               connectingNodeId.current = null;
               setEdges((eds) => addEdge(params, eds))
          }, []);
     const onConnectStart = useCallback((_, { nodeId }) => {
          connectingNodeId.current = nodeId;
     }, []);
     const getId = () => {
          return `${++lastIdRef.current}`
     };
     const onConnectEnd = useCallback(
          (event) => {
               if (!connectingNodeId.current) return;

               const targetIsPane = event.target.classList.contains('react-flow__pane');

               if (targetIsPane) {
                    const id = getId();
                    const newNode = {
                         id: `node${id}`,
                         position: screenToFlowPosition({
                              x: event.clientX,
                              y: event.clientY,
                         }),
                         data: { label: `Node ${id}` },
                         origin: [0.5, 0.0],
                         type: "textUpdater",
                         style: {
                              backgroundColor: "#0093E9",
                              backgroundImage: "linear-gradient(160deg, #0093E9 0 %, #80D0C7 100 %)",
                              color: "#fff",
                              border: "none",
                              borderRadius: "3px"
                         }
                    };

                    setNodes((nds) => [...nds, newNode]);
                    setEdges((eds) =>
                         [...eds, { id: `edge${id}`, source: connectingNodeId.current, target: `node${id}` }]
                    );
               }
          },
          [screenToFlowPosition]

     )

     const handleClickNode = (_, { id }) => {
          setId(id);

     }
     const handleClickEdge = (_, { id }) => {
          setId(id);

     }
     const loadUpdateMindMap = async (image, title, descTile, share) => {
          try {
               if (data) {
                    const result = await dispatch(updateMindMapMiddleware({
                         id: data.id,
                         name: titleMindMap,
                         title: title ?? data.title,
                         desc: descMindMap,
                         idUser: data.idUser,
                         descTitle: descTile ?? data.descTitle,
                         img: image ?? data.img,
                         share: share ?? data.share,
                         nodes: nodes,
                         edges: edges,
                         createDate: data.createDate,
                    }))
                    unwrapResult(result);
                    notification.success({
                         message: 'Cập nhập thành công',
                         duration: 1.0,
                    })
               }
               setLoading(false);

          } catch (e) {
               notification.error({
                    message: 'server error!!',
                    duration: 1.0,
               })
          }
     }
     const handleClickSave = () => {
          loadUpdateMindMap();
     }
     const handleDeleteNodeAndEdges = (e) => {
          if (e.code === 'Delete' && id && id !== "node0") {
               if (id.charAt(0) === 'n') {
                    setNodes((nodes) => {
                         console.log(nodes);
                         return nodes.filter(node => node.id !== id);
                    });
                    setEdges((edges) => edges.filter((edge) => edge.source !== id));

               } else {
                    setEdges((edges) => edges.filter((edge) => edge.id !== id));
               }
          }

     }

     const showModal = () => {
          setOpen(true);
     };

     const handleOk = () => {
          setLoading(true);
          const valueForm = form.getFieldsValue();
          const { image, title, descTitle } = valueForm;
          console.log(image, title, descTitle);
          loadUpdateMindMap(image, title, descTitle, value);


     };

     const handleCancel = () => {
          setOpen(false);
     };
     const onChange = (e) => {
          console.log('radio checked', e.target.value);
          setValue(e.target.value);
     };
     const handleFocus = (e) => {
          e.target.select();
     };

     return (
          <div className={clsx(styles.nodeOnEdge)}>
               <div className={clsx(styles.content)}>
                    <div className={clsx(styles.contentLeft)}>
                         <input
                              className={clsx(styles.title)}
                              value={titleMindMap}
                              onChange={(e) => setTitleMindMap(e.target.value)}
                         />


                         <input
                              className={clsx(styles.desc)}
                              value={descMindMap}
                              onChange={(e) => setDescMindMap(e.target.value)}
                         />

                    </div>
                    {user && (
                         <div className={clsx(styles.contentRight)}>
                              <button
                                   className={clsx(styles.btnSave)}
                                   onClick={handleClickSave}
                              >
                                   <IoMdSave />
                                   Lưu Thay Đổi
                              </button>
                              <>
                                   <button
                                        className={clsx(styles.btnShare)}
                                        type="primary" onClick={showModal}
                                   >
                                        <FaShare />
                                        Chia Sẻ
                                   </button>
                                   <Modal
                                        open={open}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        style={{ textAlign: 'center' }}
                                        footer={[
                                             <Button
                                                  key="back"
                                                  onClick={handleCancel}
                                                  icon={<MdOutlineClear />}
                                             >
                                                  Đóng
                                             </Button>,
                                             <Button

                                                  key="submit"
                                                  type="primary"
                                                  loading={loading}
                                                  onClick={handleOk}
                                                  icon={<FaPlus />}
                                             >
                                                  Lưu Lại
                                             </Button>
                                        ]}
                                   >
                                        <>
                                             <Radio.Group onChange={onChange} value={value}>
                                                  <Radio value={1}>Chỉ mình tôi</Radio>
                                                  <Radio value={2}>Công Khai</Radio>
                                             </Radio.Group>
                                             {
                                                  value === 1 ? (
                                                       <p className={clsx(styles.descPrivate)}>
                                                            Nếu chọn riêng tư, chỉ có bạn mới được quyền xem Mindmap này
                                                       </p>
                                                  ) : (
                                                       <Form
                                                            className={clsx(styles.formSharePublic)}
                                                            form={form}
                                                            layout="vertical"
                                                            autoComplete="off"
                                                       >
                                                            <Form.Item
                                                                 name="urlShare"
                                                                 label="Liên kết chia sẻ"
                                                                 rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                                                            >
                                                                 <Input
                                                                      onFocus={handleFocus}

                                                                      readOnly
                                                                 />
                                                            </Form.Item>
                                                            <Form.Item name="title" label="Tiêu Đề" rules={[{ required: true }]}>
                                                                 <Input />
                                                            </Form.Item>
                                                            <Form.Item name="descTitle" label="Mô Tả" rules={[{ required: true }]}>
                                                                 <Input.TextArea

                                                                      style={{ resize: "none" }} />
                                                            </Form.Item>
                                                            <Form.Item
                                                                 name="image"
                                                                 label="Ảnh chia sẻ"
                                                                 rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
                                                            >
                                                                 <Input />
                                                            </Form.Item>
                                                       </Form>

                                                  )
                                             }


                                        </>

                                   </Modal>
                              </>
                         </div>


                    )}
               </div>
               <div className="wrapper" ref={reactFlowWrapper} style={{ width: "100%", height: "500px" }}>
                    <ReactFlow
                         nodes={nodes}
                         edges={edges}
                         onNodesChange={onNodesChange}
                         onEdgesChange={onEdgesChange}
                         onConnect={onConnect}
                         onConnectStart={onConnectStart}
                         onConnectEnd={onConnectEnd}
                         snapToGrid
                         onNodeClick={handleClickNode}
                         onEdgeClick={handleClickEdge}
                         fitView
                         fitViewOptions={{ padding: 2 }}
                         nodeOrigin={[0.5, 0]}
                         nodeTypes={nodeTypes}
                         edgeTypes={edgeTypes}
                    >

                         <Background color="#ccc" variant={variant} />
                         <Controls />
                         <MiniMap nodeColor={"#0093E9"} zoomable pannable />
                         <Panel>
                              <button className="btn-variant" onClick={() => setVariant('dots')}>dots</button>
                              <button className="btn-variant" onClick={() => setVariant('lines')}>lines</button>
                              <button className="btn-variant" onClick={() => setVariant('cross')}>cross</button>
                         </Panel>
                    </ReactFlow>
               </div>
          </div>
     );
};