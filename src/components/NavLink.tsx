import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
`;

type LinkProps = Omit<React.ComponentProps<typeof Link>, "children"> & {
  children: React.ReactElement;
};

export default function NavLink({ children, href }: LinkProps) {
  const child = React.Children.only(children);
  const router = useRouter();

  return (
    <StyledLink href={href}>
      {React.cloneElement(child, {
        "aria-current": router.pathname === href ? "page" : null,
      })}
    </StyledLink>
  );
}
