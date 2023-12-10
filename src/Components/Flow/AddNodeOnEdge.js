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
     updateEdge

} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
const initialNodes = [
     {
          id: '0',
          type: 'input',
          data: { label: 'FullStack' },
          position: { x: 0, y: 50 },
          style: {
               backgroundColor: "#0093E9",
               backgroundImage: "linear-gradient(160deg, #0093E9 0 %, #80D0C7 100 %)",
               color: "#fff",
               border: "none"
          }
     },
];

let id = 1;
const getId = () => `${id++}`;
const nodeTypes = { textUpdater: CustomNode };

export default function AddNodeOnEdgeDrop() {
     const edgeUpdateSuccessful = useRef(true);
     const [variant, setVariant] = useState('cross');
     const [nodeIdCurrent, setNodeIdCurrent] = useState(null);
     const [edgesIdCurrent, setEdgesIdCurrent] = useState(null);
     const reactFlowWrapper = useRef(null);
     const connectingNodeId = useRef(null);
     const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
     const { screenToFlowPosition } = useReactFlow();
     const onConnect = useCallback(
          (params) => {
               connectingNodeId.current = null;
               setEdges((eds) => addEdge(params, eds))
          }, [],);

     const onConnectStart = useCallback((_, { nodeId }) => {
          connectingNodeId.current = nodeId;
     }, []);

     const onConnectEnd = useCallback(
          (event) => {
               if (!connectingNodeId.current) return;

               const targetIsPane = event.target.classList.contains('react-flow__pane');

               if (targetIsPane) {
                    const id = getId();
                    const newNode = {
                         id,
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
                         [...eds, { id, source: connectingNodeId.current, target: id }]
                    );
               }
          },
          [screenToFlowPosition],
     );
     console.log(edgeUpdateSuccessful, connectingNodeId);
     const onEdgeUpdateStart = useCallback(() => {
          console.log("onEdgeUpdateStart");
          edgeUpdateSuccessful.current = false;
     }, []);

     const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
          console.log('onEdgeUpdate', oldEdge, newConnection)
          edgeUpdateSuccessful.current = true;
          setEdges((els) => updateEdge(oldEdge, newConnection, els));
     }, []);

     const onEdgeUpdateEnd = useCallback((_, edge) => {
          console.log('onEdgeUpdateEnd');
          console.log(edge);
          if (!edgeUpdateSuccessful.current) {
               setEdges((eds) => eds.filter((e) => e.id !== edge.id));
          }

          edgeUpdateSuccessful.current = true;
     }, []);
     const handleClickNode = (_, { id }) => {
          console.log(id, nodes);
          setNodeIdCurrent(id);

     }
     const handleClickEdge = (_, edge) => {
          console.log(edge);

     }
     useEffect(() => {
          const handleDeleteNodeAndEdges = (e) => {
               console.log("dm", e.code, nodeIdCurrent);
               if (e.code === 'Delete' && nodeIdCurrent) {
                    console.log(nodeIdCurrent, nodes.filter((node => node.id !== nodeIdCurrent)));
                    setNodes(nodes.filter((node => node.id !== nodeIdCurrent)));


               }
          }
          window.addEventListener("keyup", handleDeleteNodeAndEdges)

     }, [nodeIdCurrent]);

     return (
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
                    onEdgeUpdate={onEdgeUpdate}
                    onEdgeUpdateStart={onEdgeUpdateStart}
                    onEdgeUpdateEnd={onEdgeUpdateEnd}
                    onNodeClick={handleClickNode}
                    onEdgeClick={handleClickEdge}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 2 }}
                    nodeOrigin={[0.5, 0]}
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
     );
};