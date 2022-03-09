import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink(to: any, url: string, key: string) {
  return (
    <Link to={to}>
      <img src={url} key={key} alt="" />
    </Link>
  );
}
