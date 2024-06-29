import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 9 : 25,
  });

  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                {news?.media.length === 1 ? (
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.media}
                    hight="150"
                    width="120"
                    alt="news"
                  />
                ) : (
                  <img src={demoImage} height="150" width="120" alt="news" />
                )}
              </div>
              <p>
                {news.summary > 100
                  ? `${news.summary.substring(0, 100)} `
                  : news.summary}...
              </p>
              <div className="provider-container">
                <div>
                  <Avatar>
                    <img src={demoImage} alt="news" />
                  </Avatar>
                  <Text className="provider-name">{news.category}</Text>
                </div>
                <Text>
                  {moment(news.published).startOf("minute").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
