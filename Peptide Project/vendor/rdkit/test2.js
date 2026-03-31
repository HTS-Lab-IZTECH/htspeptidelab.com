const initRDKitModule = require('./RDKit_minimal.js');
initRDKitModule().then((RDKit) => {
  const mol = RDKit.get_mol("N[C@@H](C)C(=O)O");
  mol.set_new_coords(false);
  const opts = JSON.stringify({ wedgeBonds: true, addStereoAnnotation: true });
  const svg = mol.get_svg(200, 200, opts);
  console.log("SVG 2D details:", svg.includes("dash") || svg.includes("wedge") || svg.includes("polygon") || svg.includes("class='bond-"));
  // console.log(svg);
});
