import HeadingSmall from '@/components/heading-small';
import Pagination from '@/components/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Member',
        href: '/admin/member',
    },
];

type Code = {
    id: string;
    member: string;
    key_name: string;
    key_image: string;
    code: string;
    is_reedem: boolean;
    created_at: string;
};

type CodeReedemsProps = {
    codes: {
        data: Code[];
        meta: {
            current_page: number;
            total: number;
            last_page: number;
            per_page: number;
            links: {
                url: string | null;
                label: string;
                active: boolean;
            }[];
            to: number;
            from: number;
            path: string;
        };
    };
};

export default function Index({ codes }: CodeReedemsProps) {
    const { data, meta } = codes;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Code Reedem" description="Manage Code Reedem" />
                    <div className="mb-4 flex items-center justify-end gap-2">
                        <Input
                            type="search"
                            placeholder="Search code..."
                            className="w-full"
                            onChange={(e) => {
                                const searchTerm = encodeURI(e.target.value);
                                router.get('/admin/member', { search: searchTerm }, { preserveState: true, replace: true });
                            }}
                        />
                        <Link href='/admin/code-reedem/create' className={buttonVariants()}><Plus className="h-4 w-4" />
                            Add New Code</Link>
                    </div>
                </div>
                <div className="border rounded">
                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>#</TableHead>
                                <TableHead>Member</TableHead>
                                <TableHead>Key</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Is Reedem</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((code, i) => (
                                <TableRow>
                                    <TableCell className='text-center'>{meta.from + i}</TableCell>
                                    <TableCell>{code.member}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                        <img src={`/storage/${code.key_image}`} className='w-5' alt={code.key_image} />
                                        <span>
                                        {code.key_name}
                                        </span>
                                        </div>
                                        </TableCell>
                                    <TableCell>{code.code}</TableCell>
                                    <TableCell>{code.is_reedem ? <Badge>Yes</Badge> : <Badge variant={'destructive'}>No</Badge> }</TableCell>
                                    <TableCell>{code.created_at}</TableCell>
                                    <TableCell className="text-right">
                                        <AlertDialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="float-end h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            router.get(`/code-reedeem/${code.id}/edit`);
                                                        }}
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <AlertDialogTrigger className="w-full">
                                                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Deleting a code cannot be undone. This will remove all data access associated with this code.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                router.delete(`/admin/code-reedem/${code.id}`);
                                                            }}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </DropdownMenu>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Pagination pagination={meta} />
            </div>
        </AppLayout>
    )
}
