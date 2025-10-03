import { useState, useEffect } from 'react';
import { X, Hash, StickyNote } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { InventoryItem, useApp } from './context/AppContext';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  editItem?: InventoryItem | null;
}

export function InputModal({ isOpen, onClose, editItem }: InputModalProps) {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    notes: '',
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        price: editItem.price.toString(),
        quantity: editItem.quantity.toString(),
        notes: editItem.notes || '',
      });
    } else {
      setFormData({
        name: '',
        price: '',
        quantity: '',
        notes: '',
      });
    }
  }, [editItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price || !formData.quantity) {
      return;
    }

    const price = parseFloat(formData.price);
    const quantity = parseInt(formData.quantity);

    if (isNaN(price) || isNaN(quantity) || price < 0 || quantity < 1) {
      return;
    }

    if (editItem) {
      dispatch({
        type: 'EDIT_ITEM',
        payload: {
          id: editItem.id,
          updates: {
            name: formData.name.trim(),
            price,
            quantity,
            notes: formData.notes.trim() || undefined,
          },
        },
      });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          name: formData.name.trim(),
          price,
          quantity,
          notes: formData.notes.trim() || undefined,
          status: 'active',
        },
      });
    }

    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      price: '',
      quantity: '',
      notes: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 md:items-center md:justify-center">
      <div className="bg-card w-full max-w-none md:max-w-md rounded-t-2xl md:rounded-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">
            {editItem ? 'Edit Item' : 'Add New Item'}
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            className="touch-target p-0"
          >
            <X className="icon-md" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              placeholder="Enter item name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input-background touch-target"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ({state.currency})</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  {state.currency}
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="pl-10 bg-input-background touch-target"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground icon-sm" />
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="pl-10 bg-input-background touch-target"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <div className="relative">
              <StickyNote className="absolute left-3 top-3 text-muted-foreground icon-sm" />
              <Textarea
                id="notes"
                placeholder="Add notes about this item..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value.slice(0, 120) })}
                className="pl-10 bg-input-background resize-none"
                rows={3}
                maxLength={120}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">
              {formData.notes.length}/120 characters
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="flex-1 touch-target font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 touch-target font-medium"
              disabled={!formData.name.trim() || !formData.price || !formData.quantity}
            >
              {editItem ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}