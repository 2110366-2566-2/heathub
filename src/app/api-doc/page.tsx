"use client";

import { useEffect, useState } from "react";
import { GetSpec } from "./_component/action";
import Swagger from "./_component/swagger";

function Doc() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [spec, setSpec] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    GetSpec().then(setSpec).catch(console.error);
  }, []);

  return spec ? <Swagger spec={spec} /> : <div>Loading...</div>;
}

export default Doc;
