import Categories from "@/components/categories";
import Hero from "@/components/hero";
import Productshowcase from "@/components/productshowcase";
const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <Productshowcase />

      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit quam
        velit esse enim illum. Ducimus esse eum cumque incidunt excepturi. Animi
        vero quam enim in eligendi quos necessitatibus eveniet maiores.
      </div>
    </main>
  );
};

export default Home;
