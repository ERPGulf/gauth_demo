import { BackupItem } from "@/types/backups-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const BackupTable = ({ data }: { data: BackupItem[] }) => (
  <Table className="overflow-hidden rounded-lg border">
    <TableHeader className="bg-primary/10 dark:bg-muted/60">
      <TableRow>
        <TableHead>Label</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Date Created</TableHead>
        <TableHead className="text-right">Space Created</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="bg-background">
      {data.length ? (
        data.map((item: BackupItem, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.display_name}</TableCell>
            <TableCell>{item.lifecycle_state}</TableCell>
            <TableCell>
              {new Date(item.time_created).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">{item.size_in_gbs} GB</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            No Backup Details.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default BackupTable;
