"use client";

import { api } from "@/trpc/react";
import { useRef, useState } from "react";

export default function TestWin() {
  const searchFilter = api.auth.getHostsByFilter.useMutation()
  const formRef = useRef<HTMLFormElement>(null);
  const [result, setResult] = useState<any[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    const selectedInterests = Array.from(
      formData.getAll("interests") || [],
    ).map((interest) => String(interest));
    try {
      console.log("gender",formData.get("gender") as string)
      console.log("interests",selectedInterests)
      console.log("rate",Number(formData.get("ratingScore")))
      console.log("age range" ,[
        Number(formData.get("ageRangeMin")),
        Number(formData.get("ageRangeMax")) != 0 ? Number(formData.get("ageRangeMax")):99
      ])
      const mutationResult = await searchFilter.mutateAsync({
        gender: formData.get("gender") as string,
        interests: selectedInterests,
        rating: Number(formData.get("ratingScore")),
        ageRange: [
          Number(formData.get("ageRangeMin")),
          Number(formData.get("ageRangeMax")) != 0 ? Number(formData.get("ageRangeMax")):99
        ],
      });
      let data = mutationResult || [];
      setResult(data)
      console.log("result",result)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1>Test</h1>
        {result ? (
          result!.map((user) => <p key={user.aka}>{JSON.stringify(user)}</p>)
        ) : (
          <p>loading</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-black"
          ref={formRef}
        >
          <input
            className="rounded-md p-2"
            type="text"
            name="gender"
            placeholder="gender"
          />
          <input
            className="rounded-md p-2"
            type="text"
            name="ratingScore"
            placeholder="Rating score"
          />
          <input
            className="rounded-md p-2"
            type="number"
            name="ageRangeMin"
            placeholder="Age min"
          />
          <input
            className="rounded-md p-2"
            type="number"
            name="ageRangeMax"
            placeholder="Age max"
          />
          <p style={{ color: "white" }}>Interests</p>
          <label
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <input
              className="rounded-md p-2"
              type="checkbox"
              name="interests"
              value="swim"
              placeholder="swim"
              style={{ transform: "scale(3)" }}
            />
            <p style={{ color: "white", marginLeft: 20 }}>Swim</p>
          </label>

          <label
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <input
              className="rounded-md p-2"
              type="checkbox"
              name="interests"
              value="run"
              placeholder="run"
              style={{ transform: "scale(3)" }}
            />
            <p style={{ color: "white", marginLeft: 20 }}>Run</p>
          </label>

          <label
            style={{ color: "white", display: "flex", alignItems: "center" }}
          >
            <input
              className="rounded-md p-2"
              type="checkbox"
              name="interests"
              value="sleep"
              placeholder="sleep"
              style={{ transform: "scale(3)" }}
            />
            <p style={{ color: "white", marginLeft: 20 }}>Sleep</p>
          </label>
          <button
            type="submit"
            className="rounded-md bg-violet-500 p-4 text-white"
          >
            Search
          </button>
        </form>
      </div>
    </main>
  );
}
