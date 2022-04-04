import { HiCheckCircle } from "react-icons/hi";
import Link from "next/link";

const ToastMsg = ({ closeToast, toastProps }) => (
  <Link href="/cart" passHref>
    <a className="flex items-center gap-3 text-zinc-800 font-[Nunito]">
      <HiCheckCircle className="w-8 h-8 flex-none text-green-600" />
      <div className="flex flex-col">
        <span className="font-bold">Gioco aggiunto!</span>
        <span className="text-zinc-700 text-xs">
          Premi qui per visualizzare il carrello
        </span>
      </div>
    </a>
  </Link>
);

export default ToastMsg;
