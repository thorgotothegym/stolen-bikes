import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Input,
  TimePicker,
  DatePicker,
  Space,
} from "antd";
import { IncidentsResp, ResponseIncidents } from "./models/response";
import { Reporter } from "./component/reporter/reporter";
import moment from "moment";

import "./App.css";

interface Geo {
  latitude: number;
  longitude: number;
}

function App() {
  const { Header, Content, Footer } = Layout;
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";

  const [geo, setGeo] = useState<Geo>({
    latitude: 0,
    longitude: 0,
  });
  const [allowGeo, setAllowGeo] = useState<boolean>(false);
  const [todayTimeStamp, setTodayTimeStamp] = useState<number>(0);
  const [pagination, setPagination] = useState<number>(10);

  const [loading, setLoading] = useState<boolean>(true);

  const [bikes, setBikes] = useState<IncidentsResp[]>([]);

  const [query, setQuery] = useState<string | any>();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setQuery(enteredName);
  };

  const search = (stringToFind: string) => {
    /* const toFind = data?.filter((item: IncidentsResp) =>
      item.title.includes(stringToFind).valueOf()
      item.title.includes(stringToFind).valueOf()
    );
    setData(toFind); */
  };

  useEffect(() => {
    const getData = async () => {
      const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=52.52437%2C13.41053&distance=10&stolenness=proximity`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setBikes(data.bikes);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
            <div className="search">
              <Space direction="horizontal" size={12}>
                <Input
                  value={query}
                  onChange={inputHandler}
                  placeholder="Search products"
                  className="input"
                />
                <pre>{query}</pre>
                <RangePicker
                  defaultValue={[
                    moment("2015/01/01", dateFormat),
                    moment("2015/01/01", dateFormat),
                  ]}
                  format={dateFormat}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    search(query);
                  }}
                >
                  search{" "}
                </Button>
              </Space>
              ,
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>col-6</div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>{query}</Col>
        </Row>
        <Content style={{ margin: "0 10px 0 10px", overflow: "" }}>
          <div className="site-layout-background">
            {loading === true ? (
              "loading"
            ) : (
              <div>
                {bikes.map((e: IncidentsResp) => {
                  return (
                    <Reporter
                      title={e.title}
                      description={e.description}
                      id={e.id}
                      large_img={e.large_img}
                      date_stolen={e.date_stolen}
                    />
                  );
                })}
              </div>
            )}
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
