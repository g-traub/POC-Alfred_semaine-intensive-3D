async function listProducts() {
  // [START vision_product_search_list_products]
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ProductSearchClient();
  
  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';

  // Resource path that represents Google Cloud Platform location.
  const locationPath = client.locationPath(projectId, location);

  const [products] = await client.listProducts({parent: locationPath});
  products.forEach(product => {
    console.log(`Product name: ${product.name}`);
    console.log(`Product id: ${product.name.split('/').pop()}`);
    console.log(`Product display name: ${product.displayName}`);
    console.log(`Product description: ${product.description}`);
    console.log(`Product category: ${product.productCategory}`);
    if (product.productLabels.length) {
      console.log(`Product labels:`);
      product.productLabels.forEach(productLabel => {
        console.log(`${productLabel.key}: ${productLabel.value}`);
      });
    }
  });
  // [END vision_product_search_list_products]
}

listProducts();