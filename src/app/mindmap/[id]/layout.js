export const generateMetadata = async ({ params, searchParams }) => {
     const response = await fetch(`https://gsv9fx-8080.csb.app/mindmap${params.id}`);
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
export default function LayoutMindMap({ children }) {
     return (
          <div>
               {
                    children
               }
          </div>
     )
}
