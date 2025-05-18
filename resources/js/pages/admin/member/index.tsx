import HeadingSmall from '@/components/heading-small';
import Pagination from '@/components/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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

type Member = {
    id: string;
    username: string;
    joined_at: string;
};

type MembersProps = {
    members: {
        data: Member[];
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

export default function index({ members }: MembersProps) {
    const { data, meta } = members;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Member" description="Manage Member" />
                    <div className="mb-4 flex items-center justify-end gap-2">
                        <Input
                            type="search"
                            placeholder="Search member..."
                            className="w-full"
                            onChange={(e) => {
                                const searchTerm = encodeURI(e.target.value);
                                router.get('/admin/member', { search: searchTerm }, { preserveState: true, replace: true });
                            }}
                        />
                        <Link href='/admin/member/create' className={buttonVariants()}><Plus className="h-4 w-4" />
                            Add New Member</Link>
                    </div>
                </div>
                <div className="border rounded">
                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>#</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Join at</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((member, i) => (
                                <TableRow>
                                    <TableCell className='text-center'>{meta.from + i}</TableCell>
                                    <TableCell>{member.username}</TableCell>
                                    <TableCell>{member.joined_at}</TableCell>
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
                                                            router.get(`/users/${member.id}/edit`);
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
                                                            Deleting a member cannot be undone. This will remove all data access associated with this member.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                router.delete(`/admin/member/${member.id}`);
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
