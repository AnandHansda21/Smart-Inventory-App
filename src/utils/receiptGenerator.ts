import { InventoryItem } from '../context/AppContext';
import { formatPrice } from '../data/currency';
import { getThemeById } from '../data/colorThemes';

export interface ReceiptData {
  items: InventoryItem[];
  currency: string;
  colorTheme: string;
  mode: 'light' | 'dark';
  totalValue: number;
  exportDate: Date;
}

export function generateReceiptText(data: ReceiptData): string {
  const { items, currency, totalValue, exportDate } = data;
  const activeItems = items.filter(item => item.status === 'active');
  const completedItems = items.filter(item => item.status === 'completed');
  const trashedItems = items.filter(item => item.status === 'trashed');

  // Calculate totals
  const completedTotal = completedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatItemDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Helper function to pad text for table columns
  const padText = (text: string, width: number, align: 'left' | 'right' | 'center' = 'left') => {
    const str = String(text).substring(0, width);
    if (align === 'right') {
      return str.padStart(width);
    } else if (align === 'center') {
      const padding = Math.max(0, width - str.length);
      const leftPad = Math.floor(padding / 2);
      const rightPad = padding - leftPad;
      return ' '.repeat(leftPad) + str + ' '.repeat(rightPad);
    } else {
      return str.padEnd(width);
    }
  };

  let receipt = '';
  
  // Header
  receipt += '═'.repeat(70) + '\n';
  receipt += padText('📋 STOCKCALL INVENTORY RECEIPT', 70, 'center') + '\n';
  receipt += '═'.repeat(70) + '\n';
  receipt += `Generated: ${formatDate(exportDate)}\n`;
  receipt += `Report Time: ${exportDate.toLocaleTimeString()}\n`;
  receipt += '═'.repeat(70) + '\n\n';

  // Summary Table
  receipt += '📊 INVENTORY SUMMARY\n';
  receipt += '─'.repeat(40) + '\n';
  receipt += `Total Items:      ${items.length}\n`;
  receipt += `Active Items:     ${activeItems.length}\n`;
  receipt += `Completed Items:  ${completedItems.length}\n`;
  receipt += `Trashed Items:    ${trashedItems.length}\n`;
  receipt += `Total Value:      ${formatPrice(totalValue, currency)}\n`;
  receipt += '─'.repeat(40) + '\n\n';

  // Active Items Table
  if (activeItems.length > 0) {
    receipt += '🟢 ACTIVE INVENTORY ITEMS\n';
    receipt += '═'.repeat(70) + '\n';
    receipt += padText('#', 3) + ' | ' + 
               padText('Item Name', 20) + ' | ' + 
               padText('Price', 10, 'right') + ' | ' + 
               padText('Qty', 5, 'right') + ' | ' + 
               padText('Total', 12, 'right') + ' | ' + 
               padText('Created', 12) + '\n';
    receipt += '─'.repeat(70) + '\n';
    
    activeItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      receipt += padText((index + 1).toString(), 3) + ' | ' + 
                 padText(item.name, 20) + ' | ' + 
                 padText(formatPrice(item.price, currency), 10, 'right') + ' | ' + 
                 padText(item.quantity.toString(), 5, 'right') + ' | ' + 
                 padText(formatPrice(itemTotal, currency), 12, 'right') + ' | ' + 
                 padText(formatItemDate(item.createdAt), 12) + '\n';
      
      if (item.notes) {
        receipt += padText('', 3) + '   ' + 
                   padText(`📝 ${item.notes}`, 64) + '\n';
      }
    });
    receipt += '═'.repeat(70) + '\n\n';
  }

  // Completed Items Table
  if (completedItems.length > 0) {
    receipt += '✅ COMPLETED ITEMS\n';
    receipt += '═'.repeat(70) + '\n';
    receipt += padText('#', 3) + ' | ' + 
               padText('Item Name', 18) + ' | ' + 
               padText('Price', 9, 'right') + ' | ' + 
               padText('Qty', 4, 'right') + ' | ' + 
               padText('Total', 10, 'right') + ' | ' + 
               padText('Completed', 12) + '\n';
    receipt += '─'.repeat(70) + '\n';
    
    completedItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      receipt += padText((index + 1).toString(), 3) + ' | ' + 
                 padText(item.name, 18) + ' | ' + 
                 padText(formatPrice(item.price, currency), 9, 'right') + ' | ' + 
                 padText(item.quantity.toString(), 4, 'right') + ' | ' + 
                 padText(formatPrice(itemTotal, currency), 10, 'right') + ' | ' + 
                 padText(item.completedAt ? formatItemDate(item.completedAt) : 'N/A', 12) + '\n';
      
      if (item.notes) {
        receipt += padText('', 3) + '   ' + 
                   padText(`📝 ${item.notes}`, 64) + '\n';
      }
    });
    receipt += '─'.repeat(70) + '\n';
    receipt += padText('COMPLETED ITEMS TOTAL INVESTMENT:', 48, 'right') + ' ' + 
               padText(formatPrice(completedTotal, currency), 20, 'right') + '\n';
    receipt += '═'.repeat(70) + '\n\n';
  }

  // Grand Total Summary
  receipt += '💰 FINANCIAL SUMMARY\n';
  receipt += '═'.repeat(40) + '\n';
  receipt += padText('Total Portfolio Value:', 25) + padText(formatPrice(totalValue, currency), 14, 'right') + '\n';
  if (completedItems.length > 0) {
    receipt += padText('Completed Items Value:', 25) + padText(formatPrice(completedTotal, currency), 14, 'right') + '\n';
  }
  receipt += padText('Active Items Count:', 25) + padText(activeItems.length.toString(), 14, 'right') + '\n';
  receipt += padText('Report Date:', 25) + padText(exportDate.toLocaleDateString(), 14, 'right') + '\n';
  receipt += '═'.repeat(40) + '\n\n';

  // Footer
  receipt += '─'.repeat(40) + '\n';
  receipt += padText('Thank you for using StockCall!', 40, 'center') + '\n';
  receipt += padText('Your Personal Inventory Assistant', 40, 'center') + '\n';
  receipt += '─'.repeat(40) + '\n';

  return receipt;
}

export function generateReceiptHTML(data: ReceiptData): string {
  const { items, currency, totalValue, exportDate, colorTheme, mode } = data;
  const theme = getThemeById(colorTheme);
  const colors = theme.colors[mode];
  
  const activeItems = items.filter(item => item.status === 'active');
  const completedItems = items.filter(item => item.status === 'completed');
  const trashedItems = items.filter(item => item.status === 'trashed');

  // Calculate totals
  const completedTotal = completedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatItemDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockCall Inventory Receipt</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-color: ${colors.secondary};
            color: ${colors['secondary-foreground']};
            line-height: 1.6;
            padding: 20px;
            min-height: 100vh;
        }
        
        .receipt-container {
            max-width: 900px;
            margin: 0 auto;
            background: ${colors.primary};
            color: ${colors['primary-foreground']};
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            overflow: hidden;
        }
        
        .receipt-header {
            background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%);
            padding: 40px 30px;
            text-align: center;
            color: ${colors['primary-foreground']};
        }
        
        .app-logo {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
        }
        
        .receipt-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 20px;
            opacity: 0.95;
        }
        
        .export-info {
            background: ${colors.secondary};
            color: ${colors['secondary-foreground']};
            padding: 15px;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .receipt-body {
            padding: 30px;
            background: ${colors.secondary};
            color: ${colors['secondary-foreground']};
        }
        
        .summary-box {
            background: ${colors.muted};
            color: ${colors['muted-foreground']};
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 30px;
            border: 2px solid ${colors.accent};
        }
        
        .summary-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: ${colors.primary};
            text-align: center;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        
        .summary-item {
            text-align: center;
            padding: 15px;
            background: ${colors.secondary};
            border-radius: 8px;
            border: 1px solid ${colors.accent};
        }
        
        .summary-label {
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
            opacity: 0.8;
        }
        
        .summary-value {
            font-size: 1.125rem;
            font-weight: 700;
            color: ${colors.primary};
        }
        
        .section-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 30px 0 20px 0;
            padding: 15px 20px;
            background: ${colors.primary};
            color: ${colors['primary-foreground']};
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background: ${colors.muted};
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .items-table th {
            background: ${colors.primary};
            color: ${colors['primary-foreground']};
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .items-table th:last-child,
        .items-table td:last-child {
            text-align: center;
        }
        
        .items-table th.price,
        .items-table td.price,
        .items-table th.qty,
        .items-table td.qty,
        .items-table th.total,
        .items-table td.total {
            text-align: right;
        }
        
        .items-table td {
            padding: 12px 8px;
            border-bottom: 1px solid ${colors.accent};
            color: ${colors['muted-foreground']};
            font-size: 0.875rem;
        }
        
        .items-table tr:nth-child(even) td {
            background: ${colors.secondary};
        }
        
        .items-table tr:hover td {
            background: ${colors.accent};
        }
        
        .item-name {
            font-weight: 600;
            color: ${colors.primary};
        }
        
        .item-total {
            font-weight: 700;
            color: #10b981;
        }
        
        .item-notes {
            font-style: italic;
            color: ${colors['muted-foreground']};
            font-size: 0.75rem;
            padding: 8px;
            background: ${colors.accent};
            border-radius: 4px;
            margin-top: 4px;
        }
        
        .total-row {
            background: ${colors.primary} !important;
            color: ${colors['primary-foreground']} !important;
            font-weight: 700;
        }
        
        .total-row td {
            background: ${colors.primary} !important;
            color: ${colors['primary-foreground']} !important;
            border-bottom: none;
        }
        
        .completed-total {
            background: #dcfce7 !important;
            color: #166534 !important;
            font-weight: 700;
            font-size: 1rem;
        }
        
        .completed-total td {
            background: #dcfce7 !important;
            color: #166534 !important;
        }
        
        .receipt-footer {
            background: ${colors.primary};
            color: ${colors['primary-foreground']};
            padding: 40px 30px;
            text-align: center;
        }
        
        .total-section {
            background: ${colors.secondary};
            color: ${colors['secondary-foreground']};
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
        }
        
        .grand-total {
            font-size: 2rem;
            font-weight: 700;
            color: ${colors.primary};
            margin-bottom: 10px;
        }
        
        .completed-investment {
            font-size: 1.5rem;
            font-weight: 700;
            color: #10b981;
            margin-bottom: 15px;
        }
        
        .footer-text {
            font-size: 0.875rem;
            opacity: 0.8;
            line-height: 1.5;
        }
        
        @media print {
            body { padding: 0; }
            .receipt-container { box-shadow: none; }
        }
        
        @media (max-width: 640px) {
            .items-table th,
            .items-table td {
                padding: 8px 4px;
                font-size: 0.75rem;
            }
            
            .item-name {
                font-size: 0.8rem;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="receipt-header">
            <div class="app-logo">📋 StockCall</div>
            <div class="receipt-title">Inventory Receipt Report</div>
            <div class="export-info">
                <div><strong>Generated:</strong> ${formatDate(exportDate)}</div>
                <div><strong>Time:</strong> ${exportDate.toLocaleTimeString()}</div>
                <div><strong>Theme:</strong> ${theme.name}</div>
            </div>
        </div>
        
        <div class="receipt-body">
            <div class="summary-box">
                <div class="summary-title">📊 Inventory Summary</div>
                <div class="summary-grid">
                    <div class="summary-item">
                        <div class="summary-label">Total Items</div>
                        <div class="summary-value">${items.length}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Active</div>
                        <div class="summary-value">${activeItems.length}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Completed</div>
                        <div class="summary-value">${completedItems.length}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Total Value</div>
                        <div class="summary-value">${formatPrice(totalValue, currency)}</div>
                    </div>
                </div>
            </div>
            
            ${activeItems.length > 0 ? `
            <div class="section-title">
                🟢 Active Inventory Items (${activeItems.length})
            </div>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th class="price">Price</th>
                        <th class="qty">Qty</th>
                        <th class="total">Total</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    ${activeItems.map((item, index) => {
                        const itemTotal = item.price * item.quantity;
                        return `
                        <tr>
                            <td>${index + 1}</td>
                            <td class="item-name">${item.name}${item.notes ? `<div class="item-notes">📝 ${item.notes}</div>` : ''}</td>
                            <td class="price">${formatPrice(item.price, currency)}</td>
                            <td class="qty">${item.quantity}</td>
                            <td class="total item-total">${formatPrice(itemTotal, currency)}</td>
                            <td>${formatItemDate(item.createdAt)}</td>
                        </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
            ` : ''}
            
            ${completedItems.length > 0 ? `
            <div class="section-title">
                ✅ Completed Items (${completedItems.length})
            </div>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th class="price">Price</th>
                        <th class="qty">Qty</th>
                        <th class="total">Total</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    ${completedItems.map((item, index) => {
                        const itemTotal = item.price * item.quantity;
                        return `
                        <tr>
                            <td>${index + 1}</td>
                            <td class="item-name">${item.name}${item.notes ? `<div class="item-notes">📝 ${item.notes}</div>` : ''}</td>
                            <td class="price">${formatPrice(item.price, currency)}</td>
                            <td class="qty">${item.quantity}</td>
                            <td class="total item-total">${formatPrice(itemTotal, currency)}</td>
                            <td>${item.completedAt ? formatItemDate(item.completedAt) : 'N/A'}</td>
                        </tr>
                        `;
                    }).join('')}
                    <tr class="completed-total">
                        <td colspan="4" style="text-align: right; font-weight: bold;">COMPLETED ITEMS TOTAL INVESTMENT:</td>
                        <td class="total" style="font-size: 1.1rem;">${formatPrice(completedTotal, currency)}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            ` : ''}
        </div>
        
        <div class="receipt-footer">
            <div class="total-section">
                <div class="grand-total">${formatPrice(totalValue, currency)}</div>
                <div style="font-weight: 600; margin-bottom: 15px;">GRAND TOTAL VALUE</div>
                ${completedItems.length > 0 ? `
                <div class="completed-investment">${formatPrice(completedTotal, currency)}</div>
                <div style="font-weight: 600; margin-bottom: 15px; color: #10b981;">COMPLETED ITEMS INVESTMENT</div>
                ` : ''}
                <div style="font-size: 0.875rem; opacity: 0.8;">
                    <div>📊 ${activeItems.length} Active Items</div>
                    <div>✅ ${completedItems.length} Completed Items</div>
                    <div>📅 ${formatDate(exportDate)}</div>
                    <div>🕐 ${exportDate.toLocaleTimeString()}</div>
                </div>
            </div>
            <div class="footer-text">
                <div style="font-weight: 600; margin-bottom: 5px;">Thank you for using StockCall!</div>
                <div>Your Personal Inventory Assistant</div>
            </div>
        </div>
    </div>
</body>
</html>
`;
}