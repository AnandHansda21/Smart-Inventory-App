import { ReceiptData, generateReceiptText, generateReceiptHTML } from './receiptGenerator';
import { InventoryItem } from '../context/AppContext';

// Function to download text file
export function downloadTextReceipt(data: ReceiptData): void {
  const textContent = generateReceiptText(data);
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `stockcall-receipt-${data.exportDate.toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Function to download PDF receipt
export function downloadPDFReceipt(data: ReceiptData): void {
  const htmlContent = generateReceiptHTML(data);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to download the PDF receipt.');
    return;
  }
  
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Note: The user will need to "Save as PDF" from the print dialog
      // This is the most reliable cross-browser method without external libraries
    }, 500);
  };
}

// Alternative PDF download using html2pdf (if we want to add the library)
export async function downloadAdvancedPDFReceipt(data: ReceiptData): Promise<void> {
  try {
    // Dynamic import of html2pdf
    const html2pdf = (await import('html2pdf.js')).default;
    
    const htmlContent = generateReceiptHTML(data);
    
    // Create a temporary div to hold the HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);
    
    const options = {
      margin: 0.5,
      filename: `stockcall-receipt-${data.exportDate.toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    await html2pdf().set(options).from(tempDiv).save();
    
    // Clean up
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error('Advanced PDF generation failed, falling back to print method:', error);
    downloadPDFReceipt(data);
  }
}

// Function to create receipt data from app state
export function createReceiptData(
  items: InventoryItem[],
  currency: string,
  colorTheme: string,
  theme: 'light' | 'dark'
): ReceiptData {
  const activeItems = items.filter(item => item.status === 'active');
  const totalValue = activeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return {
    items,
    currency,
    colorTheme,
    mode: theme,
    totalValue,
    exportDate: new Date(),
  };
}