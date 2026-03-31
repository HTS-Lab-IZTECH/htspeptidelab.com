# Name-to-Peptide Studio

A small static web app that turns a name or surname into:

- A one-letter peptide sequence
- A three-letter amino-acid sequence
- A peptide molecular formula
- An average molecular weight
- An average peptide charge at a user-selected pH
- A 2D peptide structure formula as an SVG line drawing
- A rotatable peptide study model rendered from an RDKit molfile in the browser

## How the mapping works

The app keeps only alphabetic characters, normalizes accented letters, and maps each remaining letter to a standard amino-acid one-letter code.

- Direct matches stay the same. Example: `P -> P`
- Non-standard letters fall back to the closest standard amino-acid code alphabetically
- If two standard codes are equally close, the earlier one alphabetically wins

Examples:

- `B -> A`
- `J -> I`
- `O -> N`
- `U -> T`

## Charge calculation

The pH-based average charge uses the pKa table you provided and includes:

- The N-terminus alpha-amino group of the first residue
- The C-terminus alpha-carboxyl group of the last residue
- Ionizable side chains for Asp, Glu, Cys, Tyr, His, Lys, and Arg

The calculation uses Henderson-Hasselbalch style fractional protonation, so the result is an average charge rather than an all-or-nothing integer.



