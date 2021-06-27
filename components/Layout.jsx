import React, { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'



export const siteTitle = 'GourmetApp'


export default function Layout({children}) {
  const [openHum, setOpenHum] = useState(false);
  const humMen = "humMen";
  const closeHum = "closeHum";
  const headerBoxSp = "header__boxSp"
  const closeHumNone = "closeHumNone"

  const onClickopenHum = () => {
    setOpenHum(!openHum);
  }

  return(
    <>
    <Head>
      <meta name="description" content="Generated by create next app" />
      <meta name="og:title" content={siteTitle} />
    </Head>
    <header>
      <div className="header__box">
        <Link href="/">
          <a>
            <Image
              src="/image/logo.png"
              height={80}
              width={80}
              alt="icon"
            />
          </a>
        </Link>
        <h2>GourmetApp</h2>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/categorypage/AllDishes">
                <a>AllDishes</a>
              </Link>
            </li>
            <li>
              <Link href="/categorypage/MeatDish">
                <a>MeatDish</a>
              </Link>
            </li>
            <li>
              <Link href="/categorypage/FishDish">
                <a>FishDish</a>
              </Link>
            </li>
            <li>
              <Link href="/categorypage/Noodles">
                <a>Noodles</a>
              </Link>
            </li>
            <li>
              <Link href="/categorypage/Salad">
                <a>Salad</a>
              </Link>
            </li>
            <li>
              <Link href="/categorypage/Dessert">
                <a>Dessert</a>
              </Link>
            </li>
            <li>
              <Link href="/categorypage/Coffee">
                <a>Coffee</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={openHum ? closeHum : headerBoxSp} onClick={onClickopenHum}> 
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={openHum ? humMen : closeHumNone}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/categorypage/AllDishes">
            <a>AllDishes</a>
          </Link>
          <Link href="/categorypage/MeatDish">
            <a>MeatDish</a>
          </Link>
          <Link href="/categorypage/FishDish">
            <a>FishDish</a>
          </Link>
          <Link href="/categorypage/Noodles">
            <a>Noodles</a>
          </Link>
          <Link href="/categorypage/Salad">
            <a>Salad</a>
          </Link>
          <Link href="/categorypage/Dessert">
            <a>Dessert</a>
          </Link>
          <Link href="/categorypage/Coffee">
            <a>Coffee</a>
          </Link>
        </div>
      </div>
    </header>
    <main>{children}</main>
    </>
  )
}