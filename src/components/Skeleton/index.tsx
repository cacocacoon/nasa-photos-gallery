import styled from "styled-components";

const Skeleton = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 16px;
  background-color: #e0e0e0;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

export default Skeleton;
