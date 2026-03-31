const aminoAcids = {
  A: { code: "A", name: "Alanine", three: "ALA", formula: { C: 3, H: 7, N: 1, O: 2 }, sideAtom: { name: "CB", elem: "C", reach: 1.15, lift: 0.95 } },
  C: { code: "C", name: "Cysteine", three: "CYS", formula: { C: 3, H: 7, N: 1, O: 2, S: 1 }, sideAtom: { name: "SG", elem: "S", reach: 1.2, lift: 1.05 } },
  D: { code: "D", name: "Aspartic acid", three: "ASP", formula: { C: 4, H: 7, N: 1, O: 4 }, sideAtom: { name: "CG", elem: "C", reach: 1.32, lift: 1 } },
  E: { code: "E", name: "Glutamic acid", three: "GLU", formula: { C: 5, H: 9, N: 1, O: 4 }, sideAtom: { name: "CG", elem: "C", reach: 1.42, lift: 1 } },
  F: { code: "F", name: "Phenylalanine", three: "PHE", formula: { C: 9, H: 11, N: 1, O: 2 }, sideAtom: { name: "CG", elem: "C", reach: 1.55, lift: 1.08 } },
  G: { code: "G", name: "Glycine", three: "GLY", formula: { C: 2, H: 5, N: 1, O: 2 }, sideAtom: null },
  H: { code: "H", name: "Histidine", three: "HIS", formula: { C: 6, H: 9, N: 3, O: 2 }, sideAtom: { name: "CG", elem: "C", reach: 1.48, lift: 1.12 } },
  I: { code: "I", name: "Isoleucine", three: "ILE", formula: { C: 6, H: 13, N: 1, O: 2 }, sideAtom: { name: "CG1", elem: "C", reach: 1.45, lift: 1.04 } },
  K: { code: "K", name: "Lysine", three: "LYS", formula: { C: 6, H: 14, N: 2, O: 2 }, sideAtom: { name: "CG", elem: "C", reach: 1.55, lift: 1.08 } },
  L: { code: "L", name: "Leucine", three: "LEU", formula: { C: 6, H: 13, N: 1, O: 2 }, sideAtom: { name: "CG", elem: "C", reach: 1.45, lift: 1.02 } },
  M: { code: "M", name: "Methionine", three: "MET", formula: { C: 5, H: 11, N: 1, O: 2, S: 1 }, sideAtom: { name: "SD", elem: "S", reach: 1.52, lift: 1.06 } },
  N: { code: "N", name: "Asparagine", three: "ASN", formula: { C: 4, H: 8, N: 2, O: 3 }, sideAtom: { name: "CG", elem: "C", reach: 1.35, lift: 1.02 } },
  P: { code: "P", name: "Proline", three: "PRO", formula: { C: 5, H: 9, N: 1, O: 2 }, sideAtom: { name: "CG", elem: "C", reach: 1.22, lift: 0.88 } },
  Q: { code: "Q", name: "Glutamine", three: "GLN", formula: { C: 5, H: 10, N: 2, O: 3 }, sideAtom: { name: "CG", elem: "C", reach: 1.42, lift: 1.03 } },
  R: { code: "R", name: "Arginine", three: "ARG", formula: { C: 6, H: 14, N: 4, O: 2 }, sideAtom: { name: "CG", elem: "C", reach: 1.58, lift: 1.12 } },
  S: { code: "S", name: "Serine", three: "SER", formula: { C: 3, H: 7, N: 1, O: 3 }, sideAtom: { name: "OG", elem: "O", reach: 1.16, lift: 0.98 } },
  T: { code: "T", name: "Threonine", three: "THR", formula: { C: 4, H: 9, N: 1, O: 3 }, sideAtom: { name: "OG1", elem: "O", reach: 1.24, lift: 0.98 } },
  V: { code: "V", name: "Valine", three: "VAL", formula: { C: 5, H: 11, N: 1, O: 2 }, sideAtom: { name: "CG1", elem: "C", reach: 1.32, lift: 0.98 } },
  W: { code: "W", name: "Tryptophan", three: "TRP", formula: { C: 11, H: 12, N: 2, O: 2 }, sideAtom: { name: "CG", elem: "C", reach: 1.66, lift: 1.16 } },
  Y: { code: "Y", name: "Tyrosine", three: "TYR", formula: { C: 9, H: 11, N: 1, O: 3 }, sideAtom: { name: "OH", elem: "O", reach: 1.56, lift: 1.12 } },
};

const residueChemistry = {
  A: { propertyTags: ["Hydrophobic", "Aliphatic", "Neutral"], pka: { cTerm: 2.34, nTerm: 9.69 }, sideChainPka: null, sideChainChargeType: null },
  C: { propertyTags: ["Hydrophilic", "Polar", "Ionizable"], pka: { cTerm: 1.71, nTerm: 10.78 }, sideChainPka: 8.33, sideChainChargeType: "acidic" },
  D: { propertyTags: ["Hydrophilic", "Acidic", "Negative (-)"], pka: { cTerm: 2.09, nTerm: 9.82 }, sideChainPka: 3.86, sideChainChargeType: "acidic" },
  E: { propertyTags: ["Hydrophilic", "Acidic", "Negative (-)"], pka: { cTerm: 2.19, nTerm: 9.67 }, sideChainPka: 4.25, sideChainChargeType: "acidic" },
  F: { propertyTags: ["Hydrophobic", "Aromatic", "Neutral"], pka: { cTerm: 1.83, nTerm: 9.13 }, sideChainPka: null, sideChainChargeType: null },
  G: { propertyTags: ["Hydrophobic", "Aliphatic", "Neutral"], pka: { cTerm: 2.34, nTerm: 9.6 }, sideChainPka: null, sideChainChargeType: null },
  H: { propertyTags: ["Hydrophilic", "Basic", "Positive (+)"], pka: { cTerm: 1.82, nTerm: 9.17 }, sideChainPka: 6.0, sideChainChargeType: "basic" },
  I: { propertyTags: ["Hydrophobic", "Aliphatic", "Neutral"], pka: { cTerm: 2.36, nTerm: 9.68 }, sideChainPka: null, sideChainChargeType: null },
  K: { propertyTags: ["Hydrophilic", "Basic", "Positive (+)"], pka: { cTerm: 2.18, nTerm: 8.95 }, sideChainPka: 10.53, sideChainChargeType: "basic" },
  L: { propertyTags: ["Hydrophobic", "Aliphatic", "Neutral"], pka: { cTerm: 2.36, nTerm: 9.68 }, sideChainPka: null, sideChainChargeType: null },
  M: { propertyTags: ["Hydrophobic", "Aliphatic", "Neutral"], pka: { cTerm: 2.28, nTerm: 9.21 }, sideChainPka: null, sideChainChargeType: null },
  N: { propertyTags: ["Hydrophilic", "Polar", "Uncharged"], pka: { cTerm: 2.02, nTerm: 8.8 }, sideChainPka: null, sideChainChargeType: null },
  P: { propertyTags: ["Hydrophobic", "Aliphatic", "Neutral"], pka: { cTerm: 1.99, nTerm: 10.6 }, sideChainPka: null, sideChainChargeType: null },
  Q: { propertyTags: ["Hydrophilic", "Polar", "Uncharged"], pka: { cTerm: 2.17, nTerm: 9.13 }, sideChainPka: null, sideChainChargeType: null },
  R: { propertyTags: ["Hydrophilic", "Basic", "Positive (+)"], pka: { cTerm: 2.17, nTerm: 9.04 }, sideChainPka: 12.48, sideChainChargeType: "basic" },
  S: { propertyTags: ["Hydrophilic", "Polar", "Uncharged"], pka: { cTerm: 2.21, nTerm: 9.15 }, sideChainPka: null, sideChainChargeType: null },
  T: { propertyTags: ["Hydrophilic", "Polar", "Uncharged"], pka: { cTerm: 2.63, nTerm: 10.43 }, sideChainPka: null, sideChainChargeType: null },
  V: { propertyTags: ["Hydrophobic", "Aliphatic", "Neutral"], pka: { cTerm: 2.32, nTerm: 9.62 }, sideChainPka: null, sideChainChargeType: null },
  W: { propertyTags: ["Hydrophobic", "Aromatic", "Neutral"], pka: { cTerm: 2.38, nTerm: 9.39 }, sideChainPka: null, sideChainChargeType: null },
  Y: { propertyTags: ["Hydrophobic", "Aromatic", "Ionizable"], pka: { cTerm: 2.2, nTerm: 9.11 }, sideChainPka: 10.07, sideChainChargeType: "acidic" },
};

const peptideSmilesFragments = {
  A: "N[C@@H](C)C(=O)",
  C: "N[C@@H](CS)C(=O)",
  D: "N[C@@H](CC(=O)O)C(=O)",
  E: "N[C@@H](CCC(=O)O)C(=O)",
  F: "N[C@@H](Cc1ccccc1)C(=O)",
  G: "NCC(=O)",
  H: "N[C@@H](Cc1c[nH]cn1)C(=O)",
  I: "N[C@@H](C(C)CC)C(=O)",
  K: "N[C@@H](CCCCN)C(=O)",
  L: "N[C@@H](CC(C)C)C(=O)",
  M: "N[C@@H](CCSC)C(=O)",
  N: "N[C@@H](CC(=O)N)C(=O)",
  P: "N1[C@@H](CCC1)C(=O)",
  Q: "N[C@@H](CCC(=O)N)C(=O)",
  R: "N[C@@H](CCCNC(=N)N)C(=O)",
  S: "N[C@@H](CO)C(=O)",
  T: "N[C@@H](C(O)C)C(=O)",
  V: "N[C@@H](C(C)C)C(=O)",
  W: "N[C@@H](Cc1c[nH]c2ccccc12)C(=O)",
  Y: "N[C@@H](Cc1ccc(O)cc1)C(=O)",
};

const standardCodes = Object.keys(aminoAcids).sort();
const atomicWeights = { C: 12.011, H: 1.008, N: 14.007, O: 15.999, S: 32.06 };
const formulaOrder = ["C", "H", "N", "O", "S"];
const defaultPh = 7;

const dom = {
  form: document.querySelector("#peptide-form"),
  input: document.querySelector("#name-input"),
  phInput: document.querySelector("#ph-input"),
  status: document.querySelector("#status-banner"),
  length: document.querySelector("#length-value"),
  substitutions: document.querySelector("#substitution-value"),
  mass: document.querySelector("#mass-value"),
  charge: document.querySelector("#charge-value"),
  normalized: document.querySelector("#normalized-value"),
  sequence: document.querySelector("#sequence-value"),
  threeLetter: document.querySelector("#three-letter-value"),
  formula: document.querySelector("#formula-value"),
  mappingGrid: document.querySelector("#mapping-grid"),
  structureViewer: document.querySelector("#structure-viewer"),
  downloadStructureButton: document.querySelector("#download-structure-button"),
  viewerHost: document.querySelector("#viewer"),
  elementLegend: document.querySelector("#element-legend"),
  modelSource: document.querySelector("#model-source"),
  confidence: document.querySelector("#confidence-value"),
  downloadButton: document.querySelector("#download-button"),
  sampleButtons: Array.from(document.querySelectorAll("[data-sample]")),
};

const elementLegendConfig = {
  H: { label: "Hydrogen", color: "#FFFFFF", textColor: "#1b1f23" },
  C: { label: "Carbon", color: "#2E8B57", textColor: "#ffffff" },
  N: { label: "Nitrogen", color: "#3050F8", textColor: "#ffffff" },
  O: { label: "Oxygen", color: "#FF0D0D", textColor: "#ffffff" },
  S: { label: "Sulfur", color: "#FFFF30", textColor: "#1b1f23" },
  P: { label: "Phosphorus", color: "#FF8000", textColor: "#1b1f23" },
};

const elementDisplayOrder = ["C", "N", "O", "S", "P", "H"];

let viewer = null;
let latestModelMolfile = "";
let latestStructureSvg = "";
let currentViewerRequest = 0;
let currentStructureRequest = 0;
const structureFormulaCache = new Map();
const structureMolfileCache = new Map();
let latestMappedPeptide = null;
let rdkitModule = null;
let rdkitReadyPromise = null;

function normalizeNameInput(value) {
  const prepped = value
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  const lettersOnly = prepped.replace(/[^A-Z]/g, "");
  return {
    raw: value,
    normalized: lettersOnly,
    ignoredCharacters: prepped.length - lettersOnly.length,
  };
}

function normalizePhInput(value) {
  const parsedValue = Number.parseFloat(value);
  if (!Number.isFinite(parsedValue)) {
    return defaultPh;
  }

  return Math.min(14, Math.max(0, parsedValue));
}

function buildPeptideSmiles(sequence) {
  if (!sequence) {
    return "";
  }

  return `${sequence
    .split("")
    .map((code) => peptideSmilesFragments[code])
    .join("")}O`;
}

function buildStructureSvgFilename(sequence) {
  return `${(sequence || "peptide").toLowerCase()}-structure.svg`;
}

function getStructureSvgSize(sequence) {
  const residueCount = sequence.length;
  return {
    width: Math.max(320, 100 + residueCount * 68),
    height: 240,
  };
}

function nearestStandardCode(letter) {
  if (aminoAcids[letter]) {
    return letter;
  }

  let bestCode = standardCodes[0];
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (const code of standardCodes) {
    const distance = Math.abs(letter.charCodeAt(0) - code.charCodeAt(0));
    if (distance < smallestDistance || (distance === smallestDistance && code < bestCode)) {
      smallestDistance = distance;
      bestCode = code;
    }
  }

  return bestCode;
}

function mapLettersToResidues(nameInput) {
  const normalizedInput = normalizeNameInput(nameInput);
  const residues = Array.from(normalizedInput.normalized, (letter, index) => {
    const mappedCode = nearestStandardCode(letter);
    return {
      index: index + 1,
      originalLetter: letter,
      mappedCode,
      substituted: letter !== mappedCode,
      ...aminoAcids[mappedCode],
      ...residueChemistry[mappedCode],
    };
  });

  return {
    ...normalizedInput,
    residues,
    sequence: residues.map((residue) => residue.code).join(""),
    substitutions: residues.filter((residue) => residue.substituted).length,
  };
}

function buildFormulaCounts(residues) {
  const totals = { C: 0, H: 0, N: 0, O: 0, S: 0 };
  for (const residue of residues) {
    for (const [atom, count] of Object.entries(residue.formula)) {
      totals[atom] += count;
    }
  }

  const peptideBonds = Math.max(0, residues.length - 1);
  totals.H -= peptideBonds * 2;
  totals.O -= peptideBonds;
  return totals;
}

function formatFormula(counts) {
  return formulaOrder
    .filter((atom) => counts[atom] > 0)
    .map((atom) => `${atom}${counts[atom] === 1 ? "" : counts[atom]}`)
    .join("");
}

function calculateMolecularWeight(counts) {
  return formulaOrder.reduce((total, atom) => total + (counts[atom] || 0) * atomicWeights[atom], 0);
}

function calculateAcidicGroupCharge(pH, pKa) {
  return -1 / (1 + Math.pow(10, pKa - pH));
}

function calculateBasicGroupCharge(pH, pKa) {
  return 1 / (1 + Math.pow(10, pH - pKa));
}

function calculateAverageCharge(residues, pH) {
  if (!residues.length) {
    return 0;
  }

  let totalCharge = 0;
  totalCharge += calculateBasicGroupCharge(pH, residues[0].pka.nTerm);
  totalCharge += calculateAcidicGroupCharge(pH, residues[residues.length - 1].pka.cTerm);

  for (const residue of residues) {
    if (!Number.isFinite(residue.sideChainPka)) {
      continue;
    }

    if (residue.sideChainChargeType === "acidic") {
      totalCharge += calculateAcidicGroupCharge(pH, residue.sideChainPka);
    }

    if (residue.sideChainChargeType === "basic") {
      totalCharge += calculateBasicGroupCharge(pH, residue.sideChainPka);
    }
  }

  return totalCharge;
}

function formatSignedNumber(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;
}

function createStatusMessage(mappedPeptide) {
  if (!mappedPeptide.normalized) {
    return "Enter at least one alphabetic character to generate a peptide.";
  }

  const pieces = [`Built a ${mappedPeptide.residues.length}-residue peptide from "${mappedPeptide.normalized}".`];

  if (mappedPeptide.substitutions > 0) {
    pieces.push(`${mappedPeptide.substitutions} letter${mappedPeptide.substitutions === 1 ? " was" : "s were"} replaced using the nearest standard amino-acid code.`);
  } else {
    pieces.push("Every letter already matched a standard amino-acid code.");
  }

  if (mappedPeptide.ignoredCharacters > 0) {
    pieces.push(`${mappedPeptide.ignoredCharacters} non-letter character${mappedPeptide.ignoredCharacters === 1 ? " was" : "s were"} ignored.`);
  }

  return pieces.join(" ");
}

function setModelDetails(source, confidenceText) {
  dom.modelSource.textContent = source;
  dom.confidence.textContent = confidenceText;
}

function extractElementsFromResidues(residues) {
  if (!residues.length) {
    return [];
  }

  const counts = buildFormulaCounts(residues);
  return elementDisplayOrder.filter((element) => counts[element] > 0);
}

function renderElementLegend(residues) {
  const elements = extractElementsFromResidues(residues);

  if (!elements.length) {
    dom.elementLegend.innerHTML =
      '<span class="legend-note">Generate a peptide to see which colors match which elements.</span>';
    return;
  }

  dom.elementLegend.innerHTML = elements
    .map((element) => {
      const config = elementLegendConfig[element] || {
        label: element,
        color: "#607D8B",
        textColor: "#ffffff",
      };

      return `
        <span class="legend-chip">
          <span class="legend-swatch" style="background:${config.color};"></span>
          <span>${element} = ${config.label}</span>
        </span>
      `;
    })
    .join("");
}

function updateSummary(mappedPeptide) {
  const counts = buildFormulaCounts(mappedPeptide.residues);
  const mass = calculateMolecularWeight(counts);
  const pH = normalizePhInput(dom.phInput.value);
  const averageCharge = calculateAverageCharge(mappedPeptide.residues, pH);

  dom.phInput.value = pH.toFixed(2);

  dom.length.textContent = `${mappedPeptide.residues.length} residue${mappedPeptide.residues.length === 1 ? "" : "s"}`;
  dom.substitutions.textContent = `${mappedPeptide.substitutions}`;
  dom.mass.textContent = `${mass.toFixed(2)} Da · ${mass.toFixed(2)} g/mol`;
  dom.charge.textContent = `${formatSignedNumber(averageCharge)} @ pH ${pH.toFixed(2)}`;
  dom.normalized.textContent = mappedPeptide.normalized || "No sequence yet";
  dom.sequence.textContent = mappedPeptide.sequence || "-";
  dom.threeLetter.textContent = mappedPeptide.residues.map((residue) => residue.three).join("-") || "-";
  dom.formula.textContent = mappedPeptide.residues.length ? formatFormula(counts) : "-";
  dom.status.textContent = createStatusMessage(mappedPeptide);
}

function renderMappingGrid(residues) {
  if (!residues.length) {
    dom.mappingGrid.innerHTML = '<p class="viewer-note">The letter-by-letter mapping will appear here after you generate a peptide.</p>';
    return;
  }

  dom.mappingGrid.innerHTML = residues
    .map(
      (residue) => `
        <article class="mapping-card">
          <div class="mapping-index">Residue ${residue.index}</div>
          <div class="mapping-pair">
            <span class="mapping-badge original">${residue.originalLetter}</span>
            <span>&rarr;</span>
            <span class="mapping-badge residue">${residue.code}</span>
          </div>
          <div class="mapping-meta">
            ${residue.name} (${residue.three})${residue.substituted ? " via fallback" : " direct match"}
          </div>
          <div class="mapping-properties">
            ${residue.propertyTags.map((tag) => `<span class="property-pill">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function setStructurePlaceholder(message) {
  dom.structureViewer.innerHTML = `<div class="viewer-placeholder">${message}</div>`;
}

function sanitizeSvgMarkup(svgMarkup) {
  return svgMarkup
    .replace(/<\?xml[^>]*>\s*/i, "")
    .replace(/height=['"][^'"]*['"]\s*/gi, "")
    .replace(/width=['"][^'"]*['"]\s*/gi, "")
    .replace(/<rect[^>]*fill=['"]#FFFFFF['"][^>]*><\/rect>/gi, "")
    .replace(/<rect[^>]*style=['"][^'"]*fill:#FFFFFF;?[^'"]*['"][^>]*><\/rect>/gi, "");
}

function ensureRdKit() {
  if (rdkitModule) {
    return Promise.resolve(rdkitModule);
  }

  if (rdkitReadyPromise) {
    return rdkitReadyPromise;
  }

  if (typeof window.initRDKitModule !== "function") {
    return Promise.reject(new Error("RDKit loader is not available."));
  }

  rdkitReadyPromise = window
    .initRDKitModule({
      locateFile: (file) => `./vendor/rdkit/${file}`,
    })
    .then((module) => {
      rdkitModule = module;
      return module;
    });

  return rdkitReadyPromise;
}

async function buildStructureMolfile(sequence) {
  if (structureMolfileCache.has(sequence)) {
    return structureMolfileCache.get(sequence);
  }

  const RDKit = await ensureRdKit();
  const smiles = buildPeptideSmiles(sequence);
  const molecule = RDKit.get_mol(smiles);

  if (!molecule || !molecule.is_valid()) {
    throw new Error("RDKit could not create a valid molecule from the peptide sequence.");
  }

  try {
    molecule.set_new_coords(true);
    const molfile = molecule.get_molblock();
    structureMolfileCache.set(sequence, molfile);
    return molfile;
  } finally {
    molecule.delete();
  }
}

async function buildStructureSvg(sequence) {
  if (structureFormulaCache.has(sequence)) {
    return structureFormulaCache.get(sequence);
  }

  const RDKit = await ensureRdKit();
  const smiles = buildPeptideSmiles(sequence);
  const molecule = RDKit.get_mol(smiles);

  if (!molecule) {
    throw new Error("RDKit could not create a molecule from the peptide sequence.");
  }

  try {
    molecule.set_new_coords(true);
    const { width, height } = getStructureSvgSize(sequence);
    const svg = sanitizeSvgMarkup(molecule.get_svg(width, height));
    structureFormulaCache.set(sequence, svg);
    return svg;
  } finally {
    molecule.delete();
  }
}

function triggerStructureDownload() {
  if (!latestStructureSvg) {
    return;
  }

  const sequence = dom.sequence.textContent === "-" ? "peptide" : dom.sequence.textContent;
  const blob = new Blob([latestStructureSvg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = buildStructureSvgFilename(sequence);
  anchor.click();
  URL.revokeObjectURL(url);
}

async function renderStructureFormula(mappedPeptide) {
  latestStructureSvg = "";
  currentStructureRequest += 1;
  const requestId = currentStructureRequest;

  if (!mappedPeptide.sequence) {
    setStructurePlaceholder("Generate a peptide to see the 2D structure formula here.");
    dom.downloadStructureButton.disabled = true;
    return;
  }

  setStructurePlaceholder("Generating the 2D structure formula...");
  dom.downloadStructureButton.disabled = true;

  try {
    const svgMarkup = await buildStructureSvg(mappedPeptide.sequence);
    if (requestId !== currentStructureRequest) {
      return;
    }

    latestStructureSvg = svgMarkup;
    dom.structureViewer.innerHTML = svgMarkup;
    dom.downloadStructureButton.disabled = false;
  } catch (error) {
    if (requestId !== currentStructureRequest) {
      return;
    }

    setStructurePlaceholder("The 2D structure formula could not be generated right now.");
    dom.downloadStructureButton.disabled = true;
    console.error(error);
  }
}

function showViewerPlaceholder(message) {
  dom.viewerHost.innerHTML = `<div class="viewer-placeholder">${message}</div>`;
}

async function ensureMolstarViewer() {
  if (!window.molstar) {
    return null;
  }

  if (!viewer) {
    dom.viewerHost.innerHTML = "";
    viewer = await window.molstar.Viewer.create('viewer', {
      layoutIsExpanded: false,
      layoutShowControls: false,
      layoutShowRemoteState: false,
      layoutShowSequence: false,
      layoutShowLog: false,
      layoutShowLeftPanel: false,
    });
    
    if (viewer.plugin && viewer.plugin.canvas3d) {
      viewer.plugin.canvas3d.setProps({ renderer: { backgroundColor: 0xfffcf7 } });
    }
  }

  return viewer;
}

async function loadMolfileIntoViewer(activeViewer, molfileText) {
  try {
    await activeViewer.loadStructureFromData(molfileText, "mol");
    return "mol";
  } catch (molError) {
    const sdfText = `${molfileText}\n$$$$`;
    await activeViewer.loadStructureFromData(sdfText, "sdf");
    return "sdf";
  }
}

async function renderViewer(mappedPeptide) {
  latestModelMolfile = "";
  currentViewerRequest += 1;
  const requestId = currentViewerRequest;

  if (!mappedPeptide.residues.length) {
    setModelDetails("Waiting for sequence", "-");
    renderElementLegend([]);
    showViewerPlaceholder("Generate a peptide to see the modeled 3D structure here.");
    dom.downloadButton.disabled = true;
    return;
  }

  renderElementLegend(mappedPeptide.residues);
  setModelDetails("RDKit Molfile", "Chemically defined bond graph");
  dom.downloadButton.disabled = true;
  dom.status.textContent = `${createStatusMessage(mappedPeptide)} Building a chemically correct molfile and loading the 3D preview...`;

  try {
    const molfileText = await buildStructureMolfile(mappedPeptide.sequence);
    if (requestId !== currentViewerRequest) {
      return;
    }

    latestModelMolfile = molfileText;

    const activeViewer = await ensureMolstarViewer();
    if (requestId !== currentViewerRequest) {
      return;
    }

    if (!activeViewer) {
      setModelDetails("Mol* unavailable", "Renderer script not loaded");
      showViewerPlaceholder("Mol* could not be loaded. Please ensure you have internet access.");
      return;
    }

    if (activeViewer.plugin && typeof activeViewer.plugin.clear === "function") {
      await activeViewer.plugin.clear();
    }

    const loadedFormat = await loadMolfileIntoViewer(activeViewer, molfileText);

    dom.downloadButton.disabled = false;
    dom.status.textContent = `${createStatusMessage(mappedPeptide)} 3D preview loaded from an RDKit molfile with explicit bond connectivity (${loadedFormat.toUpperCase()}).`;
  } catch (error) {
    if (requestId !== currentViewerRequest) {
      return;
    }

    showViewerPlaceholder("The 3D model could not be built right now.");
    setModelDetails("3D model unavailable", "Rendering failed");
    dom.downloadButton.disabled = true;
    console.error(error);
  }
}

function triggerDownload() {
  if (!latestModelMolfile) {
    return;
  }

  const sequence = dom.sequence.textContent === "-" ? "peptide" : dom.sequence.textContent;
  const blob = new Blob([latestModelMolfile], { type: "chemical/x-mdl-molfile" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${sequence.toLowerCase()}-model.mol`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function handleGeneration(value) {
  const mappedPeptide = mapLettersToResidues(value);
  latestMappedPeptide = mappedPeptide;
  updateSummary(mappedPeptide);
  renderMappingGrid(mappedPeptide.residues);
  renderStructureFormula(mappedPeptide);
  renderViewer(mappedPeptide);
}

function registerEvents() {
  dom.form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleGeneration(dom.input.value);
  });

  dom.sampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dom.input.value = button.dataset.sample || "";
      handleGeneration(dom.input.value);
    });
  });

  dom.phInput.addEventListener("input", () => {
    if (!latestMappedPeptide) {
      latestMappedPeptide = mapLettersToResidues(dom.input.value);
    }
    updateSummary(latestMappedPeptide);
  });

  dom.downloadStructureButton.addEventListener("click", triggerStructureDownload);
  dom.downloadButton.addEventListener("click", triggerDownload);
}

registerEvents();
dom.input.value = "Peptide";
handleGeneration(dom.input.value);
