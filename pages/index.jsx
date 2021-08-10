import Head from 'next/head'
import Link from 'next/link'
import Layout, {siteTitle} from "../components/Layout"

export default function Home() {

  return (
    
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className="index">
          <div className="index__imgBox">
            <h1 className="index__logo" />
            <Link href="/Login">
              <a className="index__link">Register</a>
            </Link>
            <span className="index__img index__img--1"></span>
            <span className="index__img index__img--2"></span>
            <span className="index__img index__img--3"></span>
            <span className="index__img index__img--4"></span>
            <span className="index__img index__img--5"></span>
            <span className="index__img index__img--6"></span>
          </div>
        </section>
        
      </Layout>
    
  )
}
