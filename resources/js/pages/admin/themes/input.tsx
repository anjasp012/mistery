import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import ThemesLayout from '@/layouts/themes/layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import BoxKeyForm from '@/components/box-key-form';
import InputForm from '@/components/input-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Input Themes',
        href: '/admin/themes/input',
    },
];

type InputsProps = {
    inputs: {
        name: string;
        slug: string;
        file: string;
        is_active: string;
    }[];
}

export default function ButtonThemes({ inputs }: InputsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Input themes" />

            <ThemesLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Input" description="Update theme input" />

                    <Table className='w-full'>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inputs.map((input, i)=> (
                                <InputForm key={i} input={input} />
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </ThemesLayout>
        </AppLayout>
    );
}
