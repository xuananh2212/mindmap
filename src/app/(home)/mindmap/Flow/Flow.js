"use client"
import { ReactFlowProvider } from 'reactflow';
import NodeOnEdgeDrop from '../NodeOnEdge/NodeOnEdge';


export default function Flow({ id }) {
     return (
          <ReactFlowProvider>
               <NodeOnEdgeDrop id={id} />
          </ReactFlowProvider>
     )
}

