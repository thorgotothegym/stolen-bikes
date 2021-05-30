import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import { Search } from "./component/search/search";
import { useGetService } from "./hook/useGetService";
import { apiStates, useApi } from "./hook/getApi";
import { IncidentsResp as IResponse } from "./models/response";
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

  const [response, setResponse] = useState<IResponse>();
  const [error, setError] = useState(null);
  const [totalBikes, setTotalBikes] = useState<number>(0);

  const service = useGetService(`https://bikewise.org:443/api/v2/incidents?page=1&incident_type=theft&proximity=52.52437%2C13.41053&proximity_square=100`);

  useEffect(() => {
    /*     if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeo({  
          ...geo,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        localStorage.setItem("stolenBikes", JSON.stringify(geo));
      });
      setAllowGeo(true);
    } else {
      setAllowGeo(false);
    }
    const getNowTime = () => {
      let ms = Date.now();
      console.log("mssss", ms);
      return ms;
    };
    setTodayTimeStamp(getNowTime);
    fetchData(); */
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
            <div>
              {" "}
              <Search />
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>col-6</div>
          </Col>
        </Row>
        <Content style={{ margin: "0 10px 0 10px", overflow: "" }}>
          <div className="site-layout-background">
            <div style={{ backgroundColor: "red" }}>
              {service.status === "loading" && <div>Loading...</div>}
              {service.status === "loaded" &&
                service.payload.incidents.map((incidents: IResponse) => {
                  return (
                      <Reporter
                        address={incidents.address}
                        description={incidents.description}
                        location_description={incidents.location_description}
                        location_type={incidents.location_type}
                        occurred_at={incidents.occurred_at}
                        title={incidents.title}
                        type={incidents.type}
                        type_properties={incidents.type_properties}
                        updated_at={incidents.updated_at}
                        id={incidents.id}
                        key={incidents.id}
                        media={incidents.media.image_url_thumb}
                      />
                  );
                })}
              {service.status === "error" && <div>Error message</div>}
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
