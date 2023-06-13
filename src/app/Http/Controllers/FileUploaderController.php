<?php

namespace App\Http\Controllers;

use App\Constants\UploadedFile;
use App\Facades\Helper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class FileUploaderController extends Controller
{
    function __construct(private string $storagePath)
    {
        $this->storagePath = $storagePath;
    }

    public function uploadImage(Model $model, Request $request, string $requestKey, string $modelColumn, int $maxSize = 0)
    {
        if ($request->hasFile($requestKey) && $request->file($requestKey)->isValid()) {
            if (($fileMimeType = $request->file($requestKey)->getMimeType()) && ($fileMimeType === 'image/jpeg' || $fileMimeType === 'image/png')) {
                if ($request->file($requestKey)->getSize() > $maxSize) {
                    return UploadedFile::MAX_SIZE_ERROR;
                }
                $path = $request->$requestKey->store($this->storagePath);
                if ($path) {
                    if ($maxSize === 0) {
                        Helper::resizeImage(storage_path('app') . '/' . $path, 200);
                    }
                    @unlink(storage_path('app') . '/' . $this->storagePath . '/' . $model->$modelColumn);
                    $data = [$modelColumn => basename($path)];
                    return $model->update($data) ? UploadedFile::OK : UploadedFile::ERROR;
                }
                return UploadedFile::UPLOAD_ERROR;
            }
            return UploadedFile::MIME_TYPE_ERROR;
        }
        return UploadedFile::NOT_UPLOADED_ERROR;
    }

    public function uploadFile(Model $model, Request $request, string $requestKey, string $modelColumn)
    {
        if ($request->hasFile($requestKey) && $request->file($requestKey)->isValid()) {
            $path = $request->$requestKey->store($this->storagePath);
            if ($path) {
                @unlink(storage_path('app') . '/' . $this->storagePath . '/' . $model->$modelColumn);
                $data = [$modelColumn => basename($path)];
                return $model->update($data) ? UploadedFile::OK : UploadedFile::ERROR;
            }
            return UploadedFile::UPLOAD_ERROR;
        }
        return UploadedFile::NOT_UPLOADED_ERROR;
    }
}
