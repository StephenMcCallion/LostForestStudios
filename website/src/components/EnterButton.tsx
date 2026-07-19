"use client";

export default function EnterButton() {

  function handleClick() {
    console.log("Entering forest...");
  }

  return (
    <button
      className="enter-button"
      onClick={handleClick}
      >
      Enter
    </button>
  );
}