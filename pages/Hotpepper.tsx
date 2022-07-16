/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { HotpepperResponseType } from "../types/hotpepper";
import { Button, IconButton, TextField, Box } from "@material-ui/core";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

const Hotpepper = () => {
  const [jsonData, setJsonData] = useState<HotpepperResponseType>();
  const [search, setSearch] = useState({
    keyword: "",
    area: "",
  });
  const [flag, setFlag] = useState(false);
  const [initFlag, setInitFlag] = useState(true);
  const scrollTop = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState({
    available: 0,
    start: 0,
    returned: "0",
  });

  const onClickSearch = () => {
    setFlag(true);
    setInitFlag(true);
    setPages({
      ...pages,
      start: 0,
    });
  };

  useEffect(() => {
    const utf8Keyword = encodeURIComponent(search.keyword);
    const utf8Area = encodeURIComponent(search.area);
    const params = {
      start: String(pages.start),
      keyword: utf8Keyword,
      area: utf8Area,
    };
    const query = new URLSearchParams(params);
    if (flag) {
      const request = async () => {
        const res = await fetch(`/api/hotpepperApi?${query}`);
        const data = await res.json();
        if (data.data.results.shop === undefined) {
          alert("検索結果が0件です");
          return setJsonData(undefined);
        }
        setJsonData(data);
      };
      setFlag(false);
      request();
    }
  }, [flag]);

  useEffect(() => {
    if (jsonData !== undefined && initFlag) {
      setPages({
        available: jsonData.data.results.results_available,
        start: jsonData.data.results.results_start,
        returned: jsonData.data.results.results_returned,
      });
      setInitFlag(false);
    }
  }, [jsonData]);

  return (
    <Layout>
      <main css={hotpepper} ref={scrollTop}>
        <h2>検索</h2>
        <Box css={searchBox}>
          <Box css={textBox}>
            <TextField
              label="ジャンル・店名"
              value={search.keyword}
              onChange={(e: any) =>
                setSearch({
                  ...search,
                  keyword: e.target.value,
                })
              }
            />
            <TextField
              label="エリア"
              value={search.area}
              onChange={(e: any) =>
                setSearch({
                  ...search,
                  area: e.target.value,
                })
              }
            />
          </Box>
          <Button css={searchBtn} onClick={() => onClickSearch()}>
            <SearchIcon />
            検索
          </Button>
        </Box>
        <section css={shopBox}>
          {jsonData?.data.results.shop?.map((v) => (
            <Card key={v.id} css={shopCard}>
              <Link href={v.urls.pc}>
                <a>
                  <CardMedia
                    component="img"
                    height="250"
                    image={v.photo.mobile.l}
                    alt="green iguana"
                  />
                </a>
              </Link>
              <CardContent>
                <h3>{v.name}</h3>
                <p>{v.catch}</p>
                <p>{v.address}</p>
                <p>{v.access}</p>
                <p>予算: {v.budget.average}</p>
                <p>定休日: {v.close}</p>
              </CardContent>
              <DirectionsWalkIcon css={walkIcon} fontSize="large" />
            </Card>
          ))}
        </section>
        {pages.start !== 0 && pages.start !== undefined && (
          <Stack css={pageBox} spacing={2}>
            <Pagination
              count={Math.ceil(pages.available / 10)}
              color="secondary"
              onChange={(e, page) => {
                setPages({
                  ...pages,
                  start: page,
                });
                setFlag(true);
                scrollTop?.current?.scrollIntoView();
              }}
              page={pages.start}
            />
          </Stack>
        )}

        <footer css={footerBox} style={{}}>
          Powered by
          <a href="http://webservice.recruit.co.jp/">
            ホットペッパー Webサービス
          </a>
        </footer>
      </main>
    </Layout>
  );
};

const hotpepper = css`
  margin: auto;
  padding: 70px 12px;
  margin-top: 84px;
  padding-bottom: 40px;
  background-color: #e2dedb;
  border-radius: 20px;
  width: 90%;
  height: auto;
  max-width: 1200px;

  h2 {
    text-align: center;
    color: #646262;
  }
`;

const shopBox = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  h3,
  p {
    color: #333;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const shopCard = css`
  margin: 10px;
  padding: 20px 10px;
  max-width: 400px;
  position: relative;
  .MuiCardContent-root {
    padding: 0 0 20px 0;
  }

  @media screen and (max-width: 768px) {
    margin: 24px auto;
  }
`;

const pageBox = css`
  margin: 20px auto;
  width: 300px;

  @media screen and (max-width: 375px) {
    width: 260px;
  }
`;

const footerBox = css`
  margin: 10px 0;
  text-align: center;

  @media screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const searchBox = css`
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const textBox = css`
  display: flex;
  justify-content: space-around;
  width: 50%;

  @media screen and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (max-width: 768px) {
    display: block;
    width: 240px;
    .MuiFormControl-root {
      margin: 10px 0;
      display: block;
    }
  }

  @media screen and (max-width: 425px) {
    width: 180px;
  }
`;

const searchBtn = css`
  background-color: #fff !important;

  @media screen and (max-width: 768px) {
    padding: 20px 12px !important;
  }
`;

const walkIcon = css`
  position: absolute;
  bottom: 5px;
  left: 5px;
  cursor: pointer;
`;

export default Hotpepper;
