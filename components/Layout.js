import { useRouter } from 'next/router';

import Footer from './Footer';
import Meta from './Meta';
import Nav from './Nav';
import styles from '/styles/Layout.module.css';

const Layout = ({children}) => {
  const { asPath } = useRouter();
  
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
          <main className={styles.main}>
              {children}
          </main>
      </div>
      {(!asPath.includes("/signin", 0) && !asPath.includes("/signup", 0)) && <Footer />}
    </>
  )
}

export default Layout