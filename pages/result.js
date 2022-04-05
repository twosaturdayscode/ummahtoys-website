import Link from "next/link";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const { order, email, status } = router.query;

  if (status === "success")
    return (
      <div className="w-full flex flex-col items-center my-16 text-zinc-700 gap-3 px-2">
        <h1 className="font-[CeraPro] font-black text-5xl px-10 text-center">
          🎉 Abbiamo ricevuto il tuo ordine!
        </h1>
        <div className="flex gap-2 mt-5">
          <span className="text-zinc-600 text-xl">
            Il numero del tuo ordine è:
          </span>
          <span className="font-black text-2xl">#{order}</span>
        </div>
        <p className="text-center px-5 md:w-1/2 text-zinc-800">
          Alhamdulillah, il pagamento è avvenuto con successo, ti abiamo mandato
          una mail con il resoconto del tuo ordine, all&apos;indirizzo:{" "}
          <span className="font-black text-lg">{email}</span>
          <br />
          <br />
          In sha&apos;Allah, appena spediremo i tuoi giochi ti invieremo una
          mail con il numero di tracking del corriere, così saprai esattamente
          quando arriverà il tuo pacco.
        </p>
        <p className="text-center px-5 md:w-1/2 text-sm">
          L&apos;indirizzo mail è sbagliato? Nessun problema scrivici una mail
          indicando il tuo numero ordine: ummahtoys@gmail.com
        </p>
        <Link href={"/store"}>
          <a className="w-64 h-16 flex justify-center items-center bg-zinc-700 text-white cursor-pointer focus:ring-4 focus:ring-zinc-300 focus:rounded active:bg-zinc-600">
            Torna al negozio
          </a>
        </Link>
      </div>
    );

  return (
    <div className="w-full flex flex-col items-center my-16 text-zinc-700 gap-3 px-2">
      <h1 className="font-[CeraPro] font-black text-5xl px-10 text-center">
        ❌ Oh no! Qualcosa è andato storto
      </h1>
      <p className="text-center md:w-3/4 text-zinc-800 my-6">
        Non ti preoccupare riprova più tardi, ma se il problema dovesse
        persistere ti prego non esitare a contattarci alla mail:
        <span className="font-bold text-zinc-800"> ummahtoys@gmail.com</span>
        <br />
        Eventualmente se il problema dovesse figurare nel nostro sistema ti
        contatteremo in breve tempo in sha&apos;Allah
      </p>
      <Link href={"/store"}>
        <a className="w-64 h-16 flex justify-center items-center bg-zinc-700 text-white cursor-pointer focus:ring-4 focus:ring-zinc-300 focus:rounded active:bg-zinc-600">
          Torna al negozio
        </a>
      </Link>
    </div>
  );
}
