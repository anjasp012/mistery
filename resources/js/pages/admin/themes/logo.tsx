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
import LogoForm from '@/components/logo-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Logo Themes',
        href: '/admin/themes/logo',
    },
];

type LogosProps = {
    logos: {
        first_logo: string;
        second_logo: string;
        third_logo: string;
        google_logo: string;
    };
}

export default function LogoThemes({ logos }: LogosProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Logo themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Logo" description="Update theme logo" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                                <LogoForm name={'First Logo'} image={logos.first_logo} />
                                <LogoForm name={'Second Logo'} image={logos.second_logo} />
                                <LogoForm name={'Third Logo'} image={logos.third_logo} />
                                <LogoForm name={'Google Logo'} image={logos.google_logo} />
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
