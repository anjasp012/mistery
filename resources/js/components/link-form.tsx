import React, { FormEventHandler, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Cross, LoaderCircle, Pencil, Save, X } from 'lucide-react'
import { Input } from './ui/input';
import { useForm } from '@inertiajs/react';
import InputError from './input-error';
import { Dialog, DialogContent, DialogOverlay } from './ui/dialog';

type LinkForm = {
    name: string;
    file: File | null;
    link: string;
    _method: string;
}


type LinkProps = {
    link: {
        name: string;
        slug: string;
        file: string;
        link: string;
        is_active: string;
    };
}

export default function LinkForm({ link }: LinkProps) {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageDialog, setImageDialog] = useState('');
    const { data, setData, post, errors, processing } = useForm<LinkForm>({
        name: link.name,
        link: link.link,
        file: null,
        _method: 'patch'
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.link.update', link.slug), {
            preserveScroll: true,
            onSuccess: () => {
                // reset nilai form setelah berhasil
                setData({
                    name: link.name,
                    link: link.link,
                    file: null,
                    _method: 'patch'
                });
                setEdit(false)
            },
        });
    };


    return (
        <>
            {edit ? (
                <TableRow>
                    <TableCell>{link.name}</TableCell>
                    <TableCell>
                        <Input type='file' onChange={e => setData('file', e.target.files?.[0] || null)} />
                        <InputError className="mt-2" message={errors.file} />
                    </TableCell>
                    <TableCell>
                        <Input value={data.link} onChange={e => setData('link', e.target.value)} />
                        <InputError className="mt-2" message={errors.link} />
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-1">
                            <Button onClick={(e) => setEdit(false)} variant={'destructive'} size="sm"><X /></Button>
                            <Button onClick={submit} size="sm">{processing ? <LoaderCircle className="h-3 w-3 animate-spin" /> : <Save />}</Button>
                        </div>
                    </TableCell>
                </TableRow>
            ) : (
                <>
                    <TableRow>
                        <TableCell>{link.name}</TableCell>
                        <TableCell><img onClick={e => {setOpen(true)
                             setImageDialog(`/storage/${link.file}`)} } className='w-10' src={`/storage/${link.file}`} alt={link.file} /></TableCell>
                             <TableCell><a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a></TableCell>
                        <TableCell><Button onClick={(e) => setEdit(true)} size="sm"><Pencil /></Button></TableCell>
                    </TableRow>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogOverlay/>
                        <DialogContent className="sm:max-w-[425px]">
                            <img src={imageDialog} className='w-full' alt="imageDialog" />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </>
    )

}
