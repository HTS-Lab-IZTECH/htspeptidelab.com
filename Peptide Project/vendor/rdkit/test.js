const initRDKitModule = require('./RDKit_minimal.js');

initRDKitModule().then((RDKit) => {
  const mol = RDKit.get_mol("N[C@@H](C)C(=O)O");
  mol.set_new_coords(false); // test without coordgen
  const svg = mol.get_svg(200, 200);
  console.log("SVG has dasharray?", svg.includes("stroke-dasharray"));
  
  // Try 3D
  let mol3d = RDKit.get_mol("N[C@@H](C)C(=O)O");
  mol3d.add_hs();
  try {
     const molblock = mol3d.get_new_coords(); // Usually generates 3D in JS
     console.log("3D Molblock generated? Length:", molblock.length);
     console.log(molblock.split("\\n").slice(0, 5).join("\\n"));
  } catch (e) {
     console.error("3D failed:", e);
  }
});
