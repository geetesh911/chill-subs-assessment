import { SVGProps } from "react";

export const ThemeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    fill="none"
    viewBox="0 0 10 10"
    {...props}
  >
    <rect width="10" height="10" fill="#0284C7" rx="5"></rect>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 2.5v5M7.165 3.75l-4.33 2.5M2.835 3.75l4.33 2.5"
    ></path>
  </svg>
);
