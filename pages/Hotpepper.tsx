/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { HotpepperResponseType } from "../types/hotpepper";
import { Button, TextField, Box } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";

const Hotpepper = () => {
  const [jsonData, setJsonData] = useState<HotpepperResponseType>();
  console.log("jsonData", jsonData);
  const [keyword, setKeyword] = useState("");
  const [flag, setFlag] = useState(false);
  const [initFlag, setInitFlag] = useState(true);
  const scrollTop = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState({
    available: 0,
    start: 0,
    returned: "0",
  });
  console.log(pages);

  const onClickSearch = () => {
    setFlag(true);
    setInitFlag(true);
    setPages({
      ...pages,
      start: 0,
    });
  };

  useEffect(() => {
    const utf8str = encodeURIComponent(keyword);
    const params = { start: String(pages.start), keyword: utf8str };
    const query = new URLSearchParams(params);
    if (flag) {
      const request = async () => {
        const res = await fetch(`/api/hotpepperApi?${query}`);
        const data = await res.json();
        console.log("api", data);
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
      console.log("初期値ページ");
      setInitFlag(false);
    }
  }, [jsonData]);

  return (
    <Layout>
      <main css={hotpepper} ref={scrollTop}>
        <h2>Hotpepper</h2>
        <TextField
          label="検索"
          value={keyword}
          onChange={(e: any) => setKeyword(e.target.value)}
        />
        <Button onClick={() => onClickSearch()}>
          <SearchIcon />
        </Button>
        <section css={shopBox}>
          {jsonData?.data.results.shop?.map((v) => (
            <Card key={v.id} sx={{ maxWidth: 400 }} style={{ margin: "10px" }}>
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
            </Card>
          ))}
        </section>
        {pages.start !== 0 && pages.start !== undefined && (
          <Stack style={{ margin: "20px auto", width: "300px" }} spacing={2}>
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

        <footer style={{ margin: "10px 0", textAlign: "center" }}>
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
  }
`;

const shopBox = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  h3,
  p {
    color: #333;
  }
`;

export default Hotpepper;
