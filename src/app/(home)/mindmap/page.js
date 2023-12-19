import clsx from 'clsx';
import ListMindMap from './ListMindMap/ListMindMap';
import styles from './mindmap.module.scss';
import AddMindMap from './AddMindMap';
export default function Mindmap() {

     return (
          <div className={clsx(styles.mindmap)}>
               <h2 className={clsx(styles.headingLv2)}>MindMap của tôi</h2>
               <AddMindMap />
               <ListMindMap />
          </div>
     )
}
