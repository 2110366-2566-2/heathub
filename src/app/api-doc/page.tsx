"use client";

import { useEffect, useState } from "react";
import { GetSpec } from "./_component/action";
import Swagger from "./_component/swagger";

function Doc() {
  const [spec, setSpec] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    GetSpec().then(setSpec);
  }, []);

  return spec ? <Swagger spec={spec} /> : <div>Loading...</div>;
}

export default Doc;
