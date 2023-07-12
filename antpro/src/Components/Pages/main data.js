


import React, { useState, useEffect } from "react";
import Typography from "antd/es/typography/Typography";
import { Card, Col, Row } from "antd";
import { DatePicker } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const Lead = () => {
  const [data, setData] = useState({});
  const [mern, setMern] = useState([]);
  const [full, setFull] = useState([]);
  const [python, setPython] = useState([]);
  const [datasci, setDatascince] = useState([]);
  const [andriod, setAndriod] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dataLength, setDataLenght] = useState(0);
  const [nextJs, setnextJs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://nexusberry.herokuapp.com/api/leeds"
        );
        setData(response);

        fillData(response);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);
  // console.log(data.data);

  const fillData = (response) => {
    setDataLenght(response?.data?.data?.length);
    const mernArr = response.data.data.filter(
      (el) => el.attributes.webCourseLink === "mern-stack-course"
    );
    console.log(mernArr);
    setMern(mernArr);

    const fullStack = response.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
        "full-stack-java-script-developer-course-react-js-next-js-node-js-mongo-db-and-react-native"
    );
    setFull(fullStack);
    const pythonFull = response.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
        "full-stack-python-with-data-science-ai-big-data-iot-and-cloud"
    );
    setPython(pythonFull);
    const dataSceince = response.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
        "data-science-and-machine-learning-with-python"
    );
    setDatascince(dataSceince);

    const appDevolpement = response.data.data.filter(
      (el) => el.attributes.webCourseLink === "android-app-development"
    );
    setAndriod(appDevolpement);
  };

  const handleDate = (date) => {
    // setSelectedDate(date);
    // console.log(selectedDate);
    console.log(date);

    const mernArr = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink === "mern-stack-course" &&
        // dayjs(el.attributes.ipApiData.time_zone.current_time).format(
        dayjs(el.attributes.createdAt).format("DD-MM-YYYY") === date
    );
    setMern(mernArr);

    const fullStack = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
          "full-stack-java-script-developer-course-react-js-next-js-node-js-mongo-db-and-react-native" &&
        // dayjs(el.attributes.ipApiData.time_zone.current_time).format(
        //   "DD-MM-YYYY"
        // ) === date
        dayjs(el.attributes.createdAt).format("DD-MM-YYYY") === date
    );
    setFull(fullStack);
    const pythonFull = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
          "full-stack-python-with-data-science-ai-big-data-iot-and-cloud" &&
        dayjs(el.attributes.createdAt).format("DD-MM-YYYY") === date
    );

    setPython(pythonFull);
    const dataSceince = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
          "data-science-and-machine-learning-with-python" &&
        dayjs(el.attributes.createdAt).format("DD-MM-YYYY") === date
    );
    setDatascince(dataSceince);

    const appDevolpement = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink === "android-app-development" &&
        dayjs(el.attributes.createdAt).format("DD-MM-YYYY") === date
    );
    const nextJsCousre = data.data.data.filter((el) => {
      el.attributes.webCourseLink === "";
    });
    setAndriod(appDevolpement);

    setDataLenght(
      mernArr.length +
        fullStack.length +
        appDevolpement.length +
        dataSceince.length +
        pythonFull.length
    );
  };
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Typography.Title level={3}>Leads</Typography.Title>
      <Row gutter={16}>
        <Col span={14}>
          <Card title="Leads" bordered={false}>
            {/* {data?.data.data?.length} */}
            {dataLength}
          </Card>
        </Col>
        <Col span={10}>
          <DatePicker
            onChange={(date) => {
              // console.log(`${date.date()}-${date.month() + 1}-${date.year()}`);
              if (date)
                handleDate(dayjs(date.toISOString()).format("DD-MM-YYYY"));
              else {
                fillData(data);
              }
              // console.log(dayjs(date.toISOString()).format("DD-MM-YYYY"));
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} className="row">
        <Col span={8}>
          <Card title="Full Stack Js" bordered={false}>
            {full?.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Mern Stack" bordered={false}>
            {mern?.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Next Js" bordered={false}></Card>
        </Col>
      </Row>
      <Row gutter={16} className="row">
        <Col span={8}>
          <Card title="Python Full Stack" bordered={false}>
            {python?.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Andriod App Deveolpement" bordered={false}>
            {andriod?.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Data Scince With Python" bordered={false}>
            {datasci?.length}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Lead;