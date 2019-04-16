async function addProductToProductSet(){
  const vision = require('@google-cloud/vision');

  const client = new vision.ProductSearchClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const productId = 'SHIRT_003';
  const productSetId = '3D-CLOTHES-SHIRTS_001';

  const productPath = client.productPath(projectId, location, productId);
  const productSetPath = client.productSetPath(
    projectId,
    location,
    productSetId
  );

  const request = {
    name: productSetPath,
    product: productPath,
  };

  await client.addProductToProductSet(request);
  console.log(`Product added to product set.`);
}

addProductToProductSet();