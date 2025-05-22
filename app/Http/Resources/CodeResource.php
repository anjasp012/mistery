<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CodeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         return [
            'id'=> $this->id,
            'member'=> $this->member->username,
            'key_name'=> $this->key->name,
            'key_image'=> $this->key->image,
            'code'=> $this->code,
            'amount'=> $this->amount,
            'is_reedem'=> $this->is_reedem,
            'created_at'=> $this->created_at->format('d M Y'),
        ];
    }
}
