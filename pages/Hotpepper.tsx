/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";
import { HotpepperResponseType } from "../types/hotpepper";

const Hotpepper = () => {
  const [jsonData, setJsonData] = useState<HotpepperResponseType>();
  console.log("jsonData", jsonData?.data.results.shop);
  const [keyword, setKeyword] = useState("yakiniku");
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
        <input
          type="text"
          value={keyword}
          onChange={(e: any) => setKeyword(e.target.value)}
        />
        <button onClick={() => onClickSearch()}>検索</button>
        <section>
          {jsonData?.data.results.shop?.map((v) => (
            <h2>{v.name}</h2>
          ))}
        </section>
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

export default Hotpepper;
