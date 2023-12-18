import Link from "next/link"
export default function NotFound() {
     return (
          <div>
               <h1>Page Not Found</h1>
               <p>Lạc đường rồi . vui lòng quay về trang chủ </p>
               <Link
                    href="/">
                    Về Trang Chủ
               </Link>
          </div>
     )
}
