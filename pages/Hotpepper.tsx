/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { css } from "@emotion/react";
import { Layout } from "../components/Layout";

function fetcher(url: any) {
  return fetch(url).then((r) => r.json());
}

const Hotpepper = () => {
  const { data, error } = useSWR("/api/hotpepperApi", fetcher);
  if (error) console.log("error", error);
  if (data) console.log("data", data);

  const [search, setSearch] = useState("");

  return (
    <Layout>
      <main css={hotpepper}>
        <h2>Hotpepper</h2>
        <input
          type="text"
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <button>検索</button>
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
