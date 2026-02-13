// ---------------------------------------------------------------------------
// TechSpecsTable — Renders a product specification table for articles
// that include techSpecs (e.g., Egepen Legend / Zendow product pages)
// ---------------------------------------------------------------------------

import type { TechSpec } from "@/lib/solutionsData";

interface TechSpecsTableProps {
  specs: TechSpec[];
  productName?: string;
}

export function TechSpecsTable({ specs, productName }: TechSpecsTableProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      {productName && (
        <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200">
          <h3 className="text-sm font-bold text-neutral-800">
            {productName} — Teknik Özellikler
          </h3>
        </div>
      )}
      <table className="w-full text-sm">
        <thead className="sr-only">
          <tr>
            <th scope="col">Özellik</th>
            <th scope="col">Değer</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={spec.label}
              className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
            >
              <td className="px-5 py-3 font-medium text-neutral-700 whitespace-nowrap">
                {spec.label}
              </td>
              <td className="px-5 py-3 text-neutral-600 text-right">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
