import { ThrowStmt } from '@angular/compiler';

export class FileForUpload {
  name: string;
  blob: File;

  constructor (Name:string, Blob: File) {
    this.name = Name;
    this.blob = Blob;
  }

  get Blob(): File {
    return this.blob;
  }

  get Name(): string {
    return this.name;
  }
}
