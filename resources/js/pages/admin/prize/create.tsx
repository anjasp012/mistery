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
        title: 'Prize',
        href: '/admin/prize',
    },
    {
        title: 'Create New Prize',
        href: '/admin/prize/create',
    },
];

type PrizeForm = {
    name: string;
    image: File | null;
}


export default function Create() {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<PrizeForm>({
        name: '',
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.prize.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Create Prize" description="Create New Prize" />
                </div>
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image">Image</Label>

                        <Input
                            type='file'
                            id="image"
                            className="mt-1 block w-full"
                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                            required
                            autoComplete="image"
                            placeholder="image"
                        />

                        <InputError className="mt-2" message={errors.image} />
                    </div>
                    <Button>Save</Button>
                </form>
            </div>
        </AppLayout>
    )
}
