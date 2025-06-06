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
import ButtonForm from '@/components/button-form';
import BackgroundForm from '@/components/background-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Background Themes',
        href: '/admin/themes/background',
    },
];

type BackgroundsProps = {
    backgrounds: {
        name: string;
        slug: string;
        file: string;
        is_active: string;
    }[];
}

export default function Background({ backgrounds }: BackgroundsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Background themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Background" description="Update theme background" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {backgrounds.map((background, i) => (
                                <BackgroundForm key={i} background={background} />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
