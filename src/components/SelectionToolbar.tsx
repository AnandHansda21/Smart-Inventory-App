import { Check, Trash2, X, Edit3 } from 'lucide-react';
import { Button } from '../ui/button';
import { useApp } from '../context/AppContext';

interface SelectionToolbarProps {
  onEdit?: () => void;
}

export function SelectionToolbar({ onEdit }: SelectionToolbarProps) {
  const { state, dispatch } = useApp();
  
  const selectedCount = state.selectedItems.length;
  const activeSelectedItems = state.selectedItems.filter(id => {
    const item = state.items.find(item => item.id === id);
    return item?.status === 'active';
  });
  
  const handleBulkComplete = () => {
    if (activeSelectedItems.length > 0) {
      dispatch({ type: 'BULK_COMPLETE', payload: activeSelectedItems });
    }
  };
  
  const handleBulkDelete = () => {
    if (state.selectedItems.length > 0) {
      dispatch({ type: 'BULK_DELETE', payload: state.selectedItems });
    }
  };
  
  const handleEditSelected = () => {
    if (state.selectedItems.length === 1 && onEdit) {
      onEdit();
    }
  };
  
  const handleCancel = () => {
    dispatch({ type: 'EXIT_SELECTION_MODE' });
  };
  
  if (!state.selectionMode || selectedCount === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border shadow-lg">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">
            {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Edit - only show for single selection */}
          {selectedCount === 1 && onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditSelected}
              className="flex-1"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          
          {/* Complete - only for active items */}
          {activeSelectedItems.length > 0 && (
            <Button
              variant="default"
              size="sm"
              onClick={handleBulkComplete}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Complete ({activeSelectedItems.length})
            </Button>
          )}
          
          {/* Delete */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}