async function deleteProduct(){
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ProductSearchClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const productId = 'SHIRT_003';

  // Resource path that represents full path to the product.
  const productPath = client.productPath(projectId, location, productId);

  await client.deleteProduct({name: productPath});
  console.log('Product deleted.');
}
deleteProduct();