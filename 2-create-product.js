async function createProduct(){
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ProductSearchClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const productId = 'SHIRT_003';
  const productDisplayName = 'Flannel Shirt Regular fit - GREY';
  const productCategory = 'apparel';

  // Resource path that represents Google Cloud Platform location.
  const locationPath = client.locationPath(projectId, location);

  const product = {
    displayName: productDisplayName,
    productCategory: productCategory,
  };

  const request = {
    parent: locationPath,
    product: product,
    productId: productId,
  };

  const [createdProduct] = await client.createProduct(request);
  console.log(`Product name: ${createdProduct.name}`);
}
createProduct();