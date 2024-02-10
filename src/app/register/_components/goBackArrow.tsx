"use client";

export default function GoBackArrow() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      onClick={() => {
        goBack();
      }}
    >
      go back icon
    </div>
  );
}
