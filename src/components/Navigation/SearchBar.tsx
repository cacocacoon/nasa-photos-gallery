import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  flex: 1;
  height: 48px;
`;

const Input = styled.input`
  width: 100%;
  appearance: none;
  color: rgb(51, 51, 51);
  background-color: rgba(241, 241, 241, 0.5);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 24px;
  padding: 16px 16px;
  line-height: 16px;

  &:hover {
    background-color: rgba(225, 225, 225, 0.5);
  }

  &:focus {
    box-shadow: rgba(0, 132, 255, 0.5) 0px 0px 0px 4px;
  }

  &:focus-visible {
    outline: none;
  }
`;

export default function SearchBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>();

  const handleChange: React.FormEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    setKeyword(value);
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { key } = e;

    if (key !== "Enter") {
      return;
    }

    if (!keyword?.trim()) {
      router.push({ pathname: "/" });
      return;
    }

    router.push({ pathname: "/search", query: { q: keyword } });
  };

  return (
    <SearchBarContainer>
      <Input
        placeholder="Search"
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={keyword}
      />
    </SearchBarContainer>
  );
}
