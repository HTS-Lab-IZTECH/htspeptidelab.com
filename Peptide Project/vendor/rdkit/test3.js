const initRDKitModule = require('./RDKit_minimal.js');
initRDKitModule().then((RDKit) => {
  const checkWedge = (mol, desc) => {
    try {
      const svg = mol.get_svg(200, 200).toLowerCase();
      const hasWedge = svg.includes("dasharray") || svg.includes("polygon");
      console.log(desc, "has wedges:", hasWedge);
    } catch(e) {}
  };

  const smiles = "N[C@@H](C)C(=O)O"; // Alanine
  console.log("Testing:", smiles);

  const mol1 = RDKit.get_mol(smiles);
  mol1.set_new_coords(true); // use coord gen
  checkWedge(mol1, "CoordGen=true without Hs");

  const mol2 = RDKit.get_mol(smiles);
  mol2.set_new_coords(false); // old generator
  checkWedge(mol2, "CoordGen=false without Hs");

  const mol3 = RDKit.get_mol(smiles);
  if (mol3.add_hs) mol3.add_hs();
  mol3.set_new_coords(true);
  checkWedge(mol3, "CoordGen=true WITH Hs");

  const mol4 = RDKit.get_mol(smiles);
  if (mol4.add_hs) mol4.add_hs();
  mol4.set_new_coords(false);
  checkWedge(mol4, "CoordGen=false WITH Hs");
});
