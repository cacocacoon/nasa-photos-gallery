import Image from "next/image";
import styled from "styled-components";
import type { Apods } from "@/modules/apod/schemas";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #ffffff40;
  border-radius: 20px;
  border: 1px solid #ffffff50;
`;

const StyledImage = styled(Image)<{ $selected: boolean }>`
  border-radius: 12px;
  cursor: pointer;

  ${({ $selected }) => $selected && `border: 2px solid #ffffff;`}
`;

type ImageSelectorProps = {
  className?: string;
  items: Apods;
  selectedIndex: number;
  onSelect: (selectedIndex: number) => void;
};

export default function ImageSelector(props: ImageSelectorProps) {
  const { className, items, selectedIndex, onSelect } = props;

  return (
    <Container className={className}>
      {items.map((item, index) => (
        <StyledImage
          key={index}
          width={48}
          height={48}
          priority
          quality={20}
          src={item.url}
          alt={item.title}
          onClick={() => onSelect(index)}
          $selected={index === selectedIndex}
        />
      ))}
    </Container>
  );
}
