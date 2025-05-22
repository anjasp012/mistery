import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import Pagination from '@/components/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Link, router, useForm } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Member',
        href: '/admin/member',
    },
    {
        title: 'Create New Member',
        href: '/admin/member/create',
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

type PrizeBox = {
    prize_id: string | number | null | undefined;
    [key: string]: any;
};

type UserBox = {
    box_id: string;
    image_box: string;
    is_active: boolean;
    prize_boxes?: PrizeBox[];
    [key: string]: any;
};




export default function Create({ boxes, prizes }: CreateProps) {
    const initialUserBoxes: UserBox[] = boxes.map((box, i) => ({
        box_id: box.id,
        image_box: box.image_box,
        is_active: i === 0,
        prize_boxes: i === 0 ? Array.from({ length: 9 }, () => ({ prize_id: '' })) : [],
    }));

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<{
        username: string;
        user_boxes: UserBox[];
    }>({
        username: '',
        user_boxes: initialUserBoxes,
    });


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.member.store'));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Create Member" description="Create New Member" />
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
                    <div className="grid grid-cols-3 gap-3 items-start">
                        {data.user_boxes.map((box, boxIndex) => {
                            return (
                                <div key={boxIndex} className="border rounded-md p-3 grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor={`prize-switch-${boxIndex}`} className='flex gap-2'>Prize Box <img src={`/storage/${box.image_box}`} className='w-4' alt={box.image_box} /></Label>
                                        <Switch
                                            id={`prize-switch-${boxIndex}`}
                                            checked={data.user_boxes[boxIndex]?.is_active || false}
                                            onCheckedChange={(value) => {
                                                setData((prev) => {
                                                    const updated = [...prev.user_boxes];

                                                    updated[boxIndex].is_active = value;

                                                    // kalau aktif, buat array 9 prize_boxes default
                                                    if (value) {
                                                        updated[boxIndex].prize_boxes = Array.from({ length: 9 }, () => ({ prize_id: '' }));
                                                    } else {
                                                        // kalau tidak aktif, hapus prize_boxes atau set ke []
                                                        updated[boxIndex].prize_boxes = [];
                                                    }

                                                    return { ...prev, user_boxes: updated };
                                                });
                                            }}
                                        />


                                    </div>
                                    <div className="space-y-2">
                                        {data.user_boxes[boxIndex].is_active &&
                                            data.user_boxes[boxIndex].prize_boxes?.map((prizeBox, prizeIndex) => (
                                                <div key={prizeIndex} className="mb-2">

                                                    <Select
                                                        value={data.user_boxes[boxIndex].prize_boxes[prizeIndex].prize_id}
                                                        onValueChange={(value) => {
                                                            setData((prev) => {
                                                                const updated = [...prev.user_boxes];
                                                                if (updated[boxIndex].prize_boxes) {
                                                                    updated[boxIndex].prize_boxes[prizeIndex].prize_id = Number(value);
                                                                }
                                                                return { ...prev, user_boxes: updated };
                                                            });
                                                        }}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={`Mistery Box #${prizeIndex + 1}`} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {prizes.map((prize) => (
                                                                <SelectItem key={prize.id} value={prize.id}>
                                                                    {prize.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    {errors[`user_boxes.${boxIndex}.prize_boxes.${prizeIndex}.prize_id`] && (
                                                        <div className="text-red-500 text-sm">
                                                            {errors[`user_boxes.${boxIndex}.prize_boxes.${prizeIndex}.prize_id`]}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}



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
