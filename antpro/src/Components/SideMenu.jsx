import React from 'react'
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const navigate = useNavigate()
  return (
    <div className="SideMenu">
      <Menu onClick={(item) =>{
        // item.kyes
        navigate(item.key)
      }}
        items={[
          {
            label: "Dashbored",
            key: "/",
          },
          {
            label: "Leads",
            key: "/leads",
          },
          {
            label: "List",
            key: "/list",
          },
          {
            label: "Export",
            key: "/export",
          },
          {
            label: "Bulk Master",
            key: "/bulk",
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu
