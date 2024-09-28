import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 24px;
  white-space: nowrap;
  line-height: 16px;
  color: black;
  border: none;
  cursor: pointer;
  background-color: rgba(241, 241, 241, 0.5);
  backdrop-filter: blur(10px);

  &:hover {
    background-color: rgba(225, 225, 225, 0.5);
  }
`;

export default Button;
