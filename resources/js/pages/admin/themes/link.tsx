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
import LinkForm from '@/components/link-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Link Themes',
        href: '/admin/themes/link',
    },
];

type LinksProps = {
    links: {
        name: string;
        slug: string;
        file: string;
        is_active: string;
        link: string;
    }[];
}

export default function ButtonThemes({ links }: LinksProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Link themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Link" description="Update theme link" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Link</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {links.map((link, i)=> (
                                <LinkForm key={i} link={link} />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
