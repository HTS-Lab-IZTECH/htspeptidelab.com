const initRDKitModule = require('./RDKit_minimal.js');
initRDKitModule().then((RDKit) => {
  const mol = RDKit.get_mol("N[C@@H](C)C(=O)O");
  mol.set_new_coords(true);
  console.log(mol.get_svg(300, 300));
});
