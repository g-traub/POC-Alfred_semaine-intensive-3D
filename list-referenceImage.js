async function listReferenceImage() {
  // [START vision_product_search_list_reference_images]

  const vision = require('@google-cloud/vision');

  const client = new vision.ProductSearchClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const productId = 'SHIRT_003';

  const formattedParent = client.productPath(projectId, location, productId);
  const request = {
    parent: formattedParent,
  };

  const [response] = await client.listReferenceImages(request);
  response.forEach(image => {
    console.log(`image.name: ${image.name}`);
    console.log(`image.uri: ${image.uri}`);
  });
}

listReferenceImage()