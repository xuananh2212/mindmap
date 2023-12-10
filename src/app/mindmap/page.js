import Flow from "@/Components/Flow/Flow";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
export default function mindmap() {
     return (
          <div>
               <h2>mindmap</h2>
               <Link href={`/mindmap/${uuidv4()}`} className="btn">
                    Thêm
               </Link>
          </div>
     )
}
