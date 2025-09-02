import { IoIosArrowForward } from "react-icons/io";

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ categories: string }>;
}) => {
  const { categories } = await params;
  console.log(categories);

  return (
    <main className="px-40 py-6">
      <div className="flex justify-start gap-3 text-gray-400">
        <p>Home</p>
        <IoIosArrowForward size={20} />
        <p>Catalog</p>
        <IoIosArrowForward size={20} />
        <p className="text-black">
          {categories.charAt(0).toUpperCase() + categories.slice(1)}
        </p>
      </div>
    </main>
  );
};

export default CategoriesPage;
