"use client"
import { ReactFlowProvider } from 'reactflow';
import AddNodeOnEdgeDrop from './AddNodeOnEdge';

export default function Flow() {
     return (
          <ReactFlowProvider>
               <AddNodeOnEdgeDrop />
          </ReactFlowProvider>
     )

}

