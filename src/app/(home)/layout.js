import Header from '@/Components/Header/Header'
import Footer from '@/Components/Footer/Footer'
export default function HomeLayout({ children }) {
     return (
          <>
               <Header />
               <main>
                    <div className="container">
                         {children}
                    </div>
               </main>
               <Footer />
          </>
     )
}
