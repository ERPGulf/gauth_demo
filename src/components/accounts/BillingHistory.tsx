import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import Pagination from "@/components/accounts/Pagination";
import {
  getBillingAndPaymentHistory,
  getInvoicePDF,
} from "@/utils/api/account/API-billingInfo";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const BillingHistory = () => {
  // State to manage the selected date range
  const [dateRange, setDateRange] = useState("30 Days");
  // State to manage current page
  const [currentPage, setCurrentPage] = useState(1);
  // State to manage sorting order and sorting state
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSorted, setIsSorted] = useState(false);
  // State to manage transaction type filtering
  const [transactionType, setTransactionType] = useState("all");

  // Fetch billing and payment history based on the selected date range
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["BillingHistory", dateRange],
    queryFn: () => getBillingAndPaymentHistory(dateRange),
  });

  // Toggle sorting order between ascending and descending
  const toggleSortOrder = () => {
    setIsSorted(true); // Sorting is now applied
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Items per page based on the selected transaction type
  let itemsPerPage = 3;
  transactionType === "all" ? (itemsPerPage = 3) : (itemsPerPage = 6);

  // Sort invoices based on invoice_amount only when sorting is triggered
  const sortedInvoices = useMemo(() => {
    if (!data) return [];

    // Apply filtering based on the selected transaction type
    let filteredData = data;
    if (transactionType === "invoice") {
      filteredData = data.filter((item) => item.invoice_id);
    } else if (transactionType === "payment") {
      filteredData = data.filter((item) => item.payment_id);
    }

    // If sorting has been triggered, apply sorting
    if (isSorted) {
      const sorted = [...filteredData].sort((a, b) => {
        return sortOrder === "asc"
          ? a.invoice_amount - b.invoice_amount
          : b.invoice_amount - a.invoice_amount;
      });
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      return sorted.slice(indexOfFirstItem, indexOfLastItem);
    }

    // Return unsorted filtered data initially
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, currentPage, sortOrder, isSorted, transactionType]);

  // Handle date range selection and refetch data
  const handleDateRangeChange = (value: string) => {
    setDateRange(value); // Update the selected date range
    setCurrentPage(1); // Reset to the first page when date range changes
    setIsSorted(false); // Reset sorting flag on new fetch
    refetch(); // Refetch data with the new date range
  };

  // Handle transaction type change
  const handleTransactionTypeChange = (value: string) => {
    setTransactionType(value); // Update the selected transaction type
    setCurrentPage(1); // Reset to the first page when type changes
  };

  // Handle the PDF download
  const handleDownloadPDF = async (invoice_id: string) => {
    try {
      const blob = await getInvoicePDF(invoice_id); // Fetch the PDF as blob
      const url = window.URL.createObjectURL(blob); // Create a Blob URL
      const a = document.createElement("a"); // Create an anchor element
      a.href = url;
      a.target = "_blank"; // Open the PDF in a new tab
      a.click(); // Trigger the opening in a new tab
      window.URL.revokeObjectURL(url); // Clean up the URL after the tab is opened
    } catch (error) {
      console.error("Failed to display the invoice:", error);
    }
  };

  return (
    <div className="mt-20 flex w-full flex-col space-y-3 self-center">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-medium">Billing and Payment History</h1>
        <div className="flex">
          <div className="mx-5">
            <Select onValueChange={handleTransactionTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="payment">Payment</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select onValueChange={handleDateRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="30 Days">30 days</SelectItem>
                  <SelectItem value="60 Days">60 days</SelectItem>
                  <SelectItem value="90 Days">90 days</SelectItem>
                  <SelectItem value="6 Months">6 months</SelectItem>
                  <SelectItem value="12 Months">1 year</SelectItem>
                  <SelectItem value="All Time">All time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isError ? (
        <div>
          <span className="text-red-600">Something went wrong!</span>
        </div>
      ) : (
        <Table className="relative overflow-hidden rounded-lg">
          <TableHeader className="bg-primary/10 dark:bg-muted/60">
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <button onClick={toggleSortOrder} className="flex items-center">
                  Amount {sortOrder === "asc" ? "▲" : "▼"}
                </button>
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-background">
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[120px]">
                    <Skeleton className="h-4 w-[120px] rounded-sm" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full rounded-sm" />
                  </TableCell>
                </TableRow>
              ))}

            {sortedInvoices.map(
              ({
                invoice_id,
                invoice_date,
                invoice_amount,
                payment_id,
                payment_date,
                payment_amount,
              }) => (
                <>
                  {transactionType !== "payment" && (
                    <TableRow key={invoice_id}>
                      <TableCell>INVOICE #{invoice_id}</TableCell>
                      <TableCell>{invoice_date}</TableCell>
                      <TableCell>{invoice_amount}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleDownloadPDF(invoice_id)} // Trigger download
                          className="text-blue-500"
                        >
                          Download PDF
                        </button>
                      </TableCell>
                    </TableRow>
                  )}
                  {transactionType !== "invoice" && (
                    <TableRow key={payment_id}>
                      <TableCell>PAYMENT #{payment_id}</TableCell>
                      <TableCell>{payment_date}</TableCell>
                      <TableCell>{payment_amount}</TableCell>
                      <TableCell>
                        {/* <a href="#" className="text-blue-500">Download PDF</a> */}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ),
            )}

            {!isLoading && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      {data && data.length > itemsPerPage && (
        <Pagination
          totalPosts={data.length}
          postsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default BillingHistory;
