import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
function CustomNode({ data, isConnectable, ...rest }) {
     const [editNode, setEditNode] = useState(false);
     const [name, setName] = useState(data?.label);
     const onChange = useCallback((e) => {
          setName(e.target.value)
     }, []);
     const handleDoubleClick = () => {
          setEditNode(true);

     }
     const handleOnBlur = (e) => {
          data.label = name;
          setEditNode(false);
     }
     const handleSubmit = (e) => {
          e.preventDefault();
          data.label = name;
          setEditNode(false);
     }
     return (
          <div className="text-updater-node">
               {
                    rest.id !== "node0" && (<Handle type="target" position={Position.Top} isConnectable={isConnectable} />)
               }
               <div >
                    {
                         !editNode
                              ?
                              (<div>
                                   <button
                                        onDoubleClick={handleDoubleClick}
                                        style={{ color: "#fff", width: "100%", display: "block", textAlign: "center", wordBreak: "break-all" }}
                                   >
                                        {data.label}
                                   </button>
                              </div>)
                              :
                              (
                                   <form onSubmit={handleSubmit}>
                                        <input
                                             style={{ width: "100%", textAlign: "center", border: "1px solid #fff" }}
                                             onBlur={handleOnBlur}
                                             id="text"
                                             value={name}
                                             name="text"
                                             onChange={onChange}
                                             className="nodrag" />
                                   </form>

                              )
                    }
               </div>
               <Handle
                    type="source"
                    position={Position.Bottom}
                    id="a"
                    isConnectable={isConnectable}
               />
               <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
          </div>
     );
}

export default CustomNode;
