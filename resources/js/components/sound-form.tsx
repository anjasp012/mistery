import React, { FormEventHandler, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { Button } from './ui/button'
import { Cross, LoaderCircle, Pencil, Save, X } from 'lucide-react'
import { Input } from './ui/input';
import { useForm } from '@inertiajs/react';
import InputError from './input-error';
import { Dialog, DialogContent, DialogOverlay } from './ui/dialog';

type SoundForm = {
    name: string;
    file: File | null;
    _method: string;
}


type SoundProps = {
    sound: {
        name: string;
        slug: string;
        file: string;
        is_active: string;
    };
}

export default function SoundForm({ sound }: SoundProps) {
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [imageDialog, setImageDialog] = useState('');
    const { data, setData, post, errors, processing } = useForm<SoundForm>({
        name: sound.name,
        file: null,
        _method: 'patch'
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.sound.update', sound.slug), {
            preserveScroll: true,
            onSuccess: () => {
                // reset nilai form setelah berhasil
                setData({
                    name: sound.name,
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
                    <TableCell>{sound.name}</TableCell>
                    <TableCell>
                        <Input type='file' onChange={e => setData('file', e.target.files?.[0] || null)} />
                        <InputError className="mt-2" message={errors.file} />
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
                        <TableCell>{sound.name}</TableCell>
                        <TableCell>
                            <audio controls>
                                <source src={`/storage/${sound.file}`} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </TableCell>
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
