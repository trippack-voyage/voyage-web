import React, {useState} from 'react';
import styled from "styled-components";
import { ReactComponent as Bag_add_arrow } from '../../svg/bag_add_arrow.svg';
import { bagAddModalState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";

export const ModalContainer = styled.div`
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 40px 20px;
  background-color: white;
  border-radius: 30px;
  width: 100px;
  height: 100px;
  box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
  margin: 25px;
`;

function My_modal() {

    const [isOpen, setIsOpen] = useRecoilState(bagAddModalState);

   const openModalHandler = () => {
    setIsOpen(false);
  };

  return (
      <ModalContainer>
        <ModalView>

        </ModalView>
      </ModalContainer>
  );
}

export default My_modal;
