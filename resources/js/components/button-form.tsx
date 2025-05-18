import React, { FormEventHandler, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Cross, LoaderCircle, Pencil, Save, X } from 'lucide-react'
import { Input } from './ui/input';
import { useForm } from '@inertiajs/react';
import InputError from './input-error';
import { Dialog, DialogContent, DialogOverlay } from './ui/dialog';

type ButtonForm = {
    name: string;
    image: File | null;
    _method: string;
}

export default function ButtonForm({ name, image }: any) {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageDialog, setImageDialog] = useState('');
    const { data, setData, post, errors, processing } = useForm<ButtonForm>({
        name: name,
        image: null,
        _method: 'patch'
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.button.update'), {
            preserveScroll: true,
            onSuccess: () => {
                // reset nilai form setelah berhasil
                setData({
                    name: name,
                    image: null,
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
                    <TableCell>{name}</TableCell>
                    <TableCell>
                        <Input type='file' onChange={e => setData('image', e.target.files?.[0] || null)} />
                        <InputError className="mt-2" message={errors.image} />
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
                        <TableCell>{name}</TableCell>
                        <TableCell><img onClick={e => {setOpen(true)
                             setImageDialog(`/storage/${image}`)} } className='w-10' src={`/storage/${image}`} alt={image} /></TableCell>
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
