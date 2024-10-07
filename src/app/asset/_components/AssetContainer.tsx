"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import Button from "@/components/Button";

const AssetWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  min-height: 500px;
  z-index: 0;
`;

const BackButton = styled(Button)`
  position: fixed;
  top: 96px;
  left: 16px;
  font-weight: 600;
  background-color: white;
  padding: 12px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
`;

const AssetBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  cursor: zoom-out;
`;

export default function AssetContainer({ children }: React.PropsWithChildren) {
  const router = useRouter();

  return (
    <AssetWrapper>
      <BackButton onClick={() => router.back()}>
        <Image src="/left-arrow.svg" alt="left arrow" width={20} height={20} />
      </BackButton>
      {children}
      <AssetBackground onClick={() => router.back()} />
    </AssetWrapper>
  );
}
