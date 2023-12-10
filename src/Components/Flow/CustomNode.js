import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function CustomNode({ data, isConnectable }) {
     const [editNode, setEditNode] = useState(false);
     const [name, setName] = useState(data?.label);
     console.log(data);
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
               <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
               <div >
                    {
                         !editNode
                              ?
                              (<div>
                                   <button
                                        onDoubleClick={handleDoubleClick}
                                        style={{ color: "#fff", width: "100%", display: "block", textAlign: "center" }}
                                   >
                                        {data.label}
                                   </button>
                              </div>)
                              :
                              (
                                   <form onSubmit={handleSubmit}>
                                        <input
                                             style={{ width: "100%" }}
                                             onBlur={() => handleOnBlur}
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
