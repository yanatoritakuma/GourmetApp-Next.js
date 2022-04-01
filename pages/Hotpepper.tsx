/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { HotpepperResponseType } from "../types/hotpepper";
import { Button, IconButton, TextField, Box } from "@material-ui/core";
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
  const utf8str = encodeURIComponent(keyword);
  const params = { keyword: utf8str };
  const query = new URLSearchParams(params);

  const onClickSearch = () => {
    setFlag(true);
  };
  console.log(flag);

  useEffect(() => {
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

  return (
    <Layout>
      <main css={hotpepper}>
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
  padding: 20px 12px;
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
