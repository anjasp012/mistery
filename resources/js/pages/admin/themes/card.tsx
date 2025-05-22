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
import CardForm from '@/components/card-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Card Themes',
        href: '/admin/themes/card',
    },
];

type CardsProps = {
    cards: {
        name: string;
        slug: string;
        file: string;
        is_active: string;
    }[];
}

export default function ButtonThemes({ cards }: CardsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Card themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Card" description="Update theme card" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cards.map((card, i)=> (
                                <CardForm key={i} card={card} />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
