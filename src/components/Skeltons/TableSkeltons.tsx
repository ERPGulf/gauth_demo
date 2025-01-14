import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

const TableSkeltons = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-4 w-full rounded-sm" />
      </TableCell>
    </TableRow>
  ));
};

export default TableSkeltons;
