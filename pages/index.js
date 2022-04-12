import Head from "next/head";
import { getWooProducts } from "../src/api";
import Hero from "../src/components/Hero";
import Featured from "../src/components/Featured/Featured";
import Jumbotron from "../src/components/Jumbotron";
import MostLoved from "../src/components/MostLoved/MostLoved";
import Features from "../src/components/Features";

const Home = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Home | Ummah Toys Shop</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          href="favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-16x16.png"
          sizes="16x16"
        />
      </Head>
      <Hero />
      <Featured products={products} />
      <Jumbotron />
      <MostLoved products={products} />
      <Features />
    </div>
  );
};

export async function getStaticProps() {
  const products = await getWooProducts();

  return {
    props: {
      products: products || [],
    },
    revalidate: 1,
  };
}

export default Home;
