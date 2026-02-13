// ===========================================================================
// TamiratPageClient — Client wrapper for search grid + detail modal
// ===========================================================================
// Single client boundary that manages:
//   • Selected record state (for opening/closing the detail modal)
//   • TamiratSearchGrid (search + filter + card grid)
//   • RepairDetailModal (renders when a record is selected)
// ===========================================================================

"use client";

import { useState, useCallback } from "react";
import type { RepairRecord } from "@/lib/tamiratData";
import TamiratSearchGrid from "@/components/ui/TamiratSearchGrid";
import RepairDetailModal from "@/components/ui/RepairDetailModal";

export default function TamiratPageClient() {
  const [selectedRecord, setSelectedRecord] = useState<RepairRecord | null>(null);

  const handleSelect = useCallback((record: RepairRecord) => {
    setSelectedRecord(record);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedRecord(null);
  }, []);

  return (
    <>
      <TamiratSearchGrid onSelectRecord={handleSelect} />

      {selectedRecord && (
        <RepairDetailModal record={selectedRecord} onClose={handleClose} />
      )}
    </>
  );
}
