/**
 * Converts transaction data to CSV format and triggers a file download.
 * @param transactions Array of transaction objects
 * @param filename Name of the file to download (default: 'transactions.csv')
 */
export const downloadTransactionsCSV = (transactions: any[], filename: string = 'transactions.csv') => {
    if (!transactions || transactions.length === 0) {
        console.warn('No transactions to export');
        return;
    }

    // Define CSV headers
    const headers = ['ID', 'Merchant', 'Amount', 'Type', 'Date'];

    // Convert data to CSV rows
    const csvContent = [
        headers.join(','), // Header row
        ...transactions.map(tx => {
            // Ensure fields are properly escaped and formatted
            const id = tx.id;
            const merchant = `"${tx.merchant.replace(/"/g, '""')}"`; // Escape quotes
            const amount = tx.type === 'debit' ? -Math.abs(tx.amount) : Math.abs(tx.amount);
            const type = tx.type;
            const date = `"${tx.date}"`;

            return [id, merchant, amount, type, date].join(',');
        })
    ].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
