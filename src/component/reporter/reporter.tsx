import React, { useState } from "react";
import { Image, Row, Col, Popover, Button, Card, Descriptions } from "antd";
import { IncidentsResp } from "../../models/response";
import moment from "moment";
import styled from "styled-components";

import fallBackImage from "../../images/bike_photo_placeholder.svg";

export const Reporter = ({
  title,
  description,
  id,
  large_img,
  date_stolen,
}: Partial<IncidentsResp>) => {
  const truncate = (str: string) => {
    if (showMore === false) {
      return (
        <div
          onClick={() => {
            setShowMore(true);
          }}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {str.substring(0, 20)} ...
          </span>
        </div>
      );
    } else {
      return (
        <span
          onClick={() => {
            setShowMore(false);
          }}
        >
          <p>{description}</p>
        </span>
      );
    }
  };
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <WrapperContainer key={id}>
      <Row>
        <Col>
          <CardWrapper
            title={title ? title : ""}
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
          >
            <Image width={200} src={large_img ? large_img : fallBackImage} />
            {description ? <p>{truncate(description)}</p> : null}
            {date_stolen ? (
              <p>
                {moment.unix(date_stolen).format("DD/MM/YYYY")}
              </p>
            ) : (
              ""
            )}
          </CardWrapper>
          <Descriptions title={title}>
            {date_stolen ? (
              <Descriptions.Item label="date_stolen">
                {moment.unix(date_stolen).format("DD/MM/YYYY")}
              </Descriptions.Item>
            ) : (
              ""
            )}
            {description ? (
              <Descriptions.Item label="description">
                {truncate(description)}
              </Descriptions.Item>
            ) : (
              ""
            )}
          </Descriptions>
        </Col>
      </Row>
    </WrapperContainer>
  );
};

const WrapperContainer = styled.div`
  border: 1px solid #e0e0e0;
  display: flex;
  flex-wrap: nowrap;
  background-color: DodgerBlue;
`;

const CardWrapper = styled(Card)`
  background-color: #f1f1f1;
  width: 100px;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
`;
