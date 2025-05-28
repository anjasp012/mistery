import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ThemesLayout from '@/layouts/themes/layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import BoxKeyForm from '@/components/box-key-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Box & Key Themes',
        href: '/admin/themes/box-key',
    },
];

type BoxKeyProps = {
    boxeskeys: {
        id: string;
        name: string;
        image_box: string;
        image_box_opened: string;
        image_key: string;
    }[];
}

export default function BoxKeyThemes({ boxeskeys }: BoxKeyProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Box & Key themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Box & Key" description="Update theme box and key" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Box & Key Name</TableHead>
                                <TableHead>Image Box</TableHead>
                                <TableHead>Image Key</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {boxeskeys.map((boxkey, i) => (
                                <BoxKeyForm key={i} boxkey={boxkey} />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
