import { useRouter } from "next/router";
import Link from "next/link";

import { useCartContext } from "../src/context";

import BackToButton from "../src/components/BackToButton";
import CartRow from "../src/components/Cart/CartRow";

export default function Cart() {
  const router = useRouter();
  const {
    cart,
    getTotalValue,
    isCartEmpty,
    addToProductQuantity,
    removeItemFromCart,
  } = useCartContext();

  return (
    <main className="grid grid-cols-12 grid-flow-row w-full my-10 mb-16 gap-8">
      <BackToButton label={"Torna al negozio"} href={"/store"} />
      <h1 className="col-span-full col-start-2 col-end-12 text-5xl text-zinc-700 font-[CeraPro] text-center md:text-left">
        Carrello
      </h1>
      <section className="col-span-full col-start-2 col-end-12 my-5">
        <div className="w-full table-fixed">
          <div className="flex flex-row justify-between w-full text-left text-gray-400 border-b-[0.5px] font-light md:grid grid-cols-5">
            <span className="col-span-2">Prodotto</span>
            <div className="hidden md:flex justify-end col-span-2">
              <span className="w-48">Quantità</span>
            </div>
            <span className="text-right">Prezzo</span>
          </div>
          <div className="w-full border-b-[0.5px]">
            {cart.length !== 0 ? (
              cart.map((product) => (
                <CartRow
                  key={product.id}
                  name={product.name}
                  quantity={product.quantity}
                  image={product.images[0]}
                  price={product.price}
                  handleQuantityChange={(val) =>
                    addToProductQuantity(product.id, val)
                  }
                  handleRemoveItem={() => removeItemFromCart(product.id)}
                />
              ))
            ) : (
              <div className="h-40 w-full flex items-center justify-center">
                <span className="text-center text-zinc-600">
                  Il tuo carrello è vuoto
                </span>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col justify-end items-end my-5 text-zinc-700">
            <div className="text-2xl flex gap-5 py-3">
              <span>Subtotale:</span>
              <span>€{getTotalValue()}</span>
            </div>
            <div className="text-2xl flex gap-5 py-1">
              <span className="text-zinc-500 text-sm">
                Il costo della consegna è indicato al momento del pagamento.
              </span>
            </div>
            <div className="w-full flex flex-row-reverse items-center gap-5 py-5">
              <button
                className={`w-64 h-16 px-5 flex justify-center items-center bg-zinc-700 text-white cursor-pointer focus:ring-4 focus:ring-zinc-300 focus:rounded active:bg-zinc-600 ${
                  isCartEmpty() ? "bg-zinc-400 cursor-not-allowed" : ""
                }`}
                disabled={isCartEmpty()}
                onClick={() => router.push("/checkout")}
              >
                Procedi al checkout
              </button>
              <Link href={"/store"}>
                <a className="underline">Torna al negozio</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
