"use client";

import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";

export default function NextBreadcrumbs() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const crumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    const text = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, text };
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" separator="/">
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return isLast ? (
          <Typography key={crumb.href} color="text.primary">
            {crumb.text}
          </Typography>
        ) : (
          <Link
            key={crumb.href}
            underline="hover"
            color="inherit"
            href={crumb.href}
          >
            {crumb.text}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
