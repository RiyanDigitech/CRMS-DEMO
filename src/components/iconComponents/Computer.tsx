import type { SVGProps } from "react";
const SvgComputer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 27 24"
    {...props}
  >
    <path
      fill="#036666"
      d="M24 0H3C1.313 0 0 1.36 0 3v13.5c0 1.688 1.313 3 3 3h6.938l-.47 2.25H7.126A1.11 1.11 0 0 0 6 22.875C6 23.531 6.469 24 7.125 24h12.75A1.11 1.11 0 0 0 21 22.875a1.14 1.14 0 0 0-1.125-1.125h-2.39l-.47-2.25H24c1.64 0 3-1.312 3-3V3c0-1.64-1.36-3-3-3m-8.812 21.75h-3.422l.468-2.25h2.485zm9.562-5.25c0 .422-.375.75-.75.75H3a.74.74 0 0 1-.75-.75v-2.25h22.5zm0-4.5H2.25V3c0-.375.328-.75.75-.75h21c.375 0 .75.375.75.75z"
    />
  </svg>
);
export default SvgComputer;
