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
        title: 'Member',
        href: '/admin/member',
    },
];

type CreateProps = {
    prizes: {
        id: string;
        name: string;
        image: string;
    }[]
    boxes: {
        id: string;
        name: string;
        image_box: string;
    }[]
};


export default function Create({ boxes, prizes }: CreateProps) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        username: '',
        user_boxes: boxes.flatMap((box) =>
            Array.from({ length: 9 }, () => ({
                box_id: box.id,
                key_id: box.id,
                prize_id: ''
            }))
        )
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.member.store'));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Add Member" description="Add New Member" />
                </div>
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>

                        <Input
                            id="username"
                            className="mt-1 block w-full"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Username"
                        />

                        <InputError className="mt-2" message={errors.username} />
                    </div>
                    <div className="grid grid-cols-6 gap-3 items-start">
                        {boxes.map((box, boxIndex) => {
                            const start = boxIndex * 9;
                            const prizesForBox = data.user_boxes.slice(start, start + 9);

                            return (
                                <div key={box.id} className="grid gap-2">
                                    <Label htmlFor="prize" className='flex justify-center gap-2'>Prize Box <img src={`/storage/${box.image_box}`} className='w-4' alt={box.image_box} /></Label>
                                    <div className="space-y-2">
                                        {prizesForBox.map((prize, prizeIndex) => {
                                            const globalIndex = start + prizeIndex;

                                            return (
                                                <div key={globalIndex}>
                                                    <Select
                                                        required
                                                        value={data.user_boxes[globalIndex].prize_id}
                                                        onValueChange={(value) => {
                                                            setData((prev) => {
                                                                const updated = [...prev.user_boxes];
                                                                updated[globalIndex].prize_id = value;
                                                                return {
                                                                    ...prev,
                                                                    user_boxes: updated,
                                                                };
                                                            });
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={`Mistery Box #${prizeIndex + 1}`} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {prizes.map((prize) => (
                                                                <SelectItem key={prize.id} value={String(prize.id)}>
                                                                    {prize.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    {errors[`user_boxes.${globalIndex}.prize_id`] && (
                                                        <div className="text-red-500 text-sm">
                                                            {errors[`user_boxes.${globalIndex}.prize_id`]}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Button>Save</Button>
                </form>
            </div>
        </AppLayout>
    )
}
