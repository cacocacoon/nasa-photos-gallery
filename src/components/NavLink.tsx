"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: transparent;
`;

type LinkProps = Omit<React.ComponentProps<typeof Link>, "children"> & {
  children: React.ReactElement;
};

export default function NavLink({ children, href }: LinkProps) {
  const child = React.Children.only(children);
  const pathname = usePathname();

  return (
    <StyledLink href={href}>
      {React.cloneElement(child, {
        "aria-current": pathname === href ? "page" : null,
      })}
    </StyledLink>
  );
}
