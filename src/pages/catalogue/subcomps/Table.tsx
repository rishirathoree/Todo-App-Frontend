"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, type RootState } from "@/stores/stores";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteTodos } from "@/stores/slices/todos";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: "pending" | "in-progress" | "completed" | "blocked";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  notes: string;
}

interface Props {
  searchValue: string;
}
const TableFloat = ({ searchValue }: Props) => {

  const dispatch = useAppDispatch()

  const { data } = useSelector((state: RootState) => state.todos.todos)
  
  const tasks = useMemo(() => {
    return (data || []).filter((task) => task.title.toLowerCase().includes(searchValue.toLowerCase()))
  }, [data, searchValue])

  const renderTaskRow = (task: Task) => {
    return (
      <TableRow key={task.id} className="hover:bg-muted/50 divide-x ring-0 border-0 shadow-none">
        <TableCell
          className="focus-visible:outline-none px-4 font-medium focus-visible:bg-muted cursor-pointer"
          onBlur={(e) => {
            const newValue = e.currentTarget.textContent || "";
            console.log("Updated value:", newValue);
          }}
        >
          {task.title}
        </TableCell>

        <TableCell className="px-4 text-sm text-muted-foreground">
          {new Date(task.dueDate).toDateString()}
        </TableCell>
        <TableCell className="px-4 max-w-[300px] text-sm text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="block cursor-help truncate w-40">{task.notes}</span>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">{task.notes}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
         <TableCell className="px-4 text-sm text-muted-foreground">
          <Button 
          onClick={()=>{
            dispatch(deleteTodos(task.id))
          }}
          variant={"outline"} size={"icon-sm"}><Trash/></Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="">
      {
        tasks.length > 0
          ?
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent divide-x border-y">
                <TableHead className="px-4 max-w-[250px] font-medium">Title</TableHead>
                <TableHead className="px-4 font-medium">Due Date</TableHead>
                <TableHead className="px-4 font-medium w-[80px]">Notes</TableHead>
                <TableHead className="px-4 font-medium w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="!divide-y">{tasks.map(renderTaskRow)}</TableBody>
          </Table>
          :
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
              </EmptyMedia>
              <EmptyTitle>No Todos Found</EmptyTitle>
              <EmptyDescription>
                We couldn’t find any todos matching your search. Try a different keyword.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
      }
    </div>
  );
};

export default TableFloat;