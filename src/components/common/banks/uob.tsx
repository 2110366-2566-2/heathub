import { type CSSProperties } from "react";

const UOBIcon = (props: {
  className?: string;
  style?: CSSProperties;
  fill?: string;
}) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 128 128"
    enableBackground="new 0 0 128 128"
    className={props.className}
    style={props.style}
    fill={props.fill}
  >
    <path
      fill={props.fill}
      d="M59,12.7v45.8h9.9V12.7c0-3.1,2.5-5.7,5.5-5.7s5.5,2.6,5.5,5.7v45.8h9.9V12.7c0-3.1,2.5-5.7,5.5-5.7
	c3,0,5.5,2.6,5.5,5.7v45.8h14.4c3.2,0,5.7,2.4,5.7,5.5c0,3-2.6,5.5-5.7,5.5h-14.4v45.8c0,3.1-2.5,5.7-5.5,5.7c-3,0-5.5-2.6-5.5-5.7
	V69.5h-9.9v45.8c0,3.1-2.5,5.7-5.5,5.7c-3,0-5.5-2.6-5.5-5.7V69.5H59v45.8c0,3.1-2.5,5.7-5.5,5.7c-3,0-5.5-2.6-5.5-5.7V69.5h-9.9
	v45.8c0,3.1-2.5,5.7-5.5,5.7s-5.5-2.6-5.5-5.7V69.5H12.7C9.5,69.5,7,67,7,64c0-3,2.5-5.5,5.7-5.5h14.4V12.7c0-3.1,2.5-5.7,5.5-5.7
	s5.5,2.6,5.5,5.7v45.8h10V12.7c0-3.1,2.5-5.7,5.5-5.7C56.6,7,59,9.6,59,12.7"
    />
  </svg>
);

export default UOBIcon;
