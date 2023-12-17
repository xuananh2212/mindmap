import Flow from '@/app/mindmap/Flow/Flow'

export default function MindMapDetail({ params }) {
     return (

          <Flow id={params?.id} />

     )
}
