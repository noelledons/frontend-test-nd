import React, {useState, useMemo} from "react";
import { Card } from "../ui/Card";
import { LucideIcon, Search } from "lucide-react";
import { SaleRecord } from "../../types";
import { formatCurrency } from "../../utils/dataUtils";

interface SalesRecordTableProps {
  title: string;
  icon?: LucideIcon;
  height?: string;
  mockSalesData: SaleRecord[];
  filteredData: SaleRecord[];
  hasActiveFilters: string | boolean;
  handleClearFilters: () => void;
}

export const SalesRecordTable: React.FC<SalesRecordTableProps> = ({
  title,
  filteredData,
  hasActiveFilters,
  handleClearFilters,
  mockSalesData,
}) => {

const [sortData, setSortData] = useState<{key: keyof SaleRecord; direction: 'asc' | 'desc'} | null>(null)
const [currentPage, setCurrentPage] = useState(1)
const recordsPerPage :number = 10

  const handleSort = (key: keyof SaleRecord) => {
    setSortData((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  }

  const sortedData = useMemo(() => {
    if (!sortData) return filteredData;
try {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortData.key];
      const bValue = b[sortData.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortData.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortData.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (sortData.key === "date") {
        return sortData.direction === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      return 0;
    });
  } catch (error) {
    console.log("Error sorting Data", error);
    return filteredData; 
}
  }, [filteredData, sortData]);

  const renderSortIcon = (key: keyof SaleRecord) => {
    if (sortData?.key !== key) return null;
    return sortData.direction === "asc" ? "▲" : "▼";
  };

  /* For Pagination*/
   const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * recordsPerPage;
    return sortedData.slice(start, start + recordsPerPage);
  }, [sortedData, currentPage]);

  return (
    <Card>
      <div>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {/* Title */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">
                {filteredData.length} records{" "}
                {hasActiveFilters && `(filtered from ${mockSalesData.length})`}
              </p>
            </div>
          </div>
        </div>
{/* Heading */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th onClick={() => handleSort("date")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date {renderSortIcon("date")}
                </th>
                <th onClick={() => handleSort("customerName")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Customer {renderSortIcon("customerName")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th onClick={() => handleSort("totalAmount")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount {renderSortIcon("totalAmount")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.slice(0, 10).map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                    {record.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 hidden md:table-cell">
                    {record.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                        record.category === "Electronics"
                          ? "bg-blue-100 text-blue-800"
                          : record.category === "Clothing"
                          ? "bg-yellow-100 text-yellow-800"
                          : record.category === "Books"
                          ? "bg-green-100 text-green-800"
                          : record.category === "Sports"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {record.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(record.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or clearing some filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {filteredData.length > 10 && (
          <div className="px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
            Showing {paginatedData.length} of {filteredData.length} records
          </div>
        )}

         {filteredData.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
