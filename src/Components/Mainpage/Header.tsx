import React from 'react';
import styled from "styled-components";
import { Outlet } from "react-router";

const Header_box = styled.div`
  color: #f18851;
  font-size: 50px;
  font-weight: 900;
  text-align: center;
  margin-top: 10px;
  padding: 20px;
`;

function Header() {
  return (
    <div>
      <Header_box>
        Voyage
      </Header_box>
      <Outlet />
    </div>
  );
}

export default Header;
