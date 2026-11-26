# POS Smoothies — menu intake component

Reconstructed 2026-11-25. This is a setup component of the single POS Smoothies
product for the chef student. Its separate `jorgecantu276/formulario-smoothies`
repository serves the public form; the family folder groups it at
`smoothies/intake`, alongside `smoothies/app`. The POS runs on the PC and she
operates its session from her iPad over the same local network. The separate
hosting repository does not establish another product or POS database.

## Business outcome

Let a chef student prepare her menu from her phone/iPad over several sessions
without maintaining fragile spreadsheets or repeatedly typing shared extras.
She chooses colors, enters products/sizes/prices and planned opening materials,
then deliberately sends one JSON file to the owner for review/import into POS.

| Business requirement | Technical translation | Completion / limitation |
| --- | --- | --- |
| A simple public link without ChatGPT branding | Static GitHub Pages site in its own repository | Current canonical URL: `https://jorgecantu276.github.io/formulario-smoothies/`. Preserve its origin and storage contract. |
| Continue later, including half-written fields | Browser-local draft persistence, restore on reopen, cross-tab overwrite warning | Draft belongs to the same device/browser/origin; clearing website data can remove it. No automatic server/account synchronization is promised. |
| Define an extra once | Stable product/size/extra identities and explicit eligibility | Blank eligibility must not silently mean every product. Deleting a product warns about unassigned extras. |
| Choose a palette naturally | First colors section, neutral/main/secondary choices and whole-page preview | Form palette preview is supported; exporting preferences does not prove automatic POS theming. |
| Plan opening inventory before the business opens | Optional intended quantities with units and explicit pending state | Blank differs from zero; import must not create physical stock or movements. |
| Send data from iPad simply | Review → share JSON, download fallback; export/import for device transfer | File transfer is deliberate. The site does not automatically send the owner's copy. Sharing availability depends on the real browser. |
| Avoid losing a customer's existing progress | Preserve version-1 JSON/export contract and public origin | Old Sites-origin drafts are separate; transfer through explicit export/import, never silently relocate storage. |

## Progress and next steps

The form replaced the originally requested Excel after the owner identified
fragile name-based relationships and repeated extras. Historical browser checks
covered saved drafts, mobile layout, palette changes and importable exports. The
current site is deployed separately through GitHub Pages from main; POS source
builds must not replace this site or import its test drafts into production.

Next: confirm the client can reopen her real draft, share/export her JSON, and
review it together before import. For future site changes, use a preview origin
with synthetic drafts to verify draft reopen, export/import and compatibility;
keep existing public URL/storage intact. Protect/review main publishing through
the family delivery procedure. Do not add accounts, a cloud database, file upload
backend or automatic collection unless the business requests that new behavior.

## History coverage

Direct primary source: **Adaptar POS Cafe para smoothies**,
`01a1daf2-9278-7ad3-bae4-14575d2df146`, all 30 turns and older item pages.
This includes Excel rejection, web form, early Sites publication, requested
GitHub-hosted URL, Safari draft questions, explicit JSON sharing, stable extras,
planned inventory and POS import. **Check GitHub for POS smoothies**,
`01a1ef94-6535-7f73-9ac7-6f91b6fbf417`, confirms separate repository ownership.
**Assess app readiness for client**, `01a1eaaa-d511-73a3-b4c0-226c63c59026`,
all 4 turns, identifies outstanding client JSON/menu approval. The November 23
approved maintenance plan requires preserving the static form and v1 contract.
Real iPad/Safari acceptance has not been re-performed by this reconstruction.
