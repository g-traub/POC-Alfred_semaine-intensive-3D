async function getSimilarProductsFile() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  const fs = require('fs');

  // Creates a client
  const productSearchClient = new vision.ProductSearchClient();
  const imageAnnotatorClient = new vision.ImageAnnotatorClient();

  const projectId = 'project-terminal-shopping';
  const location = 'europe-west1';
  const productSetId = '3D-CLOTHES-SHIRTS_001';
  const productCategory = 'apparel';
  const filePath = '/Users/pro/Documents/Hetic/projets/semaine-intensive_3D/back/assets/test/ultimate-test.jpg';
  const filter = '';
  const productSetPath = productSearchClient.productSetPath(
    projectId,
    location,
    productSetId
  );
  const content = fs.readFileSync(filePath, 'base64');
//récuperer data envoyé coté client et attribuer à content
  const request = {
    image: {content: content},
    features: [{type: 'PRODUCT_SEARCH'}],
    imageContext: {
      productSearchParams: {
        productSet: productSetPath,
        productCategories: [productCategory],
        filter: filter,
      },
    },
  };
  const [response] = await imageAnnotatorClient.batchAnnotateImages({
    requests: [request],
  });
  console.log('Search Image:', filePath);
  const results = response['responses'][0]['productSearchResults']['results'][0];
  console.log('\nSimilar product information:\n');
  console.log('Product id:', results['product'].name.split('/').pop(-1));
  console.log('Product display name:', results['product'].displayName);
  console.log('Product description:', results['product'].description);
  console.log('Product category:', results['product'].productCategory);
}

getSimilarProductsFile();