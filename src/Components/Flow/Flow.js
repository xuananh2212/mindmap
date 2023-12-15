"use client"
import { ReactFlowProvider } from 'reactflow';
import NodeOnEdgeDrop from './NodeOnEdge';

export default function Flow() {
     return (
          <ReactFlowProvider>
               <NodeOnEdgeDrop />
          </ReactFlowProvider>
     )

}

