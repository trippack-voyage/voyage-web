import styled from "styled-components";

const ItemCreateContainer = styled.div`
  padding: 30px 70px;
`;

const ItemInputContainer = styled.div`
  border: 3px solid #FF541E;
  box-shadow: rgba(245, 105, 60, 0.18) 0px 0px 15px;
  border-radius: 12px;
`;

const ItemInputBox = styled.input`
  width: 700px;
  height: 70px;
  font-size: 22px;
  padding: 25px;
  border: none;
  border-radius: 12px;
  outline: none;
`;

const ItemAddBtn_box = styled.span`
  margin-left: 15px;
`;

const ItemAddBtn = styled.button`
  font-size: 20px;
  margin: auto auto auto 20px;
  color: #FF541E;
  background-color: white;
  border: none;
  font-weight: 600;
`;


interface InputTextProps {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onSubmit(event: React.FormEvent<HTMLFormElement>): void;
    inputText: string;
  }
  
  export default function Create({
    onChange,
    onSubmit,
    inputText,
  }: InputTextProps) {
    return (
      <ItemCreateContainer>
        <form onSubmit={(event) => onSubmit(event)}>
          <ItemInputContainer >
            <ItemInputBox
              onChange={(e) => onChange(e)}
              type="text"
              placeholder="물품을 추가해주세요."
              value={inputText}
            />
            <ItemAddBtn_box>
              <ItemAddBtn type="submit">추가</ItemAddBtn>
            </ItemAddBtn_box>
          </ItemInputContainer>
        </form>
      </ItemCreateContainer>
    );
  }