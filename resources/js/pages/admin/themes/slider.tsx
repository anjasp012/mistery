import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ThemesLayout from '@/layouts/themes/layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SliderForm from '@/components/slider-form';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Slider Themes',
        href: '/admin/themes/slider',
    },
];

type SlidersProps = {
    sliders: {
        name: string;
        slug: string;
        file: string;
        is_active: string;
    }[];
}

export default function ButtonThemes({ sliders }: SlidersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Slider themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <div className="flex justify-between">
                        <HeadingSmall title="Slider" description="Update theme slider" />
                        <Link method={'post'} href={route('admin.slider.store')} className={buttonVariants()}><Plus/></Link>
                    </div>

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sliders.map((slider, i)=> (
                                <SliderForm key={i} slider={slider} />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
