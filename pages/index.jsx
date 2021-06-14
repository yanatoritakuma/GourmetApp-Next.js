import Head from 'next/head'
import Image from 'next/image'
import Layout, {siteTitle} from "../components/Layout"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
    </Layout>
  )
}
