import { ReactNode } from "react";
import { Button } from "./ui/button";
import { ArrowRight01Sharp } from "asem-icons";

export function MyButton({ children }: { children: ReactNode }) {
  return (
    <button className="bg-my-bright-background text-black rounded-md px-3.5 py-2.5 font-bold cursor-pointer flex gap-x-2 items-center">
      {children}{" "}
      <span className="size-4 bg-my-dark-background rounded-[6px] text-white flex justify-center items-center">
        <ArrowRight01Sharp className="size-3"/>
      </span>
    </button>
  );
}
