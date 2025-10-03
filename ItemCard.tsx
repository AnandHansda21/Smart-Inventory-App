import { Card } from './ui/card';
import { Icons } from './ui/enhanced-icons';
import { InventoryItem, useApp } from './context/AppContext';
import { formatPrice } from './utils/currency';

interface ItemCardProps {
  item: InventoryItem;
  onTap: (item: InventoryItem) => void;
}

export function ItemCard({ item, onTap }: ItemCardProps) {
  const { state } = useApp();
  
  const totalCost = item.price * item.quantity;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleClick = () => {
    onTap(item);
  };

  return (
    <Card 
      className="p-4 sm:p-5 bg-card cursor-pointer transition-all duration-200 select-none hover:bg-accent/50 active:bg-accent touch-manipulation w-full"
      onClick={handleClick}
      style={{ minHeight: 'calc(var(--touch-target-min) * 1.8)' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-headline font-semibold text-foreground truncate">{item.name}</h3>
            {item.status === 'completed' && (
              <span className="text-caption bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full font-medium">
                Completed
              </span>
            )}
            {item.status === 'trashed' && (
              <span className="text-caption bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full font-medium">
                Trashed
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-2">
            <div>
              <p className="text-caption text-muted-foreground font-medium">Price</p>
              <p className="font-semibold text-body">{formatPrice(item.price, state.currency)}</p>
            </div>
            <div>
              <p className="text-caption text-muted-foreground font-medium">Quantity</p>
              <p className="font-semibold text-body">{item.quantity}</p>
            </div>
            <div>
              <p className="text-caption text-muted-foreground font-medium">Total</p>
              <p className="font-bold text-primary text-body">{formatPrice(totalCost, state.currency)}</p>
            </div>
          </div>

          {item.notes && (
            <p className="text-small text-muted-foreground mb-2 line-clamp-2 leading-relaxed">{item.notes}</p>
          )}

          <div className="flex items-center gap-1 text-caption text-muted-foreground">
            <Icons.pending size="xs" strokeWidth={1.5} />
            <span>
              {item.status === 'completed' && item.completedAt
                ? `Completed ${formatDate(item.completedAt)}`
                : item.status === 'trashed' && item.trashedAt
                ? `Deleted ${formatDate(item.trashedAt)}`
                : `Created ${formatDate(item.createdAt)}`
              }
            </span>
          </div>
        </div>


      </div>
    </Card>
  );
}