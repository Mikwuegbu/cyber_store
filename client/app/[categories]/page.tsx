const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ categories: string }>;
}) => {
  const { categories } = await params;
  console.log(categories);

  return <div>CategoriesPage</div>;
};

export default CategoriesPage;
