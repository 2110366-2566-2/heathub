"use client";

export default function GoBackArrow() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      className="hover:cursor-pointer"
      onClick={() => {
        goBack();
      }}
    >
      go back icon
    </div>
  );
}
