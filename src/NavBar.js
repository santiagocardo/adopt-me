import React from "react"
import { Link } from "@reach/router"
import { css, keyframes } from "@emotion/core"

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const NavBar = () => (
  <header
    css={css`
      background-color: papayawhip;
      paddig: 15px;
      margin-top: 10px;
      margin-bottom: 10px;
    `}
  >
    <Link to="/">Adopt Me!</Link>
    <span
      css={css`
        font-size: 60px;
        display: inline-block;

        &:hover {
          animation: 2s ${spin} linear infinite;
        }
      `}
      role="img"
      aria-label="logo"
    >
      🐺
    </span>
  </header>
)

export default NavBar
