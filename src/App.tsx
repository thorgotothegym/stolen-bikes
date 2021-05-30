import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button, Input } from "antd";
import { Search } from "./component/search/search";
import { useGetService } from "./hook/useGetService";
import { apiStates, useApi } from "./hook/getApi";
import { IncidentsResp, ResponseIncidents } from "./models/response";
import { Reporter } from "./component/reporter/reporter";

import "./App.css";

interface Geo {
  latitude: number;
  longitude: number;
}

function App() {
  const { Header, Content, Footer } = Layout;
  const [geo, setGeo] = useState<Geo>({
    latitude: 0,
    longitude: 0,
  });
  const [allowGeo, setAllowGeo] = useState<boolean>(false);
  const [todayTimeStamp, setTodayTimeStamp] = useState<number>(0);
  const [pagination, setPagination] = useState<number>(10);

  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorFetch, setErrorFetch] = useState<boolean | number>(false);
  // refactor useSTate data
  const [data, setData] = useState<any>()

  const [query, setQuery] = useState<string>();

/*   const service = useGetService(
    `https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity=52.52437%2C13.41053&proximity_square=100`
  ); */

  // This function is called when the input changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setQuery(enteredName);
  };

  /*    // This function is triggered when the Search buttion is clicked
   const search = () => {
    const foundItems = PRODUCTS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setResult(foundItems);
  }; */

  useEffect( () => {
    const getData = async () => {
      const url = `https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity=52.52437%2C13.41053&proximity_square=100`;
      let response = await fetch(url);

      if (response.status === 200 ) {
        let data = await response.json();
        setData(data);
        setLoading(false);
      } else {
        alert('something was wrong with the API')
      }
    }
    getData();
  },[])

  return (
    <div className="App">
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <Row gutter={16}>
            <Col className="gutter-row" span={8} />
            <Col className="gutter-row" span={8}>
              <h2 style={{ color: "white" }}>Stolen Bikes</h2>
            </Col>
            <Col className="gutter-row" span={8}>
              <div>
                {" "}
                <span>nowis = {todayTimeStamp}</span>
                <button
                  onClick={() => {
                    setPagination(pagination + 10);
                  }}
                >
                  miaU
                </button>
                {geo ? (
                  <div>
                    latitude:{geo.latitude} longitude: {geo.longitude}
                  </div>
                ) : (
                  "nothing"
                )}
              </div>
            </Col>
          </Row>
        </Header>
        <Row>
          <Col className="gutter-row" span={8}>
            <div>col-6</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>
              {" "}
              <Search />
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>col-6</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Input.Search
              value={query}
              onChange={inputHandler}
              placeholder="Search products"
              className="input"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>{query}</Col>
        </Row>
        <Content style={{ margin: "0 10px 0 10px", overflow: "" }}>
          <div className="site-layout-background">
            <div style={{ backgroundColor: "red" }}>
              {loading === true ? <div>LOADING ...</div> : <pre>{data.incidents.map( (e:IncidentsResp) => {
                return(
                  <div>title: {e.title}</div>
                )
              })}</pre>}
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
