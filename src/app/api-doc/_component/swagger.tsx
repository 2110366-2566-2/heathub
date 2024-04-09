"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

/* eslint-disable @typescript-eslint/no-explicit-any */
function Swagger(props: { spec: Record<string, any> }) {
  return <SwaggerUI spec={props.spec} />;
}

export default Swagger;
