import HeadingSmall from '@/components/heading-small';
import Pagination from '@/components/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import React, { useState } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Prize',
        href: '/admin/prize',
    },
];

type Prize = {
    id: string;
    name: string;
    image: string;
    created_at: string;
};

type PrizesProps = {
    prizes: {
        data: Prize[];
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

export default function Index({ prizes }: PrizesProps) {
    const { data, meta } = prizes;
    const [open, setOpen] = useState(false);
    const [imageDialog, setImageDialog] = useState('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Prize" description="Manage Prize" />
                    <div className="mb-4 flex items-center justify-end gap-2">
                        <Input
                            type="search"
                            placeholder="Search prize..."
                            className="w-full"
                            onChange={(e) => {
                                const searchTerm = encodeURI(e.target.value);
                                router.get('/admin/prize', { search: searchTerm }, { preserveState: true, replace: true });
                            }}
                        />
                        <Link href='/admin/prize/create' className={buttonVariants()}><Plus className="h-4 w-4" />
                            Create New Prize</Link>
                    </div>
                </div>
                <div className="border rounded">
                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((prize, i) => (
                                <TableRow>
                                    <TableCell className='text-center'>{meta.from + i}</TableCell>
                                    <TableCell>{prize.name}</TableCell>
                                    <TableCell><img onClick={e => {
                                        setOpen(true)
                                        setImageDialog(`/storage/${prize.image}`)
                                    }} className='w-10' src={`/storage/${prize.image}`} alt={prize.image} /></TableCell>
                                    <TableCell>{prize.created_at}</TableCell>
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
                                                            router.get(`/prize/edit/${prize.id}`);
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
                                                            Deleting a prize cannot be undone. This will remove all data access associated with this prize.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                router.delete(`/admin/prize/${prize.id}`);
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay />
                <DialogContent className="sm:max-w-[425px]">
                    <img src={imageDialog} className='w-full' alt="imageDialog" />
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
