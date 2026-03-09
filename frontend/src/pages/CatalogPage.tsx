import { ProductCatalog } from '../components/ProductCatalog';

export function CatalogPage() {
  return (
    <div className="container py-8">
      <div className="hero-banner mb-8">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.png"
          alt="Uttarakhandi Willow Bats"
          className="w-full h-auto"
        />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 text-primary">Handcrafted Uttarakhandi Willow Bats</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the finest cricket bats crafted from premium Uttarakhandi willow. 
          Each bat is a masterpiece of traditional craftsmanship.
        </p>
      </div>

      <ProductCatalog />
    </div>
  );
}
