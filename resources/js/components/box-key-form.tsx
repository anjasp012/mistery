import React, { FormEventHandler, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Cross, LoaderCircle, Pencil, Save, X } from 'lucide-react'
import { Input } from './ui/input';
import { useForm } from '@inertiajs/react';
import InputError from './input-error';
import { Dialog, DialogContent, DialogOverlay } from './ui/dialog';

type BoxKeyForm = {
    name: string;
    image_box: File | null;
    image_box_opened: File | null;
    image_key: File | null;
    _method: string;
}

export default function BoxKeyForm({ boxkey }: any) {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageDialog, setImageDialog] = useState('');
    const { data, setData, post, errors, processing } = useForm<BoxKeyForm>({
        name: boxkey.name,
        image_box: null,
        image_box_opened: null,
        image_key: null,
        _method: 'patch'
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.boxkey.update', boxkey.id), {
            preserveScroll: true,
            onSuccess: () => {
                // reset nilai form setelah berhasil
                setData({
                    name: boxkey.name,
                    image_box: null,
                    image_box_opened: null,
                    image_key: null,
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
                    <TableCell>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className="mt-2" message={errors.name} />
                    </TableCell>
                    <TableCell>
                        <Input type='file' onChange={e => setData('image_box', e.target.files?.[0] || null)} />
                        <InputError className="mt-2" message={errors.image_box} />
                    </TableCell>
                    <TableCell>
                        <Input type='file' onChange={e => setData('image_box_opened', e.target.files?.[0] || null)} />
                        <InputError className="mt-2" message={errors.image_box_opened} />
                    </TableCell>
                    <TableCell>
                        <Input type='file' onChange={e => setData('image_key', e.target.files?.[0] || null)} />
                        <InputError className="mt-2" message={errors.image_key} />
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
                        <TableCell>{boxkey.name}</TableCell>
                        <TableCell><img onClick={e => {setOpen(true)
                             setImageDialog(`/storage/${boxkey.image_box}`)} } className='w-10' src={`/storage/${boxkey.image_box}`} alt={boxkey.image_box} /></TableCell>
                        <TableCell><img onClick={e => {setOpen(true)
                             setImageDialog(`/storage/${boxkey.image_box_opened}`)} } className='w-10' src={`/storage/${boxkey.image_box_opened}`} alt={boxkey.image_box_opened} /></TableCell>
                        <TableCell><img onClick={e => {setOpen(true)
                             setImageDialog(`/storage/${boxkey.image_key}`)} } className='w-10' src={`/storage/${boxkey.image_key}`} alt={boxkey.image_key} /></TableCell>
                        <TableCell><Button onClick={(e) => setEdit(true)} size="sm"><Pencil /></Button></TableCell>
                    </TableRow>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogOverlay />
                        <DialogContent className="sm:max-w-[425px]">
                            <img src={imageDialog} className='w-full' alt="imageDialog" />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </>
    )

}
