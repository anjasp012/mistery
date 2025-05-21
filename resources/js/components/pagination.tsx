import {
    Pagination as P,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

  interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    path: string;
    links: { url: string | null; label: string; active: boolean }[];
  }

  interface PaginationProps {
    pagination: PaginationMeta;
  }

  export default function Pagination({ pagination }: PaginationProps) {
    const { current_page, last_page } = pagination;

    return (
      <P className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
            size={'sm'}
              href={`?page=${Math.max(current_page - 1, 1)}`}
              className={
                current_page === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {[...Array(last_page)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                size={'sm'}
                  href={`?page=${pageNumber}`}
                  className={`${
                    pageNumber === current_page
                      ? "bg-muted"
                      : "hover:bg-muted"
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
                  size={'sm'}
              href={`?page=${Math.min(current_page + 1, last_page)}`}
              className={
                current_page === last_page ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </P>
    );
  }
