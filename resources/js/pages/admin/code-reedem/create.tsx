import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import Pagination from '@/components/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Link, router, useForm } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import React, { FormEventHandler } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Code Reedem',
        href: '/admin/code-reedem',
    },
    {
        title: 'Create New Code Reedem',
        href: '/admin/code-reedem/create',
    },
];

type CreateProps = {
    members: {
        id: string;
        username: string;
    }[],
    keys: {
        id: string;
        name: string;
        image: string;
    }[]
};


export default function Create({ members, keys }: CreateProps) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        user_id: '',
        key_id: '',
        code: '',
        amount: '1',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.code-reedem.store'));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Create Code Reedem" description="Create New Code Reedem" />
                </div>
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="member">Member</Label>
                        <Select
                            onValueChange={value => setData('user_id', value)}
                            required
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={`Member`} />
                            </SelectTrigger>
                            <SelectContent>
                                {members.map((member, i) => (
                                    <SelectItem key={member.id} value={String(member.id)}>
                                        {member.username}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.user_id} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="code">Code</Label>
                        <Input
                            id="code"
                            className="mt-1 block w-full"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            required
                            autoComplete="code"
                            placeholder="Code"
                        />

                        <InputError className="mt-2" message={errors.code} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Key">Key</Label>
                        <Select
                            onValueChange={value => setData('key_id', value)}

                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={`Key`} />
                            </SelectTrigger>
                            <SelectContent>
                                {keys.map((key, i) => (
                                    <SelectItem key={key.id} value={String(key.id)}>
                                        {key.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.key_id} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount">amount</Label>
                        <Input
                            id="amount"
                            type='number'
                            min={1}
                            className="mt-1 block w-full"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            required
                            autoComplete="amount"
                            placeholder="Amount"
                        />

                        <InputError className="mt-2" message={errors.code} />
                    </div>
                    <Button>Save</Button>
                </form>
            </div>
        </AppLayout>
    )
}
