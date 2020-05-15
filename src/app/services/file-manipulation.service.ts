import { Injectable } from '@angular/core';
import { FileSpecs } from '../models/fileSpecs';
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FileManipulationService {

  constructor() { }

  getFiles(folderId: string) {
    return gapi.client.drive.files.list({
        pageSize: 100,
        fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size, shared)",
        q: `'${folderId}' in parents and trashed = false`,
        orderBy: "name",
    }).then((res) => {
        let files: FileSpecs[] = [];
        res.result.files.forEach((file) => files.push(new FileSpecs(file)));
        return of(files);

    });
}

}
