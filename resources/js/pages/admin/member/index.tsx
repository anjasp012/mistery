import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Plus } from 'lucide-react';
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Member',
        href: '/admin/member',
    },
];

type MembersProps = {
    members: {
        id: number;
        username: string;
        created_at: string;
    }[];
}

export default function index({members} : MembersProps) {
    console.log(members);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Member" description="Manage Member" />
                    <Button><Plus/> Add New Member</Button>
                </div>
                <div className="border rounded">
                 <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Join at</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member,i)=>(
                                <TableRow>
                                    <TableCell>{i}</TableCell>
                                    <TableCell>{member.username}</TableCell>
                                    <TableCell>{member.created_at}</TableCell>
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
                                                            router.get(`/users/${user.id}/edit`);
                                                        }}
                                                    >
                                                        Ubah
                                                    </DropdownMenuItem>
                                                    <AlertDialogTrigger className="w-full">
                                                        <DropdownMenuItem variant="destructive">Hapus</DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuContent>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Menghapus user tidak dapat dibatalkan. Ini akan menghapus semua akses data yang terkait
                                                            dengan user ini.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => {
                                                                router.delete(`/users/${user.id}`);
                                                            }}
                                                        >
                                                            Hapus
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
            </div>
        </AppLayout>
    )
}
