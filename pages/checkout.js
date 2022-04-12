import Link from "next/link";
import { HiXCircle } from "react-icons/hi";
import { BsShop, BsTruck } from "react-icons/bs";
import { useForm } from "react-hook-form";
import BackToButton from "../src/components/BackToButton";
import {
  FormInput,
  FormSection,
  FormField,
  FormRadio,
  FormSelectProvincia,
  FormRadioWithAccordion,
  PickupRadio,
} from "../src/components/Checkout/FormComponents";

import useCheckout from "../src/hooks/useCheckout";
import ProductRow from "../src/components/Checkout/ProductRow";
import {
  MastercardIcon,
  PayPalIcon,
  VisaIcon,
} from "../src/components/Checkout/icons";

export default function Checkout() {
  const { isLoading, isError, cart, getSubtotal, getTotal, createOrder } =
    useCheckout();

  const shippingOptions = [
    {
      value: "spedizione",
      text: "Spedizione",
      icon: (
        <BsTruck className="w-5 h-5 peer-checked:text-indigo-500 text-gray-500" />
      ),
    },
    {
      value: "ritiro",
      text: "Ritiro",
      icon: (
        <BsShop className="w-5 h-5 peer-checked:text-indigo-500 text-gray-500" />
      ),
    },
  ];

  const pickupOptions = [
    {
      name: "Milano",
      value: "milano",
      location: "Milano, MI, Lombardia, Italia",
    },
    {
      name: "Monza",
      value: "monza",
      location: "Monza, MB, Lombardia, Italia",
    },
    {
      name: "Bergamo",
      value: "bergamo",
      location: "Bergamo, BG, Lombardia, Italia",
    },
  ];

  const paymentOptions = [
    {
      id: 0,
      value: "stripe",
      text: "Carte / Prepagate",
      icons: [<MastercardIcon key={0} />, <VisaIcon key={1} />],
      body: "Una volta cliccato 'Acquista' verrai reindirizzato alla pagina di pagamento.",
    },
    {
      id: 1,
      value: "paypal",
      disabled: true,
      text: "Paypal (presto in arrivo!)",
      icons: [<PayPalIcon key={0} />],
      body: "Una volta cliccato 'Acquista' verrai reindirizzato alla pagina di Paypal, dove potrai effettuare il login e procedere con il pagamento.",
    },
    {
      id: 2,
      value: "cod",
      text: "Pagamento alla consegna",
      icons: [],
      body: "Il pagamento alla consegna prevede un supplemento da parte del corriere di €3.",
    },
  ];

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "",
      shippingMethod: "spedizione",
      name: "",
      lastname: "",
      address: "",
      addressNotes: "",
      state: "",
      city: "",
      postalCode: "",
      phone: "",
      paymentMethod: "stripe",
      pickupMethod: pickupOptions[0].value,
    },
  });
  const watchShippingMethod = watch("shippingMethod");
  const watchPaymentMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    createOrder(cart, data);
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 text-center flex flex-col justify-center items-center gap-5">
        <div className="flex items-center justify-center ">
          <div className="w-20 h-20 border-b-4 border-zinc-600 rounded-full animate-spin"></div>
        </div>
        <span className="animate-pulse">Ci siamo quasi...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-96 text-center flex flex-col justify-center items-center gap-5 text-zinc-700">
        <span>
          <HiXCircle className="w-20 h-20 text-red-800" />
        </span>
        <span className="text-2xl">
          Qui non c&apos;è niente, prova a tornare indietro.
        </span>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-12 grid-flow-row w-full my-10 mb-16 gap-8">
      <BackToButton label={"Tornal al carrello"} href={"/cart"} />
      <h1 className="col-span-full col-start-2 col-end-12 text-5xl text-zinc-700 font-[CeraPro] text-center md:text-left">
        Checkout
      </h1>
      <section className="col-span-full col-start-2 col-end-12 my-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col md:grid md:px-0 grid-cols-12"
        >
          <div className="col-start-1 col-end-6 flex flex-col text-zinc-700">
            <FormSection title={"Informazioni di contatto"}>
              <FormInput
                type={"email"}
                placeholder="Email"
                name={"email"}
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                errorMessage={"Perfavore inserisci una email valida."}
              />
              <FormInput
                type="tel"
                name={"phone"}
                control={control}
                placeholder={"Cellulare"}
                rules={{ required: true }}
                errorMessage={
                  "Ci servirà a contattarti per qualsiasi evenienza"
                }
              />
            </FormSection>
            <FormSection title={"Metodo di consegna"}>
              <FormRadio
                name={"shippingMethod"}
                control={control}
                options={shippingOptions}
                defaultValue="spedizione"
              />
            </FormSection>
            {/* NOTE: IF THE SHIPPING OPTION IS SHIPPING */}
            {watchShippingMethod === "spedizione" && (
              <>
                <FormSection title={"Informazioni di spedizione"}>
                  <FormField>
                    <FormInput
                      placeholder={"Nome"}
                      name={"name"}
                      control={control}
                      rules={{ required: true }}
                      errorMessage={"Hey, hai dimenticato il nome"}
                    />
                    <FormInput
                      placeholder={"Cognome"}
                      name={"lastname"}
                      control={control}
                      rules={{ required: true }}
                      errorMessage={"Hey, hai dimenticato il cognome"}
                    />
                  </FormField>
                  <FormInput
                    placeholder="Via e n. civico"
                    name={"address"}
                    control={control}
                    rules={{ required: true }}
                    errorMessage={"Hai dimenticato il tuo indirizzo"}
                  />
                  <FormInput
                    placeholder="Scala, edificio, altre info utili, ecc. (opzionale)"
                    name={"addressNotes"}
                    control={control}
                  />
                  <FormField>
                    {/* <FormSelectProvincia
                      name={"state"}
                      control={control}
                      errorMessage="Seleziona una provincia"
                      rules={{ required: true, minLength: 1 }}
                    /> */}
                    <FormInput
                      placeholder="Provincia"
                      name={"state"}
                      control={control}
                      rules={{ required: true }}
                      errorMessage={"Hai dimenticato la provincia"}
                    />
                    <FormInput
                      placeholder="Città"
                      name={"city"}
                      control={control}
                      rules={{ required: true }}
                      errorMessage={"Hai dimenticato la città"}
                    />
                    <FormInput
                      placeholder="CAP"
                      name={"postalCode"}
                      control={control}
                      rules={{ required: true }}
                      errorMessage={"Hai dimenticato il CAP"}
                    />
                  </FormField>
                </FormSection>
                <FormSection title={"Metodo di pagamento"}>
                  <FormRadioWithAccordion
                    name={"paymentMethod"}
                    control={control}
                    options={paymentOptions}
                    defaultValue="stripe"
                    currentSelection={watchPaymentMethod}
                  />
                </FormSection>
              </>
            )}
            {/* NOTE: IF THE SHIPPING OPTION IS WITHDRAW */}
            {watchShippingMethod === "ritiro" && (
              <FormSection title={"Luogo di ritiro"}>
                <PickupRadio
                  name={"pickupMethod"}
                  control={control}
                  options={pickupOptions}
                  defaultValue={"milano"}
                />
              </FormSection>
            )}
          </div>
          {/* NOTE: SUBTOTAL & TOTAL SECTION */}
          <div className="col-start-7 col-end-13">
            <FormSection title={"Prodotti"}>
              {cart &&
                cart.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
            </FormSection>
            <FormSection title={"Pagamento"} className="text-zinc-800">
              <div className="flex justify-between px-8 font-light">
                <span>Subtotale:</span>
                <span className="font-medium">€{getSubtotal()}</span>
              </div>
              <div className="flex justify-between px-8 font-light">
                <span>Spese di spedizione:</span>
                <span className="font-medium">
                  {watchShippingMethod === "spedizione" ? "€5.99" : "Gratis"}
                </span>
              </div>
              {watchPaymentMethod === "cod" && (
                <div className="flex justify-between px-8 font-light text-zinc-500">
                  <span>Supplemento contrassegno:</span>
                  <span className="font-medium">€3</span>
                </div>
              )}
              <hr className="h-[0.5px]" />
              <div className="flex justify-between px-8 font-light my-4">
                <span className="text-zinc-800 font-medium">Totale</span>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-xs">EUR</span>
                  <span className="font-medium text-2xl">
                    {getTotal(watchShippingMethod, watchPaymentMethod)}€
                  </span>
                </div>
              </div>
              <div className="w-full flex items-center justify-center gap-5 py-5">
                <Link href={"/cart"}>
                  <a className="underline">Torna al carrello</a>
                </Link>
                <button
                  type="submit"
                  className="w-64 h-16 px-5 font-normal flex justify-center items-center bg-zinc-700 text-white cursor-pointer focus:ring-4 focus:ring-zinc-300 focus:rounded active:bg-zinc-600"
                >
                  Acquista!
                </button>
              </div>
            </FormSection>
          </div>
        </form>
      </section>
    </main>
  );
}
