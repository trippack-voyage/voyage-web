import React from 'react';
import styled from "styled-components";
import { Outlet } from "react-router";

const Header_box = styled.div`
  color: #FF541E;
  font-size: 50px;
  font-weight: 900;
  text-align: center;
  margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 50px;
  border-bottom: 1px solid #c1c1c1;
  background-color: white;
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
