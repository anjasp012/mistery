import React, { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button, buttonVariants } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Link, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Member',
        href: '/admin/member',
    },
    {
        title: 'Show Member',
        href: '/admin/member/show',
    },
];

type ShowProps = {
    member: {
        id: number;
        username: string;
        boxes: {
            id: string;
            box_id: string;
            image_box: string;
            is_active: boolean;
            prizes: {
                prize_id: string | number;
                is_open: boolean;
                prize: {
                    name: string
                };
            }[];
        }[];
    };
    prizes: {
        id: string;
        name: string;
        image: string;
    }[];
    boxes: {
        id: string;
        name: string;
        image_box: string;
    }[];
};

export default function Show({ member, prizes, boxes }: ShowProps) {
    const { data, setData, put, errors } = useForm({
        username: member.username,
        user_boxes: boxes.map((box) => {
            const existing = member.boxes.find((b) => b.box_id == box.id);
            return {
                id: existing?.id,
                image_box: box.image_box,
                is_active: existing?.is_active,
                prize_boxes: existing?.prizes ?? [],
            };
        }),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.member.update', member.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="px-4 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <HeadingSmall title="Show Member" description="Show member details" />
                </div>
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            readOnly
                            id="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={errors.username} />
                    </div>

                    <div className="grid grid-cols-3 gap-3 items-start">
                        {data.user_boxes.map((box, boxIndex) => (
                            <div key={boxIndex} className="border rounded-md p-3 grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label className="flex gap-2">
                                        Prize Box
                                        <img src={`/storage/${box.image_box}`} className="w-4" />
                                    </Label>
                                    <Switch
                                        checked={box.is_active}
                                    />
                                </div>

                                <div className="space-y-2">
                                    {box.is_active ?
                                        box.prize_boxes?.map((prizeBox, prizeIndex) => (
                                            <div key={prizeIndex}>
                                                <div className="flex items-center gap-4 border rounded-lg pe-2">
                                                    <Input readOnly className='border-0' value={prizeBox.prize.name}/>
                                                    <Switch
                                                        checked={prizeBox.is_open}
                                                    />
                                                </div>

                                                {errors[`user_boxes.${boxIndex}.prize_boxes.${prizeIndex}.prize_id`] && (
                                                    <div className="text-red-500 text-sm">
                                                        {errors[`user_boxes.${boxIndex}.prize_boxes.${prizeIndex}.prize_id`]}
                                                    </div>
                                                )}
                                            </div>
                                        )) : ''}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href={route('admin.member.index')} className={buttonVariants()} type="submit">Back</Link>
                </form>
            </div>
        </AppLayout>
    );
}
