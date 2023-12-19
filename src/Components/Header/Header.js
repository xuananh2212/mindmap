import { getSession } from "@auth0/nextjs-auth0";

import Menu from '@/Components/Menu/Menu'
export default async function Header() {
     let user = null;
     const session = await getSession();
     if (session) {
          user = session.user;
     }
     return (
          <header className="bg-gray-50">
               <Menu user={user} />
          </header>

     );
}
