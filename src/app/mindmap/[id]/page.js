import Flow from '@/app/mindmap/Flow/Flow';
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from 'next/navigation';
export const generateMetadata = async ({ params }) => {
     const response = await fetch(`https://gsv9fx-8080.csb.app/mindmap/${params.id}`);
     const data = await response.json();
     return {
          title: data.title,
          description: data.descTitle,
          openGraph: {
               title: data.title,
               description: data.descTitle,
               images: [
                    data.img
               ]
          }
     }

}
export default async function MindMapDetail({ params }) {
     let idUser = "";
     const session = await getSession();
     if (session) {
          idUser = session.user.sub;
     }
     const response = await fetch(`https://gsv9fx-8080.csb.app/mindmap/${params.id}`);
     const data = await response.json();
     if (data.share == 1) {
          if (!idUser) {
               redirect("/api/auth/login");
          } else {
               if (data.idUser !== idUser) {
                    redirect("/api/auth/login");
               }
          }
     }
     return (

          <Flow id={params?.id} />

     )
}
