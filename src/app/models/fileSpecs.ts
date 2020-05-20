export const MIME_TYPE_FOLDER = "application/vnd.google-apps.folder";

export class FileSpecs {
  ID: string;
  Name: string;
  Gfile: gapi.client.drive.File;
  Size: string;
  IsTypeFolder: boolean;

  constructor (file: gapi.client.drive.File) {
    this.ID = file.id;
    this.Name = file.name;
    this.Gfile = file;
    this.Size = file.size;
    this.IsTypeFolder = file.mimeType === MIME_TYPE_FOLDER;
  }

  get fileSize(): string {
    if (!this.Size) return " "
    let size: number = parseInt(this.Size);
    return (Math.floor(size/(1024*1024))).toString();
  }

  get fileType(): string {
    if(this.IsTypeFolder) {
      return "Folder";
    }
    return "File";
  }
}
