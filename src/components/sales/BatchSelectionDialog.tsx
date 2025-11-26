import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

interface Batch {
  id: string;
  batchNo: string;
  expiry: string;
  available: number;
  unitPrice: number;
  mrp: number;
}

interface BatchSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  onSelect: (batch: Batch, quantity: number) => void;
}

export function BatchSelectionDialog({ 
  open, 
  onClose, 
  productName,
  onSelect 
}: BatchSelectionDialogProps) {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Mock batch data
  const batches: Batch[] = [
    { id: "1", batchNo: "BT-2024-001", expiry: "2025-12-31", available: 500, unitPrice: 125, mrp: 150 },
    { id: "2", batchNo: "BT-2024-002", expiry: "2025-06-30", available: 200, unitPrice: 120, mrp: 150 },
    { id: "3", batchNo: "BT-2023-089", expiry: "2024-12-31", available: 50, unitPrice: 110, mrp: 150 },
  ];

  const isNearExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  };

  const handleSelect = () => {
    if (selectedBatch) {
      onSelect(selectedBatch, quantity);
      onClose();
      setSelectedBatch(null);
      setQuantity(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Batch - {productName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch No</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Available Qty</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>MRP</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow 
                  key={batch.id}
                  className={`cursor-pointer ${selectedBatch?.id === batch.id ? 'bg-primary/10' : ''}`}
                  onClick={() => setSelectedBatch(batch)}
                >
                  <TableCell className="font-medium">{batch.batchNo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {batch.expiry}
                      {isNearExpiry(batch.expiry) && (
                        <AlertTriangle className="w-4 h-4 text-warning" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={batch.available < 100 ? 'text-warning font-semibold' : ''}>
                      {batch.available} units
                    </span>
                  </TableCell>
                  <TableCell>₨ {batch.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>₨ {batch.mrp.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant={selectedBatch?.id === batch.id ? "default" : "outline"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBatch(batch);
                      }}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {selectedBatch && (
            <div className="p-4 rounded-lg border border-border bg-accent/50 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Batch</p>
                  <p className="font-semibold text-foreground">{selectedBatch.batchNo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available Quantity</p>
                  <p className="font-semibold text-foreground">{selectedBatch.available} units</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  max={selectedBatch.available}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Unit Price</p>
                  <p className="font-bold text-foreground">₨ {selectedBatch.unitPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-bold text-foreground">{quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-primary">₨ {(selectedBatch.unitPrice * quantity).toFixed(2)}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleSelect} className="flex-1">
                  Add to Order
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
