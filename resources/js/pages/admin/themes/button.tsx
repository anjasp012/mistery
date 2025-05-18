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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Button Themes',
        href: '/admin/themes/button',
    },
];

type ButtonsProps = {
    buttons: {
        login_button: string;
        logout_button: string;
        claim_button: string;
        back_button: string;
        history_button: string;
    };
}

export default function ButtonThemes({ buttons }: ButtonsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Button themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Button" description="Update theme button" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                                <ButtonForm name={'Login Button'} image={buttons.login_button} />
                                <ButtonForm name={'Logout Button'} image={buttons.logout_button} />
                                <ButtonForm name={'Claim Button'} image={buttons.claim_button} />
                                <ButtonForm name={'Back Button'} image={buttons.back_button} />
                                <ButtonForm name={'History Button'} image={buttons.history_button} />
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
