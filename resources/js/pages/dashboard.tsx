import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Award, LucideFormInput, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type DashboardProps = {
    member: number;
    code: number;
    prize: number;
};


export default function Dashboard({member, code, prize} : DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="p-4 flex gap-4 items-center border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border">
                            <Users size={50}/>
                            <span className='text-3xl font-medium'>{member}</span>
                            <span className='text-lg'>Member</span>
                    </div>
                    <div className="p-4 flex gap-4 items-center border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border">
                            <LucideFormInput size={50}/>
                            <span className='text-3xl font-medium'>{code}</span>
                            <span className='text-lg'>Code Reedem</span>
                    </div>
                    <div className="p-4 flex gap-4 items-center border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border">
                            <Award size={50}/>
                            <span className='text-3xl font-medium'>{prize}</span>
                            <span className='text-lg'>Prize</span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
