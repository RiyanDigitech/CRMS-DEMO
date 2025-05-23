import type { SVGProps } from "react";
const SvgDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 38 38"
    {...props}
  >
    <rect
      width={36}
      height={36}
      x={1}
      y={1}
      fill="#FAFAFA"
      stroke="#EBF0ED"
      rx={10}
    />
    <path
      fill="#6B6B6B"
      d="M16.01 11.055c.168-.37.538-.605.94-.605h4.066c.403 0 .772.235.94.605l.269.47h3.225c.571 0 1.075.504 1.075 1.075 0 .605-.504 1.075-1.075 1.075h-12.9c-.605 0-1.075-.47-1.075-1.075 0-.571.47-1.075 1.075-1.075h3.225zm8.7 15.083c-.033.874-.738 1.512-1.612 1.512h-8.23c-.873 0-1.579-.638-1.613-1.512l-.739-11.388H25.45z"
    />
  </svg>
);
export default SvgDelete;
