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
import SoundForm from '@/components/sound-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sound Themes',
        href: '/admin/themes/sound',
    },
];

type SoundsProps = {
    sounds: {
        name: string;
        slug: string;
        file: string;
        is_active: string;
        link: string;
    }[];
}

export default function ButtonThemes({ sounds }: SoundsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sound themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Sound" description="Update theme sound" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Sound</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sounds.map((sound, i)=> (
                                <SoundForm key={i} sound={sound} />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
