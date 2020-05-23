import { Injectable } from '@angular/core';
import { FileSpecs } from '../models/fileSpecs';
import { FileForUpload } from '../models/FileForUpload';
declare var UploaderForGoogleDrive: any;

@Injectable({
  providedIn: 'root'
})
export class FileManipulationService {

  currentFolder: string;
  folderTree: string[] = [];

  constructor() { }

  getFiles(folderId: string) {
    this.currentFolder = folderId;
    this.folderTree.push(folderId);
    return gapi.client.drive.files.list({
      pageSize: 100,
      fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size, shared)",
      q: `'${folderId}' in parents and trashed = false`,
      orderBy: "name",
    }).then((res) => {
      let files: FileSpecs[] = [];
      res.result.files.forEach((file) => files.push(new FileSpecs(file)));
      return files;
    });
  }

  downloadFile(folderId: string) {
    gapi.client.drive.files.get({
      fileId: folderId,
      fields: "*"
    }).execute((resp) => {
          console.log(resp.result.webContentLink)
          window.open(resp.result.webContentLink)
    })
  }

  UploadFile(file: FileForUpload, onError: any, onComplete: any, onProgress: any) {
    var contentType = file.Blob.type || 'application/octet-stream';
    var metadata = {
        name: file.Blob.name,
        mimeType: contentType,
        parents: [this.currentFolder]
    };

    var uploader = new UploaderForGoogleDrive({
        file: file.Blob,
        token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
        metadata: metadata,
        onError: onError,
        onComplete: onComplete,
        onProgress: onProgress,
        params: {
            convert: false,
            ocr: false
        }

    });

    uploader.upload();

  }

  goBack(): Promise<FileSpecs[]> {
    if (this.folderTree.length > 1) {
      let kata: string = this.folderTree.pop();
      console.log(kata)
      return this.getFiles(this.folderTree.pop());
    }
  }
}
