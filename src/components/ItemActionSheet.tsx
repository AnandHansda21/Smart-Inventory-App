import { CreditCard as Edit3, Trash2, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { InventoryItem, useApp } from '../context/AppContext';
import { formatPrice } from '../data/currency';

interface ItemActionSheetProps {
  item: InventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: InventoryItem) => void;
}

export function ItemActionSheet({ item, isOpen, onClose, onEdit }: ItemActionSheetProps) {
  const { state, dispatch } = useApp();

  if (!isOpen || !item) return null;

  const handleEdit = () => {
    onEdit(item);
    onClose();
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_ITEM', payload: item.id });
    onClose();
  };

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_ITEM', payload: item.id });
    onClose();
  };

  const handleRestore = () => {
    dispatch({ type: 'RESTORE_ITEM', payload: item.id });
    onClose();
  };

  const handlePermanentDelete = () => {
    dispatch({ type: 'PERMANENT_DELETE', payload: item.id });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Action Sheet */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-card rounded-t-3xl z-50 animate-in slide-in-from-bottom duration-300">
        <div className="p-4 sm:p-6 max-w-md mx-auto">
          {/* Handle */}
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6" />
          
          {/* Item Info */}
          <div className="text-center mb-6">
            <h3 className="font-medium text-lg mb-1">{item.name}</h3>
            <p className="text-sm text-muted-foreground">
              {formatPrice(item.price, state.currency)} × {item.quantity} = {formatPrice(item.price * item.quantity, state.currency)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {item.status === 'active' && (
              <>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="w-full justify-start touch-target text-base font-medium"
                  style={{ minHeight: 'calc(var(--touch-target-min) + 8px)' }}
                >
                  <Edit3 className="icon-md mr-3" />
                  Edit Item
                </Button>
                
                <Button
                  onClick={handleComplete}
                  variant="default"
                  className="w-full justify-start text-base bg-green-600 hover:bg-green-700 text-white font-medium"
                  style={{ minHeight: 'calc(var(--touch-target-min) + 8px)' }}
                >
                  <Check className="icon-md mr-3" />
                  Mark as Completed
                </Button>
                
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="w-full justify-start text-base font-medium"
                  style={{ minHeight: 'calc(var(--touch-target-min) + 8px)' }}
                >
                  <Trash2 className="icon-md mr-3" />
                  Move to Trash
                </Button>
              </>
            )}
            
            {item.status === 'completed' && (
              <>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="w-full justify-start h-14 text-base"
                >
                  <Edit3 className="w-5 h-5 mr-3" />
                  Edit Item
                </Button>
                
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="w-full justify-start h-14 text-base"
                >
                  <Trash2 className="w-5 h-5 mr-3" />
                  Move to Trash
                </Button>
              </>
            )}
            
            {item.status === 'trashed' && (
              <>
                <Button
                  onClick={handleRestore}
                  variant="default"
                  className="w-full justify-start h-14 text-base bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Check className="w-5 h-5 mr-3" />
                  Restore Item
                </Button>
                
                <Button
                  onClick={handlePermanentDelete}
                  variant="destructive"
                  className="w-full justify-start h-14 text-base"
                >
                  <Trash2 className="w-5 h-5 mr-3" />
                  Delete Permanently
                </Button>
              </>
            )}
            
            {/* Cancel Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full justify-center h-14 text-base mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}