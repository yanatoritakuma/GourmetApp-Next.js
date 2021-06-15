import Head from 'next/head'
import Image from 'next/image'
import Layout, {siteTitle} from "../components/Layout"

export default function Home() {

  const width = "900"
  const height = "600"

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="index">
        <div class="index__imgBox">
          <Image
            className="index__img"
            src="/image/coffee.jpg"
            height={height}
            width={width}
            alt=""
            layout="responsive"
          />
          <Image
            className="index__img"
            src="/image/dessert.jpg"
            height={height}
            width={width}
            alt=""
          />
          <Image
            className="index__img"
            src="/image/fish.jpg"
            height={height}
            width={width}
            alt=""
          />
          <Image
            className="index__img"
            src="/image/meat.jpg"
            height={height}
            width={width}
            alt=""
          />
          <Image
            className="index__img"
            src="/image/ramen.jpg"
            height={height}
            width={width}
            alt=""
          />
          <Image
            className="index__img"
            src="/image/salad.jpg"
            height={height}
            width={width}
            alt=""
          />
        </div>
      </section>
    </Layout>
  )
}
