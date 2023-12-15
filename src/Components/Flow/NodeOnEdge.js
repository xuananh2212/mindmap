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
import CustomEdge from './CustomEdge';
const initialNodes = [
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
     },
];

let id = 1;
const getId = () => `${id++}`;
const nodeTypes = { textUpdater: CustomNode };
const edgeTypes = {
     'custom-edge': CustomEdge,
};

export default function NodeOnEdgeDrop() {
     const edgeUpdateSuccessful = useRef(true);
     const [variant, setVariant] = useState('cross');
     const [id, setId] = useState(null);
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
     console.log(id);
     useEffect(() => {
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
          window.addEventListener("keyup", handleDeleteNodeAndEdges)

     }, [id]);

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
     );
};