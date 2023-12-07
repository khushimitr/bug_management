import {
  Input,
  Table,
  Selection,
  SortDescriptor,
  User,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Pagination,
  TableColumn,
  TableHeader, TableBody, TableRow, TableCell, Chip
} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import { useGetAllBugsInProject } from "@/features";
import { queryClient } from "@/lib";
import { ApiResponse, BugType, ProjectType } from "@/global";
import { capitalize, giveProjectIdByName, priorityColorMap, severityColorMap, statusColorMap } from "@/utils";
import { HiOutlineArrowDown, HiOutlinePlus } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { DateTime } from "luxon";


const columns = [
  { name: "BUG", uid: "bugKey", sortable: true },
  { name: "SUMMARY", uid: "summary", sortable: false },
  { name: "STATUS", uid: "bugStatus", sortable: true },
  { name: "PRIORITY", uid: "bugPriority", sortable: true },
  { name: "SEVERITY", uid: "bugSeverity", sortable: true },
  { name: "IDENTIFIER", uid: "identifier", sortable: true },
  { name: "ASSIGNEE", uid: "assignee", sortable: true },
  { name: "CREATED", uid: "createdAt", sortable: true },
  { name: "DUE", uid: "due", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = ["bugKey", "summary", "bugStatus", "identifier", "createdAt"];

const statusOptions = [
  { name: "NEW", uid: "NEW" },
  { name: "ASSIGNED", uid: "ASSIGNED" },
  { name: "IN_PROGRESS", uid: "IN_PROGRESS" },
  { name: "FIXED", uid: "FIXED" },
  { name: "PENDING_RETEST", uid: "PENDING_RETEST" },
  { name: "IN_RETEST", uid: "IN_RETEST" },
  { name: "REOPEN", uid: "REOPEN" },
  { name: "VERIFIED", uid: "VERIFIED" },
  { name: "CLOSED", uid: "CLOSED" },
  { name: "DUPLICATE", uid: "DUPLICATE" },
  { name: "REJECTED", uid: "REJECTED" },
  { name: "DEFERRED", uid: "DEFERRED" },
  { name: "NOT_A_BUG", uid: "NOT_A_BUG" },
];

type BugTableComponentProps = {
  projectName: string
}

export const BugTableComponent = ({ projectName }: BugTableComponentProps) => {

  const projects = queryClient.getQueryData<ApiResponse<ProjectType[]>>(["allBugs"]);
  let projectId = -1;
  if (projects && projects.data)
    projectId = giveProjectIdByName(projects.data, projectName);
  const [isRefetching, setIsRefetching] = useState(false);

  const project = useGetAllBugsInProject({
    projectId: projectId,
    config: {
      onSuccess: () => {
        setIsRefetching(false);
      },
    }
  });

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "bugKey",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredBugs = project?.data?.data?.bugs || [];

    if (hasSearchFilter) {
      filteredBugs = filteredBugs.filter((bug) =>
        bug.summary.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredBugs = filteredBugs.filter((bug) =>
        Array.from(statusFilter).includes(bug.bugStatus),
      );
    }

    return filteredBugs;
  }, [project, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);


  const sortedItems = useMemo(() => {
    return [...items].sort((a: BugType, b: BugType) => {
      const first = a[sortDescriptor.column as keyof BugType] as number;
      const second = b[sortDescriptor.column as keyof BugType] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const renderCell = useCallback((bug: BugType, columnKey: Key) => {
    switch (columnKey) {
      case "bugKey":
        return (
          <span
            className="font-bold text-danger capitalize">{`${project?.data?.data?.projectKey}${bug?.bugKey || 0}`}</span>
        );
      case "identifier":
        return (
          <User
            avatarProps={{ radius: "lg", src: bug.identifier.profileUrl }}
            description={bug.identifier.email}
            name={`${bug.identifier.firstName} ${bug.identifier.lastName}`}
          >
            {bug.identifier.userName}
          </User>
        );
      case "assignee":
        return (
          <User
            avatarProps={{ radius: "lg", src: bug.assignee.profileUrl }}
            description={bug.assignee.email}
            name={`${bug.assignee.firstName} ${bug.assignee.lastName}`}
          >
            {bug.assignee.userName}
          </User>
        );
      case "summary":
        return (
          <NavLink
            className={"font-medium hover:text-primary transition-all duration-300 "}
            to={`./${project?.data?.data?.projectKey}-${bug.bugKey}`}>{bug.summary}</NavLink>
        );
      case "bugStatus":
        return (
          <Chip
            classNames={{
              content: "p-2",
              base: "py-2"
            }}
            className="capitalize" color={statusColorMap[bug.bugStatus]} size="md" variant="flat">
            {bug.bugStatus}
          </Chip>
        );
      case "bugSeverity":
        return (
          <Chip
            classNames={{
              content: "p-2",
              base: "py-2"
            }}
            className="capitalize" color={severityColorMap[bug.bugSeverity]} size="md" variant="flat">
            {bug.bugSeverity}
          </Chip>
        );
      case "bugPriority":
        return (
          <Chip
            classNames={{
              content: "p-2 font-medium",
              base: "py-2",
            }}
            className="capitalize font-medium" color={priorityColorMap[bug.bugPriority]} size="md" variant="flat">
            {bug.bugPriority}
          </Chip>
        );
      case "createdAt":
        return (
          <div className={"font-medium"}>{DateTime.fromISO(bug.createdAt.toString()).toFormat("dd/MM/yyyy")}</div>
        );
      default:
        return <div>{bug.id}</div>;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<CiSearch size={"22"}/>}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<HiOutlineArrowDown className="text-small"/>} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<CiSearch className="text-small"/>} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<HiOutlinePlus/>}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className={"flex gap-4 justify-between items-center"}>
            <span className="text-default-400 text-small">Total {project?.data?.data?.bugs?.length || 0} users</span>
            <Button
              isLoading={isRefetching}
              onClick={() => {
                setIsRefetching(true);
                project.refetch();
              }}
              variant={"flat"}
              size={"sm"}> refresh
            </Button>
          </div>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    project?.data?.data?.bugs?.length,
    hasSearchFilter,
    isRefetching
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, project]);

  return (
    <Table
      aria-label={`All bugs by project ${project?.data?.data?.name}`}
      isHeaderSticky={true}
      bottomContent={bottomContent}
      bottomContentPlacement={"outside"}
      classNames={{
        wrapper: "max-h-full",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow
            key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
