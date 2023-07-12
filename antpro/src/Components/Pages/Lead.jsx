import React, { useState, useEffect } from "react";
import Typography from "antd/es/typography/Typography";
import { Card, Col, Row, DatePicker, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const Lead = () => {
  const [leeds, setLeeds] = useState({
    mernStack: [],
    python: [],
    
  });
  const [data, setData] = useState({});
  const [mern, setMern] = useState([]);
  const [full, setFull] = useState([]);
  const [python, setPython] = useState([]);
  const [datasci, setDatascience] = useState([]);
  const [android, setAndroid] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [dataLength, setDataLength] = useState(0);
  const [nextJs, setNextJs] = useState([]);
  const [selectedDays, setSelectedDays] = useState(5); // Default value of 5 days

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

  const fillData = (response) => {
    setDataLength(response?.data?.data?.length);

    
    const mernArr = response.data.data.filter(
      (el) => el.attributes.webCourseLink === "mern-stack-course"
    );
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

    const dataScience = response.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
        "data-science-and-machine-learning-with-python"
    );
    setDatascience(dataScience);

    const appDevelopment = response.data.data.filter(
      (el) => el.attributes.webCourseLink === "android-app-development"
    );
    setAndroid(appDevelopment);
  };

  const handleDate = (date) => {
    setSelectedDate(date);

    const filteredMern = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink === "mern-stack-course" &&
        dayjs(el.attributes.createdAt).isSame(date, "day")
    );
    setMern(filteredMern);

    const filteredFullStack = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
          "full-stack-java-script-developer-course-react-js-next-js-node-js-mongo-db-and-react-native" &&
        dayjs(el.attributes.createdAt).isSame(date, "day")
    );
    setFull(filteredFullStack);

    const filteredPythonFull = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
          "full-stack-python-with-data-science-ai-big-data-iot-and-cloud" &&
        dayjs(el.attributes.createdAt).isSame(date, "day")
    );
    setPython(filteredPythonFull);

    const filteredDataScience = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink ===
          "data-science-and-machine-learning-with-python" &&
        dayjs(el.attributes.createdAt).isSame(date, "day")
    );
    setDatascience(filteredDataScience);

    const filteredAppDevelopment = data.data.data.filter(
      (el) =>
        el.attributes.webCourseLink === "android-app-development" &&
        dayjs(el.attributes.createdAt).isSame(date, "day")
    );
    setAndroid(filteredAppDevelopment);

    setDataLength(
      filteredMern.length +
        filteredFullStack.length +
        filteredAppDevelopment.length +
        filteredDataScience.length +
        filteredPythonFull.length
    );
  };

  const handleDaysChange = (value) => {
    setSelectedDays(value);
    if (selectedDate) {
      handleDate(setSelectedDate);
    }
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
            {dataLength}
          </Card>
        </Col>
        <Col span={5}>
          <Select value={selectedDays} onChange={handleDaysChange}>
            <Option value={5}>Last 5 days</Option>
            <Option value={10}>Last 10 days</Option>
            <Option value={15}>Last 15 days</Option>
          </Select>
        </Col>
        <Col span={5}>
          <DatePicker
            onChange={(date) => {
              setSelectedDate(date);
              if (date) {
                handleDate(date);
              } else {
                fillData(data);
              }
            }}
          />
        </Col>
      </Row>

      <Row gutter={16} className="row">
        <Col span={8}>
          <Card title="Full Stack Js" bordered={false}>
            {full.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Mern Stack" bordered={false}>
            {mern.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Next Js" bordered={false}>
            {nextJs.length}
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="row">
        <Col span={8}>
          <Card title="Python Full Stack" bordered={false}>
            {python.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Android App Development" bordered={false}>
            {android.length}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Data Science With Python" bordered={false}>
            {datasci.length}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Lead;
