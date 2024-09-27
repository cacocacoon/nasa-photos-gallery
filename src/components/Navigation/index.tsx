import Image from "next/image";
import styled from "styled-components";
import NavLink from "@/components/NavLink";
import SearchBar from "./SearchBar";

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  position: sticky;
  padding: 0 16px;
  top: 0;
  z-index: 1;
  height: 80px;
  width: 100%;
  backdrop-filter: blur(10px);
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover {
    background-color: #8080802b;
  }

  .logo {
    position: relative;
    top: 1px;
    left: 3px;
  }
`;

const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  min-width: 60px;
  padding: 0 16px;
  border-radius: 24px;
  white-space: nowrap;
  font-weight: 600;
  color: black;
  border: none;
  cursor: pointer;
  background-color: rgb(241, 241, 241);

  &[aria-current],
  &[aria-current]:hover {
    background-color: black;
    color: white;
  }

  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

export default function Navigation() {
  return (
    <NavigationContainer>
      <NavLink href="/">
        <LogoContainer>
          <Image
            className="logo"
            src="/nasa-logo.svg"
            width={64}
            height={64}
            alt="logo"
            priority
          />
        </LogoContainer>
      </NavLink>
      <NavLink href="/">
        <NavButton>Home</NavButton>
      </NavLink>
      <SearchBar />
      <NavButton>Github</NavButton>
    </NavigationContainer>
  );
}
