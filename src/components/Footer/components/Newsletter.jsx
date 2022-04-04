import { HiArrowNarrowRight } from "react-icons/hi";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-col items-start gap-3">
      <h3>Iscriviti alla Newsletter</h3>
      <div className="flex flex-row gap-2 justify-center items-center border-[1px] border-slate-800 px-3 py-1">
        <input
          type="email"
          value={email}
          placeholder="Inserisci la tua e-mail"
          onChange={(e) => setEmail(e.target.value)}
          className="border-none ring-0 focus:ring-0 text-black p-1"
        />
        <button className="w-5 h-5">
          <HiArrowNarrowRight />
        </button>
      </div>
    </div>
  );
}
